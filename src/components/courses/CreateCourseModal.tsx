import { useState } from "react";
import {
  Modal,
  Stack,
  TextInput,
  NumberInput,
  Select,
  Switch,
  Button,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FiPlus } from "react-icons/fi";
import { useAddCourseMutation } from "../../services/courseApi";

type Props = {
  opened: boolean;
  onClose: () => void;
};

export default function CreateCourseModal({ opened, onClose }: Props) {
  const [addCourse, { isLoading }] = useAddCourseMutation();

  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [units, setUnits] = useState<number | undefined>(3);
  const [level, setLevel] = useState<string | null>("100");
  const [semester, setSemester] = useState<string | null>("1");
  const [type, setType] = useState<string | null>("core");
  const [prereq, setPrereq] = useState("");
  const [restricted, setRestricted] = useState(false);

  const resetForm = () => {
    setCode("");
    setTitle("");
    setUnits(3);
    setLevel("100");
    setSemester("1");
    setType("core");
    setPrereq("");
    setRestricted(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleCreateCourse = async () => {
    if (!code.trim() || !title.trim() || !units || !level || !semester || !type) {
      notifications.show({
        color: "red",
        title: "Missing fields",
        message: "Please complete all required fields before saving.",
      });
      return;
    }

    try {
      await addCourse({
        code: code.trim().toUpperCase(),
        title: title.trim(),
        units,
        level,
        semester,
        type,
        prereq: prereq.trim() || null,
        restricted,
      }).unwrap();

      notifications.show({
        color: "green",
        title: "Course created",
        message: "The new course has been added successfully.",
      });
      handleClose();
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Create failed",
        message: "Unable to create the course. Please try again.",
      });
    }
  };

  return (
    <Modal opened={opened} onClose={handleClose} title="Create New Course" centered>
      <Stack>
        <TextInput
          label="Course Code"
          placeholder="CSC401"
          value={code}
          onChange={(event) => setCode(event.currentTarget.value)}
          required
        />
        <TextInput
          label="Course Title"
          placeholder="Artificial Intelligence"
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
          required
        />
        <NumberInput
          label="Units"
          min={1}
          max={6}
          value={units}
          onChange={(value) =>
            setUnits(typeof value === "number" ? value : undefined)
          }
          required
        />
        <Select
          label="Level"
          data={["100", "200", "300", "400", "500"]}
          value={level}
          onChange={setLevel}
          required
        />
        <Select
          label="Semester"
          data={[
            { label: "First Semester", value: "1" },
            { label: "Second Semester", value: "2" },
          ]}
          value={semester}
          onChange={setSemester}
          required
        />
        <Select
          label="Type"
          data={[
            { label: "Compulsory", value: "core" },
            { label: "Elective", value: "elective" },
          ]}
          value={type}
          onChange={setType}
          required
        />
        <TextInput
          label="Prerequisite"
          placeholder="CSC301 (optional)"
          value={prereq}
          onChange={(event) => setPrereq(event.currentTarget.value)}
        />
        <Switch
          label="Restricted course (CGPA requirement)"
          checked={restricted}
          onChange={(event) => setRestricted(event.currentTarget.checked)}
        />
        <Button
          leftSection={<FiPlus />}
          onClick={handleCreateCourse}
          loading={isLoading}
        >
          Save Course
        </Button>
      </Stack>
    </Modal>
  );
}

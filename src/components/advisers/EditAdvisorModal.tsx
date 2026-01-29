import { useEffect, useState } from "react";
import { Modal, Stack, TextInput, Select, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FiEdit } from "react-icons/fi";
import { useUpdateAdvisorMutation } from "../../services/advisorApi";

type Advisor = {
  id: string;
  name: string;
  staffId: string;
  email: string;
  department: string;
  status: string;
  level?: string;
};

type Props = {
  opened: boolean;
  onClose: () => void;
  adviser: Advisor | null;
};

export default function EditAdvisorModal({ opened, onClose, adviser }: Props) {
  const [updateAdvisor, { isLoading }] = useUpdateAdvisorMutation();

  const [name, setName] = useState("");
  const [staffId, setStaffId] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("Computer Science");
  const [level, setLevel] = useState<string | null>("100");
  const [status, setStatus] = useState<string | null>("Active");

  useEffect(() => {
    if (!adviser) return;
    setName(adviser.name ?? "");
    setStaffId(adviser.staffId ?? "");
    setEmail(adviser.email ?? "");
    setDepartment(adviser.department ?? "Computer Science");
    setLevel(adviser.level ?? "100");
    setStatus(adviser.status ?? "Active");
  }, [adviser]);

  const handleClose = () => {
    onClose();
  };

  const handleUpdateAdvisor = async () => {
    if (!adviser?.id) return;
    if (!name.trim() || !staffId.trim() || !email.trim() || !status) {
      notifications.show({
        color: "red",
        title: "Missing fields",
        message: "Please complete all required fields before saving.",
      });
      return;
    }

    try {
      await updateAdvisor({
        id: adviser.id,
        name: name.trim(),
        staffId: staffId.trim().toUpperCase(),
        email: email.trim().toLowerCase(),
        department,
        status,
        level,
      }).unwrap();

      notifications.show({
        color: "green",
        title: "Adviser updated",
        message: "Changes have been saved successfully.",
      });
      handleClose();
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Update failed",
        message: "Unable to update the adviser. Please try again.",
      });
    }
  };

  return (
    <Modal opened={opened} onClose={handleClose} title="Edit Adviser" centered>
      <Stack>
        <TextInput
          label="Full Name"
          placeholder="Dr. Osarodion Osagie"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
          required
        />
        <TextInput
          label="Staff ID"
          placeholder="ADV/CS/003"
          value={staffId}
          onChange={(event) => setStaffId(event.currentTarget.value)}
          required
        />
        <TextInput
          label="Email"
          placeholder="osagie@uniben.edu"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          required
        />
        <TextInput
          label="Department"
          placeholder="Computer Science"
          value={department}
          onChange={(event) => setDepartment(event.currentTarget.value)}
        />
        <Select
          label="Assigned Level"
          data={["100", "200", "300", "400", "500"]}
          value={level}
          onChange={setLevel}
          required
        />
        <Select
          label="Status"
          data={["Active", "Inactive"]}
          value={status}
          onChange={setStatus}
          required
        />
        <Button
          leftSection={<FiEdit />}
          onClick={handleUpdateAdvisor}
          loading={isLoading}
        >
          Save Changes
        </Button>
      </Stack>
    </Modal>
  );
}

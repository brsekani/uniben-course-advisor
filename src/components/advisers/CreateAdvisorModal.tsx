import { useState } from "react";
import { Modal, Stack, TextInput, Select, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FiUserPlus } from "react-icons/fi";
import { useAddAdvisorMutation } from "../../services/advisorApi";

type Props = {
  opened: boolean;
  onClose: () => void;
};

export default function CreateAdvisorModal({ opened, onClose }: Props) {
  const [addAdvisor, { isLoading }] = useAddAdvisorMutation();

  const [name, setName] = useState("");
  const [staffId, setStaffId] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("Computer Science");
  const [level, setLevel] = useState<string | null>("100");
  const [status, setStatus] = useState<string | null>("Active");

  const resetForm = () => {
    setName("");
    setStaffId("");
    setEmail("");
    setDepartment("Computer Science");
    setLevel("100");
    setStatus("Active");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleCreateAdvisor = async () => {
    if (!name.trim() || !staffId.trim() || !email.trim() || !status) {
      notifications.show({
        color: "red",
        title: "Missing fields",
        message: "Please complete all required fields before saving.",
      });
      return;
    }

    try {
      await addAdvisor({
        name: name.trim(),
        staffId: staffId.trim().toUpperCase(),
        email: email.trim().toLowerCase(),
        department,
        level,
        status,
        role: "advisor",
        password: "advisor123",
      }).unwrap();

      notifications.show({
        color: "green",
        title: "Adviser created",
        message: "The adviser has been added successfully.",
      });
      handleClose();
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Create failed",
        message: "Unable to create the adviser. Please try again.",
      });
    }
  };

  return (
    <Modal opened={opened} onClose={handleClose} title="Add Adviser" centered>
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
          leftSection={<FiUserPlus />}
          onClick={handleCreateAdvisor}
          loading={isLoading}
        >
          Save Adviser
        </Button>
      </Stack>
    </Modal>
  );
}

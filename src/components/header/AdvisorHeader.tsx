import { Group, TextInput, ActionIcon, Avatar, Text, Button } from "@mantine/core";
import { FiSearch, FiBell, FiHelpCircle, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function AdvisorHeader() {
  const navigate = useNavigate();

  return (
    <Group px="md" h="100%" justify="space-between">
      <Group>
        <Avatar radius="md" color="blue">
          U
        </Avatar>
        <Text fw={700}>UNIBEN Advisor</Text>
      </Group>

      <TextInput
        leftSection={<FiSearch />}
        placeholder="Search students, or courses..."
        w={400}
      />

      <Group>
        <ActionIcon variant="subtle">
          <FiBell />
        </ActionIcon>
        <ActionIcon variant="subtle">
          <FiHelpCircle />
        </ActionIcon>
        <Button
          variant="subtle"
          leftSection={<FiLogOut />}
          onClick={() => navigate("/")}
        >
          Logout
        </Button>
      </Group>
    </Group>
  );
}

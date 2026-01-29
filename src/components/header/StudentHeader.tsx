import { Group, ActionIcon, Avatar, Text, Button } from "@mantine/core";
import { FiBell, FiHelpCircle, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function StudentHeader() {
  const navigate = useNavigate();

  return (
    <Group px="md" h="100%" justify="space-between">
      <Group>
        <Avatar radius="md" color="blue">
          U
        </Avatar>
        <Text fw={700}>UNIBEN student</Text>
      </Group>

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

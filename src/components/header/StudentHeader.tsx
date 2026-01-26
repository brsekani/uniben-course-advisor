import { Group, TextInput, ActionIcon, Avatar, Text } from "@mantine/core";
import { FiSearch, FiBell, FiHelpCircle } from "react-icons/fi";

export default function StudentHeader() {
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
      </Group>
    </Group>
  );
}

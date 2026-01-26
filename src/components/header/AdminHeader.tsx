import { Group, TextInput, ActionIcon, Avatar, Text } from "@mantine/core";
import { FiSearch, FiBell, FiHelpCircle } from "react-icons/fi";

export default function AdminHeader() {
  return (
    <Group px="md" h="100%" justify="space-between">
      <Group>
        <Avatar radius="md" color="blue">
          U
        </Avatar>
        <Text fw={700}>UNIBEN Admin</Text>
      </Group>

      <TextInput
        leftSection={<FiSearch />}
        placeholder="Search students, advisers, or courses..."
        w={400}
      />

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

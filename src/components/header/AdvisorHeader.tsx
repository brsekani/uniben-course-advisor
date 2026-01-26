import { Group, TextInput, ActionIcon, Avatar, Text } from "@mantine/core";
import { FiSearch, FiBell, FiHelpCircle } from "react-icons/fi";

export default function AdvisorHeader() {
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
      </Group>
    </Group>
  );
}

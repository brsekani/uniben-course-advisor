import { Paper, Stack, Button, Text } from "@mantine/core";
import { FiUserPlus, FiPlus, FiDownload } from "react-icons/fi";

export default function QuickActions() {
  return (
    <Paper withBorder radius="md" p="lg">
      <Text fw={700} mb="md">
        Quick Actions
      </Text>

      <Stack>
        <Button leftSection={<FiUserPlus />}>Add New User</Button>

        <Button variant="outline" leftSection={<FiPlus />}>
          Create New Course
        </Button>

        <Button variant="default" leftSection={<FiDownload />}>
          Export Reports
        </Button>
      </Stack>
    </Paper>
  );
}

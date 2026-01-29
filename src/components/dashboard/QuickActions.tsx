import { Paper, Stack, Button, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FiPlus, FiDownload } from "react-icons/fi";
import CreateCourseModal from "../courses/CreateCourseModal";

export default function QuickActions() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Paper withBorder radius="md" p="lg">
      <Text fw={700} mb="md">
        Quick Actions
      </Text>

      <Stack>
        <Button variant="outline" leftSection={<FiPlus />} onClick={open}>
          Create New Course
        </Button>

        <Button variant="default" leftSection={<FiDownload />}>
          Export Reports
        </Button>
      </Stack>

      <CreateCourseModal opened={opened} onClose={close} />
    </Paper>
  );
}

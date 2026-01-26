import { Paper, Group, Text, Badge, Stack, Box } from "@mantine/core";
import { FiCalendar, FiInfo } from "react-icons/fi";

export default function SystemStatus() {
  return (
    <Paper withBorder radius="md" p="lg" mb="lg">
      <Group justify="space-between" mb="md">
        <Group>
          <FiInfo />
          <Text fw={700}>System Status</Text>
        </Group>
        <Badge color="green">ONLINE</Badge>
      </Group>

      <Group grow mb="md">
        <Paper withBorder p="md" radius="md">
          <Group>
            <FiCalendar />
            <Box>
              <Text size="xs" c="dimmed">
                CURRENT SESSION
              </Text>
              <Text fw={600}>2023 / 2024</Text>
            </Box>
          </Group>
        </Paper>

        <Paper withBorder p="md" radius="md">
          <Group>
            <FiCalendar />
            <Box>
              <Text size="xs" c="dimmed">
                CURRENT SEMESTER
              </Text>
              <Text fw={600}>First Semester</Text>
            </Box>
          </Group>
        </Paper>
      </Group>

      <Paper bg="blue.0" p="md" radius="md">
        <Group>
          <FiInfo />
          <Text size="sm">
            Course advising window is currently open. Registration ends in 12
            days.
          </Text>
        </Group>
      </Paper>
    </Paper>
  );
}

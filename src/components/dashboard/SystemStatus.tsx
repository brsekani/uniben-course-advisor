import { Paper, Group, Text, Badge, Stack, Box } from "@mantine/core";
import { FiCalendar, FiInfo } from "react-icons/fi";
import { useGetSettingsQuery } from "../../services/settingsApi";

export default function SystemStatus() {
  const { data: settings } = useGetSettingsQuery();
  const currentSession = settings?.currentSession ?? "2023 / 2024";
  const currentSemester = settings?.currentSemester ?? "First Semester";
  const advisingOpen = settings?.advisingWindowOpen ?? true;
  const registrationEndsInDays = settings?.registrationEndsInDays ?? 12;

  return (
    <Paper withBorder radius="md" p="lg" mb="lg">
      <Group justify="space-between" mb="md">
        <Group>
          <FiInfo />
          <Text fw={700}>System Status</Text>
        </Group>
        <Badge color={advisingOpen ? "green" : "gray"}>
          {advisingOpen ? "ONLINE" : "PAUSED"}
        </Badge>
      </Group>

      <Group grow mb="md">
        <Paper withBorder p="md" radius="md">
          <Group>
            <FiCalendar />
            <Box>
              <Text size="xs" c="dimmed">
                CURRENT SESSION
              </Text>
              <Text fw={600}>{currentSession}</Text>
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
              <Text fw={600}>{currentSemester}</Text>
            </Box>
          </Group>
        </Paper>
      </Group>

      <Paper bg="blue.0" p="md" radius="md">
        <Group>
          <FiInfo />
          <Text size="sm">
            {advisingOpen
              ? `Course advising window is currently open. Registration ends in ${registrationEndsInDays} days.`
              : "Course advising window is currently closed."}
          </Text>
        </Group>
      </Paper>
    </Paper>
  );
}

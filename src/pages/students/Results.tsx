import {
  Stack,
  Group,
  Card,
  Title,
  Text,
  Button,
  Progress,
  Badge,
  Divider,
} from "@mantine/core";
import { FiDownload, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const sessions = [
  {
    id: 4,
    year: "2022/2023",
    level: "400 Level",
    gpa: 4.45,
    credits: 38,
  },
  {
    id: 3,
    year: "2021/2022",
    level: "300 Level",
    gpa: 4.12,
    credits: 42,
  },
  {
    id: 2,
    year: "2020/2021",
    level: "200 Level",
    gpa: 4.38,
    credits: 36,
  },
  {
    id: 1,
    year: "2019/2020",
    level: "100 Level",
    gpa: 3.89,
    credits: 28,
  },
];

export default function Results() {
  return (
    <Stack gap="xl">
      {/* Header */}
      <Group justify="space-between">
        <Stack gap={2}>
          <Title order={2}>Academic Results</Title>
          <Text c="dimmed">
            Overview of your performance across all sessions
          </Text>
        </Stack>

        <Button variant="light" leftSection={<FiDownload />} radius="md">
          Download Statement of Results
        </Button>
      </Group>

      {/* Summary */}
      <Group align="stretch" grow>
        {/* CGPA Card */}
        <Card
          radius="xl"
          p="xl"
          style={{
            background: "linear-gradient(135deg, #1c7ed6 0%, #228be6 100%)",
            color: "white",
          }}
        >
          <Stack gap="md">
            <Text size="sm" tt="uppercase" opacity={0.9}>
              Cumulative Performance
            </Text>

            <Title order={1}>
              4.21{" "}
              <Text span size="lg" opacity={0.8}>
                / 5.00 CGPA
              </Text>
            </Title>

            <Group justify="space-between" mt="md">
              <Stack gap={2}>
                <Text size="sm" opacity={0.8}>
                  Total Credits Earned
                </Text>
                <Text fw={600}>144 Units</Text>
              </Stack>

              <Stack gap={2}>
                <Text size="sm" opacity={0.8}>
                  Academic Standing
                </Text>
                <Text fw={600}>Good Standing</Text>
              </Stack>
            </Group>
          </Stack>
        </Card>

        {/* Class Distribution */}
        <Card withBorder radius="xl" p="xl">
          <Stack gap="md">
            <Text fw={600}>Class Distribution</Text>

            <Group justify="space-between">
              <Text>First Class</Text>
              <Text c="dimmed">4.50 – 5.00</Text>
            </Group>

            <Progress value={78} radius="xl" />

            <Text size="sm" c="dimmed">
              You are currently in <b>Second Class Upper</b> division
            </Text>

            <Button variant="subtle" size="sm">
              View Classification Rules
            </Button>
          </Stack>
        </Card>
      </Group>

      {/* Sessions */}
      <Group justify="space-between">
        <Text fw={600}>Academic Sessions</Text>
        <Text size="sm" c="dimmed">
          4 SESSIONS RECORDED
        </Text>
      </Group>

      <Stack gap="md">
        {sessions.map((s) => (
          <Card
            component={Link}
            to={`${s.id}`}
            key={s.id}
            withBorder
            radius="lg"
          >
            <Group justify="space-between" align="center">
              <Group>
                <Badge size="lg" radius="md">
                  {s.id}
                </Badge>

                <Stack gap={2}>
                  <Text fw={600}>{s.year} Academic Session</Text>
                  <Text size="sm" c="dimmed">
                    {s.level} · 2 Semesters Completed
                  </Text>
                </Stack>
              </Group>

              <Group gap="xl">
                <Stack gap={2} align="flex-end">
                  <Text size="xs" c="dimmed">
                    SESSION GPA
                  </Text>
                  <Text fw={700}>{s.gpa}</Text>
                </Stack>

                <Stack gap={2} align="flex-end">
                  <Text size="xs" c="dimmed">
                    CREDITS
                  </Text>
                  <Text fw={700}>{s.credits}</Text>
                </Stack>

                <FiChevronRight />
              </Group>
            </Group>
          </Card>
        ))}
      </Stack>

      <Divider />

      {/* Notice */}
      <Text size="sm" c="dimmed" ta="center">
        <b>NOTICE</b>
        <br />
        These results are for advising purposes only. Official transcripts must
        be requested through the Registrar’s Office.
      </Text>
    </Stack>
  );
}

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
import { useGetResultsQuery } from "../../services/resultsApi";

export default function Results() {
  const { data: results } = useGetResultsQuery();
  const userId = localStorage.getItem("userId");
  const studentResults =
    results?.find((item: any) => String(item.studentId) === String(userId)) ??
    results?.[0];

  const sessions = studentResults?.sessions ?? [];
  const cgpa = Number(studentResults?.cgpa ?? 0);
  const totalCredits = Number(studentResults?.totalCredits ?? 0);
  const standing = studentResults?.standing ?? "Good Standing";
  const classLabel = studentResults?.classLabel ?? "Second Class Upper";
  const classRange = studentResults?.classRange ?? "4.50 – 5.00";
  const classPercent =
    studentResults?.classPercent ?? Math.min(100, Math.round((cgpa / 5) * 100));

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
              {cgpa.toFixed(2)}{" "}
              <Text span size="lg" opacity={0.8}>
                / 5.00 CGPA
              </Text>
            </Title>

            <Group justify="space-between" mt="md">
              <Stack gap={2}>
                <Text size="sm" opacity={0.8}>
                  Total Credits Earned
                </Text>
                <Text fw={600}>{totalCredits} Units</Text>
              </Stack>

              <Stack gap={2}>
                <Text size="sm" opacity={0.8}>
                  Academic Standing
                </Text>
                <Text fw={600}>{standing}</Text>
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
              <Text c="dimmed">{classRange}</Text>
            </Group>

            <Progress value={classPercent} radius="xl" />

            <Text size="sm" c="dimmed">
              You are currently in <b>{classLabel}</b> division
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
          {sessions.length} SESSIONS RECORDED
        </Text>
      </Group>

      <Stack gap="md">
        {sessions.map((s: any) => (
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
                    {s.level} • {s.semestersCompleted} Semesters Completed
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

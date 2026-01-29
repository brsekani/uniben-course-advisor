import {
  Stack,
  Group,
  Card,
  Title,
  Text,
  Button,
  Table,
  Badge,
  Divider,
} from "@mantine/core";
import { FiArrowLeft, FiDownload, FiPrinter } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { useGetResultsQuery } from "../../services/resultsApi";

const gradeColor = (grade: string) => {
  switch (grade) {
    case "A":
      return "green";
    case "B":
      return "blue";
    case "C":
      return "yellow";
    case "D":
      return "orange";
    default:
      return "gray";
  }
};

export default function SemesterResult() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: results } = useGetResultsQuery();

  const userId = localStorage.getItem("userId");
  const studentResults =
    results?.find((item: any) => String(item.studentId) === String(userId)) ??
    results?.[0];

  const session =
    studentResults?.sessions?.find(
      (s: any) => String(s.id) === String(id),
    ) ?? studentResults?.sessions?.[0];

  const semester =
    session?.semesters?.find((sem: any) => sem.name?.includes("First")) ??
    session?.semesters?.[0];

  const courses = semester?.courses ?? [];
  const creditsEarned =
    semester?.credits ??
    courses.reduce((sum: number, c: any) => sum + Number(c.units ?? 0), 0);
  const semesterGpa = semester?.gpa ?? 0;

  return (
    <Stack gap="xl">
      {/* Top actions */}
      <Group justify="space-between">
        <Button
          variant="subtle"
          leftSection={<FiArrowLeft />}
          onClick={() => navigate("/student/results")}
        >
          Back to All Results
        </Button>

        <Group>
          <Button variant="light" leftSection={<FiDownload />}>
            Export as PDF
          </Button>
          <Button variant="light" leftSection={<FiPrinter />}>
            Print
          </Button>
        </Group>
      </Group>

      {/* Semester Card */}
      <Card withBorder radius="lg" p="xl">
        <Stack gap="lg">
          {/* Header */}
          <Group justify="space-between" align="flex-start">
            <Stack gap={4}>
              <Text size="xs" tt="uppercase" c="dimmed">
                Semester Breakdown
              </Text>
              <Title order={3}>{session?.year ?? "Session"}</Title>
              <Text c="dimmed">
                {semester?.name ?? "Semester"} Results
              </Text>
            </Stack>

            <Group gap="xl">
              <Stack gap={2} align="flex-end">
                <Text size="xs" c="dimmed">
                  Credits Earned
                </Text>
                <Text fw={700} size="lg">
                  {creditsEarned.toFixed(1)}
                </Text>
              </Stack>

              <Stack gap={2} align="flex-end">
                <Text size="xs" c="dimmed">
                  Semester GPA
                </Text>
                <Text fw={800} size="lg" c="blue">
                  {Number(semesterGpa).toFixed(2)}
                </Text>
              </Stack>
            </Group>
          </Group>

          <Divider />

          {/* Results Table */}
          <Table verticalSpacing="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Course Code</Table.Th>
                <Table.Th>Course Title</Table.Th>
                <Table.Th>Units</Table.Th>
                <Table.Th>Grade</Table.Th>
                <Table.Th>Grade Point</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {courses.map((c: any) => (
                <Table.Tr key={c.code}>
                  <Table.Td fw={600}>{c.code}</Table.Td>
                  <Table.Td>{c.title}</Table.Td>
                  <Table.Td>{Number(c.units).toFixed(1)}</Table.Td>
                  <Table.Td>
                    <Badge color={gradeColor(c.grade)} variant="light">
                      {c.grade}
                    </Badge>
                  </Table.Td>
                  <Table.Td>{Number(c.point).toFixed(1)}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>

          <Divider />

          {/* GPA Summary */}
          <Group justify="space-between">
            <Text fw={600}>GPA for Semester</Text>
            <Group>
              <Text fw={600}>{creditsEarned.toFixed(1)}</Text>
              <Text fw={800} c="blue" size="lg">
                {Number(semesterGpa).toFixed(2)}
              </Text>
            </Group>
          </Group>
        </Stack>
      </Card>

      {/* Bottom Cards */}
      <Group grow align="stretch">
        {/* Grade Legend */}
        <Card withBorder radius="lg">
          <Stack gap="md">
            <Text fw={600}>Grade Legend</Text>

            <Group gap="md">
              <Badge color="green">A</Badge>
              <Text size="sm">Excellent (5.0)</Text>
            </Group>

            <Group gap="md">
              <Badge color="blue">B</Badge>
              <Text size="sm">Very Good (4.0)</Text>
            </Group>

            <Group gap="md">
              <Badge color="yellow">C</Badge>
              <Text size="sm">Good (3.0)</Text>
            </Group>

            <Group gap="md">
              <Badge color="orange">D</Badge>
              <Text size="sm">Pass (2.0)</Text>
            </Group>
          </Stack>
        </Card>

        {/* Cumulative GPA */}
        <Card withBorder radius="lg">
          <Stack gap="sm">
            <Text fw={600}>Current Cumulative GPA</Text>
            <Title order={2}>
              {Number(studentResults?.cgpa ?? 0).toFixed(2)}{" "}
              <Text span size="lg" c="dimmed">
                / 5.00
              </Text>
            </Title>
          </Stack>
        </Card>
      </Group>
    </Stack>
  );
}

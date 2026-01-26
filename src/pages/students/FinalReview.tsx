import {
  Stack,
  Card,
  Title,
  Text,
  Progress,
  Group,
  Badge,
  Alert,
  Table,
  Checkbox,
  Button,
  Divider,
} from "@mantine/core";
import { FiAlertTriangle } from "react-icons/fi";
import { Link } from "react-router-dom";

const courses = [
  { code: "CSC311", title: "Advanced Algorithms", units: 4, semester: "First" },
  { code: "CSC312", title: "Operating Systems", units: 3, semester: "First" },
  { code: "GST311", title: "Entrepreneurship", units: 2, semester: "First" },
  { code: "MTH311", title: "Linear Algebra II", units: 3, semester: "First" },
  { code: "CSC321", title: "Database Systems", units: 3, semester: "Second" },
  {
    code: "CSC322",
    title: "Software Engineering I",
    units: 3,
    semester: "Second",
  },
];

export default function FinalCourseReview() {
  return (
    <Stack gap="xl">
      {/* Step Indicator */}
      <Card withBorder radius="lg">
        <Stack gap="xs">
          <Group justify="space-between">
            <Text fw={500}>
              Selection / <b style={{ color: "#1c7ed6" }}>Review</b> / Submitted
            </Text>
            <Text fw={600}>66% Complete</Text>
          </Group>

          <Progress value={66} radius="xl" />

          <Text size="sm" c="dimmed">
            STEP 2: VERIFICATION AUDIT
          </Text>
        </Stack>
      </Card>

      {/* Page Header */}
      <Stack gap={4}>
        <Title order={2}>Final Course Review</Title>
        <Text c="dimmed">
          Please audit your selected courses before final submission to your
          faculty adviser.
        </Text>
      </Stack>

      {/* Warning */}
      <Alert
        color="yellow"
        icon={<FiAlertTriangle />}
        radius="md"
        variant="light"
      >
        <b>Lingering Warning:</b> You have not selected an elective for the
        Science category. This is permitted, but ensure you meet the minimum
        total units.
      </Alert>

      {/* Summary Cards */}
      <Group grow>
        <Card withBorder radius="lg">
          <Text c="dimmed" size="sm">
            Total Units Selected
          </Text>
          <Group gap="xs" mt={4}>
            <Title order={3}>18 Units</Title>
            <Badge color="green">OK</Badge>
          </Group>
        </Card>

        <Card withBorder radius="lg">
          <Text c="dimmed" size="sm">
            Allowed Unit Range
          </Text>
          <Title order={3} mt={4}>
            15 – 24 Units
          </Title>
        </Card>
      </Group>

      {/* Courses Table */}
      <Card withBorder radius="lg">
        <Table verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Course Code</Table.Th>
              <Table.Th>Course Title</Table.Th>
              <Table.Th>Units</Table.Th>
              <Table.Th>Semester</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {courses.map((c) => (
              <Table.Tr key={c.code}>
                <Table.Td fw={600}>{c.code}</Table.Td>
                <Table.Td c="blue">{c.title}</Table.Td>
                <Table.Td>
                  <Badge variant="light">{c.units}</Badge>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color="blue">
                    {c.semester}
                  </Badge>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>

      {/* Confirmation */}
      <Card withBorder radius="lg" p="xl">
        <Stack gap="md">
          <Checkbox
            label="I certify these courses are correct"
            description="By checking this box, I acknowledge that these are my final course selections for the current academic session. Any further changes will require departmental approval."
          />

          <Divider />

          <Group justify="center">
            <Button size="md" radius="md">
              Submit to Adviser
            </Button>

            <Button
              component={Link}
              to="/student/advising"
              size="md"
              variant="light"
            >
              Go Back to Edit
            </Button>
          </Group>

          <Text size="xs" c="dimmed" ta="center">
            Submission will lock this selection until reviewed by your faculty
            adviser.
          </Text>
        </Stack>
      </Card>
    </Stack>
  );
}

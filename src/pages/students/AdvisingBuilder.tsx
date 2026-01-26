import {
  Stack,
  Group,
  Card,
  Title,
  Text,
  Button,
  Badge,
  Progress,
  TextInput,
  Select,
  Divider,
  ScrollArea,
} from "@mantine/core";
import {
  FiSearch,
  FiPlus,
  FiTrash2,
  FiRefreshCw,
  FiAlertTriangle,
} from "react-icons/fi";
import { Link } from "react-router-dom";

export default function AdvisingBuilder() {
  return (
    <Stack gap="xl">
      {/* Page Header */}
      <Group justify="space-between" align="flex-start">
        <Stack gap={4}>
          <Title order={2}>Advising Selection Builder</Title>
          <Text c="dimmed">Academic Session: 2023/2024 · First Semester</Text>
        </Stack>

        <Group>
          <Button variant="light">View Guidelines</Button>
          <Button component={Link} to={"review"}>
            Submit Selection
          </Button>
        </Group>
      </Group>

      <Group align="flex-start" grow>
        <AvailableCourses />
        <CurrentSelection />
      </Group>
    </Stack>
  );
}

function AvailableCourses() {
  return (
    <Card withBorder radius="lg" p="lg" style={{ flex: 2 }}>
      <Stack gap="md">
        <Group justify="space-between">
          <Title order={4}>Available Courses</Title>
          <Badge variant="light">32 Courses Found</Badge>
        </Group>

        <TextInput
          placeholder="Search by course code or title (e.g. CSC301)"
          leftSection={<FiSearch />}
        />

        <Group grow>
          <Select data={["300 Level", "400 Level"]} defaultValue="300 Level" />
          <Select
            data={["Core Courses", "Electives"]}
            defaultValue="Core Courses"
          />
          <Select
            data={["Semester 1", "Semester 2"]}
            defaultValue="Semester 1"
          />
        </Group>

        <Divider />

        <ScrollArea h={420}>
          <Stack gap="sm">
            <CourseItem
              code="CSC301"
              title="Systems Programming"
              units={3}
              prereq="CSC201"
            />

            <CourseItem
              code="CSC303"
              title="Database Management"
              units={4}
              prereq="CSC202"
              added
            />

            <CourseItem
              code="GST311"
              title="Entrepreneurship"
              units={2}
              prereq="None"
            />

            <CourseItem
              code="CSC401"
              title="Artificial Intelligence"
              units={3}
              prereq="None"
              restricted
            />
          </Stack>
        </ScrollArea>
      </Stack>
    </Card>
  );
}

function CurrentSelection() {
  return (
    <Stack gap="md" style={{ flex: 1 }}>
      <Card withBorder radius="lg" p="lg">
        <Stack gap="sm">
          <Group justify="space-between">
            <Title order={4}>Current Selection</Title>
            <Button size="xs" variant="subtle" leftSection={<FiRefreshCw />}>
              Reset Builder
            </Button>
          </Group>

          <Text fw={700} size="lg">
            18 / 24 Units
          </Text>

          <Progress value={75} radius="xl" />

          <Button variant="light">✨ Generate AI Recommendations</Button>

          <Divider />

          <SelectedCourse title="CSC303: Database Management" units={4} />
          <SelectedCourse title="CSC305: Operating Systems" units={4} />
          <SelectedCourse title="CSC307: Software Engineering" units={3} />
          <SelectedCourse
            title="CSC309: Algorithms & Data Structures II"
            units={4}
          />
        </Stack>
      </Card>

      <ValidationConsole />
    </Stack>
  );
}

function SelectedCourse({ title, units }: { title: string; units: number }) {
  return (
    <Group justify="space-between">
      <Text>
        <b>{units}</b> · {title}
      </Text>
      <FiTrash2 />
    </Group>
  );
}

function ValidationConsole() {
  return (
    <Card radius="lg" p="lg" style={{ background: "#0f172a", color: "#fff" }}>
      <Stack gap="sm">
        <Group justify="space-between">
          <Text fw={700}>Validation Console</Text>
          <Badge color="red">2 Errors</Badge>
        </Group>

        <Divider />

        <Text c="red">
          ❌ <b>Rule R1:</b> Course Prerequisite Conflict
          <br />
          CSC311 requires completion of CSC211.
        </Text>

        <Text c="yellow">
          ⚠️ <b>Rule R5:</b> Unit Balance Warning
          <br />
          Minimum full-time units is 15.
        </Text>
      </Stack>
    </Card>
  );
}

function CourseItem({
  code,
  title,
  units,
  prereq,
  added,
  restricted,
}: {
  code: string;
  title: string;
  units: number;
  prereq: string;
  added?: boolean;
  restricted?: boolean;
}) {
  return (
    <Card withBorder radius="md" p="md">
      <Group justify="space-between" align="center">
        <Group>
          <Badge size="lg">{units}</Badge>

          <Stack gap={2}>
            <Text fw={600}>
              {code}: {title}
            </Text>
            <Text size="xs" c="dimmed">
              Prereq: {prereq}
            </Text>
          </Stack>
        </Group>

        {restricted ? (
          <Badge color="red" variant="light">
            Locked
          </Badge>
        ) : added ? (
          <Badge color="blue">Added</Badge>
        ) : (
          <Button size="xs" leftSection={<FiPlus />}>
            Add
          </Button>
        )}
      </Group>
    </Card>
  );
}

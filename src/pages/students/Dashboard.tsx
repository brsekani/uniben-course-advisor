// src/pages/student/Dashboard.tsx
import {
  Stack,
  Group,
  Card,
  Title,
  Text,
  Avatar,
  Button,
  Progress,
  Divider,
  Badge,
  SimpleGrid,
} from "@mantine/core";
import {
  FiArrowRight,
  FiBookOpen,
  FiClock,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useGetStudentsQuery } from "../../services/studentApi";

const submissionStatus = {
  status: "not_started", // not_started | in_review | approved
  progress: 0,
};

export default function StudentDashboard() {
  const { data, isLoading, error } = useGetStudentsQuery();
  console.log(data);

  if (isLoading) return <Text>Loading dashboard...</Text>;
  if (error) return <Text>Error loading student data</Text>;

  const student = data?.[0];

  return (
    <Stack gap="xl">
      {/* Welcome Card */}
      <Card withBorder radius="lg" p="lg">
        <Group>
          <Avatar
            size={90}
            radius="xl"
            src="https://i.pravatar.cc/150?img=12"
          />

          <Stack gap={4}>
            <Title order={3}>Welcome back, {student.name}</Title>

            <Group gap="xs">
              <Badge variant="light">{student.matric}</Badge>
              <Text c="dimmed">Computer Science · {student.level}</Text>
            </Group>
          </Stack>
        </Group>
      </Card>

      {/* Quick Stats */}
      <SimpleGrid cols={3} spacing="md">
        <Card withBorder radius="lg">
          <Text c="dimmed" size="sm">
            Registered Units
          </Text>
          <Title order={3}>0</Title>
        </Card>

        <Card withBorder radius="lg">
          <Text c="dimmed" size="sm">
            Required Units
          </Text>
          <Title order={3}>24</Title>
        </Card>

        <Card withBorder radius="lg">
          <Text c="dimmed" size="sm">
            Adviser Status
          </Text>
          <Badge color="orange" variant="light">
            Awaiting Submission
          </Badge>
        </Card>
      </SimpleGrid>

      <Group align="flex-start" grow>
        {/* Main Action Card */}
        <Card withBorder radius="lg" p="xl" style={{ flex: 2 }}>
          <Stack align="center" gap="md">
            <Avatar size={56} radius="xl" color="blue">
              <FiBookOpen />
            </Avatar>

            <Text c="dimmed" ta="center" maw={420}>
              {submissionStatus.status === "not_started"
                ? "You have not started your course advising for this semester."
                : "Your submission is currently being reviewed by your adviser."}
            </Text>

            <Button
              component={Link}
              to={
                submissionStatus.status === "not_started"
                  ? "/student/advising"
                  : `/student/advising/${submissionStatus.id}`
              }
              size="md"
              radius="md"
              rightSection={<FiArrowRight />}
            >
              {submissionStatus.status === "not_started"
                ? "Start Course Advising"
                : "Continue Submission"}
            </Button>
          </Stack>
        </Card>

        {/* Right Column */}
        <Stack gap="md" style={{ flex: 1 }}>
          {/* Current Standing */}
          <Card withBorder radius="lg">
            <Title order={5} mb="md">
              Current Standing
            </Title>

            <Stack gap="sm">
              <Group justify="space-between">
                <Text c="dimmed">Academic Level</Text>
                <Text fw={600}>400 Level (Finalist)</Text>
              </Group>

              <Group justify="space-between">
                <Text c="dimmed">Program</Text>
                <Text fw={600}>B.Sc Computer Science</Text>
              </Group>

              <Group justify="space-between">
                <Text c="dimmed">CGPA</Text>
                <Text fw={700}>{student.cgpa} / 5.00</Text>
              </Group>
            </Stack>
          </Card>

          {/* Important Update */}
          <Card withBorder radius="lg">
            <Group gap="xs" mb="sm">
              <FiAlertCircle />
              <Title order={6}>Important Notice</Title>
            </Group>

            <Text size="sm">
              Course advising closes in <b>3 days</b>. Late submissions may not
              be approved.
            </Text>

            <Group gap="xs" mt="sm">
              <FiClock size={14} />
              <Text size="sm" c="dimmed">
                Deadline: March 15, 2026
              </Text>
            </Group>
          </Card>
        </Stack>
      </Group>

      {/* Submission Status */}
      <Card withBorder radius="lg">
        <Stack gap="sm">
          <Group justify="space-between">
            <Title order={5}>Submission Progress</Title>
            <Badge
              color={
                submissionStatus.status === "approved"
                  ? "green"
                  : submissionStatus.status === "in_review"
                    ? "blue"
                    : "gray"
              }
            >
              {submissionStatus.status.replace("_", " ")}
            </Badge>
          </Group>

          <Progress value={submissionStatus.progress} radius="xl" />

          <Group justify="space-between" mt="sm">
            <Badge
              color="blue"
              variant={submissionStatus.progress >= 0 ? "filled" : "light"}
            >
              Preparation
            </Badge>
            <Badge
              color="blue"
              variant={submissionStatus.progress >= 50 ? "filled" : "light"}
            >
              Review
            </Badge>
            <Badge
              color="green"
              variant={submissionStatus.progress === 100 ? "filled" : "light"}
            >
              Approval
            </Badge>
          </Group>
        </Stack>
      </Card>
    </Stack>
  );
}

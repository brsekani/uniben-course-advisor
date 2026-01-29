import {
  Stack,
  Group,
  Card,
  Title,
  Text,
  Avatar,
  Button,
  Progress,
  Badge,
  SimpleGrid,
} from "@mantine/core";
import { FiArrowRight, FiBookOpen, FiClock, FiAlertCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useGetStudentsQuery } from "../../services/studentApi";
import { useGetSubmissionsQuery } from "../../services/submissionApi";
import { useGetSettingsQuery } from "../../services/settingsApi";

export default function StudentDashboard() {
  const { data: students, isLoading, error } = useGetStudentsQuery();
  const { data: submissions } = useGetSubmissionsQuery();
  const { data: settings } = useGetSettingsQuery();

  if (isLoading) return <Text>Loading dashboard...</Text>;
  if (error) return <Text>Error loading student data</Text>;

  const userId = localStorage.getItem("userId");
  const student =
    students?.find((item: any) => String(item.id) === String(userId)) ??
    students?.[0];
  const submission =
    submissions?.find(
      (item: any) => String(item.studentId) === String(student?.id),
    ) ?? submissions?.[0];

  const status = submission?.status ?? "not_started";
  const statusProgress =
    status === "approved" ? 100 : status === "in_review" ? 60 : 0;
  const statusLabel =
    status === "approved"
      ? "Approved"
      : status === "in_review"
        ? "In Review"
        : "Not Started";
  const advisorStatusLabel =
    status === "approved"
      ? "Approved"
      : status === "in_review"
        ? "Awaiting Adviser"
        : "Awaiting Submission";

  const registeredUnits = submission?.units ?? 0;
  const requiredUnits = settings?.maxUnitsPerSemester ?? 24;
  const deadlineDays = settings?.registrationEndsInDays ?? 3;
  const deadlineDate = settings?.advisingDeadline ?? "March 15, 2026";
  const advisingOpen = settings?.advisingWindowOpen ?? true;

  const initials = String(student?.name ?? "Student")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  const actionLink =
    status === "approved" ? "/student/results" : "/student/advising/review";

  return (
    <Stack gap="xl">
      {/* Welcome Card */}
      <Card withBorder radius="lg" p="lg">
        <Group>
          <Avatar size={90} radius="xl">
            {initials}
          </Avatar>

          <Stack gap={4}>
            <Title order={3}>Welcome back, {student?.name ?? "Student"}</Title>

            <Group gap="xs">
              <Badge variant="light">{student?.matric ?? "N/A"}</Badge>
              <Text c="dimmed">
                {student?.department ?? "Department"} ·{" "}
                {student?.level ?? "Level"}
              </Text>
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
          <Title order={3}>{registeredUnits}</Title>
        </Card>

        <Card withBorder radius="lg">
          <Text c="dimmed" size="sm">
            Required Units
          </Text>
          <Title order={3}>{requiredUnits}</Title>
        </Card>

        <Card withBorder radius="lg">
          <Text c="dimmed" size="sm">
            Adviser Status
          </Text>
          <Badge color="orange" variant="light">
            {advisorStatusLabel}
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
              {status === "not_started"
                ? "You have not started your course advising for this semester."
                : status === "in_review"
                  ? "Your submission is currently being reviewed by your adviser."
                  : "Your submission has been approved."}
            </Text>

            <Button
              component={Link}
              to={actionLink}
              size="md"
              radius="md"
              rightSection={<FiArrowRight />}
            >
              {status === "not_started"
                ? "Start Course Advising"
                : status === "in_review"
                  ? "View Submission"
                  : "View Results"}
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
                <Text fw={600}>{student?.level ?? "Level"}</Text>
              </Group>

              <Group justify="space-between">
                <Text c="dimmed">Program</Text>
                <Text fw={600}>{student?.program ?? "Program"}</Text>
              </Group>

              <Group justify="space-between">
                <Text c="dimmed">CGPA</Text>
                <Text fw={700}>{student?.cgpa ?? 0} / 5.00</Text>
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
              {advisingOpen
                ? `Course advising closes in ${deadlineDays} days. Late submissions may not be approved.`
                : "Course advising is currently closed."}
            </Text>

            <Group gap="xs" mt="sm">
              <FiClock size={14} />
              <Text size="sm" c="dimmed">
                Deadline: {deadlineDate}
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
                status === "approved"
                  ? "green"
                  : status === "in_review"
                    ? "blue"
                    : "gray"
              }
            >
              {statusLabel}
            </Badge>
          </Group>

          <Progress value={statusProgress} radius="xl" />

          <Group justify="space-between" mt="sm">
            <Badge
              color="blue"
              variant={statusProgress >= 0 ? "filled" : "light"}
            >
              Preparation
            </Badge>
            <Badge
              color="blue"
              variant={statusProgress >= 50 ? "filled" : "light"}
            >
              Review
            </Badge>
            <Badge
              color="green"
              variant={statusProgress === 100 ? "filled" : "light"}
            >
              Approval
            </Badge>
          </Group>
        </Stack>
      </Card>
    </Stack>
  );
}

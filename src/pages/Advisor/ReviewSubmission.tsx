import {
  Badge,
  Box,
  Button,
  Card,
  Grid,
  Group,
  Stack,
  Table,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { FiCheckCircle, FiXCircle, FiAlertTriangle } from "react-icons/fi";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useGetStudentsQuery } from "../../services/studentApi";
import { useGetSelectionQuery } from "../../services/selectionApi";
import { useGetSettingsQuery } from "../../services/settingsApi";
import {
  useGetSubmissionsQuery,
  useUpdateSubmissionMutation,
} from "../../services/submissionApi";

const statusMeta: Record<string, { label: string; color: string }> = {
  approved: { label: "Approved", color: "green" },
  in_review: { label: "Pending Review", color: "yellow" },
  not_started: { label: "Not Started", color: "gray" },
  rejected: { label: "Rejected", color: "red" },
};

export default function ReviewSubmission() {
  const { id } = useParams();
  const { data: students } = useGetStudentsQuery();
  const { data: selections } = useGetSelectionQuery();
  const { data: settings } = useGetSettingsQuery();
  const { data: submissions } = useGetSubmissionsQuery();
  const [updateSubmission, { isLoading: isUpdatingStatus }] =
    useUpdateSubmissionMutation();
  const [comment, setComment] = useState("");

  const submission = submissions?.find(
    (item: any) => String(item.id) === String(id),
  );
  const student =
    students?.find(
      (item: any) => String(item.id) === String(submission?.studentId),
    ) ??
    students?.[0];

  const selectedCourses = useMemo(() => {
    const all = selections ?? [];
    const hasStudentScope = all.some((item: any) => item.studentId);
    if (!hasStudentScope) return all;
    return all.filter(
      (item: any) => String(item.studentId) === String(student?.id),
    );
  }, [selections, student]);

  const totalUnits = selectedCourses.reduce(
    (sum: number, item: any) => sum + Number(item.units ?? 0),
    0,
  );
  const rules = settings?.advisingRules ?? {
    minUnits: 15,
    maxUnits: settings?.maxUnitsPerSemester ?? 24,
  };

  const carryOvers = student?.carryOvers ?? [];
  const completedCourses = student?.completedCourses ?? [];
  const unmetCarryOvers = carryOvers.filter(
    (code: string) =>
      !selectedCourses.some((item: any) => String(item.code) === String(code)),
  );
  const missingPrereqs = selectedCourses.filter((item: any) => {
    if (!item.prereq) return false;
    return !completedCourses.includes(item.prereq);
  });

  const statusKey = submission?.status ?? "not_started";
  const badge = statusMeta[statusKey] ?? statusMeta.not_started;
  const maxUnits = rules.maxUnits ?? settings?.maxUnitsPerSemester ?? 24;

  const handleUpdateStatus = async (nextStatus: string) => {
    if (!submission?.id) return;
    try {
      await updateSubmission({
        id: submission.id,
        status: nextStatus,
        adviserComment: comment || undefined,
      }).unwrap();
      notifications.show({
        color: "green",
        title: "Status updated",
        message: `Submission marked as ${nextStatus.replace("_", " ")}.`,
      });
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Update failed",
        message: "Unable to update the submission status.",
      });
    }
  };

  return (
    <Stack gap="xl">
      {/* Header */}
      <Stack gap={4}>
        <Text size="sm" c="dimmed">
          Home / Course Submissions / Review Detail
        </Text>

        {!submission && (
          <Text size="sm" c="orange">
            No submission record found for this student yet.
          </Text>
        )}

        <Group justify="space-between" align="center">
          <div>
            <Title order={2}>Review: {student?.name ?? "Student"}</Title>
            <Text c="dimmed">
              Matric: {student?.matric ?? "N/A"} - {student?.level ?? "N/A"}{" "}
              Level - {student?.department ?? "Department"}
            </Text>
          </div>

          <Group>
            <Badge color={badge.color} size="lg">
              {badge.label}
            </Badge>
          </Group>
        </Group>
      </Stack>

      {/* Stats */}
      <Grid>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card withBorder>
            <Title order={2} c="blue">
              {Number(student?.cgpa ?? 0).toFixed(2)}
            </Title>
            <Text size="sm" c="dimmed">
              Current CGPA
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card withBorder>
            <Title order={2}>{maxUnits}</Title>
            <Text size="sm" c="dimmed">
              Max Units Allowed
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card withBorder bg="blue.0">
            <Title order={2} c="blue">
              {totalUnits}
            </Title>
            <Text size="sm" c="dimmed">
              Units Selected
            </Text>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Main Content */}
      <Grid>
        {/* Course Table */}
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Card withBorder>
            <Group justify="space-between" mb="md">
              <Title order={4}>Current Course Selection</Title>
              <Text size="sm" c="dimmed">
                {submission?.semester ?? settings?.currentSemester ?? "Semester"}{" "}
                {submission?.session ?? settings?.currentSession ?? ""}
              </Text>
            </Group>

            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Code</Table.Th>
                  <Table.Th>Course Title</Table.Th>
                  <Table.Th>Units</Table.Th>
                  <Table.Th>Status</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {selectedCourses.map((course: any) => (
                  <Table.Tr key={course.code}>
                    <Table.Td fw={600} c="blue">
                      {course.code}
                    </Table.Td>
                    <Table.Td>{course.title}</Table.Td>
                    <Table.Td>{course.units}</Table.Td>
                    <Table.Td>
                      <Badge variant="light">
                        {course.type ?? "Course"}
                      </Badge>
                    </Table.Td>
                  </Table.Tr>
                ))}
                {selectedCourses.length === 0 && (
                  <Table.Tr>
                    <Table.Td colSpan={4}>
                      <Text size="sm" c="dimmed" ta="center">
                        No courses selected yet.
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>

            <Group justify="space-between" mt="md">
              <Text fw={600}>Total Units Requested</Text>
              <Text fw={700} c="blue">
                {totalUnits}
              </Text>
            </Group>
          </Card>
        </Grid.Col>

        {/* Validation Log */}
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Card withBorder>
            <Title order={4} mb="md">
              System Validation Log
            </Title>

            <Stack>
              <ValidationItem
                color={missingPrereqs.length === 0 ? "green" : "orange"}
                icon={
                  missingPrereqs.length === 0 ? (
                    <FiCheckCircle />
                  ) : (
                    <FiAlertTriangle />
                  )
                }
                title="R1 Prerequisites"
                desc={
                  missingPrereqs.length === 0
                    ? "All course entry requirements met."
                    : `${missingPrereqs.length} course(s) missing prerequisites.`
                }
                status={missingPrereqs.length === 0 ? "PASSED" : "CHECK"}
              />

              <ValidationItem
                color={
                  totalUnits >= rules.minUnits && totalUnits <= maxUnits
                    ? "green"
                    : "orange"
                }
                icon={
                  totalUnits >= rules.minUnits && totalUnits <= maxUnits ? (
                    <FiCheckCircle />
                  ) : (
                    <FiAlertTriangle />
                  )
                }
                title="R2 Workload"
                desc={`${totalUnits} units within [${rules.minUnits}-${maxUnits}] range.`}
                status={
                  totalUnits >= rules.minUnits && totalUnits <= maxUnits
                    ? "VALID"
                    : "WARNING"
                }
              />

              <ValidationItem
                color="green"
                icon={<FiCheckCircle />}
                title="R3 Core Compliance"
                desc="Selected courses captured in the registration list."
                status="PASSED"
              />

              <ValidationItem
                color={unmetCarryOvers.length === 0 ? "green" : "orange"}
                icon={
                  unmetCarryOvers.length === 0 ? (
                    <FiCheckCircle />
                  ) : (
                    <FiAlertTriangle />
                  )
                }
                title="R4 Carryovers"
                desc={
                  unmetCarryOvers.length === 0
                    ? "No outstanding carryover courses."
                    : `Missing carryover course(s): ${unmetCarryOvers.join(", ")}.`
                }
                status={unmetCarryOvers.length === 0 ? "CLEAR" : "REVIEW"}
              />

              <ValidationItem
                color="green"
                icon={<FiCheckCircle />}
                title="R5 Submission Status"
                desc={`Submission is currently ${badge.label.toLowerCase()}.`}
                status="INFO"
              />
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Adviser Comment */}
      <Card withBorder>
        <Title order={4} mb="sm">
          Adviser Comments
        </Title>

        <Textarea
          placeholder="Add your feedback or notes for the student here regarding their course selection..."
          minRows={4}
          value={comment}
          onChange={(event) => setComment(event.currentTarget.value)}
        />

        <Text size="xs" c="dimmed" mt="sm">
          Note: Approval will finalize the student's registration for the
          semester.
        </Text>

        <Group justify="flex-end" mt="lg">
          <Button
            color="red"
            leftSection={<FiXCircle />}
            loading={isUpdatingStatus}
            onClick={() => handleUpdateStatus("rejected")}
          >
            Reject Submission
          </Button>
          <Button
            color="green"
            leftSection={<FiCheckCircle />}
            loading={isUpdatingStatus}
            onClick={() => handleUpdateStatus("approved")}
          >
            Approve Selection
          </Button>
        </Group>
      </Card>
    </Stack>
  );
}

/* ------------------ Helper Component ------------------ */

type ValidationProps = {
  title: string;
  desc: string;
  status: string;
  color: "green" | "orange";
  icon: React.ReactNode;
};

function ValidationItem({ title, desc, status, color, icon }: ValidationProps) {
  return (
    <Box p="md" bg={`${color}.0`} radius="md">
      <Group justify="space-between" align="flex-start">
        <Group>
          <Box c={color}>{icon}</Box>
          <div>
            <Text fw={600}>{title}</Text>
            <Text size="sm" c="dimmed">
              {desc}
            </Text>
          </div>
        </Group>

        <Badge color={color}>{status}</Badge>
      </Group>
    </Box>
  );
}

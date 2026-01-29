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
  List,
  Grid,
  Select,
  ActionIcon,
} from "@mantine/core";
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useMemo, useState } from "react";
import { useGetSelectionQuery } from "../../services/selectionApi";
import { useGetCoursesQuery } from "../../services/courseApi";
import { useGetStudentsQuery } from "../../services/studentApi";
import { useGetSettingsQuery } from "../../services/settingsApi";
import {
  useAddSubmissionMutation,
  useGetSubmissionsQuery,
  useUpdateSubmissionMutation,
} from "../../services/submissionApi";
import {
  useAddCourseMutation,
  useRemoveCourseMutation,
} from "../../services/selectionApi";

type RuleWarning = {
  type: "warning" | "error" | "success" | "info";
  title: string;
  message: string;
};

export default function FinalCourseReview() {
  const navigate = useNavigate();
  const { data: selections } = useGetSelectionQuery();
  const { data: courses } = useGetCoursesQuery();
  const { data: students } = useGetStudentsQuery();
  const { data: settings } = useGetSettingsQuery();
  const { data: submissions } = useGetSubmissionsQuery();
  const [addSubmission, { isLoading: isSubmittingNew }] =
    useAddSubmissionMutation();
  const [updateSubmission, { isLoading: isUpdatingSubmission }] =
    useUpdateSubmissionMutation();
  const [addCourse] = useAddCourseMutation();
  const [removeCourse, { isLoading: isRemovingCourse }] =
    useRemoveCourseMutation();
  const [confirmed, setConfirmed] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const userId = localStorage.getItem("userId");
  const student =
    students?.find((item: any) => String(item.id) === String(userId)) ??
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
    minElectives: 1,
  };

  const electiveCount = selectedCourses.filter(
    (item: any) => String(item.type) === "elective",
  ).length;

  const carryOvers = student?.carryOvers ?? [];
  const completedCourses = student?.completedCourses ?? [];

  const unmetCarryOvers = carryOvers.filter(
    (code: string) =>
      !selectedCourses.some((item: any) => String(item.code) === String(code)),
  );

  const restrictedBlocked = selectedCourses.filter(
    (item: any) =>
      item.restricted &&
      Number(student?.cgpa ?? 0) < Number(settings?.restrictedMinCgpa ?? 0),
  );

  const missingPrereqs = selectedCourses.filter((item: any) => {
    if (!item.prereq) return false;
    return !completedCourses.includes(item.prereq);
  });

  const warnings: RuleWarning[] = [];

  if (totalUnits < rules.minUnits) {
    warnings.push({
      type: "warning",
      title: "Low unit load",
      message: `You have selected ${totalUnits} units. Minimum allowed is ${rules.minUnits} units.`,
    });
  }

  if (totalUnits > rules.maxUnits) {
    warnings.push({
      type: "error",
      title: "Exceeded unit limit",
      message: `You have selected ${totalUnits} units. Maximum allowed is ${rules.maxUnits} units.`,
    });
  }

  if (electiveCount < rules.minElectives) {
    warnings.push({
      type: "warning",
      title: "Elective requirement",
      message: `You need at least ${rules.minElectives} elective(s) this session.`,
    });
  }

  if (unmetCarryOvers.length > 0) {
    warnings.push({
      type: "warning",
      title: "Carry over courses",
      message: `You still have carry over course(s) not added: ${unmetCarryOvers.join(", ")}.`,
    });
  }

  if (restrictedBlocked.length > 0) {
    warnings.push({
      type: "error",
      title: "Restricted courses",
      message: `Your CGPA does not meet the requirement for: ${restrictedBlocked
        .map((c: any) => c.code)
        .join(", ")}.`,
    });
  }

  if (missingPrereqs.length > 0) {
    warnings.push({
      type: "error",
      title: "Missing prerequisites",
      message: `Prerequisites not satisfied for: ${missingPrereqs
        .map((c: any) => c.code)
        .join(", ")}.`,
    });
  }

  const isRuleValid =
    warnings.filter((w) => w.type === "error").length === 0 &&
    totalUnits >= rules.minUnits &&
    totalUnits <= rules.maxUnits &&
    electiveCount >= rules.minElectives &&
    unmetCarryOvers.length === 0;

  const suggestedCourses = (courses ?? []).filter((course: any) => {
    const levelMatch =
      String(course.level) === String(student?.level ?? "").match(/\d+/)?.[0];
    const alreadySelected = selectedCourses.some(
      (item: any) => String(item.code) === String(course.code),
    );
    const meetsCgpa =
      !course.restricted ||
      Number(student?.cgpa ?? 0) >= Number(settings?.restrictedMinCgpa ?? 0);
    return levelMatch && !alreadySelected && meetsCgpa;
  });

  const submission = submissions?.find(
    (item: any) => String(item.studentId) === String(student?.id),
  );

  const selectedCodes = new Set(
    selectedCourses.map((item: any) => String(item.code)),
  );
  const allCourseOptions = (courses ?? [])
    .filter((course: any) => !selectedCodes.has(String(course.code)))
    .map((course: any) => ({
      value: String(course.id ?? course.code),
      label: `${course.code} - ${course.title}`,
    }));

  const handleAddCourse = async () => {
    if (!selectedCourseId) {
      notifications.show({
        color: "red",
        title: "Select a course",
        message: "Please choose a course to add.",
      });
      return;
    }
    const course = (courses ?? []).find(
      (item: any) => String(item.id ?? item.code) === selectedCourseId,
    );
    if (!course) return;

    const alreadyAdded = selectedCourses.some(
      (item: any) => String(item.code) === String(course.code),
    );
    if (alreadyAdded) {
      notifications.show({
        color: "red",
        title: "Already added",
        message: "This course is already in your list.",
      });
      return;
    }

    const totalUnitsAfter = totalUnits + Number(course.units ?? 0);
    if (totalUnitsAfter > rules.maxUnits) {
      notifications.show({
        color: "red",
        title: "Unit limit exceeded",
        message: `Maximum allowed units is ${rules.maxUnits}.`,
      });
      return;
    }

    if (course.prereq && !completedCourses.includes(course.prereq)) {
      notifications.show({
        color: "red",
        title: "Missing prerequisite",
        message: `${course.code} requires ${course.prereq}.`,
      });
      return;
    }

    if (
      course.restricted &&
      Number(student?.cgpa ?? 0) < Number(settings?.restrictedMinCgpa ?? 0)
    ) {
      notifications.show({
        color: "red",
        title: "Restricted course",
        message: "Your CGPA does not meet the requirement for this course.",
      });
      return;
    }

    const { id: _id, ...payload } = course;
    await addCourse({
      ...payload,
      studentId: String(student?.id),
    }).unwrap();
    setSelectedCourseId(null);
  };

  const handleSubmit = async () => {
    if (!confirmed) {
      notifications.show({
        color: "red",
        title: "Confirmation required",
        message: "Please confirm your selections before submitting.",
      });
      return;
    }
    if (warnings.some((w) => w.type === "error")) {
      notifications.show({
        color: "red",
        title: "Resolve errors",
        message: "Please fix the highlighted issues before submitting.",
      });
      return;
    }
    if (!isRuleValid) {
      notifications.show({
        color: "red",
        title: "Requirements not met",
        message: "Please satisfy all rules before submitting.",
      });
      return;
    }

    try {
      const payload = {
        studentId: String(student?.id),
        session: settings?.currentSession ?? "2023/2024",
        semester: settings?.currentSemester ?? "First",
        status: "in_review",
        units: totalUnits,
        submittedAt: new Date().toISOString(),
      };

      if (submission?.id) {
        await updateSubmission({ id: submission.id, ...payload }).unwrap();
      } else {
        await addSubmission(payload).unwrap();
      }

      notifications.show({
        color: "green",
        title: "Submitted",
        message: "Your course selection has been sent to your adviser.",
      });
      navigate("/student");
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Submission failed",
        message: "Unable to submit your courses. Please try again.",
      });
    }
  };

  const progressValue = warnings.some((w) => w.type === "error") ? 40 : 66;

  return (
    <Stack gap="xl">
      {/* Step Indicator */}
      <Card withBorder radius="lg">
        <Stack gap="xs">
          <Group justify="space-between">
            <Text fw={500}>
              Selection / <b style={{ color: "#1c7ed6" }}>Review</b> / Submitted
            </Text>
            <Text fw={600}>{progressValue}% Complete</Text>
          </Group>

          <Progress value={progressValue} radius="xl" />

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

      <Grid gutter="lg" align="flex-start">
        <Grid.Col span={{ base: 12, md: 8 }}>
          {/* Summary Cards */}
          <Group grow>
            <Card withBorder radius="lg">
              <Text c="dimmed" size="sm">
                Total Units Selected
              </Text>
              <Group gap="xs" mt={4}>
                <Title order={3}>{totalUnits} Units</Title>
                <Badge color={totalUnits < rules.minUnits ? "yellow" : "green"}>
                  {totalUnits < rules.minUnits ? "LOW" : "OK"}
                </Badge>
              </Group>
            </Card>

            <Card withBorder radius="lg">
              <Text c="dimmed" size="sm">
                Allowed Unit Range
              </Text>
              <Title order={3} mt={4}>
                {rules.minUnits} - {rules.maxUnits} Units
              </Title>
            </Card>
          </Group>

          {/* Search + Add */}
          <Card withBorder radius="lg" mt="lg" p="md">
            <Group align="flex-end">
              <Select
                searchable
                clearable
                label="Search courses"
                placeholder="Type course code or title..."
                data={allCourseOptions}
                value={selectedCourseId}
                onChange={setSelectedCourseId}
                style={{ flex: 1 }}
              />
              <Button leftSection={<FiPlus />} onClick={handleAddCourse}>
                Add
              </Button>
            </Group>
          </Card>

          {/* Courses Table */}
          <Card withBorder radius="lg" mt="lg">
            <Table verticalSpacing="md">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Course Code</Table.Th>
                  <Table.Th>Course Title</Table.Th>
                  <Table.Th>Units</Table.Th>
                  <Table.Th>Semester</Table.Th>
                  <Table.Th ta="right">Action</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {selectedCourses.map((c: any) => (
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
                    <Table.Td ta="right">
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        loading={isRemovingCourse}
                        onClick={async () => {
                          await removeCourse(c.id).unwrap();
                        }}
                      >
                        <FiTrash2 />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          {/* Rule-based Warnings */}
          <Stack gap="md">
            {warnings.map((warning) => (
              <Alert
                key={warning.title}
                color={warning.type === "error" ? "red" : "yellow"}
                icon={warning.type === "error" ? <FiAlertTriangle /> : <FiInfo />}
                radius="md"
                variant="light"
              >
                <b>{warning.title}:</b> {warning.message}
              </Alert>
            ))}

            <Card withBorder radius="lg">
              <Group mb="sm">
                <FiCheckCircle />
                <Title order={5}>System Suggestions & Notes</Title>
              </Group>
              <List spacing="xs">
                <List.Item>
                  Add at least {rules.minElectives} elective(s) to meet faculty
                  requirement.
                </List.Item>
                {unmetCarryOvers.length > 0 && (
                  <List.Item>
                    Include carry over course(s): {unmetCarryOvers.join(", ")}.
                  </List.Item>
                )}
                {suggestedCourses.length > 0 && (
                  <List.Item>
                    Suggested courses:{" "}
                    {suggestedCourses
                      .slice(0, 5)
                      .map((c: any) => c.code)
                      .join(", ")}
                    .
                  </List.Item>
                )}
                {missingPrereqs.length === 0 &&
                  restrictedBlocked.length === 0 && (
                    <List.Item>
                      No rule violations detected. You may proceed to submit.
                    </List.Item>
                  )}
              </List>
            </Card>

            <Card withBorder radius="lg">
              <Title order={5} mb="sm">
                Add Recommended Courses
              </Title>
              <Stack gap="sm">
                {suggestedCourses.slice(0, 5).map((course: any) => (
                  <Text key={course.code} size="sm">
                    {course.code} - {course.title}
                  </Text>
                ))}
                {suggestedCourses.length === 0 && (
                  <Text size="sm" c="dimmed">
                    No additional suggestions available.
                  </Text>
                )}
              </Stack>
            </Card>
          </Stack>
        </Grid.Col>
      </Grid>

      {/* Confirmation */}
      <Card withBorder radius="lg" p="xl">
        <Stack gap="md">
          <Checkbox
            checked={confirmed}
            onChange={(event) => setConfirmed(event.currentTarget.checked)}
            label="I certify these courses are correct"
            description="By checking this box, I acknowledge that these are my final course selections for the current academic session. Any further changes will require departmental approval."
          />

          <Divider />

          <Group justify="center">
            <Button
              size="md"
              radius="md"
              onClick={handleSubmit}
              loading={isSubmittingNew || isUpdatingSubmission}
              disabled={!isRuleValid || !confirmed}
            >
              Submit to Adviser
            </Button>

            <Button
              component={Link}
              to="/student/advising/review"
              size="md"
              variant="light"
            >
              Go Back to Review
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

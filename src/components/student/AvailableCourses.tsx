import { useState } from "react";
import {
  Badge,
  Card,
  Group,
  ScrollArea,
  Stack,
  Title,
  Select,
  Button,
} from "@mantine/core";
import { FiPlus } from "react-icons/fi";
import { CourseItem } from "./CourseItem";
import { useGetCoursesQuery } from "../../services/courseApi";
import {
  useAddCourseMutation,
  useGetSelectionQuery,
} from "../../services/selectionApi";
import { useGetStudentsQuery } from "../../services/studentApi";
import { useGetSettingsQuery } from "../../services/settingsApi";
import { notifications } from "@mantine/notifications";

export function AvailableCourses() {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const { data: courses = [] } = useGetCoursesQuery();
  const { data: selected = [] } = useGetSelectionQuery();
  const { data: students } = useGetStudentsQuery();
  const { data: settings } = useGetSettingsQuery();
  const userId = localStorage.getItem("userId");
  const student =
    students?.find((item: any) => String(item.id) === String(userId)) ??
    students?.[0];
  const studentId = student?.id ? String(student.id) : null;

  const [addCourse] = useAddCourseMutation();

  const scopedSelected = selected.some((item: any) => item.studentId)
    ? selected.filter(
        (item: any) => String(item.studentId) === String(studentId),
      )
    : selected;
  const totalUnits = scopedSelected.reduce(
    (sum: number, c: any) => sum + Number(c.units ?? 0),
    0,
  );
  const maxUnits = settings?.advisingRules?.maxUnits ?? settings?.maxUnitsPerSemester ?? 24;
  const minCgpa = settings?.restrictedMinCgpa ?? 0;
  const completedCourses = student?.completedCourses ?? [];
  const studentLevel = String(student?.level ?? "").match(/\d+/)?.[0];
  const currentSemester = settings?.currentSemester ?? "First";

  function handleAdd(course: any) {
    if (!studentId) {
      notifications.show({
        color: "red",
        title: "Student not loaded",
        message: "Please wait for your profile to load before adding courses.",
      });
      return;
    }
    // 1️⃣ Prevent duplicate
    const alreadyAdded = scopedSelected.some((c: any) => c.code === course.code);

    if (alreadyAdded) {
      notifications.show({
        color: "red",
        title: "Already added",
        message: "Course already added to your selection.",
      });
      return;
    }

    // 2️⃣ Prevent max units overflow
    if (totalUnits + course.units > maxUnits) {
      notifications.show({
        color: "red",
        title: "Unit limit exceeded",
        message: `Maximum allowed units is ${maxUnits}.`,
      });
      return;
    }

    // 3️⃣ Block if prereq not completed
    if (course.prereq && !completedCourses.includes(course.prereq)) {
      notifications.show({
        color: "red",
        title: "Missing prerequisite",
        message: `${course.code} requires ${course.prereq}.`,
      });
      return;
    }

    // 4️⃣ Block restricted courses for low CGPA
    if (course.restricted && Number(student?.cgpa ?? 0) < Number(minCgpa)) {
      notifications.show({
        color: "red",
        title: "Restricted course",
        message: "Your CGPA does not meet the requirement for this course.",
      });
      return;
    }

    // 5️⃣ Add to JSON Server (omit id so json-server assigns a unique one)
    const { id: _id, ...payload } = course;
    addCourse({
      ...payload,
      studentId,
    });
  }

  const availableCourses = courses.filter((course: any) => {
    const levelOk =
      !studentLevel || String(course.level) === String(studentLevel);
    const semesterOk =
      String(course.semester) ===
      (currentSemester === "First"
        ? "1"
        : currentSemester === "Second"
          ? "2"
          : String(course.semester));
    return levelOk && semesterOk;
  });

  const selectOptions = courses.map((course: any) => ({
    value: String(course.id ?? course.code),
    label: `${course.code} — ${course.title}`,
  }));

  const addFromSearch = () => {
    if (!selectedCourseId) {
      notifications.show({
        color: "red",
        title: "Select a course",
        message: "Please choose a course to add.",
      });
      return;
    }
    const course = courses.find(
      (item: any) => String(item.id ?? item.code) === selectedCourseId,
    );
    if (!course) return;
    handleAdd(course);
    setSelectedCourseId(null);
  };

  return (
    <Card withBorder radius="lg" p="lg" style={{ flex: 2 }}>
      <Stack gap="md">
        <Group justify="space-between">
          <Title order={4}>Available Courses</Title>
          <Badge variant="light">
            {availableCourses.length} Courses Found
          </Badge>
        </Group>

        <Group align="flex-end">
          <Select
            searchable
            clearable
            label="Search courses"
            placeholder="Type course code or title..."
            data={selectOptions}
            value={selectedCourseId}
            onChange={setSelectedCourseId}
            style={{ flex: 1 }}
          />
          <Button leftSection={<FiPlus />} onClick={addFromSearch}>
            Add
          </Button>
        </Group>

        <ScrollArea h={420}>
          <Stack gap="sm">
            {availableCourses.map((course: any) => {
              const added = scopedSelected.some((c: any) => c.code === course.code);

              const exceedsMax = totalUnits + course.units > maxUnits;
              const prereqMissing =
                course.prereq && !completedCourses.includes(course.prereq);
              const cgpaBlocked =
                course.restricted &&
                Number(student?.cgpa ?? 0) < Number(minCgpa);

              return (
                <CourseItem
                  key={course.id}
                  {...course}
                  added={added}
                  restricted={exceedsMax || prereqMissing || cgpaBlocked}
                  showAction={false}
                  onAdd={() => handleAdd(course)}
                />
              );
            })}
          </Stack>
        </ScrollArea>
      </Stack>
    </Card>
  );
}

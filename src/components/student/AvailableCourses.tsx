import { Badge, Card, Group, ScrollArea, Stack, Title } from "@mantine/core";
import { CourseItem } from "./CourseItem";
import { useGetCoursesQuery } from "../../services/courseApi";
import {
  useAddCourseMutation,
  useGetSelectionQuery,
} from "../../services/selectionApi";
import { useGetStudentsQuery } from "../../services/studentApi";

export function AvailableCourses() {
  const { data: courses = [] } = useGetCoursesQuery();
  const { data: selected = [] } = useGetSelectionQuery();
  const { data: student } = useGetStudentsQuery(); // logged-in student

  const [addCourse] = useAddCourseMutation();

  const totalUnits = selected.reduce((sum: number, c: any) => sum + c.units, 0);

  function handleAdd(course: any) {
    // 1️⃣ Prevent duplicate
    const alreadyAdded = selected.some((c: any) => c.code === course.code);

    if (alreadyAdded) {
      alert("Course already added");
      return;
    }

    // 2️⃣ Prevent max units overflow
    if (totalUnits + course.units > student.maxUnits) {
      alert(`Maximum allowed units is ${student.maxUnits}`);
      return;
    }

    // 3️⃣ Add to JSON Server
    addCourse(course);
  }

  return (
    <Card withBorder radius="lg" p="lg" style={{ flex: 2 }}>
      <Stack gap="md">
        <Group justify="space-between">
          <Title order={4}>Available Courses</Title>
          <Badge variant="light">{courses.length} Courses Found</Badge>
        </Group>

        <ScrollArea h={420}>
          <Stack gap="sm">
            {courses.map((course: any) => {
              const added = selected.some((c: any) => c.code === course.code);

              const exceedsMax = totalUnits + course.units > student.maxUnits;

              return (
                <CourseItem
                  key={course.id}
                  {...course}
                  added={added}
                  restricted={exceedsMax}
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

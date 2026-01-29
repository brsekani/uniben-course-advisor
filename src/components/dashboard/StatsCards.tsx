import { Grid, Card, Text, Group } from "@mantine/core";
import { FiUsers, FiBook, FiClock } from "react-icons/fi";
import { useGetStudentsQuery } from "../../services/studentApi";
import { useGetAdvisorsQuery } from "../../services/advisorApi";
import { useGetCoursesQuery } from "../../services/courseApi";
import { useGetSubmissionsQuery } from "../../services/submissionApi";

export default function StatsCards() {
  const { data: students } = useGetStudentsQuery();
  const { data: advisors } = useGetAdvisorsQuery();
  const { data: courses } = useGetCoursesQuery();
  const { data: submissions } = useGetSubmissionsQuery();

  const totalStudents = students?.length ?? 0;
  const totalAdvisors = advisors?.length ?? 0;
  const totalCourses = courses?.length ?? 0;
  const pendingSubmissions =
    submissions?.filter((item: any) => item.status === "pending").length ?? 0;

  return (
    <Grid>
      <Grid.Col span={3}>
        <Card withBorder>
          <Group justify="space-between">
            <div>
              <Text size="sm" c="dimmed">
                Total Students
              </Text>
              <Text fw={700} size="xl">
                {totalStudents}
              </Text>
            </div>
            <FiUsers size={24} />
          </Group>
        </Card>
      </Grid.Col>

      <Grid.Col span={3}>
        <Card withBorder>
          <Group justify="space-between">
            <div>
              <Text size="sm" c="dimmed">
                Total Advisers
              </Text>
              <Text fw={700} size="xl">
                {totalAdvisors}
              </Text>
            </div>
            <FiBook size={24} />
          </Group>
        </Card>
      </Grid.Col>

      <Grid.Col span={3}>
        <Card withBorder>
          <Group justify="space-between">
            <div>
              <Text size="sm" c="dimmed">
                Active Courses
              </Text>
              <Text fw={700} size="xl">
                {totalCourses}
              </Text>
            </div>
            <FiBook size={24} />
          </Group>
        </Card>
      </Grid.Col>

      <Grid.Col span={3}>
        <Card withBorder>
          <Group justify="space-between">
            <div>
              <Text size="sm" c="dimmed">
                Pending Submission
              </Text>
              <Text fw={700} size="xl">
                {pendingSubmissions}
              </Text>
            </div>
            <FiClock size={24} />
          </Group>
        </Card>
      </Grid.Col>
    </Grid>
  );
}

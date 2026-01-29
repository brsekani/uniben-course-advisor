import { Paper, Group, Text, Stack, Avatar, Badge } from "@mantine/core";
import { useGetSubmissionsQuery } from "../../services/submissionApi";
import { useGetStudentsQuery } from "../../services/studentApi";

const formatRelativeTime = (value?: string) => {
  if (!value) return "just now";
  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) return "just now";
  const diffMs = Date.now() - timestamp;
  const diffMinutes = Math.floor(diffMs / 60000);
  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hours ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} days ago`;
};

export default function RecentSubmissions() {
  const { data: submissions } = useGetSubmissionsQuery();
  const { data: students } = useGetStudentsQuery();

  const recent = (submissions ?? [])
    .slice()
    .sort((a: any, b: any) => {
      const aTime = new Date(a.submittedAt ?? 0).getTime();
      const bTime = new Date(b.submittedAt ?? 0).getTime();
      return bTime - aTime;
    })
    .slice(0, 4)
    .map((item: any) => {
      const student = students?.find(
        (entry: any) => String(entry.id) === String(item.studentId),
      );
      const name = student?.name ?? "Unknown Student";
      const dept = student?.department ?? "Unknown Department";
      const level = student?.level ?? "Level";
      return {
        id: item.id,
        name,
        dept: `${dept} • ${level}`,
        time: formatRelativeTime(item.submittedAt),
        status: item.status ?? "pending",
      };
    });

  return (
    <Paper withBorder radius="md" p="lg">
      <Group justify="space-between" mb="md">
        <Text fw={700}>Recent Submissions</Text>
        <Text size="sm" c="blue">
          View All
        </Text>
      </Group>

      <Stack>
        {recent.map((item) => (
          <Group justify="space-between" key={item.id}>
            <Group>
              <Avatar radius="xl" />
              <div>
                <Text fw={600}>{item.name}</Text>
                <Text size="xs" c="dimmed">
                  {item.dept}
                </Text>
              </div>
            </Group>

            <div>
              <Text size="xs" c="dimmed">
                {item.time}
              </Text>
              <Badge
                color={item.status === "approved" ? "green" : "orange"}
                variant="light"
              >
                {item.status === "approved" ? "Approved" : "Pending Review"}
              </Badge>
            </div>
          </Group>
        ))}
      </Stack>
    </Paper>
  );
}

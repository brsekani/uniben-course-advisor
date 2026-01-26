import { Paper, Group, Text, Stack, Avatar, Badge } from "@mantine/core";

const submissions = [
  {
    name: "Osasere Egbe",
    dept: "Computer Science • 300 Level",
    time: "2 hours ago",
  },
  {
    name: "Amaka Okafor",
    dept: "Mathematics • 400 Level",
    time: "5 hours ago",
  },
];

export default function RecentSubmissions() {
  return (
    <Paper withBorder radius="md" p="lg">
      <Group justify="space-between" mb="md">
        <Text fw={700}>Recent Submissions</Text>
        <Text size="sm" c="blue">
          View All
        </Text>
      </Group>

      <Stack>
        {submissions.map((item) => (
          <Group justify="space-between" key={item.name}>
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
              <Badge color="orange" variant="light">
                Pending Review
              </Badge>
            </div>
          </Group>
        ))}
      </Stack>
    </Paper>
  );
}

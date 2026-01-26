import { Grid, Card, Text, Group } from "@mantine/core";
import { FiUsers, FiBook } from "react-icons/fi";

export default function StatsCards() {
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
                12,450
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
                45
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
                45
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
                45
              </Text>
            </div>
            <FiBook size={24} />
          </Group>
        </Card>
      </Grid.Col>
    </Grid>
  );
}

// src/components/adviser/StatsCards.tsx
import { Card, Grid, Group, Text, Title, Badge } from "@mantine/core";
import { FiUsers, FiClock, FiCheckCircle } from "react-icons/fi";

export default function StatsCards() {
  const stats = [
    {
      label: "Total Assigned Students",
      value: "450",
      icon: <FiUsers />,
      badge: "+5% this semester",
      color: "green",
    },
    {
      label: "Pending Submissions",
      value: "28",
      icon: <FiClock />,
      badge: "Action required",
      color: "orange",
    },
    {
      label: "Recently Approved",
      value: "152",
      icon: <FiCheckCircle />,
      badge: "-2% vs last week",
      color: "red",
    },
  ];

  return (
    <Grid>
      {stats.map((item) => (
        <Grid.Col span={{ base: 12, md: 4 }} key={item.label}>
          <Card withBorder radius="md" p="lg">
            <Group justify="space-between">
              <Text fw={600} size="sm" c="dimmed">
                {item.label}
              </Text>
              {item.icon}
            </Group>

            <Title order={2} mt="sm">
              {item.value}
            </Title>

            <Badge color={item.color} mt="xs">
              {item.badge}
            </Badge>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}

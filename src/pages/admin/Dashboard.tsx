import { Stack, Title, Text, Grid } from "@mantine/core";
import StatsCards from "../../components/dashboard/StatsCards";
import SystemStatus from "../../components/dashboard/SystemStatus";
import RecentSubmissions from "../../components/dashboard/RecentSubmissions";
import QuickActions from "../../components/dashboard/QuickActions";

export default function AdminDashboard() {
  return (
    <Stack gap="xl">
      {/* Header */}
      <div>
        <Title order={2}>Dashboard Overview</Title>
        <Text c="dimmed">
          Welcome back, Administrator. Here's a snapshot of the Course Advising
          System.
        </Text>
      </div>

      {/* Stats */}
      <StatsCards />

      {/* Main Grid */}
      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <SystemStatus />
          <RecentSubmissions />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <QuickActions />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}

// src/pages/adviser/AdviserDashboard.tsx
import { Stack, Title, Text, Button, Group } from "@mantine/core";
import { FiDownload } from "react-icons/fi";
import SearchBar from "../../components/adviser/SearchBar";
import StatsCards from "../../components/dashboard/StatsCards";
import PriorityTable from "../../components/adviser/PriorityTable";

export default function AdviserDashboard() {
  return (
    <Stack gap="xl">
      <Group justify="space-between">
        <div>
          <Title order={2}>Adviser Dashboard</Title>
          <Text c="dimmed">
            Welcome back, Prof. Osas. Here is an overview of your students'
            registration progress.
          </Text>
        </div>

        <Button leftSection={<FiDownload size={16} />}>Export Report</Button>
      </Group>

      <SearchBar />
      <StatsCards />
      <PriorityTable />
    </Stack>
  );
}

// src/pages/adviser/AdviserSubmissions.tsx
import {
  Stack,
  Title,
  Text,
  Group,
  Button,
  Card,
  Badge,
  Table,
  Select,
} from "@mantine/core";
import { FiArrowLeft, FiFilter } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const submissions = [
  {
    id: "1",
    name: "Adebayo Oluchi",
    matric: "ENG1902341",
    date: "Oct 24, 2023",
    elapsed: "72 hours ago",
    status: "pending",
  },
  {
    id: "2",
    name: "Chukwu Emeka",
    matric: "ENG2001192",
    date: "Oct 25, 2023",
    elapsed: "48 hours ago",
    status: "pending",
  },
  {
    id: "3",
    name: "Ibrahim Suleiman",
    matric: "ENG1809923",
    date: "Oct 26, 2023",
    elapsed: "24 hours ago",
    status: "approved",
  },
];

export default function AdviserSubmissions() {
  const navigate = useNavigate();

  return (
    <Stack gap="xl">
      {/* Header */}
      <Group justify="space-between">
        <div>
          <Group gap="xs">
            <Button
              variant="subtle"
              leftSection={<FiArrowLeft />}
              onClick={() => navigate("/adviser")}
            >
              Back
            </Button>
          </Group>

          <Title order={2}>All Submissions</Title>
          <Text c="dimmed">
            Review and manage all student course registration submissions.
          </Text>
        </div>

        <Group>
          <Select
            placeholder="Filter by status"
            leftSection={<FiFilter />}
            data={[
              { value: "all", label: "All" },
              { value: "pending", label: "Pending" },
              { value: "approved", label: "Approved" },
              { value: "rejected", label: "Rejected" },
            ]}
          />
        </Group>
      </Group>

      {/* Table */}
      <Card withBorder radius="md">
        <Table verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Student</Table.Th>
              <Table.Th>Matric No</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Time Elapsed</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {submissions.map((s) => (
              <Table.Tr key={s.matric}>
                <Table.Td>{s.name}</Table.Td>
                <Table.Td>{s.matric}</Table.Td>
                <Table.Td>{s.date}</Table.Td>
                <Table.Td>{s.elapsed}</Table.Td>
                <Table.Td>
                  <Badge
                    color={
                      s.status === "approved"
                        ? "green"
                        : s.status === "rejected"
                          ? "red"
                          : "orange"
                    }
                  >
                    {s.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Button
                    size="xs"
                    variant="light"
                    onClick={() => navigate(`/advisor/submissions/${s.id}`)}
                  >
                    Review
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </Stack>
  );
}

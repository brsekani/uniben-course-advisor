import {
  Box,
  Title,
  Text,
  Group,
  Paper,
  Stack,
  TextInput,
  Button,
  Badge,
  Table,
  Avatar,
  Pagination,
  Select,
  ActionIcon,
} from "@mantine/core";

import {
  FiSearch,
  FiFileText,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiMoreVertical,
  FiFilter,
} from "react-icons/fi";

const submissions = [
  {
    id: "SUB-001",
    student: "John Doe",
    matricNo: "UB/20/CS/001",
    adviser: "Dr. Sarah Ade",
    course: "CSC 401",
    date: "2024-11-12",
    status: "Pending",
  },
  {
    id: "SUB-002",
    student: "Bisi Ojo",
    matricNo: "UB/21/ENG/014",
    adviser: "Mr. Musa Kalu",
    course: "ENG 302",
    date: "2024-11-10",
    status: "Approved",
  },
  {
    id: "SUB-003",
    student: "Ayo Bello",
    matricNo: "UB/19/CS/087",
    adviser: "Dr. Blessing Okon",
    course: "CSC 305",
    date: "2024-11-08",
    status: "Rejected",
  },
];

export default function Submissions() {
  return (
    <Stack gap="xl">
      {/* Page Title */}
      <Box>
        <Title order={1}>Course Submissions</Title>
        <Text c="dimmed">
          Review and manage student course registration submissions.
        </Text>
      </Box>

      {/* Stats */}
      <Group grow>
        <StatCard
          label="Total Submissions"
          value="1,240"
          icon={<FiFileText />}
        />
        <StatCard
          label="Pending"
          value="210"
          icon={<FiClock />}
          color="orange"
        />
        <StatCard
          label="Approved"
          value="890"
          icon={<FiCheckCircle />}
          color="green"
        />
        <StatCard
          label="Rejected"
          value="140"
          icon={<FiXCircle />}
          color="red"
        />
      </Group>

      {/* Table */}
      <Paper withBorder radius="md" p="md">
        <Stack>
          {/* Toolbar */}
          <Group justify="space-between">
            <Group>
              <TextInput
                placeholder="Search by student, matric no or course..."
                leftSection={<FiSearch size={16} />}
                w={340}
              />
              <Button variant="default" leftSection={<FiFilter size={16} />}>
                Filters
              </Button>
            </Group>

            <Group>
              <Select
                data={["All Status", "Pending", "Approved", "Rejected"]}
                placeholder="Status"
              />
              <Select
                data={["All Courses", "CSC 401", "CSC 305", "ENG 302"]}
                placeholder="Course"
              />
            </Group>
          </Group>

          {/* Table */}
          <Table verticalSpacing="md" highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Student</Table.Th>
                <Table.Th>Matric No</Table.Th>
                <Table.Th>Course</Table.Th>
                <Table.Th>Adviser</Table.Th>
                <Table.Th>Date</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th ta="right">Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {submissions.map((sub) => (
                <Table.Tr key={sub.id}>
                  <Table.Td>
                    <Group>
                      <Avatar radius="xl">
                        {sub.student
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </Avatar>
                      <Text fw={600}>{sub.student}</Text>
                    </Group>
                  </Table.Td>

                  <Table.Td>{sub.matricNo}</Table.Td>
                  <Table.Td>{sub.course}</Table.Td>
                  <Table.Td>{sub.adviser}</Table.Td>
                  <Table.Td>{sub.date}</Table.Td>

                  <Table.Td>
                    <StatusBadge status={sub.status} />
                  </Table.Td>

                  <Table.Td ta="right">
                    <ActionIcon variant="subtle">
                      <FiMoreVertical />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>

          {/* Footer */}
          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              Showing 1–10 of 1,240 submissions
            </Text>
            <Pagination total={12} />
          </Group>
        </Stack>
      </Paper>
    </Stack>
  );
}

/* ---------- Components ---------- */

function StatCard({
  label,
  value,
  icon,
  color = "blue",
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color?: string;
}) {
  return (
    <Paper withBorder p="lg" radius="md">
      <Group>
        <Box c={color}>{icon}</Box>
        <Box>
          <Text size="xs" fw={600} c="dimmed">
            {label.toUpperCase()}
          </Text>
          <Title order={3}>{value}</Title>
        </Box>
      </Group>
    </Paper>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    Pending: "orange",
    Approved: "green",
    Rejected: "red",
  };

  return (
    <Badge variant="light" color={colorMap[status]}>
      {status}
    </Badge>
  );
}

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
  FiUserCheck,
  FiMoreVertical,
  FiFilter,
  FiUserPlus,
} from "react-icons/fi";

const advisers = [
  {
    initials: "SA",
    name: "Dr. Sarah Ade",
    staffId: "ADV/CS/001",
    email: "s.ade@uniben.edu",
    department: "Computer Science",
    students: 32,
    status: "Active",
  },
  {
    initials: "MK",
    name: "Mr. Musa Kalu",
    staffId: "ADV/CS/014",
    email: "m.kalu@uniben.edu",
    department: "Computer Science",
    students: 18,
    status: "Active",
  },
  {
    initials: "BO",
    name: "Dr. Blessing Okon",
    staffId: "ADV/CS/021",
    email: "b.okon@uniben.edu",
    department: "Computer Science",
    students: 0,
    status: "Inactive",
  },
];

export default function Advisers() {
  return (
    <Stack gap="xl">
      {/* Page Title */}
      <Box>
        <Title order={1}>Advisers</Title>
        <Text c="dimmed">
          Manage academic advisers and student supervision.
        </Text>
      </Box>

      {/* Stats */}
      <Group grow>
        <StatCard label="Total Advisers" value="85" />
        <StatCard label="Active Advisers" value="72" />
        <StatCard label="Unassigned" value="13" />
      </Group>

      {/* Table */}
      <Paper withBorder radius="md" p="md">
        <Stack>
          {/* Toolbar */}
          <Group justify="space-between">
            <Group>
              <TextInput
                placeholder="Search by name, staff ID or email..."
                leftSection={<FiSearch size={16} />}
                w={320}
              />
              <Button variant="default" leftSection={<FiFilter size={16} />}>
                Filters
              </Button>
            </Group>

            <Group>
              <Select
                data={["All", "Active", "Inactive"]}
                placeholder="Status"
              />
              <Button leftSection={<FiUserPlus size={16} />}>
                Add Adviser
              </Button>
            </Group>
          </Group>

          {/* Table */}
          <Table verticalSpacing="md" highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Adviser</Table.Th>
                <Table.Th>Staff ID</Table.Th>
                <Table.Th>Department</Table.Th>
                <Table.Th>Students</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th ta="right">Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {advisers.map((adviser) => (
                <Table.Tr key={adviser.staffId}>
                  <Table.Td>
                    <Group>
                      <Avatar radius="xl">{adviser.initials}</Avatar>
                      <Box>
                        <Text fw={600}>{adviser.name}</Text>
                        <Text size="xs" c="dimmed">
                          {adviser.email}
                        </Text>
                      </Box>
                    </Group>
                  </Table.Td>

                  <Table.Td>{adviser.staffId}</Table.Td>

                  <Table.Td>{adviser.department}</Table.Td>

                  <Table.Td>
                    <Badge
                      variant="light"
                      color={adviser.students > 0 ? "blue" : "gray"}
                    >
                      {adviser.students}
                    </Badge>
                  </Table.Td>

                  <Table.Td>
                    <Group gap={6}>
                      <Box
                        w={6}
                        h={6}
                        bg={adviser.status === "Active" ? "green" : "gray"}
                        style={{ borderRadius: "50%" }}
                      />
                      <Text
                        size="sm"
                        c={adviser.status === "Active" ? "green" : "dimmed"}
                      >
                        {adviser.status}
                      </Text>
                    </Group>
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
              Showing 1–10 of 85 advisers
            </Text>
            <Pagination total={4} />
          </Group>
        </Stack>
      </Paper>
    </Stack>
  );
}

/* --- Small stat card --- */
function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Paper withBorder p="lg" radius="md">
      <Group>
        <FiUserCheck size={22} />
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

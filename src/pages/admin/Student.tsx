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
  FiUser,
  FiUpload,
  FiMoreVertical,
  FiFilter,
} from "react-icons/fi";

const students = [
  {
    initials: "JD",
    name: "John Doe",
    matric: "CSC/2021/045",
    email: "j.doe@uniben.edu",
    level: "200 Level",
    department: "Computer Science",
    status: "Active",
  },
  {
    initials: "AM",
    name: "Amina Musa",
    matric: "CSC/2020/112",
    email: "a.musa@uniben.edu",
    level: "300 Level",
    department: "Computer Science",
    status: "Active",
  },
  {
    initials: "BO",
    name: "Bisi Ojo",
    matric: "CSC/2019/078",
    email: "b.ojo@uniben.edu",
    level: "400 Level",
    department: "Computer Science",
    status: "Inactive",
  },
];

export default function Student() {
  return (
    <Stack gap="xl">
      {/* Page Title */}
      <Box>
        <Title order={1}>Students</Title>
        <Text c="dimmed">Manage student records and academic status.</Text>
      </Box>

      {/* Stats */}
      <Group grow>
        <StatCard label="Total Students" value="1,240" />
        <StatCard label="Active Students" value="1,150" />
        <StatCard label="Inactive Students" value="90" />
      </Group>

      {/* Table */}
      <Paper withBorder radius="md" p="md">
        <Stack>
          {/* Toolbar */}
          <Group justify="space-between">
            <Group>
              <TextInput
                placeholder="Search by name, matric number or email..."
                leftSection={<FiSearch size={16} />}
                w={320}
              />
              <Button variant="default" leftSection={<FiFilter size={16} />}>
                Filters
              </Button>
            </Group>

            <Group>
              <Select
                data={["All Levels", "100", "200", "300", "400"]}
                placeholder="Level"
              />
              <Select
                data={["All", "Active", "Inactive"]}
                placeholder="Status"
              />
              <Button leftSection={<FiUpload size={16} />}>
                Import Students
              </Button>
            </Group>
          </Group>

          {/* Table */}
          <Table verticalSpacing="md" highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Student</Table.Th>
                <Table.Th>Matric No</Table.Th>
                <Table.Th>Level</Table.Th>
                <Table.Th>Department</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th ta="right">Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {students.map((student) => (
                <Table.Tr key={student.matric}>
                  <Table.Td>
                    <Group>
                      <Avatar radius="xl">{student.initials}</Avatar>
                      <Box>
                        <Text fw={600}>{student.name}</Text>
                        <Text size="xs" c="dimmed">
                          {student.email}
                        </Text>
                      </Box>
                    </Group>
                  </Table.Td>

                  <Table.Td>{student.matric}</Table.Td>

                  <Table.Td>
                    <Badge variant="light" color="blue">
                      {student.level}
                    </Badge>
                  </Table.Td>

                  <Table.Td>{student.department}</Table.Td>

                  <Table.Td>
                    <Group gap={6}>
                      <Box
                        w={6}
                        h={6}
                        bg={student.status === "Active" ? "green" : "gray"}
                        style={{ borderRadius: "50%" }}
                      />
                      <Text
                        size="sm"
                        c={student.status === "Active" ? "green" : "dimmed"}
                      >
                        {student.status}
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
              Showing 1–10 of 1,240 students
            </Text>
            <Pagination total={5} />
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
        <FiUser size={22} />
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

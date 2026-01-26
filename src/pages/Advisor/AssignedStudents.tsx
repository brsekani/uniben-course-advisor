// src/pages/adviser/AssignedStudents.tsx
import {
  Stack,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Badge,
  Button,
  TextInput,
  Select,
  Table,
  Avatar,
  ActionIcon,
  Pagination,
} from "@mantine/core";
import {
  FiUsers,
  FiClock,
  FiCheckCircle,
  FiSearch,
  FiFilter,
  FiBell,
  FiDownload,
} from "react-icons/fi";

const students = [
  {
    name: "Emeka Okafor",
    matric: "ENG1902451",
    level: "400L",
    status: "approved",
  },
  {
    name: "Adesua Itua",
    matric: "ENG2003112",
    level: "300L",
    status: "pending",
  },
  {
    name: "Musa Adamu",
    matric: "ENG2101009",
    level: "200L",
    status: "not_started",
  },
  {
    name: "Chidi Njoku",
    matric: "ENG1902498",
    level: "400L",
    status: "approved",
  },
  {
    name: "Blessing Silas",
    matric: "ENG1805622",
    level: "500L",
    status: "pending",
  },
];

const statusMap = {
  approved: { label: "Approved", color: "green" },
  pending: { label: "Pending Review", color: "orange" },
  not_started: { label: "Not Started", color: "gray" },
};

export default function AssignedStudents() {
  return (
    <Stack gap="xl">
      {/* Page heading */}
      <Stack gap={4}>
        <Title order={2}>Assigned Students Records</Title>
        <Text c="dimmed" maw={700}>
          Monitor and review the academic progress of students assigned to your
          department for the current semester.
        </Text>
      </Stack>

      {/* Stats cards */}
      <SimpleGrid cols={{ base: 1, md: 3 }}>
        <Card withBorder radius="lg">
          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              Total Students
            </Text>
            <FiUsers />
          </Group>
          <Title order={2}>120</Title>
          <Text size="xs" c="green">
            +5 this semester
          </Text>
        </Card>

        <Card withBorder radius="lg">
          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              Pending Review
            </Text>
            <FiClock />
          </Group>
          <Title order={2}>24</Title>
          <Text size="xs" c="orange">
            Requires your attention
          </Text>
        </Card>

        <Card withBorder radius="lg">
          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              Approved
            </Text>
            <FiCheckCircle />
          </Group>
          <Title order={2}>85</Title>
          <Text size="xs" c="green">
            Successfully registered
          </Text>
        </Card>
      </SimpleGrid>

      {/* Filters */}
      <Card withBorder radius="lg">
        <Group wrap="wrap">
          <TextInput
            placeholder="Search by name or matric number..."
            leftSection={<FiSearch />}
            flex={1}
          />

          <Select
            placeholder="All Levels"
            data={["100L", "200L", "300L", "400L", "500L"]}
            w={140}
          />

          <Select
            placeholder="All Statuses"
            data={["Approved", "Pending Review", "Not Started"]}
            w={180}
          />

          <ActionIcon variant="light" size="lg">
            <FiFilter />
          </ActionIcon>
        </Group>
      </Card>

      {/* Table */}
      <Card withBorder radius="lg">
        <Table verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Student Name</Table.Th>
              <Table.Th>Matric Number</Table.Th>
              <Table.Th>Level</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th ta="right">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {students.map((s) => (
              <Table.Tr key={s.matric}>
                <Table.Td>
                  <Group>
                    <Avatar radius="xl">
                      {s.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Avatar>
                    <Text fw={500}>{s.name}</Text>
                  </Group>
                </Table.Td>

                <Table.Td c="dimmed">{s.matric}</Table.Td>
                <Table.Td>{s.level}</Table.Td>

                <Table.Td>
                  <Badge variant="light" color={statusMap[s.status].color}>
                    {statusMap[s.status].label}
                  </Badge>
                </Table.Td>

                <Table.Td ta="right">
                  <Button variant="subtle" size="xs">
                    View History
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        {/* Pagination */}
        <Group justify="space-between" mt="md">
          <Text size="sm" c="dimmed">
            Showing 1 to 5 of 120 students
          </Text>
          <Pagination total={24} />
        </Group>
      </Card>
    </Stack>
  );
}

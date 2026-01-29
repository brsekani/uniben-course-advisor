import { useMemo, useState } from "react";
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
import { useGetStudentsQuery } from "../../services/studentApi";

export default function Student() {
  const { data: students } = useGetStudentsQuery();
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<string | null>("ALL");
  const [statusFilter, setStatusFilter] = useState<string | null>("ALL");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const normalizedStudents = useMemo(
    () =>
      (students ?? []).map((student: any) => ({
        ...student,
        status: student.status ?? "Active",
      })),
    [students],
  );

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();
    return normalizedStudents.filter((student: any) => {
      const matchesSearch =
        !query ||
        String(student.name).toLowerCase().includes(query) ||
        String(student.matric).toLowerCase().includes(query) ||
        String(student.email).toLowerCase().includes(query);
      const matchesLevel =
        !levelFilter ||
        levelFilter === "ALL" ||
        String(student.level).startsWith(levelFilter);
      const matchesStatus =
        !statusFilter ||
        statusFilter === "ALL" ||
        String(student.status).toLowerCase() ===
          String(statusFilter).toLowerCase();
      return matchesSearch && matchesLevel && matchesStatus;
    });
  }, [normalizedStudents, search, levelFilter, statusFilter]);

  const totalStudents = normalizedStudents.length;
  const activeStudents = normalizedStudents.filter(
    (student: any) => String(student.status).toLowerCase() === "active",
  ).length;
  const inactiveStudents = normalizedStudents.filter(
    (student: any) => String(student.status).toLowerCase() !== "active",
  ).length;

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / pageSize));
  const clampedPage = Math.min(page, totalPages);
  const startIndex = (clampedPage - 1) * pageSize;
  const pagedStudents = filteredStudents.slice(
    startIndex,
    startIndex + pageSize,
  );
  const showingStart = filteredStudents.length === 0 ? 0 : startIndex + 1;
  const showingEnd = Math.min(
    startIndex + pageSize,
    filteredStudents.length,
  );

  const getInitials = (name?: string) =>
    String(name ?? "")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U";

  return (
    <Stack gap="xl">
      {/* Page Title */}
      <Box>
        <Title order={1}>Students</Title>
        <Text c="dimmed">Manage student records and academic status.</Text>
      </Box>

      {/* Stats */}
      <Group grow>
        <StatCard label="Total Students" value={String(totalStudents)} />
        <StatCard label="Active Students" value={String(activeStudents)} />
        <StatCard label="Inactive Students" value={String(inactiveStudents)} />
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
                value={search}
                onChange={(event) => {
                  setSearch(event.currentTarget.value);
                  setPage(1);
                }}
              />
              <Button variant="default" leftSection={<FiFilter size={16} />}>
                Filters
              </Button>
            </Group>

            <Group>
              <Select
                data={[
                  { label: "All Levels", value: "ALL" },
                  { label: "100", value: "100" },
                  { label: "200", value: "200" },
                  { label: "300", value: "300" },
                  { label: "400", value: "400" },
                  { label: "500", value: "500" },
                ]}
                placeholder="Level"
                value={levelFilter}
                onChange={(value) => {
                  setLevelFilter(value);
                  setPage(1);
                }}
              />
              <Select
                data={[
                  { label: "All", value: "ALL" },
                  { label: "Active", value: "Active" },
                  { label: "Inactive", value: "Inactive" },
                ]}
                placeholder="Status"
                value={statusFilter}
                onChange={(value) => {
                  setStatusFilter(value);
                  setPage(1);
                }}
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
              {pagedStudents.map((student: any) => (
                <Table.Tr key={student.matric}>
                  <Table.Td>
                    <Group>
                      <Avatar radius="xl">{getInitials(student.name)}</Avatar>
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
                        bg={
                          String(student.status).toLowerCase() === "active"
                            ? "green"
                            : "gray"
                        }
                        style={{ borderRadius: "50%" }}
                      />
                      <Text
                        size="sm"
                        c={
                          String(student.status).toLowerCase() === "active"
                            ? "green"
                            : "dimmed"
                        }
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
              Showing {showingStart}–{showingEnd} of {filteredStudents.length}{" "}
              students
            </Text>
            <Pagination
              total={totalPages}
              value={clampedPage}
              onChange={setPage}
            />
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

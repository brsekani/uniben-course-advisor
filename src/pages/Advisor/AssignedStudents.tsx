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
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { useGetStudentsQuery } from "../../services/studentApi";
import { useGetAdvisorsQuery } from "../../services/advisorApi";
import { useGetSubmissionsQuery } from "../../services/submissionApi";

const statusMap: Record<string, { label: string; color: string }> = {
  approved: { label: "Approved", color: "green" },
  pending: { label: "Pending Review", color: "orange" },
  not_started: { label: "Not Started", color: "gray" },
  rejected: { label: "Rejected", color: "red" },
};

const normalizeStatus = (value?: string) => {
  const raw = String(value ?? "").trim().toLowerCase().replace(/\s+/g, "_");
  if (raw === "approved") return "approved";
  if (raw === "pending" || raw === "in_review" || raw === "pending_review") {
    return "pending";
  }
  if (raw === "rejected") return "rejected";
  return "not_started";
};

const formatLevel = (value?: string) => {
  if (!value) return "N/A";
  return String(value).includes("L") ? String(value) : `${value}L`;
};

export default function AssignedStudents() {
  const { data: students } = useGetStudentsQuery();
  const { data: advisors } = useGetAdvisorsQuery();
  const { data: submissions } = useGetSubmissionsQuery();
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const userId = localStorage.getItem("userId");
  const adviser =
    advisors?.find((item: any) => String(item.id) === String(userId)) ??
    advisors?.[0];

  const assignedStudents = useMemo(() => {
    const all = students ?? [];
    if (!adviser) return all;
    if (adviser.level) {
      return all.filter(
        (student: any) => String(student.level) === String(adviser.level),
      );
    }
    if (adviser.department) {
      return all.filter(
        (student: any) =>
          String(student.department).toLowerCase() ===
          String(adviser.department).toLowerCase(),
      );
    }
    return all;
  }, [students, adviser]);

  const submissionByStudent = useMemo(() => {
    const map = new Map<string, any>();
    (submissions ?? []).forEach((submission: any) => {
      map.set(String(submission.studentId), submission);
    });
    return map;
  }, [submissions]);

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();
    return assignedStudents.filter((student: any) => {
      const status = normalizeStatus(
        submissionByStudent.get(String(student.id))?.status,
      );
      if (levelFilter && String(student.level) !== String(levelFilter)) {
        return false;
      }
      if (statusFilter && status !== statusFilter) return false;
      if (!query) return true;
      const matchesName = String(student.name ?? "")
        .toLowerCase()
        .includes(query);
      const matchesMatric = String(student.matric ?? "")
        .toLowerCase()
        .includes(query);
      return matchesName || matchesMatric;
    });
  }, [assignedStudents, search, levelFilter, statusFilter, submissionByStudent]);

  const totalAssigned = assignedStudents.length;
  const pendingCount = assignedStudents.filter((student: any) => {
    const status = normalizeStatus(
      submissionByStudent.get(String(student.id))?.status,
    );
    return status === "pending";
  }).length;
  const approvedCount = assignedStudents.filter((student: any) => {
    const status = normalizeStatus(
      submissionByStudent.get(String(student.id))?.status,
    );
    return status === "approved";
  }).length;

  const levels = Array.from(
    new Set(assignedStudents.map((student: any) => String(student.level))),
  ).filter((level) => level && level !== "undefined");

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + pageSize,
  );
  const showingFrom = filteredStudents.length === 0 ? 0 : startIndex + 1;
  const showingTo =
    filteredStudents.length === 0
      ? 0
      : Math.min(startIndex + pageSize, filteredStudents.length);

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
          <Title order={2}>{totalAssigned}</Title>
          <Text size="xs" c="dimmed">
            Based on local records
          </Text>
        </Card>

        <Card withBorder radius="lg">
          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              Pending Review
            </Text>
            <FiClock />
          </Group>
          <Title order={2}>{pendingCount}</Title>
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
          <Title order={2}>{approvedCount}</Title>
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
            value={search}
            onChange={(event) => {
              setSearch(event.currentTarget.value);
              setPage(1);
            }}
          />

          <Select
            placeholder="All Levels"
            data={levels.map((level) => ({
              value: level,
              label: formatLevel(level),
            }))}
            w={140}
            value={levelFilter}
            onChange={(value) => {
              setLevelFilter(value);
              setPage(1);
            }}
            clearable
          />

          <Select
            placeholder="All Statuses"
            data={[
              { value: "approved", label: "Approved" },
              { value: "pending", label: "Pending Review" },
              { value: "rejected", label: "Rejected" },
              { value: "not_started", label: "Not Started" },
            ]}
            w={180}
            value={statusFilter}
            onChange={(value) => {
              setStatusFilter(value);
              setPage(1);
            }}
            clearable
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
            {paginatedStudents.map((student: any) => {
              const submission = submissionByStudent.get(
                String(student.id),
              );
              const status = normalizeStatus(submission?.status);
              return (
                <Table.Tr key={student.matric ?? student.id}>
                  <Table.Td>
                    <Group>
                      <Avatar radius="xl">
                        {String(student.name ?? "NA")
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </Avatar>
                      <Text fw={500}>{student.name}</Text>
                    </Group>
                  </Table.Td>

                  <Table.Td c="dimmed">{student.matric ?? "N/A"}</Table.Td>
                  <Table.Td>{formatLevel(student.level)}</Table.Td>

                  <Table.Td>
                    <Badge variant="light" color={statusMap[status].color}>
                      {statusMap[status].label}
                    </Badge>
                  </Table.Td>

                  <Table.Td ta="right">
                    {submission?.id ? (
                      <Button
                        variant="subtle"
                        size="xs"
                        component={Link}
                        to={`/advisor/submissions/${submission.id}`}
                      >
                        View History
                      </Button>
                    ) : (
                      <Button variant="subtle" size="xs" disabled>
                        View History
                      </Button>
                    )}
                  </Table.Td>
                </Table.Tr>
              );
            })}
            {paginatedStudents.length === 0 && (
              <Table.Tr>
                <Table.Td colSpan={5}>
                  <Text size="sm" c="dimmed" ta="center">
                    No students match your filters.
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>

        {/* Pagination */}
        <Group justify="space-between" mt="md">
          <Text size="sm" c="dimmed">
            Showing {showingFrom} to {showingTo} of {filteredStudents.length}{" "}
            students
          </Text>
          <Pagination total={totalPages} value={currentPage} onChange={setPage} />
        </Group>
      </Card>
    </Stack>
  );
}

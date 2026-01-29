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
  FiUserCheck,
  FiEdit,
  FiMoreVertical,
  FiFilter,
  FiUserPlus,
} from "react-icons/fi";
import { useDisclosure } from "@mantine/hooks";
import { useGetAdvisorsQuery } from "../../services/advisorApi";
import CreateAdvisorModal from "../../components/advisers/CreateAdvisorModal";
import EditAdvisorModal from "../../components/advisers/EditAdvisorModal";

export default function Advisers() {
  const { data: advisers } = useGetAdvisorsQuery();
  const [opened, { open, close }] = useDisclosure(false);
  const [editOpened, editHandlers] = useDisclosure(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>("ALL");
  const [page, setPage] = useState(1);
  const [selectedAdviser, setSelectedAdviser] = useState<any>(null);
  const pageSize = 8;

  const normalizedAdvisers = useMemo(
    () =>
      (advisers ?? []).map((adviser: any) => ({
        ...adviser,
        status: adviser.status ?? "Active",
      })),
    [advisers],
  );

  const filteredAdvisers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return normalizedAdvisers.filter((adviser: any) => {
      const matchesSearch =
        !query ||
        String(adviser.name).toLowerCase().includes(query) ||
        String(adviser.staffId).toLowerCase().includes(query) ||
        String(adviser.email).toLowerCase().includes(query);
      const matchesStatus =
        !statusFilter ||
        statusFilter === "ALL" ||
        String(adviser.status).toLowerCase() ===
          String(statusFilter).toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [normalizedAdvisers, search, statusFilter]);

  const totalAdvisers = normalizedAdvisers.length;
  const activeAdvisers = normalizedAdvisers.filter(
    (adviser: any) => String(adviser.status).toLowerCase() === "active",
  ).length;
  const unassignedAdvisers = normalizedAdvisers.filter(
    (adviser: any) =>
      !adviser.level || String(adviser.level).trim().length === 0,
  ).length;

  const totalPages = Math.max(1, Math.ceil(filteredAdvisers.length / pageSize));
  const clampedPage = Math.min(page, totalPages);
  const startIndex = (clampedPage - 1) * pageSize;
  const pagedAdvisers = filteredAdvisers.slice(
    startIndex,
    startIndex + pageSize,
  );
  const showingStart = filteredAdvisers.length === 0 ? 0 : startIndex + 1;
  const showingEnd = Math.min(
    startIndex + pageSize,
    filteredAdvisers.length,
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
        <Title order={1}>Advisers</Title>
        <Text c="dimmed">
          Manage academic advisers and student supervision.
        </Text>
      </Box>

      {/* Stats */}
      <Group grow>
        <StatCard label="Total Advisers" value={String(totalAdvisers)} />
        <StatCard label="Active Advisers" value={String(activeAdvisers)} />
        <StatCard label="Unassigned" value={String(unassignedAdvisers)} />
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
              <Button leftSection={<FiUserPlus size={16} />} onClick={open}>
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
                <Table.Th>Level</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th ta="right">Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {pagedAdvisers.map((adviser: any) => (
                <Table.Tr key={adviser.staffId}>
                  <Table.Td>
                    <Group>
                      <Avatar radius="xl">{getInitials(adviser.name)}</Avatar>
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
                    <Badge variant="light" color="blue">
                      {adviser.level ?? "—"}
                    </Badge>
                  </Table.Td>

                  <Table.Td>
                    <Group gap={6}>
                      <Box
                        w={6}
                        h={6}
                        bg={
                          String(adviser.status).toLowerCase() === "active"
                            ? "green"
                            : "gray"
                        }
                        style={{ borderRadius: "50%" }}
                      />
                      <Text
                        size="sm"
                        c={
                          String(adviser.status).toLowerCase() === "active"
                            ? "green"
                            : "dimmed"
                        }
                      >
                        {adviser.status}
                      </Text>
                    </Group>
                  </Table.Td>

                  <Table.Td ta="right">
                    <Group gap="xs" justify="flex-end">
                      <ActionIcon
                        variant="subtle"
                        color="blue"
                        onClick={() => {
                          setSelectedAdviser(adviser);
                          editHandlers.open();
                        }}
                      >
                        <FiEdit />
                      </ActionIcon>
                      <ActionIcon variant="subtle">
                        <FiMoreVertical />
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>

          {/* Footer */}
          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              Showing {showingStart}–{showingEnd} of {filteredAdvisers.length}{" "}
              advisers
            </Text>
            <Pagination
              total={totalPages}
              value={clampedPage}
              onChange={setPage}
            />
          </Group>
        </Stack>
      </Paper>

      <CreateAdvisorModal opened={opened} onClose={close} />
      <EditAdvisorModal
        opened={editOpened}
        onClose={() => {
          editHandlers.close();
          setSelectedAdviser(null);
        }}
        adviser={selectedAdviser}
      />
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

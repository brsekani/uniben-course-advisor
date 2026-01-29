import {
  Box,
  Button,
  Group,
  Text,
  Title,
  TextInput,
  Paper,
  Table,
  Badge,
  ActionIcon,
  Pagination,
  Stack,
  SegmentedControl,
} from "@mantine/core";

import { FiSearch, FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import { useMemo, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  useGetCoursesQuery,
  useDeleteCourseMutation,
} from "../../services/courseApi";
import CreateCourseModal from "../../components/courses/CreateCourseModal";

export default function Courses() {
  const { data: courses } = useGetCoursesQuery();
  const [deleteCourse, { isLoading: isDeleting }] =
    useDeleteCourseMutation();
  const [opened, { open, close }] = useDisclosure(false);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();
    return (courses ?? []).filter((course: any) => {
      const matchesSearch =
        !query ||
        String(course.code).toLowerCase().includes(query) ||
        String(course.title).toLowerCase().includes(query);
      const matchesLevel =
        levelFilter === "ALL" || String(course.level) === levelFilter;
      return matchesSearch && matchesLevel;
    });
  }, [courses, search, levelFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / pageSize));
  const clampedPage = Math.min(page, totalPages);
  const startIndex = (clampedPage - 1) * pageSize;
  const pagedCourses = filteredCourses.slice(startIndex, startIndex + pageSize);
  const showingStart = filteredCourses.length === 0 ? 0 : startIndex + 1;
  const showingEnd = Math.min(
    startIndex + pageSize,
    filteredCourses.length,
  );

  const formatSemester = (value: string) =>
    value === "1" ? "1st Semester" : value === "2" ? "2nd Semester" : value;
  const formatType = (value: string) =>
    value === "core" ? "Compulsory" : "Elective";

  return (
    <Stack gap="lg">
      {/* Header */}
      <Group justify="space-between" align="flex-end">
        <Box>
          <Title order={1}>Course Catalog</Title>
          <Text c="dimmed">
            Manage the academic catalog and graduation requirements for all
            levels.
          </Text>
        </Box>

        <Button leftSection={<FiPlus size={18} />} onClick={open}>
          Add New Course
        </Button>
      </Group>

      {/* Toolbar */}
      <Paper withBorder p="md" radius="md">
        <Group justify="space-between">
          <TextInput
            placeholder="Search by course code or title..."
            leftSection={<FiSearch size={16} />}
            w={360}
            value={search}
            onChange={(event) => {
              setSearch(event.currentTarget.value);
              setPage(1);
            }}
          />

          <Group>
            <Text size="sm" fw={600} c="dimmed">
              Filter Level:
            </Text>
            <SegmentedControl
              data={["ALL", "100", "200", "300", "400", "500"]}
              value={levelFilter}
              onChange={(value) => {
                setLevelFilter(value);
                setPage(1);
              }}
            />
          </Group>
        </Group>
      </Paper>

      {/* Table */}
      <Paper withBorder radius="md">
        <Table verticalSpacing="md" highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Code</Table.Th>
              <Table.Th>Title</Table.Th>
              <Table.Th ta="center">Units</Table.Th>
              <Table.Th>Level</Table.Th>
              <Table.Th>Semester</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th ta="right">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {pagedCourses.map((course: any) => (
              <Table.Tr key={course.code}>
                <Table.Td>
                  <Text fw={700} c="blue">
                    {course.code}
                  </Text>
                </Table.Td>

                <Table.Td>{course.title}</Table.Td>

                <Table.Td ta="center">{course.units}</Table.Td>

                <Table.Td>{course.level} Level</Table.Td>

                <Table.Td>{formatSemester(String(course.semester))}</Table.Td>

                <Table.Td>
                  <Badge
                    variant="light"
                    color={course.type === "core" ? "blue" : "gray"}
                  >
                    {formatType(String(course.type))}
                  </Badge>
                </Table.Td>

                <Table.Td ta="right">
                  <Group gap="xs" justify="flex-end">
                    <ActionIcon variant="subtle" color="blue">
                      <FiEdit size={18} />
                    </ActionIcon>
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      onClick={async () => {
                        try {
                          await deleteCourse(course.id).unwrap();
                          notifications.show({
                            color: "green",
                            title: "Course deleted",
                            message: `${course.code} has been removed.`,
                          });
                        } catch (error) {
                          notifications.show({
                            color: "red",
                            title: "Delete failed",
                            message:
                              "Unable to delete this course. Please try again.",
                          });
                        }
                      }}
                      disabled={isDeleting}
                    >
                      <FiTrash2 size={18} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        {/* Footer */}
        <Group justify="space-between" p="md">
          <Text size="sm" c="dimmed">
            Showing {showingStart} to {showingEnd} of {filteredCourses.length}{" "}
            courses
          </Text>

          <Pagination
            total={totalPages}
            value={clampedPage}
            onChange={setPage}
          />
        </Group>
      </Paper>

      <CreateCourseModal opened={opened} onClose={close} />
    </Stack>
  );
}

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

const courses = [
  {
    code: "CSC101",
    title: "Introduction to Computer Science",
    units: 3,
    level: "100 Level",
    semester: "1st Semester",
    type: "Compulsory",
  },
  {
    code: "CSC211",
    title: "Data Structures and Algorithms",
    units: 4,
    level: "200 Level",
    semester: "1st Semester",
    type: "Compulsory",
  },
  {
    code: "GST222",
    title: "Peace and Conflict Studies",
    units: 2,
    level: "200 Level",
    semester: "2nd Semester",
    type: "Elective",
  },
];

export default function Courses() {
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

        <Button leftSection={<FiPlus size={18} />}>Add New Course</Button>
      </Group>

      {/* Toolbar */}
      <Paper withBorder p="md" radius="md">
        <Group justify="space-between">
          <TextInput
            placeholder="Search by course code or title..."
            leftSection={<FiSearch size={16} />}
            w={360}
          />

          <Group>
            <Text size="sm" fw={600} c="dimmed">
              Filter Level:
            </Text>
            <SegmentedControl
              data={["ALL", "100", "200", "300", "400"]}
              defaultValue="ALL"
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
            {courses.map((course) => (
              <Table.Tr key={course.code}>
                <Table.Td>
                  <Text fw={700} c="blue">
                    {course.code}
                  </Text>
                </Table.Td>

                <Table.Td>{course.title}</Table.Td>

                <Table.Td ta="center">{course.units}</Table.Td>

                <Table.Td>{course.level}</Table.Td>

                <Table.Td>{course.semester}</Table.Td>

                <Table.Td>
                  <Badge
                    variant="light"
                    color={course.type === "Compulsory" ? "blue" : "gray"}
                  >
                    {course.type}
                  </Badge>
                </Table.Td>

                <Table.Td ta="right">
                  <Group gap="xs" justify="flex-end">
                    <ActionIcon variant="subtle" color="blue">
                      <FiEdit size={18} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" color="red">
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
            Showing 1 to 5 of 124 courses
          </Text>

          <Pagination total={5} />
        </Group>
      </Paper>
    </Stack>
  );
}

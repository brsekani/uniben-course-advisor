// src/components/adviser/PriorityTable.tsx
import { Table, Card, Group, Text, Badge, Button } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";

const data = [
  {
    id: 1,
    name: "Adebayo Oluchi",
    matric: "ENG1902341",
    date: "Oct 24, 2023",
    elapsed: "72 hours ago",
  },
  {
    id: 2,
    name: "Chukwu Emeka",
    matric: "ENG2001192",
    date: "Oct 25, 2023",
    elapsed: "48 hours ago",
  },
];

export default function PriorityTable() {
  const navigate = useNavigate();

  return (
    <Card withBorder radius="md">
      <Group justify="space-between" mb="md">
        <Text fw={700}>Priority Action List</Text>
        <Button variant="subtle" component={Link} to="/advisor/submissions">
          View All Submissions
        </Button>
      </Group>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Student Name</Table.Th>
            <Table.Th>Matric Number</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {data.map((row) => (
            <Table.Tr key={row.matric}>
              <Table.Td>{row.name}</Table.Td>
              <Table.Td>{row.matric}</Table.Td>
              <Table.Td>{row.date}</Table.Td>
              <Table.Td>
                <Badge color="orange">Pending</Badge>
              </Table.Td>
              <Table.Td>
                <Button
                  variant="light"
                  size="xs"
                  onClick={() => navigate(`/advisor/submissions/${row.id}`)}
                >
                  Review
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
}

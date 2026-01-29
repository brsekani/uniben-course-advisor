// src/components/adviser/PriorityTable.tsx
import { Table, Card, Group, Text, Badge, Button } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useGetStudentsQuery } from "../../services/studentApi";
import { useGetAdvisorsQuery } from "../../services/advisorApi";
import { useGetSubmissionsQuery } from "../../services/submissionApi";

const statusBadge: Record<string, { label: string; color: string }> = {
  approved: { label: "Approved", color: "green" },
  in_review: { label: "Pending", color: "orange" },
  not_started: { label: "Not Started", color: "gray" },
  rejected: { label: "Rejected", color: "red" },
};

const formatDate = (value?: string | null) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString();
};

export default function PriorityTable() {
  const navigate = useNavigate();
  const { data: students } = useGetStudentsQuery();
  const { data: advisors } = useGetAdvisorsQuery();
  const { data: submissions } = useGetSubmissionsQuery();

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

  const pendingSubmissions = useMemo(() => {
    const assignedIds = new Set(
      assignedStudents.map((student: any) => String(student.id)),
    );
    return (submissions ?? [])
      .filter(
        (submission: any) =>
          assignedIds.has(String(submission.studentId)) &&
          String(submission.status) === "in_review",
      )
      .sort((a: any, b: any) => {
        const aDate = a.submittedAt ? new Date(a.submittedAt).getTime() : 0;
        const bDate = b.submittedAt ? new Date(b.submittedAt).getTime() : 0;
        return bDate - aDate;
      });
  }, [submissions, assignedStudents]);

  const studentById = useMemo(() => {
    const map = new Map<string, any>();
    (students ?? []).forEach((student: any) => {
      map.set(String(student.id), student);
    });
    return map;
  }, [students]);

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
          {pendingSubmissions.map((submission: any) => {
            const student = studentById.get(String(submission.studentId));
            const badge = statusBadge[String(submission.status)] ?? {
              label: "Pending",
              color: "orange",
            };
            return (
              <Table.Tr key={submission.id}>
                <Table.Td>{student?.name ?? "Student"}</Table.Td>
                <Table.Td>{student?.matric ?? "N/A"}</Table.Td>
                <Table.Td>{formatDate(submission.submittedAt)}</Table.Td>
                <Table.Td>
                  <Badge color={badge.color}>{badge.label}</Badge>
                </Table.Td>
                <Table.Td>
                  <Button
                    variant="light"
                    size="xs"
                    onClick={() =>
                      navigate(`/advisor/submissions/${submission.id}`)
                    }
                  >
                    Review
                  </Button>
                </Table.Td>
              </Table.Tr>
            );
          })}
          {pendingSubmissions.length === 0 && (
            <Table.Tr>
              <Table.Td colSpan={5}>
                <Text size="sm" c="dimmed" ta="center">
                  No pending submissions for your assigned students.
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </Card>
  );
}

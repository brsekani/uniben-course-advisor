import {
  Badge,
  Box,
  Button,
  Card,
  Grid,
  Group,
  Stack,
  Table,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { FiCheckCircle, FiXCircle, FiAlertTriangle } from "react-icons/fi";

export default function ReviewSubmission() {
  return (
    <Stack gap="xl">
      {/* Header */}
      <Stack gap={4}>
        <Text size="sm" c="dimmed">
          Home / Course Submissions / Review Detail
        </Text>

        <Group justify="space-between" align="center">
          <div>
            <Title order={2}>Review: Osaigbovo, Osas</Title>
            <Text c="dimmed">
              Matric: PSC1701234 · 400 Level · Computer Science
            </Text>
          </div>

          <Group>
            <Badge color="yellow" size="lg">
              Pending Review
            </Badge>
            <Button variant="light">View History</Button>
          </Group>
        </Group>
      </Stack>

      {/* Stats */}
      <Grid>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card withBorder>
            <Title order={2} c="blue">
              3.85
            </Title>
            <Text size="sm" c="dimmed">
              Current CGPA
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card withBorder>
            <Title order={2}>22</Title>
            <Text size="sm" c="dimmed">
              Max Units Allowed
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card withBorder bg="blue.0">
            <Title order={2} c="blue">
              18
            </Title>
            <Text size="sm" c="dimmed">
              Units Selected
            </Text>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Main Content */}
      <Grid>
        {/* Course Table */}
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Card withBorder>
            <Group justify="space-between" mb="md">
              <Title order={4}>Current Course Selection</Title>
              <Text size="sm" c="dimmed">
                First Semester 2023/2024
              </Text>
            </Group>

            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Code</Table.Th>
                  <Table.Th>Course Title</Table.Th>
                  <Table.Th>Units</Table.Th>
                  <Table.Th>Status</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {[
                  ["CSC411", "Artificial Intelligence", 3],
                  ["CSC413", "Computer Graphics", 3],
                  ["CSC415", "Compiler Construction", 3],
                  ["CSC417", "Networking & Security", 3],
                  ["CSC499", "Final Year Project", 6],
                ].map(([code, title, units]) => (
                  <Table.Tr key={code}>
                    <Table.Td fw={600} c="blue">
                      {code}
                    </Table.Td>
                    <Table.Td>{title}</Table.Td>
                    <Table.Td>{units}</Table.Td>
                    <Table.Td>
                      <Badge variant="light">Core</Badge>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>

            <Group justify="space-between" mt="md">
              <Text fw={600}>Total Units Requested</Text>
              <Text fw={700} c="blue">
                18
              </Text>
            </Group>
          </Card>
        </Grid.Col>

        {/* Validation Log */}
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Card withBorder>
            <Title order={4} mb="md">
              System Validation Log
            </Title>

            <Stack>
              <ValidationItem
                color="green"
                icon={<FiCheckCircle />}
                title="R1 Prerequisites"
                desc="All course entry requirements met."
                status="PASSED"
              />

              <ValidationItem
                color="green"
                icon={<FiCheckCircle />}
                title="R2 Workload"
                desc="18 units within [15–22] range."
                status="VALID"
              />

              <ValidationItem
                color="green"
                icon={<FiCheckCircle />}
                title="R3 Core Compliance"
                desc="All compulsory courses selected."
                status="PASSED"
              />

              <ValidationItem
                color="orange"
                icon={<FiAlertTriangle />}
                title="R4 Timetable Conflict"
                desc="Possible clash on Friday 2–4PM."
                status="WARNING"
              />

              <ValidationItem
                color="green"
                icon={<FiCheckCircle />}
                title="R5 Carryovers"
                desc="No outstanding failed courses."
                status="CLEAR"
              />
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Adviser Comment */}
      <Card withBorder>
        <Title order={4} mb="sm">
          Adviser Comments
        </Title>

        <Textarea
          placeholder="Add your feedback or notes for the student here regarding their course selection..."
          minRows={4}
        />

        <Text size="xs" c="dimmed" mt="sm">
          Note: Approval will finalize the student's registration for the
          semester.
        </Text>

        <Group justify="flex-end" mt="lg">
          <Button color="red" leftSection={<FiXCircle />}>
            Reject Submission
          </Button>
          <Button color="green" leftSection={<FiCheckCircle />}>
            Approve Selection
          </Button>
        </Group>
      </Card>
    </Stack>
  );
}

/* ------------------ Helper Component ------------------ */

type ValidationProps = {
  title: string;
  desc: string;
  status: string;
  color: "green" | "orange";
  icon: React.ReactNode;
};

function ValidationItem({ title, desc, status, color, icon }: ValidationProps) {
  return (
    <Box p="md" bg={`${color}.0`} radius="md">
      <Group justify="space-between" align="flex-start">
        <Group>
          <Box c={color}>{icon}</Box>
          <div>
            <Text fw={600}>{title}</Text>
            <Text size="sm" c="dimmed">
              {desc}
            </Text>
          </div>
        </Group>

        <Badge color={color}>{status}</Badge>
      </Group>
    </Box>
  );
}

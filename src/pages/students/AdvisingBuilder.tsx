import {
  Stack,
  Group,
  Card,
  Title,
  Text,
  Button,
  Badge,
  Progress,
  TextInput,
  Select,
  Divider,
  ScrollArea,
} from "@mantine/core";
import {
  FiSearch,
  FiPlus,
  FiTrash2,
  FiRefreshCw,
  FiAlertTriangle,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { AvailableCourses } from "../../components/student/AvailableCourses";
import { CurrentSelection } from "../../components/student/CurrentSelection";

export default function AdvisingBuilder() {
  return (
    <Stack gap="xl">
      {/* Page Header */}
      <Group justify="space-between" align="flex-start">
        <Stack gap={4}>
          <Title order={2}>Advising Selection Builder</Title>
          <Text c="dimmed">Academic Session: 2023/2024 · First Semester</Text>
        </Stack>

        <Group>
          <Button variant="light">View Guidelines</Button>
          <Button component={Link} to={"review"}>
            Submit Selection
          </Button>
        </Group>
      </Group>

      <Group align="flex-start" grow>
        <AvailableCourses />
        <CurrentSelection />
      </Group>
    </Stack>
  );
}

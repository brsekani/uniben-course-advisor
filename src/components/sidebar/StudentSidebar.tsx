import { Stack, Text, Group, NavLink, Avatar, Divider } from "@mantine/core";
import {
  FiGrid,
  FiUsers,
  FiBook,
  FiFileText,
  FiSettings,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

interface StudentSidebarProps {
  toggle?: () => void; // optional (for mobile)
}

export default function StudentSidebar({ toggle }: StudentSidebarProps) {
  const { pathname } = useLocation();

  return (
    <Stack h="100%" p="md" justify="space-between">
      <Stack gap="xs">
        <NavLink
          component={Link}
          to="/student"
          label="Dashboard"
          leftSection={<FiGrid />}
          active={pathname === "/student"}
          onClick={toggle}
        />

        <NavLink
          component={Link}
          to="/student/results"
          label="Results"
          leftSection={<FiBook />}
          active={pathname.startsWith("/student/results")}
          onClick={toggle}
        />
        <NavLink
          component={Link}
          to="/student/profile"
          label="Profile"
          leftSection={<FiFileText />}
          active={pathname.startsWith("/student/profile")}
          onClick={toggle}
        />

        <Divider my="sm" label="System" />

        <NavLink
          component={Link}
          to="/student/settings"
          label="Settings"
          leftSection={<FiSettings />}
          active={pathname.startsWith("/student/settings")}
          onClick={toggle}
        />
      </Stack>

      <Group>
        <Avatar radius="xl" />
        <div>
          <Text size="sm" fw={600}>
            student User
          </Text>
          <Text size="xs" c="dimmed">
            student
          </Text>
        </div>
      </Group>
    </Stack>
  );
}

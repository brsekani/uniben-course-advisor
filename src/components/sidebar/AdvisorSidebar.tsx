import { Stack, Text, Group, NavLink, Avatar, Divider } from "@mantine/core";
import {
  FiGrid,
  FiUsers,
  FiBook,
  FiFileText,
  FiSettings,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

interface AdvisorSidebarProps {
  toggle?: () => void; // optional (for mobile)
}

export default function AdvisorSidebar({ toggle }: AdvisorSidebarProps) {
  const { pathname } = useLocation();

  return (
    <Stack h="100%" p="md" justify="space-between">
      <Stack gap="xs">
        <NavLink
          component={Link}
          to="/advisor"
          label="Dashboard"
          leftSection={<FiGrid />}
          active={pathname === "/advisor"}
          onClick={toggle}
        />
        <NavLink
          component={Link}
          to="/advisor/students"
          label="Students"
          leftSection={<FiUsers />}
          active={pathname.startsWith("/advisor/students")}
          onClick={toggle}
        />
        <NavLink
          component={Link}
          to="/advisor/submissions"
          label="Submissions"
          leftSection={<FiFileText />}
          active={pathname.startsWith("/advisor/submissions")}
          onClick={toggle}
        />

        <Divider my="sm" label="System" />

        <NavLink
          component={Link}
          to="/advisor/settings"
          label="Settings"
          leftSection={<FiSettings />}
          active={pathname.startsWith("/advisor/settings")}
          onClick={toggle}
        />
      </Stack>

      <Group>
        <Avatar radius="xl" />
        <div>
          <Text size="sm" fw={600}>
            advisor User
          </Text>
          <Text size="xs" c="dimmed">
            advisor
          </Text>
        </div>
      </Group>
    </Stack>
  );
}

import { Stack, Text, Group, NavLink, Avatar, Divider } from "@mantine/core";
import {
  FiGrid,
  FiUsers,
  FiBook,
  FiFileText,
  FiSettings,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

interface AdminSidebarProps {
  toggle?: () => void; // optional (for mobile)
}

export default function AdminSidebar({ toggle }: AdminSidebarProps) {
  const { pathname } = useLocation();

  return (
    <Stack h="100%" p="md" justify="space-between">
      <Stack gap="xs">
        <NavLink
          component={Link}
          to="/admin"
          label="Dashboard"
          leftSection={<FiGrid />}
          active={pathname === "/admin"}
          onClick={toggle}
        />
        <NavLink
          component={Link}
          to="/admin/students"
          label="Students"
          leftSection={<FiUsers />}
          active={pathname.startsWith("/admin/students")}
          onClick={toggle}
        />
        <NavLink
          component={Link}
          to="/admin/advisers"
          label="Advisers"
          leftSection={<FiUsers />}
          active={pathname.startsWith("/admin/advisers")}
          onClick={toggle}
        />
        <NavLink
          component={Link}
          to="/admin/courses"
          label="Courses"
          leftSection={<FiBook />}
          active={pathname.startsWith("/admin/courses")}
          onClick={toggle}
        />
        <NavLink
          component={Link}
          to="/admin/submissions"
          label="Submissions"
          leftSection={<FiFileText />}
          active={pathname.startsWith("/admin/submissions")}
          onClick={toggle}
        />

        <Divider my="sm" label="System" />

        <NavLink
          component={Link}
          to="/admin/settings"
          label="Settings"
          leftSection={<FiSettings />}
          active={pathname.startsWith("/admin/settings")}
          onClick={toggle}
        />
      </Stack>

      <Group>
        <Avatar radius="xl" />
        <div>
          <Text size="sm" fw={600}>
            Admin User
          </Text>
          <Text size="xs" c="dimmed">
            Super Admin
          </Text>
        </div>
      </Group>
    </Stack>
  );
}

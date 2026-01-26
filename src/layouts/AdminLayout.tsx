import { AppShell, Box } from "@mantine/core";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/sidebar/AdminSidebar";
import AdminHeader from "../components/header/AdminHeader";
import { useDisclosure } from "@mantine/hooks";

export default function AdminLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding="md"
      navbar={{ width: 260, breakpoint: "sm", collapsed: { mobile: !opened } }}
      header={{ height: 64 }}
    >
      <AppShell.Navbar>
        <AdminSidebar toggle={toggle} />
      </AppShell.Navbar>

      <AppShell.Header>
        <AdminHeader />
      </AppShell.Header>

      <AppShell.Main>
        <Box p="md">
          <Outlet />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}

import { AppShell, Box } from "@mantine/core";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/sidebar/AdminSidebar";
import { useDisclosure } from "@mantine/hooks";
import AdvisorHeader from "../components/header/AdvisorHeader";
import AdvisorSidebar from "../components/sidebar/AdvisorSidebar";

export default function AdvisorLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding="md"
      navbar={{ width: 260, breakpoint: "sm", collapsed: { mobile: !opened } }}
      header={{ height: 64 }}
    >
      <AppShell.Navbar>
        <AdvisorSidebar toggle={toggle} />
      </AppShell.Navbar>

      <AppShell.Header>
        <AdvisorHeader />
      </AppShell.Header>

      <AppShell.Main>
        <Box p="md">
          <Outlet />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}

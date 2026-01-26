import { AppShell, Box } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import AdvisorHeader from "../components/header/AdvisorHeader";
import AdvisorSidebar from "../components/sidebar/AdvisorSidebar";
import StudentSidebar from "../components/sidebar/StudentSidebar";
import StudentHeader from "../components/header/StudentHeader";

export default function StudentLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding="md"
      navbar={{ width: 260, breakpoint: "sm", collapsed: { mobile: !opened } }}
      header={{ height: 64 }}
    >
      <AppShell.Navbar>
        <StudentSidebar toggle={toggle} />
      </AppShell.Navbar>

      <AppShell.Header>
        <StudentHeader />
      </AppShell.Header>

      <AppShell.Main>
        <Box p="md">
          <Outlet />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Stack,
  TextInput,
  PasswordInput,
  Button,
  Title,
  SegmentedControl,
} from "@mantine/core";
import { FiUser, FiUsers, FiShield, FiLogIn } from "react-icons/fi";

type UserRole = "student" | "advisor" | "admin";

type Props = {
  setRole: (role: UserRole) => void;
};

export default function Login({ setRole }: Props) {
  const navigate = useNavigate();
  const [role, setRoleLocal] = useState<UserRole>("student");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("role", role);
      setRole(role); // 🔥 THIS triggers rerender

      navigate(`/${role}`, { replace: true });
    }, 800);
  };

  return (
    <Stack h="100vh" align="center" justify="center">
      <Card withBorder radius="lg" p="xl" w={420}>
        <Stack>
          <Title order={3} ta="center">
            UNIBEN Portal Login
          </Title>

          {/* Role Selector */}
          <SegmentedControl
            value={role}
            onChange={(value) => setRoleLocal(value as UserRole)}
            data={[
              {
                label: (
                  <Stack gap={2} align="center">
                    <FiUser />
                    Student
                  </Stack>
                ),
                value: "student",
              },
              {
                label: (
                  <Stack gap={2} align="center">
                    <FiUsers />
                    Advisor
                  </Stack>
                ),
                value: "advisor",
              },
              {
                label: (
                  <Stack gap={2} align="center">
                    <FiShield />
                    Admin
                  </Stack>
                ),
                value: "admin",
              },
            ]}
            fullWidth
          />

          <TextInput
            label="Email / Matric Number"
            placeholder="Enter your login ID"
          />

          <PasswordInput label="Password" placeholder="Enter your password" />

          <Button
            leftSection={<FiLogIn />}
            loading={loading}
            disabled={!role}
            mt="md"
            onClick={handleLogin}
            fullWidth
          >
            Login as {role}
          </Button>
        </Stack>
      </Card>
    </Stack>
  );
}

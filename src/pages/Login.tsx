import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Stack,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
} from "@mantine/core";
import { FiLogIn } from "react-icons/fi";

type UserRole = "student" | "advisor" | "admin";

type Props = {
  setRole: (role: UserRole) => void;
};

export default function Login({ setRole }: Props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const normalizedLogin = loginId.trim().toLowerCase();
    if (!normalizedLogin || !password) {
      setError("Please enter your login ID and password.");
      setLoading(false);
      return;
    }

    try {
      const [studentsRes, advisorsRes, adminsRes] = await Promise.all([
        fetch("http://localhost:4000/students"),
        fetch("http://localhost:4000/advisors"),
        fetch("http://localhost:4000/admins"),
      ]);

      if (!studentsRes.ok || !advisorsRes.ok || !adminsRes.ok) {
        throw new Error("Unable to reach the login service.");
      }

      const [students, advisors, admins] = await Promise.all([
        studentsRes.json(),
        advisorsRes.json(),
        adminsRes.json(),
      ]);

      const matchId = (value?: string) =>
        value?.trim().toLowerCase() === normalizedLogin;

      const student = students.find(
        (item: any) =>
          matchId(item.email) || matchId(item.matric) || matchId(item.matricNo),
      );
      if (student && student.password === password) {
        const role: UserRole = "student";
        localStorage.setItem("role", role);
        localStorage.setItem("userId", String(student.id));
        setRole(role);
        navigate(`/${role}`, { replace: true });
        return;
      }

      const advisor = advisors.find(
        (item: any) => matchId(item.email) || matchId(item.staffId),
      );
      if (advisor && advisor.password === password) {
        const role: UserRole = "advisor";
        localStorage.setItem("role", role);
        localStorage.setItem("userId", String(advisor.id));
        setRole(role);
        navigate(`/${role}`, { replace: true });
        return;
      }

      const admin = admins.find(
        (item: any) => matchId(item.email) || matchId(item.staffId),
      );
      if (admin && admin.password === password) {
        const role: UserRole = "admin";
        localStorage.setItem("role", role);
        localStorage.setItem("userId", String(admin.id));
        setRole(role);
        navigate(`/${role}`, { replace: true });
        return;
      }

      setError("Invalid login ID or password.");
    } catch (err) {
      setError("Unable to reach the login service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack h="100vh" align="center" justify="center">
      <Card withBorder radius="lg" p="xl" w={420}>
        <Stack>
          <Title order={3} ta="center">
            UNIBEN Portal Login
          </Title>

          <TextInput
            label="Email / Matric Number"
            placeholder="Enter your login ID"
            value={loginId}
            onChange={(event) => setLoginId(event.currentTarget.value)}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />

          {error ? (
            <Text size="sm" c="red">
              {error}
            </Text>
          ) : null}

          <Button
            leftSection={<FiLogIn />}
            loading={loading}
            disabled={!loginId || !password}
            mt="md"
            onClick={handleLogin}
            fullWidth
          >
            Login
          </Button>
        </Stack>
      </Card>
    </Stack>
  );
}

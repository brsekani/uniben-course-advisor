import {
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import {
  FiEdit2,
  FiLock,
  FiMail,
  FiMapPin,
  FiPrinter,
  FiUser,
} from "react-icons/fi";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import {
  useGetStudentsQuery,
  useUpdateStudentMutation,
} from "../../services/studentApi";
import { useGetAdvisorsQuery } from "../../services/advisorApi";

export default function ProfilePage() {
  const { data: students } = useGetStudentsQuery();
  const { data: advisors } = useGetAdvisorsQuery();
  const [updateStudent, { isLoading: isUpdating }] =
    useUpdateStudentMutation();

  const userId = localStorage.getItem("userId");
  const student =
    students?.find((item: any) => String(item.id) === String(userId)) ??
    students?.[0];

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const levelMatch = String(student?.level ?? "").match(/\d+/);
  const studentLevel = levelMatch ? levelMatch[0] : null;
  const adviser = advisors?.find(
    (item: any) => String(item.level) === String(studentLevel),
  );

  const fallbackFaculty = "Faculting of Computing";
  const deriveEntryYear = (matric?: string) => {
    const match = String(matric ?? "").match(/\d{2}/);
    if (!match) return "";
    const yr = Number(match[0]);
    if (Number.isNaN(yr)) return "";
    return yr >= 80 ? `19${match[0]}` : `20${match[0]}`;
  };

  const handlePasswordUpdate = async () => {
    if (!student?.id) return;
    if (!currentPassword || !newPassword || !confirmPassword) {
      notifications.show({
        color: "red",
        title: "Missing fields",
        message: "Please fill all password fields.",
      });
      return;
    }
    if (currentPassword !== student.password) {
      notifications.show({
        color: "red",
        title: "Incorrect password",
        message: "Current password does not match.",
      });
      return;
    }
    if (newPassword.length < 6) {
      notifications.show({
        color: "red",
        title: "Weak password",
        message: "New password should be at least 6 characters.",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      notifications.show({
        color: "red",
        title: "Password mismatch",
        message: "New password and confirmation do not match.",
      });
      return;
    }

    try {
      await updateStudent({ id: student.id, password: newPassword }).unwrap();
      notifications.show({
        color: "green",
        title: "Password updated",
        message: "Your password has been updated successfully.",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Update failed",
        message: "Unable to update password. Please try again.",
      });
    }
  };

  return (
    <Stack gap="lg">
      {/* Profile Summary */}
      <Card withBorder radius="lg" p="lg">
        <Group justify="space-between">
          <Group>
            <Avatar size={100} radius="xl" />
            <Stack gap={6}>
              <Title order={4}>{student?.name ?? "Student"}</Title>
              <Text c="dimmed">Matric: {student?.matric ?? "N/A"}</Text>

              <Group>
                <Badge color="blue">{student?.department ?? "Department"}</Badge>
                <Badge color="green">
                  {student?.level ? `${student.level} Level` : "Level"}
                </Badge>
                <Badge variant="light">
                  {student?.studyMode ?? "Full-Time"}
                </Badge>
              </Group>
            </Stack>
          </Group>

          <Button leftSection={<FiPrinter size={16} />}>
            Print Course Form
          </Button>
        </Group>
      </Card>

      {/* Main Content */}
      <Grid>
        {/* Personal Information */}
        <Grid.Col span={6}>
          <Card withBorder radius="lg">
            <Group justify="space-between" mb="sm">
              <Group>
                <FiUser />
                <Text fw={600}>Personal Information</Text>
              </Group>
              <Button variant="subtle" leftSection={<FiEdit2 size={16} />}>
                Edit
              </Button>
            </Group>

            <Divider mb="md" />

            <Grid>
              <Grid.Col span={6}>
                <Text size="xs" c="dimmed">
                  FULL NAME
                </Text>
                <Text>{student?.name ?? "N/A"}</Text>
              </Grid.Col>

              <Grid.Col span={6}>
                <Text size="xs" c="dimmed">
                  DATE OF BIRTH
                </Text>
                <Text>{student?.dob ?? ""}</Text>
              </Grid.Col>

              <Grid.Col span={6}>
                <Text size="xs" c="dimmed">
                  GENDER
                </Text>
                <Text>{student?.gender ?? ""}</Text>
              </Grid.Col>

              <Grid.Col span={6}>
                <Text size="xs" c="dimmed">
                  PHONE NUMBER
                </Text>
                <Text>{student?.phone ?? ""}</Text>
              </Grid.Col>

              <Grid.Col span={12}>
                <Text size="xs" c="dimmed">
                  PERSONAL EMAIL
                </Text>
                <Text>
                  {student?.personalEmail ?? student?.email ?? ""}
                </Text>
              </Grid.Col>
            </Grid>
          </Card>
        </Grid.Col>

        {/* Academic Profile */}
        <Grid.Col span={6}>
          <Card withBorder radius="lg">
            <Group mb="sm">
              <FiUser />
              <Text fw={600}>Academic Profile</Text>
            </Group>

            <Divider mb="md" />

            <Grid>
              <Grid.Col span={6}>
                <Text size="xs" c="dimmed">
                  MATRIC NUMBER
                </Text>
                <Text>{student?.matric ?? "N/A"}</Text>
              </Grid.Col>

              <Grid.Col span={6}>
                <Text size="xs" c="dimmed">
                  ACADEMIC STATUS
                </Text>
                <Badge
                  color={
                    String(student?.status ?? "Active").toLowerCase() ===
                    "active"
                      ? "green"
                      : "gray"
                  }
                >
                  {student?.status ?? "Active"}
                </Badge>
              </Grid.Col>

              <Grid.Col span={6}>
                <Text size="xs" c="dimmed">
                  FACULTY
                </Text>
                <Text>{student?.faculty ?? fallbackFaculty}</Text>
              </Grid.Col>

              <Grid.Col span={6}>
                <Text size="xs" c="dimmed">
                  DEPARTMENT
                </Text>
                <Text>{student?.department ?? "N/A"}</Text>
              </Grid.Col>

              <Grid.Col span={6}>
                <Text size="xs" c="dimmed">
                  LEVEL
                </Text>
                <Text>{student?.level ?? "N/A"}</Text>
              </Grid.Col>

              <Grid.Col span={6}>
                <Text size="xs" c="dimmed">
                  ENTRY YEAR
                </Text>
                <Text>{student?.entryYear ?? deriveEntryYear(student?.matric)}</Text>
              </Grid.Col>
            </Grid>
          </Card>
        </Grid.Col>

        {/* Adviser Info */}
        <Grid.Col span={6}>
          <Card withBorder radius="lg">
            <Text fw={600} mb="md">
              Adviser Information
            </Text>

            <Group mb="md">
              <Avatar size={60} />
              <Stack gap={2}>
                <Text fw={600}>{adviser?.name ?? "No adviser assigned"}</Text>
                <Text size="sm" c="dimmed">
                  {adviser?.title ?? "Awaiting assignment"}
                </Text>
              </Stack>
            </Group>

            <Group mb="sm">
              <FiMapPin size={16} />
              <Text size="sm">{adviser?.office ?? "Office location"}</Text>
            </Group>

            <Group mb="md">
              <FiMail size={16} />
              <Text size="sm">{adviser?.email ?? "adviser@uniben.edu.ng"}</Text>
            </Group>

            <Button variant="outline" fullWidth>
              Send Message
            </Button>
          </Card>
        </Grid.Col>

        {/* Change Password */}
        <Grid.Col span={6}>
          <Card withBorder radius="lg">
            <Group mb="md">
              <FiLock />
              <Text fw={600}>Change Password</Text>
            </Group>

            <Stack>
              <TextInput
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.currentTarget.value)}
              />
              <TextInput
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.currentTarget.value)}
              />
              <TextInput
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.currentTarget.value)}
              />

              <Button mt="sm" onClick={handlePasswordUpdate} loading={isUpdating}>
                Update Password
              </Button>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}

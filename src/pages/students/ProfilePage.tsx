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
  FiBell,
  FiEdit2,
  FiLock,
  FiMail,
  FiMapPin,
  FiPrinter,
  FiUser,
} from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";

export default function ProfilePage() {
  return (
    <Stack gap="lg">
      {/* Profile Summary */}
      <Card withBorder radius="lg" p="lg">
        <Group justify="space-between">
          <Group>
            <Avatar size={100} radius="xl" />
            <Stack gap={6}>
              <Title order={4}>Osasere John Doe</Title>
              <Text c="dimmed">Matric: ENG18OXXXX</Text>

              <Group>
                <Badge color="blue">Computer Engineering</Badge>
                <Badge color="green">400 Level</Badge>
                <Badge variant="light">Full-Time</Badge>
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
                <Text>Osasere John Doe</Text>
              </Grid.Col>

              <Grid.Col span={6}>
                <Text size="xs" c="dimmed">
                  DATE OF BIRTH
                </Text>
                <Text>May 15, 1999</Text>
              </Grid.Col>

              <Grid.Col span={6}>
                <Text size="xs" c="dimmed">
                  GENDER
                </Text>
                <Text>Male</Text>
              </Grid.Col>

              <Grid.Col span={6}>
                <Text size="xs" c="dimmed">
                  PHONE NUMBER
                </Text>
                <Text>+234 812 345 6789</Text>
              </Grid.Col>

              <Grid.Col span={12}>
                <Text size="xs" c="dimmed">
                  PERSONAL EMAIL
                </Text>
                <Text>osasere.doe@example.com</Text>
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
                <Text>ENG18OXXXX</Text>
              </Grid.Col>

              <Grid.Col span={6}>
                <Text size="xs" c="dimmed">
                  ACADEMIC STATUS
                </Text>
                <Badge color="green">Active</Badge>
              </Grid.Col>

              <Grid.Col span={6}>
                <Text size="xs" c="dimmed">
                  FACULTY
                </Text>
                <Text>Engineering</Text>
              </Grid.Col>

              <Grid.Col span={6}>
                <Text size="xs" c="dimmed">
                  DEPARTMENT
                </Text>
                <Text>Computer Engineering</Text>
              </Grid.Col>

              <Grid.Col span={6}>
                <Text size="xs" c="dimmed">
                  LEVEL
                </Text>
                <Text>400 Level</Text>
              </Grid.Col>

              <Grid.Col span={6}>
                <Text size="xs" c="dimmed">
                  ENTRY YEAR
                </Text>
                <Text>2018</Text>
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
                <Text fw={600}>Prof. Ikenna Nwosu</Text>
                <Text size="sm" c="dimmed">
                  Senior Lecturer · Staff Adviser
                </Text>
              </Stack>
            </Group>

            <Group mb="sm">
              <FiMapPin size={16} />
              <Text size="sm">Block C, Room 402, Faculty of Engineering</Text>
            </Group>

            <Group mb="md">
              <FiMail size={16} />
              <Text size="sm">i.nwosu@uniben.edu.ng</Text>
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
              <TextInput label="Current Password" type="password" />
              <TextInput label="New Password" type="password" />
              <TextInput label="Confirm New Password" type="password" />

              <Button mt="sm">Update Password</Button>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}

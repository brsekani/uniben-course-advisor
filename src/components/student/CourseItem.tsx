import { Badge, Button, Card, Group, Stack, Text } from "@mantine/core";
import { FiPlus, FiCheck } from "react-icons/fi";

type CourseItemProps = {
  code: string;
  title: string;
  units: number;
  prereq?: string;
  added?: boolean;
  restricted?: boolean;
  onAdd: () => void; // ✅ typed
};

export function CourseItem({
  code,
  title,
  units,
  prereq,
  added = false,
  restricted = false,
  onAdd,
}: CourseItemProps) {
  return (
    <Card withBorder radius="md" p="md">
      <Group justify="space-between" align="center">
        <Group>
          <Badge size="lg">{units}</Badge>

          <Stack gap={2}>
            <Text fw={600}>
              {code}: {title}
            </Text>
            <Text size="xs" c="dimmed">
              Prerequisite: {prereq || "None"}
            </Text>
          </Stack>
        </Group>

        {/* Action */}
        {restricted ? (
          <Badge color="red" variant="light">
            Locked
          </Badge>
        ) : added ? (
          <Badge color="green" leftSection={<FiCheck size={12} />}>
            Added
          </Badge>
        ) : (
          <Button size="xs" leftSection={<FiPlus />} onClick={onAdd}>
            Add
          </Button>
        )}
      </Group>
    </Card>
  );
}

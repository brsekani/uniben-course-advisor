import { Group, Text } from "@mantine/core";
import { FiTrash2 } from "react-icons/fi";

export function SelectedCourse({
  title,
  units,
}: {
  title: string;
  units: number;
}) {
  return (
    <Group justify="space-between">
      <Text>
        <b>{units}</b> · {title}
      </Text>
      <FiTrash2 />
    </Group>
  );
}

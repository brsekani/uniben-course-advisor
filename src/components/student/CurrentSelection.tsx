import {
  Button,
  Card,
  Divider,
  Group,
  Progress,
  Stack,
  Text,
  Title,
  ActionIcon,
} from "@mantine/core";
import { FiTrash2 } from "react-icons/fi";
import {
  useRemoveCourseMutation,
  useResetSelectionMutation,
} from "../../services/selectionApi";

type Props = {
  selected: any[];
  totalUnits: number;
  maxUnits: number;
};

export function CurrentSelection({ selected, totalUnits, maxUnits }: Props) {
  const [removeCourse] = useRemoveCourseMutation();
  const [reset] = useResetSelectionMutation();

  return (
    <Stack gap="md" style={{ flex: 1 }}>
      <Card withBorder radius="lg" p="lg">
        <Stack gap="sm">
          <Group justify="space-between">
            <Title order={4}>Current Selection</Title>
            <Button size="xs" variant="subtle" onClick={reset}>
              Reset Builder
            </Button>
          </Group>

          <Text fw={700} size="lg">
            {totalUnits} / {maxUnits} Units
          </Text>

          <Progress value={(totalUnits / maxUnits) * 100} radius="xl" />

          <Divider />

          {selected.map((c: any) => (
            <Group key={c.id} justify="space-between">
              <Text>
                <b>{c.units}</b> · {c.code}: {c.title}
              </Text>
              <ActionIcon
                variant="subtle"
                color="red"
                onClick={() => removeCourse(c.id)}
              >
                <FiTrash2 />
              </ActionIcon>
            </Group>
          ))}
        </Stack>
      </Card>
    </Stack>
  );
}

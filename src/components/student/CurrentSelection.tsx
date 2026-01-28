import {
  Button,
  Card,
  Divider,
  Group,
  Progress,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { SelectedCourse } from "./SelectedCourse";
import { FiRefreshCw, FiTrash2 } from "react-icons/fi";
import { ValidationConsole } from "./ValidationConsole";
import {
  useGetSelectionQuery,
  useRemoveCourseMutation,
  useResetSelectionMutation,
} from "../../services/selectionApi";

export function CurrentSelection() {
  const { data: selected = [] } = useGetSelectionQuery();
  const [removeCourse] = useRemoveCourseMutation();
  const [reset] = useResetSelectionMutation();

  const totalUnits = selected.reduce((sum: number, c: any) => sum + c.units, 0);

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
            {totalUnits} / 24 Units
          </Text>

          <Progress value={(totalUnits / 24) * 100} radius="xl" />

          <Divider />

          {selected.map((c: any) => (
            <Group key={c.id} justify="space-between">
              <Text>
                <b>{c.units}</b> · {c.code}: {c.title}
              </Text>
              <FiTrash2 onClick={() => removeCourse(c.id)} />
            </Group>
          ))}
        </Stack>
      </Card>
      <ValidationConsole />
    </Stack>
  );
}

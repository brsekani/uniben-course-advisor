import { Badge, Card, Divider, Group, Stack, Text } from "@mantine/core";

type Props = {
  totalUnits: number;
  minUnits: number;
  maxUnits: number;
};

export function ValidationConsole({ totalUnits, minUnits, maxUnits }: Props) {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (totalUnits > maxUnits) {
    errors.push(
      `❌ Maximum allowed units is ${maxUnits}. You selected ${totalUnits}.`,
    );
  }

  if (totalUnits < minUnits) {
    warnings.push(
      `⚠️ Minimum full-time units is ${minUnits}. You selected ${totalUnits}.`,
    );
  }

  return (
    <Card radius="lg" p="lg" style={{ background: "#0f172a", color: "#fff" }}>
      <Stack gap="sm">
        <Group justify="space-between">
          <Text fw={700}>Validation Console</Text>

          <Badge color={errors.length ? "red" : "green"}>
            {errors.length} Errors
          </Badge>
        </Group>

        <Divider />

        {errors.map((err, i) => (
          <Text key={i} c="red">
            {err}
          </Text>
        ))}

        {warnings.map((warn, i) => (
          <Text key={i} c="yellow">
            {warn}
          </Text>
        ))}

        {!errors.length && !warnings.length && (
          <Text c="green">✅ All rules satisfied</Text>
        )}
      </Stack>
    </Card>
  );
}

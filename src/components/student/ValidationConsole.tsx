import { Badge, Card, Divider, Group, Stack, Text, List } from "@mantine/core";
import { FiCheckCircle } from "react-icons/fi";

type Props = {
  errors: string[];
  warnings: string[];
  suggestions: string[];
};

export function ValidationConsole({ errors, warnings, suggestions }: Props) {
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
          <Text c="green">
            <FiCheckCircle /> All rules satisfied
          </Text>
        )}

        {suggestions.length > 0 && (
          <>
            <Divider />
            <Text fw={600}>Smart Suggestions</Text>
            <List spacing="xs">
              {suggestions.map((item, i) => (
                <List.Item key={i}>{item}</List.Item>
              ))}
            </List>
          </>
        )}
      </Stack>
    </Card>
  );
}

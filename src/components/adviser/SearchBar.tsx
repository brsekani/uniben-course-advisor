// src/components/adviser/SearchBar.tsx
import { TextInput, Kbd, Group, ActionIcon } from "@mantine/core";
import { FiSearch, FiX } from "react-icons/fi";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <TextInput
      size="lg"
      radius="lg"
      value={query}
      onChange={(e) => setQuery(e.currentTarget.value)}
      placeholder="Search by matric number (e.g. ENG1234567)"
      leftSection={<FiSearch size={18} />}
      rightSection={
        <Group gap={6}>
          {query && (
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={() => setQuery("")}
            >
              <FiX size={16} />
            </ActionIcon>
          )}
        </Group>
      }
      styles={{
        input: {
          fontSize: "16px",
        },
      }}
    />
  );
}

import { spacing } from "@/constants/spacing";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

export default function FilterChips() {
  //Hook de consumo de tema
  const { colors } = useTheme()

  const chips = ["Music", "Podcasts & Shows", "Audiobooks"];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.row}>
        {chips.map((label, index) => (
          <View key={index} style={[styles.chip, { backgroundColor: colors.surface }]}>
            <Text style={[styles.chipText, { color: colors.foreground }]}>{label}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
    borderRadius: 20, // Cria o efeito de "pílula" (cantos arredondados)
  },
  chipText: {
    fontSize: 14,
  },
});

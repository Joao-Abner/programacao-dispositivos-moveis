import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function FilterChips() {
  const chips = ["Music", "Podcasts & Shows", "Audiobooks"];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.row}>
        {chips.map((label, index) => (
          <View key={index} style={styles.chip}>
            <Text style={styles.chipText}>{label}</Text>
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
    backgroundColor: "#333333", // Fundo cinza escuro para dar contraste com o fundo preto
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
    borderRadius: 20, // Cria o efeito de "pílula" (cantos arredondados)
  },
  chipText: {
    color: colors.foreground,
    fontSize: 14,
  },
});

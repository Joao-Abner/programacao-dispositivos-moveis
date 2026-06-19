import { spacing } from "@/constants/spacing";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

export default function Header() {
  //Hook de consumo de tema
  const { colors, colorScheme, toggleTheme } = useTheme()

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.foreground }]}>Good morning</Text>

      <View style={styles.iconsContainer}>
        <Feather name="bell" size={24} color={colors.foreground} />
        <Feather name="clock" size={24} color={colors.foreground} />
        {/* Ícone de toggle: sun no dark mode, moon no light mode */}
        <TouchableOpacity onPress={toggleTheme}>
          <Feather
            name={colorScheme === "dark" ? "sun" : "moon"}
            size={24}
            color={colors.foreground}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  iconsContainer: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "center",
  },
});

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Good morning</Text>

      <View style={styles.iconsContainer}>
        <Feather name="bell" size={24} color={colors.foreground} />
        <Feather name="clock" size={24} color={colors.foreground} />
        <Feather name="settings" size={24} color={colors.foreground} />
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
    color: colors.foreground,
    fontSize: 24,
    fontWeight: "bold",
  },
  iconsContainer: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "center",
  },
});

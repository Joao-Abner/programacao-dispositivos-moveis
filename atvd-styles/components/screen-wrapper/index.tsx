import { spacing } from "@/constants/spacing";
import React, { PropsWithChildren } from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "../footer";
import { useTheme } from "@/contexts/ThemeContext";

export default function ScreenWrapper({ children }: PropsWithChildren) {
  //Hook de consumo de tema
  const { colors, colorScheme } = useTheme()

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={{ backgroundColor: colors.background }}>
        <View style={styles.children}>{children}</View>
      </ScrollView>

      <Footer />

      <StatusBar barStyle={colorScheme === "dark" ? "light-content" : "dark-content"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  children: {
    padding: spacing.md,
    gap: spacing.xl,
  },
});

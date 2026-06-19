import { useTheme } from "@/contexts/ThemeContext";
import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

type IconProps = {
  icon: ReactNode;
  title: string;
};

export default function Icon({ icon, title }: IconProps) {
  //Hook de consumo de tema
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      {icon}
      <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    fontSize: 12,
  },
});

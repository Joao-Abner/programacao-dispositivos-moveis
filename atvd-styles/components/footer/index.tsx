import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, View } from "react-native";
import Icon from "./icon";
import { useTheme } from "@/contexts/ThemeContext";

export default function Footer() {
  //Hook de consumo de tema
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <Icon
        icon={<Ionicons name="home" size={24} color={colors.foreground} />}
        title="Home"
      />

      <Icon
        icon={<Feather name="search" size={24} color={colors.foreground} />}
        title="Search"
      />

      <Icon
        icon={
          <Ionicons
            name="library-outline"
            size={24}
            color={colors.foreground}
          />
        }
        title="Library"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
});

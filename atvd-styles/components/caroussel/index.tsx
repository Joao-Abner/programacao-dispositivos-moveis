import { spacing } from "@/constants/spacing";
import { useTheme } from "@/contexts/ThemeContext";
import { Album } from "@/mocks/albums";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

type CarousselProps = {
  title: string;
  albums: Album[];
};

export default function Caroussel({ title, albums }: CarousselProps) {
  //Hook de consumo de tema
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>

      <ScrollView horizontal>
        <View style={styles.row}>
          {albums.map((album, index) => (
            <Image
              key={index}
              style={styles.image}
              source={{ uri: album.cover }}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    gap: spacing.md,
  },
  image: {
    width: 150,
    height: 150,
  },
});

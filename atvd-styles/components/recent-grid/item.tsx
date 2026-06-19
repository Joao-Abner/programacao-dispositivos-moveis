import { spacing } from "@/constants/spacing";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

type RecentGridItemProps = {
  title: string;
  image: string;
};

export default function RecentGridItem({ title, image }: RecentGridItemProps) {
  //Hook de consumo de tema
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={[styles.title, { color: colors.foreground }]} numberOfLines={2}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Definição da largura como pouco menos de 50% para caberem 2 na mesma linha com um pequeno gap
    width: "48%",
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    // O overflow hidden faz com que a imagem respeite as bordas arredondadas do container
    overflow: "hidden",
  },
  image: {
    width: 56,
    height: 56,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    flex: 1, // Faz o texto ocupar o espaço restante na linha (evita estourar o card)
    paddingHorizontal: spacing.sm,
  },
});

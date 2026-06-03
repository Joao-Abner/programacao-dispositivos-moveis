import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type RecentGridItemProps = {
  title: string;
  image: string;
};

export default function RecentGridItem({ title, image }: RecentGridItemProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Definição da largura como pouco menos de 50% para caberem 2 na mesma linha com um pequeno gap
    width: "48%",
    backgroundColor: "#333333",
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
    color: colors.foreground,
    fontSize: 12,
    fontWeight: "bold",
    flex: 1, // Faz o texto ocupar o espaço restante na linha (evita estourar o card)
    paddingHorizontal: spacing.sm,
  },
});

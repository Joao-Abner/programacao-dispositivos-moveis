import { spacing } from "@/constants/spacing";
import React from "react";
import { StyleSheet, View } from "react-native";
import RecentGridItem from "./item";

export default function RecentGrid() {
  const recentItems = [
    {
      title: "Liked Songs",
      // misc.scdn.co é um CDN público do Spotify — funciona sem auth
      image: "https://misc.scdn.co/liked-songs/liked-songs-300.png",
    },
    {
      title: "Harry's House",
      image: "https://picsum.photos/seed/harrys-house/112/112",
    },
    {
      title: "Special",
      image: "https://picsum.photos/seed/lizzo-special/112/112",
    },
    {
      title: "Call Her Daddy",
      image: "https://picsum.photos/seed/callherdaddy/112/112",
    },
    {
      title: "Productive Morning",
      image: "https://picsum.photos/seed/productive-morning/112/112",
    },
    {
      title: "Armchair Expert",
      image: "https://picsum.photos/seed/armchair-expert/112/112",
    },
  ];

  return (
    <View style={styles.container}>
      {recentItems.map((item, index) => (
        <RecentGridItem key={index} title={item.title} image={item.image} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: spacing.xs,
  },
});

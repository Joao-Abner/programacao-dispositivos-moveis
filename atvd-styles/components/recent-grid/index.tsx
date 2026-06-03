import { spacing } from "@/constants/spacing";
import React from "react";
import { StyleSheet, View } from "react-native";
import RecentGridItem from "./item";

export default function RecentGrid() {
  const recentItems = [
    {
      title: "Liked Songs",
      image: "https://misc.scdn.co/liked-songs/liked-songs-300.png",
    },
    {
      title: "Harry's House",
      // Harry Styles – Harry's House (2022) via iTunes CDN
      image:
        "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/2a/19/fb/2a19fb85-2f70-9e44-f2a9-82abe679b88e/886449990061.jpg/300x300bb.jpg",
    },
    {
      title: "Special",
      // Lizzo – Special (2022) via iTunes CDN
      image:
        "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/b8/20/f9/b820f951-e53c-93bf-e75d-33df6165e7c1/075679736109.jpg/300x300bb.jpg",
    },
    {
      title: "Call Her Daddy",
      // Podcast – Alex Cooper via Apple Podcasts CDN
      image:
        "https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/5b/e1/bb/5be1bb02-28ea-5da2-4c6a-b2f8476bac10/mza_6091609386987764480.jpg/300x300bb.jpg",
    },
    {
      title: "Productive Morning",
      // Lo-fi chill playlist artwork via iTunes CDN
      image:
        "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/e7/2b/e5/e72be5de-1a0d-e67a-ddec-f1b8c61ba4b5/cover.jpg/300x300bb.jpg",
    },
    {
      title: "Armchair Expert",
      // Podcast – Armchair Expert with Dax Shepard via Apple Podcasts CDN
      image:
        "https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/3e/37/68/3e376890-60e9-b0a5-17e2-7cd0fd14ab8b/mza_6887983443907319474.jpg/300x300bb.jpg",
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
    flexWrap: "wrap", // <-- A mágica acontece aqui!
    justifyContent: "space-between",
    gap: spacing.xs,
  },
});

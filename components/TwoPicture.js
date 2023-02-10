import React, { useState, useEffect } from "react";

import { StyleSheet, View, Image, Dimensions } from "react-native";

export default function TwoPicture({ selectedImages }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: selectedImages[0] }} style={styles.picture1} />
      <Image source={{ uri: selectedImages[1] }} style={styles.picture2} />
    </View>
  );
}

const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  picture1: {
    width: 0.5 * SCREEN_WIDTH,
    height: 350,
    marginRight: 0.005 * SCREEN_WIDTH,
    overflow: "hidden",
  },
  picture2: {
    width: 0.495 * SCREEN_WIDTH,
    height: 350,
    overflow: "hidden",
  },
});

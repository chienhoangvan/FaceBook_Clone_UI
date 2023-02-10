import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";

export default function ThreePicture({ selectedImages }) {
  return (
    <View style={styles.container}>
      <View style={styles.groupPicture1}>
        <Image source={{ uri: selectedImages[0] }} style={styles.picture1} />
      </View>
      <View style={styles.groupPicture2}>
        <Image source={{ uri: selectedImages[1] }} style={styles.picture2} />
        <Image source={{ uri: selectedImages[2] }} style={styles.picture3} />
      </View>
    </View>
  );
}

const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);

const marginy = SCREEN_HEIGHT > 750 ? 3.5 : 0;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  groupPicture1: {
    width: 0.58 * SCREEN_WIDTH,
    marginTop: 5,
    height: 410,
  },
  groupPicture2: {
    width: 0.39 * SCREEN_WIDTH,
    marginTop: 5,
  },
  picture1: {
    marginRight: 0.1 * SCREEN_WIDTH,
    width: 0.6 * SCREEN_WIDTH,
    height: 405,
    overflow: "hidden",
  },
  picture2: {
    width: 0.4 * SCREEN_WIDTH,
    height: 200,
    overflow: "hidden",
    marginBottom: 5,
  },
  picture3: {
    width: 0.4 * SCREEN_WIDTH,
    height: 200,
    overflow: "hidden",
  },
});

import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import HomeItem from "../../components/HomeItem";

export default function Information({ navigation, route }) {
  return (
    <Layout route={route.name}>
      <ScrollView style={styles.container}>
        <View style={styles.infor}>
          <View style={styles.imageAvatar}>
            <Text>Menu</Text>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 130,
  },
  infor: {
    height: 60,
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
    alignItems: "center",
  },
  avatar: {
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  search: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#ccc",
    marginHorizontal: 10,
    justifyContent: "center",
  },
  searchButton: {},
  textSearch: {
    paddingVertical: 7,
    paddingLeft: 20,
    fontSize: 18,
  },
  body: {
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  textbody: {
    backgroundColor: "#000",
    marginTop: 1000,
  },
});

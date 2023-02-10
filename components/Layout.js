import React, { useState, useEffect } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function Layout({ children, route }) {
  const [selected, setSelected] = useState(route);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentHeader}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>facebook</Text>
          <View style={styles.group}>
            <AntDesign
              name="plus"
              size={20}
              color="black"
              style={styles.iconHeader}
            />
            <Feather
              name="search"
              size={20}
              color="black"
              style={styles.iconHeader}
            />

            <FontAwesome5
              name="facebook-messenger"
              size={20}
              color="black"
              style={styles.iconHeader}
              onPress={() => {
                enableScreens(false);
                navigation.navigate("Messenger");
              }}
            />
          </View>
        </View>
        <View style={styles.body}>
          <View
            style={{
              borderBottomWidth: selected === "Home" ? 1 : 0,
              borderColor: selected === "Home" ? "#0066ff" : "#777",
            }}>
            <FontAwesome5
              name="home"
              size={28}
              color={selected === "Home" ? "#1877f2" : "#777"}
              style={styles.iconBody}
              onPress={() => {
                navigation.navigate("Home");
              }}
            />
          </View>
          <View
            style={{
              borderBottomWidth:
                selected === "FriendInvite" ||
                selected === "SuggestionFriend" ||
                selected === "Friend"
                  ? 1
                  : 0,
              borderColor:
                selected === "FriendInvite" ||
                selected === "SuggestionFriend" ||
                selected === "Friend"
                  ? "#0066ff"
                  : "#777",
            }}>
            <FontAwesome5
              name="user-friends"
              size={28}
              color={
                selected === "FriendInvite" ||
                selected === "SuggestionFriend" ||
                selected === "Friend"
                  ? "#1877f2"
                  : "#777"
              }
              style={styles.iconBody}
              onPress={() => {
                navigation.navigate("FriendInvite");
              }}
            />
          </View>
          <View
            style={{
              borderBottomWidth: selected === "Information" ? 1 : 0,
              borderColor: selected === "Information" ? "#0066ff" : "#777",
            }}>
            <FontAwesome
              name="user-circle-o"
              size={28}
              color={selected === "Information" ? "#1877f2" : "#777"}
              style={styles.iconBody}
              onPress={() => navigation.navigate("Information")}
            />
          </View>
          <View
            style={{
              borderBottomWidth: selected === "Notification" ? 1 : 0,
              borderColor: selected === "Notification" ? "#0066ff" : "#777",
            }}>
            <FontAwesome
              name="bell"
              size={28}
              color={selected === "Notification" ? "#1877f2" : "#777"}
              style={styles.iconBody}
              onPress={() => navigation.navigate("Notification")}
            />
          </View>
          <View
            style={{
              borderBottomWidth: selected === "Menu" ? 1 : 0,
              borderColor: selected === "Menu" ? "#0066ff" : "#777",
            }}>
            <FontAwesome
              name="bars"
              size={28}
              color={selected === "Menu" ? "#1877f2" : "#777"}
              style={styles.iconBody}
              onPress={() => navigation.navigate("Menu")}
            />
          </View>
        </View>
      </View>
      <View style={styles.contentBody}>{children}</View>
    </SafeAreaView>
  );
}

const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);

const marginy = SCREEN_HEIGHT > 750 ? 3.5 : 0;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#ccc",
  },
  contentHeader: {
    position: "absolute",
    width: SCREEN_WIDTH,
    paddingTop: 1.2 * Math.round(StatusBar.currentHeight),
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    marginBottom: 10,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  textHeader: {
    fontSize: 25,
    fontWeight: "900",
    color: "#1877f2",
  },
  group: {
    flexDirection: "row",
  },
  iconHeader: {
    alignItems: "center",
    backgroundColor: "#ccc",
    borderRadius: 1000,
    marginRight: 5,
    padding: 5,
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  iconBody: {
    borderRadius: 100,
    padding: 10,
    // paddingBottom: 8,
  },
  contentBody: {
    top: 1.2 * Math.round(StatusBar.currentHeight) + 95.5 + marginy,
  },
});

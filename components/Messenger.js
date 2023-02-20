import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

export function Friend({
  avatar,
  username,
  text,
  receiverId,
  senderId,
  id_token,
}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() =>
          navigation.navigate("Chat", {
            avatar: avatar,
            username: username,
            receiverId: receiverId,
            senderId: senderId,
            id_token: id_token,
          })
        }>
        <View style={styles.group}>
          <Image style={styles.avatar} source={{ uri: avatar }} />
          <View style={styles.content}>
            <Text style={styles.username}>{username}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  group: {
    width: SCREEN_WIDTH,
    flexDirection: "row",
  },
  avatar: {
    marginLeft: 15,
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  content: {
    marginTop: 20,
    marginLeft: 10,
  },
  username: {
    fontSize: 16,
  },

});
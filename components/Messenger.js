import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
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
        <Image style={styles.avatar} source={{ uri: avatar }} />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.username}>{username}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  avatar: {
    marginLeft: 15,
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  content: {
    marginLeft: 10,
  },
  username: {
    fontSize: 16,
  },
});
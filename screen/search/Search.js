import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AntDesign } from "@expo/vector-icons";

export default function Search({ navigation }) {
  const [text, onChangeText] = useState("");
  const [friends, setFriends] = useState([]);
  const [people, setPeople] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (text !== "") {
      fetchPosts();
    }
  }, [text]);

  const fetchPosts = async () => {
    const token = await AsyncStorage.getItem("id_token");
    return fetch(`https://severfacebook.up.railway.app/api/v1/search/${text}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      body: JSON.stringify(),
    })
      .then((response) => {
        const statusCode = response.status;
        if (statusCode === 200) {
          return (response = response.json());
        }
      })
      .then((response) => {
        if (response !== undefined) {
          setFriends(response.data.friends);
          setMessages(response.data.messages);
          setPeople(response.data.people);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.group}>
          <AntDesign
            name="arrowleft"
            size={28}
            color="black"
            style={styles.iconBack}
            onPress={() => navigation.goBack()}
          />
          <TextInput
            value={text}
            style={styles.input}
            placeholder="Tìm kiếm..."
            onChangeText={onChangeText}
          />
        </View>
      </View>
      <View style={styles.body}>
        <ScrollView style={styles.listItem}>
          {friends.map((ItemFriend, index) => (
            <TouchableOpacity
              style={styles.Infor}
              key={index}
              onPress={() =>
                navigation.navigate("InforFriend", {
                  avatar: ItemFriend.avatar,
                  idUser: ItemFriend._id,
                  username: ItemFriend.username,
                  cover_image: ItemFriend.cover_image,
                  text: "Bạn bè",
                })
              }>
              <Image
                source={{
                  uri: ItemFriend.avatar,
                }}
                style={styles.avatar}
              />
              <Text style={styles.username}>{ItemFriend.username}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {text != "" && (
          <Text style={{ marginLeft: 10, fontSize: 18, marginBottom: 10 }}>
            Những người chưa kết bạn
          </Text>
        )}
        <ScrollView
          style={styles.listItem2}
          showsHorizontalScrollIndicator={true}
          horizontal={true}>
          {people.map((ItemPeople, index) => (
            <TouchableOpacity
              style={styles.ItemPeople}
              key={index}
              onPress={() =>
                navigation.navigate("InforFriend", {
                  avatar: ItemPeople.avatar,
                  idUser: ItemPeople._id,
                  username: ItemPeople.username,
                  cover_image: ItemPeople.cover_image,
                  text: "Thêm bạn bè",
                })
              }>
              <Image
                source={{
                  uri: ItemPeople.avatar,
                }}
                style={styles.avatarPeople}
              />
              <Text style={styles.textPeople}>{ItemPeople.username}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
    height: SCREEN_HEIGHT + 200,
  },
  header: {
    paddingTop: 20,
  },
  group: {
    backgroundColor: "#fff",
    position: "absolute",
    top: 0,
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.5,
    width: "100%",
    maxHeight: 200,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    bottom: 0,
    margin: 10,
    backgroundColor: "#eee",
    padding: 5,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  iconBack: {
    marginLeft: 10,
  },
  //body
  body: {
    marginTop: 40,
  },
  listItem: {
    marginHorizontal: 10,
  },
  Infor: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 80,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
  },
  //people
  listItem2: {},
  ItemPeople: {
    width: 260,
    height: 280,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarPeople: {
    height: 240,
    width: 240,
    borderRadius: 10,
    marginBottom: 10,
  },
  textPeople: {
    marginBottom: 10,
    fontSize: 16,
  },
});
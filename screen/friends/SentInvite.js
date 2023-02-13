import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FriendItem from "../../components/FriendItem";

export default function SentInvite({ route }) {
  const [sentInvite, setSentInvite] = useState([]);
  const navigation = useNavigation();
  const getListSent = async () => {
    const token = await AsyncStorage.getItem("id_token");
    return fetch(
      "https://severfacebook.up.railway.app/api/v1/friends/list_requests",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: "token " + token,
        },
        body: JSON.stringify(),
      }
    )
      .then((response) => {
        const statusCode = response.status;
        if (statusCode === 200) {
          return (response = response.json());
        } else {
          alert("Dữ liệu thất bại");
        }
      })
      .then((response) => {
        if (response !== undefined) {
          setSentInvite(response.data.sentList);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getListSent();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.buttonReturn}>
          <Ionicons
            name="arrow-back"
            size={28}
            color="black"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Lời mời bạn đã gửi</Text>
      </View>
      <ScrollView style={styles.body}>
        <View style={styles.listFriend}>
          <ScrollView showsHorizontalScrollIndicator={false}>
            {sentInvite.map((ItemSentInvite, index) =>
              ItemSentInvite.receiver !== null ? (
                <View style={styles.friend} key={index}>
                  <FriendItem
                    cover_image={ItemSentInvite.receiver.cover_image}
                    avatar={ItemSentInvite.receiver.avatar}
                    mutual="1"
                    username={ItemSentInvite.receiver.username}
                    text={"Đã gửi lời mời"}
                    id={ItemSentInvite.receiver._id}
                    time="{Item.time}"
                  />
                </View>
              ) : (
                ""
              )
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    borderBottomColor: "#000",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    paddingVertical: 10,
    marginHorizontal: 15,
  },
  textHeader: {
    marginLeft: 5,
    fontSize: 18,
  },
  //body
  body: {
    paddingHorizontal: 15,
  },
  invite: {
    paddingTop: 15,
  },
  textInvite: {
    fontSize: 20,
    fontWeight: "bold",
  },
  option: {
    flexDirection: "row",
    paddingBottom: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },

  button: {
    marginTop: 10,
    backgroundColor: "#ccc",
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: "center",
    borderRadius: 20,
    marginLeft: 5,
  },

  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
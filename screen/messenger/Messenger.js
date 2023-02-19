import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Friend } from "../../components/Messenger";

export default function Messenger({ navigation }) {
  const [friendInfor, setFriendInfor] = useState([]);
  const [getInfor, setGetInfor] = useState({});
  const [tokenn, setTokenn] = useState("");
  const [listChat, setListChat] = useState([]);

  const getListChat = async () => {
    const token = await AsyncStorage.getItem("id_token");
    return fetch("https://severfacebook.up.railway.app/api/v1/chats/list", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: "token " + token,
      },
      body: JSON.stringify(),
    })
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
          setListChat(response.data.chats);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getListFriend = async () => {
    const token = await AsyncStorage.getItem("id_token");
    return fetch("https://severfacebook.up.railway.app/api/v1/friends/list", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: "token " + token,
      },
      body: JSON.stringify(),
    })
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
          setFriendInfor(response.data.friends);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const showInfor = async () => {
    const token = await AsyncStorage.getItem("id_token");
    setTokenn(token);
    return fetch("https://severfacebook.up.railway.app/api/v1/users/show", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: "token " + token,
      },
      body: JSON.stringify(),
    })
      .then((response) => {
        const statusCode = response.status;
        if (statusCode === 200) {
          return (response = response.json());
        } else {
          alert("Load lỗi");
        }
      })
      .then((response) => {
        if (response !== undefined) {
          setGetInfor(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getListFriend();
    showInfor();
  }, [navigation]);

  return (
    <View style={styles.contentHeader}>
      <View style={styles.header}>
        <View style={styles.back}>
          <Ionicons
            name="arrow-back-sharp"
            size={28}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.textHeader}>Tin Nhắn</Text>
        </View>
        <View style={styles.group}>
          <Ionicons
            name="settings"
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
        </View>
      </View>
      <View style={styles.body}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={styles.listFr}>
          {friendInfor.map((Item, index) => (
            <View key={index}>
              <Friend
                avatar={Item.avatar}
                username={Item.username}
                text="row"
                receiverId={Item._id}
                senderId={getInfor._id}
                id_token={tokenn}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);

const styles = StyleSheet.create({
  contentHeader: {
    backgroundColor: "#fff",
    height: SCREEN_HEIGHT + 100,
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 10,
    borderBottomColor: "#000",
    borderBottomWidth: 0.5,
  },
  back: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  textHeader: {
    marginLeft: 5,
    fontSize: 18,
  },
  group: {
    flexDirection: "row",
  },
  iconHeader: {
    alignItems: "center",
    backgroundColor: "#ccc",
    borderRadius: 1000,
    marginRight: 10,
    padding: 5,
  },

  //body
  listFrHorizol: {
    marginBottom: 0,
  },
});
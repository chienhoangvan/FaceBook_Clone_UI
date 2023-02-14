import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  StatusBar,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const SocketClient = ({ route }) => {
  const navigation = useNavigation();
  const { avatar, username, receiverId, senderId, id_token } = route.params;
  const [text, onChangeText] = useState("");
  const [saveMess, setSaveMess] = useState([]);
  const [getIdChat, setGetIdChat] = useState([]);
  const [count, setCount] = useState(0);

  const socket = io("https://facebookapp-production.up.railway.app");

  const sendMessage = () => {
    setSaveMess((state) => [
      ...state,
      {
        senderId: senderId,
        content: text,
      },
    ]);
    if (text === "") {
    } else {
      socket.emit("chatmessage", {
        senderId: senderId,
        receiverId: receiverId,
        content: text,
        token: id_token,
      });
    }
  };

  const getChat = async () => {
    const token = await AsyncStorage.getItem("id_token");
    return fetch(
      `https://severfacebook.up.railway.app/api/v1/chats/getMessagesbyfriendId/${receiverId}`,
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
          alert("Load lỗi");
        }
      })
      .then((response) => {
        if (response !== undefined) {
          setSaveMess(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getChat();
  }, []);

  useEffect(() => {
    socket.on(`${senderId}`, (data) => {
      console.log(data);
      setSaveMess((state) => [
        ...state,
        {
          senderId: data.senderId,
          content: data.content,
        },
      ]);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <AntDesign
            name="arrowleft"
            size={28}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Image
            style={styles.avatar}
            source={{
              uri: avatar,
            }}
          />
          <Text style={styles.textHeader}>{username}</Text>
        </View>
        <View style={styles.headerRight}>
          <FontAwesome
            name="phone"
            size={24}
            color="black"
            style={styles.iconPhone}
          />
          <Ionicons name="ios-videocam" size={24} color="black" />
        </View>
      </View>
      <ScrollView
        inverted={true}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-end",
          marginBottom: 0,
        }}>
        <View style={styles.body}>
          {saveMess.map((ItemMess, index) => (
            <View style={styles.itemMess} key={index}>
              {ItemMess.senderId === senderId ? (
                <View style={styles.contentSend}>
                  <Text style={styles.textContent}>{ItemMess.content}</Text>
                </View>
              ) : (
                <View style={styles.group}>
                  <Image
                    style={styles.avatarChat}
                    source={{
                      uri: avatar,
                    }}
                  />
                  <View style={styles.contentRecied}>
                    <Text style={styles.textContentRecied}>
                      {ItemMess.content}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TextInput
          value={text}
          multiline={true}
          style={styles.input}
          placeholder="Nhắn tin..."
          onChangeText={onChangeText}
        />
        <Ionicons
          name="send"
          size={24}
          color="#3578E5"
          style={styles.iconSend}
          onPress={() => {
            sendMessage(), onChangeText("");
          }}
        />
      </View>
    </View>
  );
};
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    borderBottomColor: "#000",
    borderBottomWidth: 0.5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  textHeader: {
    fontSize: 18,
    fontWeight: "600",
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconPhone: {
    marginRight: 20,
  },
  //body
  body: {
    // height: SCREEN_HEIGHT,
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingBottom: 70,
  },
  itemMess: {},
  contentSend: {
    maxWidth: "65%",
    padding: 5,
    backgroundColor: "#0084FF",
    alignSelf: "flex-end",
    borderRadius: 8,
    marginBottom: 2,
    marginHorizontal: 10,
  },
  contentRecied: {
    paddingHorizontal: 7,
    backgroundColor: "#E4E6EB",
    alignSelf: "flex-start",
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 5,
    marginTop: 1,
  },
  group: {
    flexDirection: "row",
  },
  avatarChat: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginLeft: 10,
  },
  textContent: {
    color: "#fff",
    fontSize: 16,
  },

  //footer
  footer: {
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    borderTopColor: "#ccc",
    borderTopWidth: 0.5,
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
  iconSend: {
    marginRight: 10,
  },
});

export default SocketClient;
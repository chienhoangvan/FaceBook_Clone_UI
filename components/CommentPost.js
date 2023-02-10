import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  Text,
  Pressable,
  TextInput,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function CommentPost({
  id,
  showComment,
  setShowComment,
  navigation,
  username,
  avatar,
}) {
  const [text, onChangeText] = useState("");
  const [getComment, setGetComment] = useState([]);

  const commentPost = async () => {
    let values = {
      content: text,
      commentAnswered: "",
    };
    const token = await AsyncStorage.getItem("id_token");
    return fetch(
      `https://severfacebook.up.railway.app/api/v1/postComment/create/${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: "token " + token,
        },
        body: JSON.stringify(values),
      }
    )
      .then((response) => {
        const statusCode = response.status;
        if (statusCode === 200) {
          console.log("thành công");
        } else {
          alert("Xóa không thành công");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getCommentPost = async () => {
    const token = await AsyncStorage.getItem("id_token");
    return fetch(
      `https://severfacebook.up.railway.app/api/v1/postComment/list/${id}`,
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
          alert("Lỗi");
        }
      })
      .then((response) => {
        if (response !== undefined) {
          setGetComment(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCommentPost();
  }, [getComment]);

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showComment}
          onRequestClose={() => {
            setShowComment(!showComment);
          }}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <View style={styles.iconLike}>
                <AntDesign name="like1" size={12} color="#fff" />
              </View>
              <Text style={styles.textLike}>Bạn, Linh và 8 người khác</Text>
            </View>
            <View style={styles.body}>
              {getComment.map((Comment, index) => (
                <View style={styles.Item} key={index}>
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: Comment.user.avatar,
                    }}
                  />
                  <View style={styles.group}>
                    <Text style={styles.textUsername}>
                      {Comment.user.username}
                    </Text>
                    <Text style={styles.content}>{Comment.content}</Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.footer}>
              <TextInput
                value={text}
                multiline={true}
                style={styles.input}
                placeholder="Viết bình luận..."
                onChangeText={onChangeText}
              />
              <Ionicons
                name="send"
                size={24}
                color="#3578E5"
                style={styles.iconSend}
                onPress={() => {
                  commentPost(), onChangeText("");
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    opacity: 0.1,
    flexDirection: "row",
    height: SCREEN_HEIGHT,
  },
  modalView: {
    shadowColor: "#000",
    backgroundColor: "white",
    width: SCREEN_WIDTH,
    height: "100%",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  //header
  header: {
    height: 30,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  iconLike: {
    backgroundColor: "#3578E5",
    padding: 3,
    borderRadius: 50,
    alignItems: "center",
  },
  textLike: {
    marginLeft: 10,
    fontWeight: "600",
    fontSize: 18,
  },
  //body
  body: {
    marginHorizontal: 10,
    marginTop: 5,
  },
  Item: {
    flexDirection: "row",
    marginBottom: 15,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  group: {
    marginHorizontal: 10,
    backgroundColor: "#eee",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    maxWidth: SCREEN_WIDTH - 75,
  },
  textUsername: {
    fontSize: 16,
    fontWeight: "700",
  },
  content: {
    fontSize: 16,
  },
  //footer
  footer: {
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

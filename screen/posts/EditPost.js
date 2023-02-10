import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import ThreePicture from "../../components/ThreePicture";
import TwoPicture from "../../components/TwoPicture";
import FourPicture from "../../components/FourPicture";

import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

function EditPost({ navigation, route }) {
  const { name, described, Img, avatar, id } = route.params;
  const [text, onChangeText] = useState(described);

  const handleEditPost = async () => {
    const token = await AsyncStorage.getItem("id_token");
    values = {
      described: text,
    };
    return fetch(
      `https://severfacebook.up.railway.app/api/v1/posts/edit/${id}`,
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
          return (response = response.json());
        } else {
          alert("Chỉnh sửa thất bại");
        }
      })
      .then((response) => {
        if (response !== undefined) {
          alert("Cập nhật thành công");
          navigation.replace("Information");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.contentHeader}>
          <View style={styles.contentHeaderLeft}>
            <AntDesign
              name="arrowleft"
              size={28}
              color="black"
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.textHeader}>Chỉnh sửa bài viết</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleEditPost}>
            <Text style={styles.textButton}>Lưu</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentBody}>
          <View style={styles.headerBody}>
            <View style={styles.imageAvater}>
              <Image
                source={{
                  uri: avatar,
                }}
                style={styles.avatar}
              />
            </View>
            <View style={styles.infor}>
              <Text style={styles.textInfor}>{name}</Text>
              <TouchableOpacity style={styles.inforBottom}>
                <FontAwesome5 name="user-friends" size={16} color="#666" />
                <Text style={styles.textinforBottom}>Công khai</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.betweenBody}>
            <TextInput
              style={styles.textInput}
              multiline={true}
              onChangeText={onChangeText}
              value={text}
              placeholder={
                Img !== [] ? "Hãy nói gì về bức ảnh này" : "Bạn đang nghĩ gì? "
              }
            />
          </View>
          <View>
            {Img.length === 3 ? (
              <ThreePicture selectedImages={Img} />
            ) : Img.length === 2 ? (
              <TwoPicture selectedImages={Img} />
            ) : Img.length === 4 ? (
              <FourPicture selectedImages={Img} />
            ) : Img.length === 1 ? (
              <Image
                source={{
                  uri: Img[0],
                }}
                style={styles.picture}
              />
            ) : (
              ""
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);

const marginFootter = SCREEN_HEIGHT > 750 ? 25 : 45;

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
    flex: 1,
  },
  container1: {
    backgroundColor: "#fff",
    flex: 1,
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
  },
  contentHeader: {
    marginTop: 20,
    width: SCREEN_WIDTH,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  textHeader: {
    marginLeft: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: "#1B74E4",
    padding: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 7,
  },
  textButton: {
    color: "#fff",
    fontWeight: "600",
  },
  // Body
  contentBody: {
    width: SCREEN_WIDTH,
  },
  headerBody: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  avatar: {
    borderRadius: 50,
    width: 50,
    height: 50,
    marginRight: 15,
  },
  textInfor: {
    fontSize: 15,
    fontWeight: "600",
  },
  inforBottom: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 2,
  },
  textinforBottom: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: "700",
    color: "#666",
  },

  //Body Thân body
  betweenBody: {
    marginBottom: 10,
    paddingHorizontal: 10,
    maxHeight: 100,
  },
  textInput: {
    fontSize: 22,
    marginRight: 10,
    fontWeight: "300",
  },
  picture: {
    width: "100%",
    height: 400,
    overflow: "hidden",
  },
});

export default EditPost;

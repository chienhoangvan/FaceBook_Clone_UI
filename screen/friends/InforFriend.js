import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  StyleSheet,
  StatusBar,
  View,
  ImageBackground,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import HomeItem from "../../components/HomeItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function InforFriend({ navigation, route }) {
  const { username, idUser, avatar, cover_image, text } = route.params;
  const [getInfor, setGetInfor] = useState({});
  const [getListPost, setGetListPost] = useState([]);

  //   const showInfor = async () => {
  //     const token = await AsyncStorage.getItem("id_token");
  //     return fetch("https://severfacebook.up.railway.app/api/v1/users/show", {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         authorization: "token " + token,
  //       },
  //       body: JSON.stringify(),
  //     })
  //       .then((response) => {
  //         const statusCode = response.status;
  //         if (statusCode === 200) {
  //           return (response = response.json());
  //         } else {
  //           alert("Load lỗi");
  //         }
  //       })
  //       .then((response) => {
  //         if (response !== undefined) {
  //           setGetInfor(response.data);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   };

  useEffect(() => {
    showListPost();
  }, [navigation]);

  const showListPost = async () => {
    const token = await AsyncStorage.getItem("id_token");
    return fetch(
      `https://severfacebook.up.railway.app/api/v1/posts/list?userId=${idUser}`,
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
          setGetListPost(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={28}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.buttonSearch}>
          <TextInput
            disabled={true}
            placeholder="Tìm kiếm"
            style={styles.textInput}
          />
          <AntDesign
            name="search1"
            size={18}
            color="#888"
            style={styles.iconSearch}
          />
        </View>
      </View>
      <ScrollView>
        <View style={styles.inforHeader}>
          <View style={styles.groupImage}>
            <ImageBackground
              source={{
                uri: cover_image,
              }}
              style={styles.image}>
              <Image
                source={{
                  uri: avatar,
                }}
                style={styles.avatar}
              />
            </ImageBackground>
          </View>
          <View style={styles.inforContent}>
            <Text style={styles.textFullName}>{username}</Text>
            <View style={styles.button}>
              <TouchableOpacity style={styles.buttonConfirm}>
                <Text style={styles.textButtonVideo}>{text}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonChat}>
                <FontAwesome5
                  name="facebook-messenger"
                  size={16}
                  color="black"
                />
                <Text style={styles.textEditProfile}>Nhắn tin</Text>
              </TouchableOpacity>
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={24}
                color="black"
                style={styles.iconDot}
              />
            </View>
          </View>
        </View>
        {getListPost
          .map((Item, index) => (
            <View style={styles.body} key={index}>
              <HomeItem
                time="{Item.time}"
                textContent={Item.described}
                Img={Item.images}
                idPost={Item._id}
                idUser={Item.author._id}
                countComments={Item.countComments}
                page="home"
              />
            </View>
          ))
          .reverse()}
      </ScrollView>
    </View>
  );
}

const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const SCREEN_WEIGHT = Math.round(Dimensions.get("window").width);
const margintop =
  SCREEN_HEIGHT > 700 ? 0.12 * SCREEN_HEIGHT : 0.08 * SCREEN_HEIGHT;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ccc",
    marginBottom: 80,
  },
  header: {
    paddingTop: StatusBar.currentHeight + 10,
    backgroundColor: "#fff",
    borderBottomColor: "#000",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonSearch: {
    flex: 1,
  },
  textInput: {
    backgroundColor: "#eee",
    marginLeft: 10,
    borderRadius: 30,
    fontSize: 14,
    paddingLeft: 35,
  },
  iconSearch: {
    position: "absolute",
    left: 20,
    top: 5,
  },
  //body
  inforHeader: {
    backgroundColor: "#fff",
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.5,
  },
  groupImage: {
    height: 0.2 * SCREEN_HEIGHT + 0.35 * SCREEN_WEIGHT,
  },
  image: {
    height: (4 * SCREEN_WEIGHT) / 7,
  },
  avatar: {
    borderRadius: 200,
    borderWidth: 5,
    borderColor: "#fff",
    width: 0.5 * SCREEN_WEIGHT,
    height: 0.5 * SCREEN_WEIGHT,
    marginLeft: 10,
    marginTop: margintop,
    position: "relative",
  },
  inforContent: {
    marginHorizontal: 10,
  },
  textFullName: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonConfirm: {
    flexDirection: "row",
    backgroundColor: "#0066ff",
    paddingVertical: 8,
    borderRadius: 5,
    justifyContent: "center",
    marginRight: 10,
    width: (SCREEN_WEIGHT - 75) / 2,
  },
  textButtonVideo: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  itemProfile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonChat: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
    marginRight: 10,
    borderRadius: 5,
    paddingVertical: 8,
    width: (SCREEN_WEIGHT - 75) / 2,
  },
  textEditProfile: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "500",
  },
  iconDot: {
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 5,
    backgroundColor: "#ccc",
  },

  //post
  body: {
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  textbody: {
    backgroundColor: "#000",
    marginTop: 1000,
  },
});

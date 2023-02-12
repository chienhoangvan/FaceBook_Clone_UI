import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Layout from "../../components/Layout";
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import HomeItem from "../../components/HomeItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function Information({ navigation, route }) {
  const [getInfor, setGetInfor] = useState({});
  const [getListPost, setGetListPost] = useState([]);

  const showInfor = async () => {
    const token = await AsyncStorage.getItem("id_token");
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
          showListPost(response.data._id);
          setGetInfor(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    showInfor();
  }, [navigation]);

  const showListPost = async (iduser) => {
    const token = await AsyncStorage.getItem("id_token");
    return fetch(
      `https://severfacebook.up.railway.app/api/v1/posts/list?userId=${iduser}`,
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
    <Layout route={route.name}>
      <ScrollView style={styles.container}>
        <View style={styles.inforHeader}>
          <View style={styles.groupImage}>
            <ImageBackground
              source={{
                uri: getInfor.cover_image,
              }}
              style={styles.image}>
              <Image
                source={{
                  uri: getInfor.avatar,
                }}
                style={styles.avatar}
              />
              <FontAwesome5
                name="camera"
                size={28}
                color="black"
                style={styles.camera}
              />
            </ImageBackground>
          </View>
          <View style={styles.inforContent}>
            <Text style={styles.textFullName}>{getInfor.username}</Text>
            <View>
              <TouchableOpacity style={styles.buttonVideo}>
                <EvilIcons name="plus" size={24} color="#fff" />
                <Text style={styles.textButtonVideo}>Thêm vào tin</Text>
              </TouchableOpacity>
              <View style={styles.itemProfile}>
                <TouchableOpacity
                  style={styles.editProfile}
                  onPress={() =>
                    navigation.navigate("ShowInfor", { getInfor: getInfor })
                  }>
                  <MaterialIcons name="edit" size={24} color="black" />
                  <Text style={styles.textEditProfile}>
                    Chỉnh sửa trang cá nhân
                  </Text>
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
        </View>
        {getListPost
          .map((Item, index) => (
            <View style={styles.body} key={index}>
              <HomeItem
                time={Item.createdAt}
                textContent={Item.described}
                Img={Item.images}
                idPost={Item._id}
                idUser={getInfor._id}
                countLikes={Item.like}
                countComments={Item.countComments}
                liked={Item.isLike}
                page="infor"
              />
            </View>
          ))
          .reverse()}
      </ScrollView>
    </Layout>
  );
}

const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const SCREEN_WEIGHT = Math.round(Dimensions.get("window").width);
const margintop =
  SCREEN_HEIGHT > 700 ? 0.12 * SCREEN_HEIGHT : 0.08 * SCREEN_HEIGHT;

const styles = StyleSheet.create({
  container: {
    marginTop: -0.5,
    marginBottom: 130,
  },
  inforHeader: {
    backgroundColor: "#fff",
    marginBottom: 15,
    paddingBottom: 15,
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
  camera: {
    position: "absolute",
    top: 0.3 * SCREEN_HEIGHT,
    left: 0.35 * SCREEN_WEIGHT,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#ccc",
  },
  inforContent: {
    marginHorizontal: 10,
  },
  textFullName: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  buttonVideo: {
    flexDirection: "row",
    backgroundColor: "#0066ff",
    paddingVertical: 8,
    borderRadius: 5,
    justifyContent: "center",
    marginBottom: 10,
  },
  textButtonVideo: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 5,
  },
  itemProfile: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editProfile: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ccc",
    marginRight: 10,
    borderRadius: 5,
  },
  textEditProfile: {
    marginLeft: 5,
    fontSize: 16,
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

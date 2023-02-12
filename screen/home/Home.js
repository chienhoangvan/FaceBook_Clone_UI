import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Layout from "../../components/Layout";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import HomeItem from "../../components/HomeItem";

function Home({ navigation, route }) {
  const [getInfor, setGetInfor] = useState([]);
  const [getListPost, setGetListPost] = useState([]);
  const [loading, setLoading] = useState(false);

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
          setGetInfor(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    showInfor();
    showListPost();
  }, [getListPost]);

  const showListPost = async () => {
    const token = await AsyncStorage.getItem("id_token");
    return fetch(`https://severfacebook.up.railway.app/api/v1/posts/list`, {
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
        <View style={styles.infor}>
          <View style={styles.imageAvatar}>
            <Image
              source={{
                uri: getInfor.avatar,
              }}
              style={styles.avatar}
            />
          </View>
          <View style={styles.search}>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() =>
                navigation.navigate("AddPost", {
                  avatar: getInfor.avatar,
                  username: getInfor.username,
                })
              }>
              <Text style={styles.textSearch}>Bạn đang nghĩ gì?</Text>
            </TouchableOpacity>
          </View>
          <FontAwesome5 name="images" size={24} color="green" />
        </View>
        {getListPost
          .map((Item, index) => (
            <View style={styles.body} key={index}>
              <HomeItem
                time={Item.createdAt}
                textContent={Item.described}
                Img={Item.images}
                idPost={Item._id}
                idUser={Item.author}
                countComments={Item.countComments}
                countLikes={Item.like}
                liked={Item.isLike}
                // videos={Item.videos}
                page="home"
              />
            </View>
          ))
          .reverse()}
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 130,
  },
  infor: {
    height: 60,
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
    alignItems: "center",
  },
  avatar: {
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  search: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#ccc",
    marginHorizontal: 10,
    justifyContent: "center",
  },
  searchButton: {},
  textSearch: {
    paddingVertical: 7,
    paddingLeft: 20,
    fontSize: 18,
  },
  body: {
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  textbody: {
    backgroundColor: "#000",
    marginTop: 1000,
  },
});

export default Home;

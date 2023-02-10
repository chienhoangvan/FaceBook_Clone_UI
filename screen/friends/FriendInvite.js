import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import FriendItem from "../../components/FriendItem";
import Layout from "../../components/Layout";

export default function FriendInvite({ route }) {
  const navigation = useNavigation();
  const [listFriendInvite, setListFriendInvite] = useState([]);

  const getListFriendInvite = async () => {
    const token = await AsyncStorage.getItem("id_token");
    return fetch(
      "https://severfacebook.up.railway.app/api/v1/friends/get-requested-friend",
      {
        method: "POST",
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
          setListFriendInvite(response.data.friends);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getListFriendInvite();
  }, [navigation]);

  return (
    <Layout route={route.name}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Bạn bè</Text>
          <View style={styles.option}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("SuggestionFriend")}>
              <Text style={styles.text}>Gợi ý</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Friend")}>
              <Text style={styles.text}>Bạn bè</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.invite}>
            <Text style={styles.textInvite}>Lời mời kết bạn</Text>
            <Text style={styles.countInvite}>{listFriendInvite.length}</Text>
          </View>
          <View style={styles.listFriend}>
            <ScrollView showsHorizontalScrollIndicator={false}>
              {listFriendInvite.map((Friend, index) => (
                <View style={styles.friend} key={index}>
                  <FriendItem
                    cover_image={Friend.cover_image}
                    avatar={Friend.avatar}
                    mutual="1"
                    username={Friend.username}
                    text={"Chấp nhận"}
                    id={Friend._id}
                    time="{Item.time}"
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginBottom: 130,
    minHeight: "100%",
  },
  header: {
    marginHorizontal: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.5,
  },
  textHeader: {
    fontSize: 22,
    marginVertical: 10,
    fontWeight: "700",
  },
  option: {
    flexDirection: "row",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#ccc",
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: "center",
    borderRadius: 20,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
  //body
  body: {
    marginHorizontal: 15,
  },
  invite: {
    marginTop: 15,
    flexDirection: "row",
  },
  textInvite: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  countInvite: {
    color: "red",
    fontSize: 20,
    fontWeight: "700",
  },
});

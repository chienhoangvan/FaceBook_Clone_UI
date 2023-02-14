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
import { AntDesign } from "@expo/vector-icons";

import FriendItem from "../../components/FriendItem";

export default function SentInvite({ route }) {
  const [getInfor, setGetInfor] = useState([]);
  const [userGetInfor, setUserGetInfor] = useState([]);
  const navigation = useNavigation();

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
          setGetInfor(response.data.blocked_diary);
          response.data.blocked_diary.map((Item) => {
            userShowInfor(Item);
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const userShowInfor = async (idUser) => {
    const token = await AsyncStorage.getItem("id_token");
    return fetch(
      `https://severfacebook.up.railway.app/api/v1/users/show/${idUser}`,
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
          setUserGetInfor((state) => [...state, response.data]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //   console.log(userGetInfor);

  useEffect(() => {
    showInfor();
  }, [navigation]);

  const cancelBlock = async (idUserBlock) => {
    const values = {
      user_id: idUserBlock,
      type: false,
    };
    const token = await AsyncStorage.getItem("id_token");
    return fetch(
      `https://severfacebook.up.railway.app/api/v1/users/set-block-diary`,
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
          alert("Load lỗi");
        }
      })
      .then((response) => {
        if (response !== undefined) {
          console.log(response);
          alert(response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
        <Text style={styles.textHeader}>Những người bạn đã block</Text>
      </View>
      <ScrollView style={styles.body}>
        <View style={styles.listFriend}>
          <ScrollView showsHorizontalScrollIndicator={true}>
            {userGetInfor.map((ItemBlock, index) => (
              <View style={styles.body2}>
                <TouchableOpacity style={styles.content}>
                  <Image
                    source={{ uri: ItemBlock.avatar }}
                    style={styles.image}></Image>
                  <View style={styles.user}>
                    <Text style={styles.textName}>{ItemBlock.username}</Text>
                    <Text style={styles.textFr}>{5} bạn chung</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => cancelBlock(ItemBlock._id)}>
                  <Text>Hủy</Text>
                </TouchableOpacity>
              </View>
            ))}
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
  body2: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 100,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  user: {
    paddingLeft: 10,
  },
  textName: {
    fontSize: 18,
    fontWeight: "600",
  },
  areaButton: {
    flexDirection: "row",
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
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

export default function FriendItem({
  avatar,
  username,
  mutual,
  id,
  cover_image,
  text,
}) {
  const navigation = useNavigation();
  const [request, setRequest] = useState();

  const check = async () => {
    const token = await AsyncStorage.getItem("id_token");
    return fetch(
      `https://severfacebook.up.railway.app/api/v1/friends/status/${id}`,
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
          setRequest(response.data.status);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    check();
  }, [request]);

  const confirm = async (values) => {
    let options = {
      user_id: id,
      is_accept: values,
    };
    const token = await AsyncStorage.getItem("id_token");
    return fetch(
      "https://severfacebook.up.railway.app/api/v1/friends/set-accept",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: "token " + token,
        },
        body: JSON.stringify(options),
      }
    )
      .then((response) => {
        const statusCode = response.status;
        if (statusCode === 200) {
          navigation.navigate("Friend");
        } else {
          alert("Sever lag");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addFriend = async () => {
    let options = {
      user_id: id,
    };
    const token = await AsyncStorage.getItem("id_token");
    return fetch(
      "https://severfacebook.up.railway.app/api/v1/friends/set-request-friend ",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: "token " + token,
        },
        body: JSON.stringify(options),
      }
    )
      .then((response) => {
        const statusCode = response.status;
        if (statusCode === 200) {
          setRequest(true);
        } else {
          alert("Sever lag");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlRequest = () => {
    if (text === "Thêm bạn bè") {
      addFriend();
    } else {
      confirm("1");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.itemFriend}>
        <TouchableOpacity
          style={styles.content}
          onPress={() =>
            navigation.navigate("InforFriend", {
              avatar: avatar,
              idUser: id,
              username: username,
              cover_image: cover_image,
              text: text,
            })
          }>
          <Image source={{ uri: avatar }} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.user}>
          <Text style={styles.textName}>{username}</Text>
          {/* <Text style={styles.textFr}>{mutual} bạn chung</Text> */}
          {request === "sent" ? (
            <View style={styles.button}>
              <Text style={styles.textButton}>Đã gửi yêu cầu</Text>
            </View>
          ) : (
            <View style={styles.areaButton}>
              <TouchableOpacity
                style={styles.buttonA}
                onPress={() => handlRequest()}>
                <Text style={styles.textA}>{text}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonB}>
                <Text style={styles.textB}>Xóa</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const SCREEN_WEIGHT = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  itemFriend: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  //user
  image: {
    width: 90,
    height: 90,
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
  button: {
    marginVertical: 5,
    backgroundColor: "#ccc",
    paddingVertical: 8,

    alignItems: "center",
    borderRadius: 8,
    width: SCREEN_WEIGHT - 130,
  },
  textButton: {
    fontSize: 18,
    textAlign: "center",
  },
  buttonA: {
    marginVertical: 5,
    backgroundColor: "#1877f2",
    paddingTop: 8,
    alignItems: "center",
    borderRadius: 8,
    width: (SCREEN_WEIGHT - 140) / 2,
  },

  buttonB: {
    marginVertical: 5,
    backgroundColor: "#ccc",
    paddingVertical: 8,
    marginLeft: 10,
    alignItems: "center",
    borderRadius: 8,
    width: (SCREEN_WEIGHT - 140) / 2,
  },

  textA: {
    color: "#fff",
    fontSize: 18,
  },
  textB: {
    fontSize: 18,
  },
});

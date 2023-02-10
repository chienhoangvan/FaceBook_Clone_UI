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
} from "react-native";

export default function DeletePost({
  idPost,
  modalVisible,
  setModalVisible,
  navigation,
}) {
  const deletePost = async () => {
    const token = await AsyncStorage.getItem("id_token");
    return fetch(
      `https://severfacebook.up.railway.app/api/v1/posts/delete/${idPost}`,
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
          alert("Xóa không thành công");
        }
      })
      .then((response) => {
        if (response !== undefined) {
          alert("Xóa bài viết thành công");
          navigation.replace("Information");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Bạn có chắc chắn muốn xóa bài viết này không ?
              </Text>
              <View style={styles.groupButton}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible), deletePost();
                  }}>
                  <Text style={styles.textStyle}>Xác Nhận Xóa</Text>
                </TouchableOpacity>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Hủy</Text>
                </Pressable>
              </View>
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
    // justifyContent: "space-between",
    height: SCREEN_HEIGHT,
    position: "absolute",
    zIndex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  centeredView: {
    position: "absolute",
    bottom: 0,
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    shadowColor: "#000",
    paddingVertical: 35,
    alignItems: "center",
    backgroundColor: "white",
    width: SCREEN_WIDTH - 40,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  groupButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    elevation: 2,
    width: 150,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    textAlign: "center",
    color: "#fff",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

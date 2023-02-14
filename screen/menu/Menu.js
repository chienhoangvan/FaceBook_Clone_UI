import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Layout from "../../components/Layout";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
  StatusBar,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function Information({ navigation, route }) {
  const [getInfor, setGetInfor] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentPassword, onChangeCurrentPassword] = useState("");
  const [newPassword, onChangeNewPassword] = useState("");
  const [againNewPassword, onChangeAgainNewPassword] = useState("");

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

  const handleChagePass = async () => {
    if (newPassword != againNewPassword) {
      alert("Mật khẩu nhập lại không trùng nhau");
    } else {
      const token = await AsyncStorage.getItem("id_token");
      const values = {
        currentPassword: currentPassword,
        newPassword: newPassword,
      };
      return fetch(
        "https://severfacebook.up.railway.app/api/v1/users/change-password",
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
            alert("Cập nhật mật khẩu thành công");
            navigation.navigate("Login");
          } else {
            alert("Mật khẩu cũ không chính xác");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const logout = async () => {
    try {
      // await AsyncStorage.removeItem("id_token");
      setIsLoggedIn(false);
      navigation.replace("Login");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      showInfor();
    }
  }, []);

  return (
    <Layout route={route.name}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.inputForm}>
              <View style={styles.inputPass}>
                <TextInput
                  value={currentPassword}
                  onChangeText={onChangeCurrentPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                  secureTextEntry={visible === false ? true : false}
                  placeholder="Mật khẩu hiện tại"
                  style={styles.input}
                />
                {visible ? (
                  <FontAwesome
                    name="eye"
                    size={24}
                    color="black"
                    style={styles.iconEye}
                    onPress={() => setVisible(!visible)}
                  />
                ) : (
                  <FontAwesome
                    name="eye-slash"
                    size={24}
                    color="black"
                    style={styles.iconEye}
                    onPress={() => setVisible(!visible)}
                  />
                )}
              </View>
              <View style={styles.inputPass}>
                <TextInput
                  value={newPassword}
                  onChangeText={onChangeNewPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                  secureTextEntry={visible === false ? true : false}
                  placeholder="Mật khẩu mới"
                  style={styles.input}
                />
                {visible ? (
                  <FontAwesome
                    name="eye"
                    size={24}
                    color="black"
                    style={styles.iconEye}
                    onPress={() => setVisible(!visible)}
                  />
                ) : (
                  <FontAwesome
                    name="eye-slash"
                    size={24}
                    color="black"
                    style={styles.iconEye}
                    onPress={() => setVisible(!visible)}
                  />
                )}
              </View>
              <View style={styles.inputPass}>
                <TextInput
                  value={againNewPassword}
                  onChangeText={onChangeAgainNewPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                  secureTextEntry={visible === false ? true : false}
                  placeholder="Nhập lại mật khẩu mới"
                  style={styles.input}
                />
                {visible ? (
                  <FontAwesome
                    name="eye"
                    size={24}
                    color="black"
                    style={styles.iconEye}
                    onPress={() => setVisible(!visible)}
                  />
                ) : (
                  <FontAwesome
                    name="eye-slash"
                    size={24}
                    color="black"
                    style={styles.iconEye}
                    onPress={() => setVisible(!visible)}
                  />
                )}
              </View>
            </View>
            <View style={styles.groupButton}>
              <TouchableOpacity
                style={[styles.button1, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button2, styles.buttonClose]}
                onPress={() => {
                  handleChagePass();
                }}>
                <Text style={styles.textStyle}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.back}>
              <Text style={styles.textHeader}>Menu</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.profile}
              onPress={() => {
                navigation.navigate("Information");
              }}>
              <Image style={styles.avt} source={{ uri: getInfor.avatar }} />
              <View style={styles.user}>
                <Text style={styles.name}>{getInfor.username}</Text>
                <Text style={styles.mes}>Xem trang cá nhân của bạn</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "90%",
              height: 2,
              backgroundColor: "#cccccc",
              marginTop: 10,
              marginLeft: "5%",
            }}
          />
          <View>
            <TouchableOpacity
              style={styles.itemset}
              onPress={() => {
                {
                  navigation.navigate("Messenger");
                }
              }}>
              <Image
                style={styles.settingimg}
                source={{
                  uri: "https://play-lh.googleusercontent.com/ldcQMpP7OaVmglCF6kGas9cY_K0PsJzSSosx2saw9KF1m3RHaEXpH_9mwBWaYnkmctk=w240-h480-rw",
                }}></Image>
              <Text style={styles.nameset}>Tin nhắn</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.itemset}
              onPress={() => {
                navigation.navigate("Friend");
              }}>
              <Image
                style={styles.settingimg}
                source={{
                  uri: "https://icon-library.com/images/group-icon-png/group-icon-png-15.jpg",
                }}></Image>
              <Text style={styles.nameset}>Bạn bè</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.itemset}>
              <Image
                style={styles.settingimg}
                source={{
                  uri: "https://www.nicepng.com/png/full/62-623833_facebook-messenger-instant-video-linkedin-circle-logo-transparent.png",
                }}></Image>
              <Text style={styles.nameset}>Video</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.itemset}>
              <Image
                style={styles.settingimg}
                source={{
                  uri: "https://cdn.shopify.com/app-store/listing_images/8b74e59f367bfafc59f6a4580630f882/icon/CPqWiLf0lu8CEAE=.png",
                }}></Image>
              <Text style={styles.nameset}>Đã lưu</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.itemset}
              onPress={() => {
                setModalVisible(true);
              }}>
              <Image
                style={styles.settingimg}
                source={{
                  uri: "https://img.lovepik.com/free-png/20210926/lovepik-lock-icon-png-image_401486789_wh1200.png",
                }}></Image>
              <Text style={styles.nameset}>Đổi mật khẩu</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.itemset} onPress={logout}>
              <Image
                style={styles.settingimg}
                source={{
                  uri: "http://ttdesignco.com/assets/img/common/logout.png",
                }}
              />
              <Text style={styles.nameset}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
}
const SCREEN_WEIGHT = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 200,
    backgroundColor: "#fff",
    height: 2000,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 10,
    marginTop: -10,
  },
  back: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  textHeader: {
    fontSize: 25,
    fontWeight: "600",
    marginLeft: 10,
  },
  group: {
    flexDirection: "row",
  },
  iconHeader: {
    alignItems: "center",
    backgroundColor: "#ccc",
    borderRadius: 1000,
    marginRight: 10,
    padding: 5,
  },
  profile: {
    marginTop: -4,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  avt: {
    marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  user: {
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
  },
  mes: {
    textAlign: "left",
    marginTop: 6,
    fontSize: 14,
    opacity: 0.8,
  },
  itemset: {
    marginTop: 20,
    flexDirection: "row",
    width: "100%",
  },
  settingimg: {
    marginLeft: 10,
    width: 35,
    height: 35,
    borderRadius: 100,
  },
  nameset: {
    textAlign: "left",
    marginLeft: 10,
    marginTop: 5,
    fontSize: 20,
    opacity: 0.9,
  },
  // Modal
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    paddingTop: StatusBar.currentHeight,
  },
  modalView: {
    bottom: 2,
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputForm: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    fontSize: 20,
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  inputPass: {
    position: "relative",
    justifyContent: "center",
    width: SCREEN_WEIGHT - 60,
  },
  iconEye: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  footer: {
    alignItems: "center",
  },
  groupButton: {
    flexDirection: "row",
    marginHorizontal: 20,
  },
  button1: {
    marginVertical: 25,
    backgroundColor: "#1877f2",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 8,
    textAlign: "center",
    width: (SCREEN_WEIGHT - 70) / 2,
    marginRight: 10,
  },
  button2: {
    marginVertical: 25,
    backgroundColor: "#1877f2",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 8,
    textAlign: "center",
    width: (SCREEN_WEIGHT - 70) / 2,
  },
  textButton: {
    color: "#fff",
    fontSize: 20,
  },
  textStyle: {
    paddingHorizontal: 10,
    color: "#fff",
  },
});
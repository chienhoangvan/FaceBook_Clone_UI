import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Text,
  View,
  Image,
  TextInput,
  StatusBar,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";

import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ShowInfor({ navigation, route }) {
  const { getInfor } = route.params;
  // if(getInfor.birthday === undefined){

  // }
  const [coverAvatar, setCoverAvatar] = useState(`${getInfor.cover_image}`);
  const [avatar, setAvatar] = useState(`${getInfor.avatar}`);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState(getInfor.birthday);

  const pickAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const pickCoverAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [7, 4],
      quality: 1,
    });
    if (!result.canceled) {
      setCoverAvatar(result.assets[0].uri);
    }
  };

  const change = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getFullYear() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate();
    setText(fDate);
  };

  const showMode = (currentDate) => {
    setShow(true);
    setMode(currentDate);
  };

  const handleShowInfor = async (values) => {
    let avatarx;
    let coverAvatarx;
    const token = await AsyncStorage.getItem("id_token");

    const fileName = "img-" + new Date().getTime();
    const storage = getStorage();
    const my_ref = ref(storage, `avatar/${fileName}.jpg`);
    const metadata = {
      contentType: "image/jpeg",
    };
    const avatarr = await fetch(avatar);
    const bytes = await avatarr.blob();
    await uploadBytes(my_ref, bytes, metadata)
      .then(async (res) => {
        if (res.metadata) {
          await getDownloadURL(my_ref)
            .then((url) => {
              avatarx = url;
            })
            .catch((error) => console.log(error));
        } else {
          console.log("UPLOAD FILE ERROR!");
        }
      })
      .catch((error) => console.log(error));

    const my_reff = ref(storage, `coverAvatar/${fileName}.jpg`);
    const coverAvatarr = await fetch(coverAvatar);
    const bytess = await coverAvatarr.blob();
    await uploadBytes(my_reff, bytess, metadata)
      .then(async (res) => {
        if (res.metadata) {
          await getDownloadURL(my_reff)
            .then((url) => {
              coverAvatarx = url;
            })
            .catch((error) => console.log(error));
        } else {
          console.log("UPLOAD FILE ERROR!");
        }
      })
      .catch((error) => console.log(error));
    // handlegetImage(avatar, "avatar");
    // console.log(avatar);
    // handlegetImage(coverAvatar, "coverAvatar");
    values = {
      ...values,
      birthday: text,
      avatar: avatarx,
      cover_image: coverAvatarx,
    };
    return fetch("https://severfacebook.up.railway.app/api/v1/users/edit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: "token " + token,
      },
      body: JSON.stringify(values),
    })
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
          alert("Chỉnh sửa thành công");
          navigation.replace("Information");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Formik
      initialValues={{
        username: getInfor.username,
        city: getInfor.city,
        address: getInfor.address,
        description: getInfor.description,
        gender: getInfor.gender,
        birthday: getInfor.birthday,
      }}
      onSubmit={handleShowInfor}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.contentHeader}>
              <AntDesign
                name="arrowleft"
                size={28}
                color="black"
                onPress={() => navigation.goBack()}
              />
              <Text style={styles.textHeader}>Chỉnh sửa trang cá nhân</Text>
            </View>
          </View>
          <ScrollView>
            <View style={styles.content}>
              <View style={styles.item}>
                <View style={styles.headerItem}>
                  <Text style={styles.textHeaderItem}>Ảnh đại diện</Text>
                  <TouchableOpacity
                    style={styles.buttonEditItem}
                    onPress={pickAvatar}>
                    <Text style={styles.editTextItem}>Chỉnh sửa</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.image}>
                  {avatar && (
                    <Image source={{ uri: avatar }} style={styles.avatar} />
                  )}
                </View>
              </View>
              <View style={styles.item}>
                <View style={styles.headerItem}>
                  <Text style={styles.textHeaderItem}>Ảnh bìa</Text>
                  <TouchableOpacity
                    style={styles.buttonEditItem}
                    onPress={pickCoverAvatar}>
                    <Text style={styles.editTextItem}>Chỉnh sửa</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  {coverAvatar && (
                    <Image
                      source={{ uri: coverAvatar }}
                      style={styles.coverAvatar}
                    />
                  )}
                </View>
              </View>
              <View style={styles.item}>
                <View style={styles.headerItem}>
                  <Text style={styles.textHeaderItem}>Tiểu sử</Text>
                  <TouchableOpacity style={styles.buttonEditItem}>
                    <Text style={styles.editTextItem}>Chỉnh sửa</Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  disabled={true}
                  placeholder="Description"
                  style={styles.textDecription}
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={values.description}
                />
              </View>
              <View style={styles.item}>
                <View style={styles.headerItem}>
                  <Text style={styles.textHeaderItem}>Chi tiết</Text>
                  <TouchableOpacity style={styles.buttonEditItem}>
                    <Text style={styles.editTextItem}>Chỉnh sửa</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <View style={styles.group}>
                    <MaterialCommunityIcons
                      name="account-edit"
                      size={24}
                      color="#E4E6EB"
                      style={styles.icon}
                    />
                    <TextInput
                      disabled={true}
                      placeholder="Họ và tên"
                      style={styles.textInput}
                      onChangeText={handleChange("username")}
                      onBlur={handleBlur("username")}
                      value={values.username}
                    />
                  </View>
                  <View style={styles.group}>
                    <FontAwesome
                      name="home"
                      size={24}
                      color="#E4E6EB"
                      style={styles.icon}
                    />
                    <TextInput
                      disabled={true}
                      placeholder="Thành phố"
                      style={styles.textInput}
                      onChangeText={handleChange("city")}
                      onBlur={handleBlur("city")}
                      value={values.city}
                    />
                  </View>
                  <View style={styles.group}>
                    <FontAwesome
                      name="map-marker"
                      size={24}
                      color="#E4E6EB"
                      style={styles.icon}
                    />
                    <TextInput
                      disabled={true}
                      placeholder="Quê quán"
                      style={styles.textInput}
                      onChangeText={handleChange("address")}
                      onBlur={handleBlur("address")}
                      value={values.address}
                    />
                  </View>
                  <View style={styles.group}>
                    <Foundation
                      name="male-female"
                      size={24}
                      color="#E4E6EB"
                      style={styles.icon}
                    />
                    <View style={styles.picker}>
                      <Picker
                        onValueChange={handleChange("gender")}
                        onBlur={handleBlur("gender")}
                        selectedValue={values.gender}>
                        <Picker.Item
                          style={styles.pickerItem}
                          label="male"
                          value="male"
                        />
                        <Picker.Item
                          style={styles.pickerItem}
                          label="female"
                          value="female"
                        />
                      </Picker>
                    </View>
                  </View>
                  <View style={styles.group}>
                    <FontAwesome
                      name="birthday-cake"
                      size={24}
                      color="#E4E6EB"
                      style={styles.icon}
                    />
                    <TouchableOpacity
                      onPress={() => showMode("date")}
                      style={styles.textInput}>
                      <Text style={styles.textDate}>{text}</Text>
                    </TouchableOpacity>
                    {show && (
                      <DateTimePicker
                        testID="DateTimePicker"
                        value={date}
                        mode={mode}
                        display="default"
                        onChange={change}
                      />
                    )}
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.buttonSave}
                onPress={handleSubmit}>
                <Text style={styles.textSave}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}
    </Formik>
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
  header: {
    borderBottomColor: "#000",
    borderBottomWidth: 0.5,
  },
  contentHeader: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 15,
  },
  textHeader: {
    marginLeft: 5,
    fontSize: 18,
  },

  //body
  content: {
    marginHorizontal: 20,
  },
  item: {
    borderBottomColor: "#000",
    borderBottomWidth: 0.5,
  },
  headerItem: {
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textHeaderItem: {
    fontSize: 20,
    fontWeight: "700",
  },
  buttonEditItem: {},
  editTextItem: {
    fontSize: 18,
    fontWeight: "400",
    color: "#0066ff",
  },
  image: {
    alignItems: "center",
  },
  avatar: {
    height: 150,
    width: 150,
    marginBottom: 15,
    borderRadius: 200,
  },
  coverAvatar: {
    marginBottom: 15,
    borderRadius: 8,
    width: SCREEN_WIDTH - 40,
    height: (4 * (SCREEN_WIDTH - 40)) / 7,
  },
  textDecription: {
    fontSize: 16,
    marginBottom: 15,
  },
  //chi tiet
  group: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
  },
  icon: {
    width: 25,
    marginRight: 10,
  },
  textInput: {
    fontSize: 16,
    marginLeft: 6,
    width: SCREEN_WIDTH - 75,
  },
  picker: {
    width: SCREEN_WIDTH - 75,
    // borderBottomWidth: 1,
    marginVertical: -5,
  },
  pickerItem: {
    fontSize: 16,
  },

  buttonSave: {
    width: "100%",
    backgroundColor: "#0066ff",
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 15,
  },
  textSave: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    paddingVertical: 5,
  },
});

export default ShowInfor;

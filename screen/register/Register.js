import React, { useState } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import Checkbox from "expo-checkbox";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";

import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function Register({ navigation, route }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Ngày Sinh");
  const [visible, setVisible] = useState(false);
  const phoneRegExp = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  const { phonenumber } = route.params;

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required(),
    lastName: Yup.string().required(),
    password: Yup.string()
      .min(6, "Mật khẩu quá ngắn!")
      .max(12, "Mật khẩu quá dài!")
      .required("Vui lòng điền!"),
    phonenumber: Yup.string()
      .required("Vui lòng điền!")
      .matches(phoneRegExp, "Số điện thoại không\nđúng định dạng"),
  });

  const handleRegister = async (values) => {
    // var token = await AsyncStorage.getItem("id_token");
    console.log(values);
    return fetch("https://severfacebook.up.railway.app/api/v1/users/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // authorization: "token " + token,
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        console.log(values);
        navigation.navigate("Login");
        // return console.log(values);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const change = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setText(fDate);
  };

  const showMode = (currentDate) => {
    setShow(true);
    setMode(currentDate);
  };

  return (
    <Formik
      initialValues={{
        // userName: "",
        username: "",
        lastName: "",
        phonenumber,
        password: "",
        birthday: "",
        gender: "Nam",
      }}
      validationSchema={LoginSchema}
      onSubmit={handleRegister}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <Ionicons
            name="arrow-back-outline"
            size={35}
            color="black"
            style={styles.back}
            onPress={() => navigation.goBack()}
          />
          <View style={styles.header}>
            <Text style={styles.textHeaderTop}>Đăng ký</Text>
            <Text style={styles.textHeaderBottom}>Nhanh chóng và dễ dàng</Text>
          </View>
          <View style={styles.body}>
            <View style={styles.group}>
              <View style={styles.groupInput}>
                <TextInput
                  placeholder="Họ"
                  style={styles.input1}
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  value={values.lastName}
                  required
                />
                <TextInput
                  disabled={true}
                  placeholder="Tên"
                  style={styles.input1}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />
              </View>
              <View style={styles.phoneNumber}>
                <Text style={styles.textPhone}>{phonenumber}</Text>
                {/* <TextInput
                  placeholder="Số điện thoại di dộng"
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={handleChange("phonenumber")}
                  onBlur={handleBlur("phonenumber")}
                  value={phoneNumber}
                /> */}
                {/* {errors.phonenumber && touched.phonenumber ? (
                  <Text style={styles.errorPhone}>{errors.phonenumber}</Text>
                ) : null} */}
              </View>
              {/* <View style={styles.checkBoxView}> */}
              {/* <Checkbox
                  value={isChecked}
                  color={isChecked ? "#00A400" : undefined}
                /> */}
              {/* <TouchableOpacity
                  style={styles.buttonCheck}
                  onPress={() => {
                    navigation.navigate("OtpPhone", {
                      phoneNumber: values.phonenumber,
                    });
                  }}>
                </TouchableOpacity> */}
              {/* </View> */}
              <View style={styles.inputPass}>
                <TextInput
                  autoComplete="password"
                  secureTextEntry={visible === false ? true : false}
                  placeholder="Mật khẩu"
                  style={styles.input}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                {errors.password && touched.password ? (
                  <Text style={styles.errorPass}>{errors.password}</Text>
                ) : null}
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
              <TouchableOpacity
                onPress={() => showMode("date")}
                style={styles.date}>
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
              <View style={styles.picker}>
                <Picker
                  // selectedValue={selectedValue}
                  // onValueChange={(itemValue, itemIndex) =>
                  //   setSelectedValue(itemValue)
                  // }
                  onValueChange={handleChange("gender")}
                  onBlur={handleBlur("gender")}
                  selectedValue={values.gender}>
                  <Picker.Item
                    style={styles.pickerItem}
                    label="Nam"
                    value="Nam"
                  />
                  <Picker.Item
                    style={styles.pickerItem}
                    label="Nữ"
                    value="Nữ"
                  />
                </Picker>
              </View>
            </View>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={{
                backgroundColor: "rgba(0, 164, 0, 1)",
                paddingVertical: 15,
                alignItems: "center",
                borderRadius: 8,
              }}
              onPress={handleSubmit}>
              <Text style={styles.textButton}>Đăng Ký</Text>
            </TouchableOpacity>
          </View>
          <StatusBar style="auto" />
        </View>
      )}
    </Formik>
  );
}

const screenHeight =
  Math.round(Dimensions.get("window").height) > 700
    ? 700
    : Math.round(Dimensions.get("window").height);
const marginx =
  Math.round(Dimensions.get("window").height) > 700
    ? (Math.round(Dimensions.get("window").height) - 700) / 3
    : 0;
const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
    alignItems: "center",
    flex: 1,
  },
  back: {
    marginRight: "80%",
    marginTop: 5,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    height: screenHeight * 0.2,
    marginVertical: marginx,
  },
  textHeaderTop: {
    fontSize: 35,
    fontWeight: "700",
  },
  textHeaderBottom: {
    fontSize: 25,
  },
  body: {
    width: "80%",
    height: screenHeight * 0.45,
  },
  group: {},
  groupInput: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input1: {
    width: "45%",
    height: 50,
    fontSize: 20,
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  phoneNumber: {
    position: "relative",
    marginBottom: 15,
    marginTop: 10,
  },
  textPhone: {
    fontSize: 20,
    borderBottomWidth: 1,
    height: 40,
  },
  input: {
    height: 50,
    fontSize: 20,
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  errorPhone: {
    color: "red",
    position: "absolute",
    top: -5,
    right: "0%",
  },
  // checkBoxView: {
  //   flexDirection: "row",
  //   marginBottom: 3,
  //   justifyContent: "space-between",
  // },
  // buttonCheck: {
  //   backgroundColor: "#00A400",
  //   borderRadius: 6,
  //   paddingHorizontal: 5,
  //   paddingVertical: 2,
  // },
  // textButtonCheck: {
  //   color: "#fff",
  // },
  inputPass: {
    position: "relative",
    justifyContent: "center",
  },
  errorPass: {
    color: "red",
    position: "absolute",
    top: -5,
    right: "10%",
  },
  iconEye: {
    position: "absolute",
    right: 0,
    top: 20,
  },
  date: {
    height: 50,
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  textDate: {
    fontSize: 20,
    marginTop: 10,
  },
  picker: {
    height: 50,
    borderBottomWidth: 1,
    // marginBottom: 15,
    // marginBottom: 20,
  },
  pickerItem: {
    fontSize: 20,
  },
  footer: {
    width: "80%",
    height: screenHeight * 0.25,
    justifyContent: "center",
  },
  textButton: {
    color: "#fff",
    fontSize: 20,
  },
});

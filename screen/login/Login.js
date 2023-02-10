import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function Login({ navigation }) {
  const [visible, setVisible] = useState(false);

  const handleLogin = async (values) => {
    // var token = await AsyncStorage.getItem("id_token");
    return fetch("https://severfacebook.up.railway.app/api/v1/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // authorization: "token " + token,
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        const statusCode = response.status;
        if (statusCode === 200) {
          return (response = response.json());
        } else {
          alert(
            "Số điện thoại hoặc mật khẩu không chính xác\n " +
              "Vui lòng đăng nhập lại"
          );
        }
      })
      .then((response) => {
        if (response !== undefined) {
          AsyncStorage.setItem("id_token", response.token);
          // console.log(AsyncStorage.getItem("AccessToken"));
          // console.log(t);
          navigation.replace("Home");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Formik
      initialValues={{
        phonenumber: "",
        password: "",
      }}
      onSubmit={handleLogin}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <FontAwesome name="facebook-official" size={90} color="#1877f2" />
          </View>
          <View style={styles.body}>
            <View style={styles.inputForm}>
              <TextInput
                style={styles.input}
                placeholder="Số Điện Thoại"
                keyboardType="numeric"
                onChangeText={handleChange("phonenumber")}
                onBlur={handleBlur("phonenumber")}
                value={values.phonenumber}
              />
              <View style={styles.inputPass}>
                <TextInput
                  autoCapitalize="none"
                  autoComplete="password"
                  secureTextEntry={visible === false ? true : false}
                  placeholder="Mật khẩu"
                  style={styles.input}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
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
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.textButton}>Đăng Nhập</Text>
            </TouchableOpacity>
            <View style={styles.seperate}>
              <View style={styles.itemSeperate}></View>
              <Text>hoặc</Text>
              <View style={styles.itemSeperate}></View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.footer}
            onPress={() => navigation.navigate("OtpPhone")}>
            <Text style={styles.textFooter}>Tạo tài khoản Facebook mới</Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
        </SafeAreaView>
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
    ? (Math.round(Dimensions.get("window").height) - 700) / 2
    : 0;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: marginx,
  },
  header: {
    height: screenHeight * 0.4,
    justifyContent: "center",
  },
  body: {
    width: "80%",
    height: screenHeight * 0.4,
  },
  input: {
    height: 50,
    fontSize: 20,
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  inputPass: {
    position: "relative",
    justifyContent: "center",
  },
  iconEye: {
    position: "absolute",
    right: 0,
    top: 12,
  },
  button: {
    marginVertical: 25,
    backgroundColor: "#1877f2",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 8,
  },
  textButton: {
    color: "#fff",
    fontSize: 20,
  },
  seperate: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemSeperate: {
    backgroundColor: "#000",
    height: 2,
    width: "43%",
  },
  footer: {
    backgroundColor: "#42B72A",
    padding: 10,
    borderRadius: 10,
  },
  textFooter: {
    fontSize: 15,
    color: "#fff",
  },
});

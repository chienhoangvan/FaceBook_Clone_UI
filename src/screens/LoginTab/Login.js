import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";

export default function Login({ navigation }) {
  const [visible, setVisible] = useState(false);

  return (
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
          />
          <View style={styles.inputPass}>
            <TextInput
              autoCapitalize="none"
              autoComplete="password"
              secureTextEntry={visible === false ? true : false}
              placeholder="Mật khẩu"
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}>
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
        onPress={() => navigation.navigate("Register")}>
        <Text style={styles.textFooter}>Tạo tài khoản Facebook mới</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
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
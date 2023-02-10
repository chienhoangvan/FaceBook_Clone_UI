import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  StyleSheet,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../config";
import firebase from "firebase/compat/app";

const OtpPhone = ({ route, navigation }) => {
  const [code, setCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+84 ");
  const [counter, setCounter] = useState(60);
  const [show, setShow] = useState(false);
  const [verification, setVerification] = useState(null);
  const recaptchaVerifier = useRef(null);
  let timeID = useRef();

  // const phonenumber = "+84 " + phoneNumber.substr(1, phoneNumber.length);

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerification);
  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verification,
      code
    );

    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        setCode("");
        navigation.replace("Register", {
          phonenumber: 0 + phoneNumber.substr(4),
        });
      })
      .catch((error) => {
        // alert("login success");
      });
  };

  if (counter == 0) {
    clearInterval(timeID.current);
    setCounter(60);
    setShow(false);
  }

  const start = () => {
    setShow(true);
    console.log(show);
    timeID.current = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <View style={styles.header}>
        <Text style={styles.textHeader}>Đăng Ký Bằng Mã Xác thực </Text>
      </View>
      <View style={styles.body}>
        <View style={styles.group}>
          <TextInput
            placeholder="Nhập số điện thoại"
            onChangeText={setPhoneNumber}
            keyboardType="number-pad"
            style={styles.inputCode}
            defaultValue={phoneNumber}
          />
          <TouchableOpacity
            onPress={() => {
              sendVerification();
              start();
            }}
            disabled={show}
            style={{
              marginTop: 20,
              padding: 10,
              backgroundColor: "#1877f2",
              borderRadius: 5,
              opacity: show ? 0.4 : 1,
            }}>
            <Text style={styles.textButton}>Gửi mã xác thực</Text>
          </TouchableOpacity>
          {show && <Text style={styles.counter}> {counter}</Text>}
        </View>
        <TextInput
          placeholder="Xác thực lại code"
          onChangeText={setCode}
          keyboardType="number-pad"
          style={styles.inputCode}
        />
        <TouchableOpacity onPress={confirmCode} style={styles.buttonConf}>
          <Text style={styles.textButton}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    paddingTop: marginx,
    backgroundColor: "#fff",
    alignItems: "center",
    flex: 1,
  },
  header: {
    marginTop: "20%",
    marginBottom: "5%",
    marginHorizontal: 40,
  },
  textHeader: {
    fontSize: 30,
    fontWeight: "600",
  },
  body: {
    width: "80%",
    paddingTop: 20,
  },
  textPhone: {
    borderBottomWidth: 1,
    paddingVertical: 8,
    fontSize: 20,
    textAlign: "center",
  },
  group: {
    position: "relative",
  },
  buttonPhone: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#1877f2",
    borderRadius: 5,
  },
  buttonConf: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#1877f2",
    borderRadius: 5,
  },
  textButton: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
  },
  counter: {
    position: "absolute",
    bottom: 10,
    right: 20,
    fontSize: 16,
    color: "#fff",
  },
  inputCode: {
    borderBottomWidth: 1,
    paddingVertical: 8,
    marginTop: "10%",
    fontSize: 20,
  },
});

export default OtpPhone;

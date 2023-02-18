import { StyleSheet,
    Text, 
    View,  
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Dimensions,
    ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Friend } from "../../components/Messenger";
import React, { useState } from "react";
export default function ChangePass({ navigation, route }) {

  const [selected, setSelected] = useState(route);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentPassword, onChangeCurrentPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [newPassword, onChangeNewPassword] = useState("");
  const [againNewPassword, onChangeAgainNewPassword] = useState("");



  const handleChagePass = async () => {
          if (newPassword == "" || againNewPassword == "" || onChangeNewPassword == "") {
            alert("Vui lòng nhập đủ thông tin")
          } else if (newPassword == currentPassword) {
            alert("Mật khẩu mới phải khác mật khẩu cũ")
          }else if(newPassword != againNewPassword) {
            alert("Mật khẩu nhập lại không đúng");
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


  return (
    <View style={styles.container}>
     <View style={styles.header}>
              <View style={styles.contentHeader}>
                  <AntDesign
                  name="arrowleft"
                  size={28}
                  color="black"
                  onPress={() => navigation.goBack()}
                  />
                  <Text style={styles.textHeader}>Đổi mật khẩu</Text>
                   </View>
              </View>

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
    <View style={styles.viewButton}>
      <TouchableOpacity
        style={[styles.button, styles.buttonClose]}
        onPress={() => {
          handleChagePass();
        }}>
        <Text style={styles.textButton}>Xác nhận</Text>
      </TouchableOpacity>
      <TouchableOpacity
              style={[styles.button2, styles.buttonClose]}
              onPress={() => navigation.goBack()}>
              <Text style={{fontSize : 18}}>Huỷ</Text>
      </TouchableOpacity>
      <TouchableOpacity>
          <Text style={{fontSize : 16, color : 'blue', marginVertical : 20, textDecorationLine: 'underline'}}>
                    Quên mật khẩu?
          </Text>
      </TouchableOpacity>
    </View>

  </View>
  );
}

const styles = StyleSheet.create({
      header: {
      justifyContent: "space-between",
          borderBottomColor: "#000",
          borderBottomWidth: 0.5,
          flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 10,
                  marginBottom: 10,
                  marginTop: 30,
        },
        contentHeader: {
          flexDirection: "row",
          marginVertical: 10,
          marginHorizontal: 15,

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
        marginLeft: 20,
      },
      inputForm: {
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
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
        width: "80%",
      },
      iconEye: {
        position: "absolute",
        right: 0,
        top: 12,
      },
      viewButton:{
        alignItems: "center"
      },
      button: {
        marginVertical: 25,
        backgroundColor: "#1877f2",
        paddingVertical: 15,
        alignItems: "center",
        borderRadius: 8,
        width: "80%",
        textAlign:"center"
      },
      button2: {
              backgroundColor: "#fff",
              paddingVertical: 15,
              alignItems: "center",
              borderRadius: 8,
              width: "80%",
              textAlign:"center",
              borderWidth: 0.5  ,
            },
      textButton: {
        color: "#fff",

        fontSize: 18,
      },
});

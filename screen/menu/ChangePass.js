import { StyleSheet,
    Text, 
    View,  
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Dimensions,
    ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Friend } from "../../components/Messenger";
import React, { useState } from "react";
export default function ChangePass({ navigation }) {
    const [visible, setVisible] = useState(false);
  return (
    <View style={styles.container}>
    <View style={styles.header}>
        <View style={styles.back}>
          <Ionicons
            name="arrow-back-sharp"
            size={28}
            color="black"
            onPress={() => navigation.goBack()}
          />
        </View>
    </View>
    <Text style={{fontSize: 21, marginLeft: 20, fontWeight: "400"}}>Trịnh Đạt</Text>
    <Text style={styles.textHeader}>Đổi mật khẩu</Text>
    <View style={styles.inputForm}>
            <View style={styles.inputPass}>
                <TextInput
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
                <TouchableOpacity style={styles.button}>
                <Text style={styles.textButton}>Đăng Nhập</Text>
                </TouchableOpacity>
            </View>
            
        </View>
  );
}

const styles = StyleSheet.create({
    header: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        marginBottom: 10,
        marginTop: 30,
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
      textButton: {
        color: "#fff",
        fontSize: 20,
      },
});

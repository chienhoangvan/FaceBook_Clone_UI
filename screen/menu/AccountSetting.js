import React, { useState, useEffect } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Text,
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function AccountSetting({children,  navigation, route }) {
//  const { getInfor } = route.params;

  return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
          <View style={styles.contentHeader}>
              <AntDesign
              name="arrowleft"
              size={28}
              color="black"
              onPress={() => navigation.goBack()}
              />
              <Text style={styles.textHeader}>Cài đặt</Text>
               </View>
          </View>

          <View style={{  flexDirection: 'column', marginRight: 3 ,paddingVertical: 12,}}>
              <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Cài đặt tài khoản</Text>
                      <Text style={{ fontSize: 16, color: '#808080', top: -2 }}>
                          Quản lí thông tin về bạn, các khoản thanh toán
                          và danh bạ của bạn cũng như tài khoản nói chung.
                      </Text>
              </View>
              <TouchableOpacity style={styles.item}
                       onPress={() => navigation.navigate('PersonalInfor')}
              >
                      <Image style={{ width: 40, height: 40 }}
                                                       source={require('./source/user_circle.png')} />
                      <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Thông tin cá nhân</Text>
                              <Text style={{ fontSize: 15, color: '#808080', top: -2 }}>
                                  Cập nhật tên, số điện thoại và địa chỉ email của bạn
                              </Text>
                      </View>
              </TouchableOpacity>
          </View>

           <View style={{  flexDirection: 'column', marginRight: 3 ,paddingVertical: 12,}}>
                <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Bảo mật</Text>
                        <Text style={{ fontSize: 16, color: '#808080', top: -2 }}>
                            Quản lí thông tin về bạn, các khoản thanh toán
                            và danh bạ của bạn cũng như tài khoản nói chung.
                        </Text>
                </View>
                <TouchableOpacity style={styles.item}
//                    onPress={() => {setModalVisible(true);}}
                    onPress={() => navigation.navigate('ChangePass')}
                >
                      <Image style={{ width: 40, height: 40 }}
                                                       source={require('./source/icon_changepass.png')} />
                      <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Đổi mật khẩu</Text>
                              <Text style={{ fontSize: 15, color: '#808080', top: -2 }}>
                                  Thay đổi mật khẩu
                              </Text>
                      </View>
                </TouchableOpacity>
          </View>
          <View style={{  flexDirection: 'column', marginRight: 3 ,paddingVertical: 12,}}>
              <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Quyền riêng tư</Text>
                      <Text style={{ fontSize: 16, color: '#808080', top: -2 }}>
                          Quản lí các vấn đề riêng tư của bạn
                      </Text>
              </View>
              <TouchableOpacity style={styles.item}
//                    onPress={() => {setModalVisible(true);}}
                  onPress={() => navigation.navigate('Block')}
              >
                   <Entypo name='block' size = {40} />
                    <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Chặn</Text>
                            <Text style={{ fontSize: 15, color: '#808080', top: -2 }}>
                                Danh sách chặn
                            </Text>
                    </View>
              </TouchableOpacity>
        </View>

      <View style={styles.contentBody}>{children}</View>
    </SafeAreaView>
  );
}

const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const SCREEN_WEIGHT = Math.round(Dimensions.get("window").width);



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
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },

  //body
  content: {
    marginHorizontal: 20,
  },
   item: {
          flexDirection: 'row',
          paddingVertical: 12,
          borderBottomWidth: 0.3,
          paddingHorizontal: 15,
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



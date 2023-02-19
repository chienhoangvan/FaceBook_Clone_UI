import React, { useState, useEffect } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
 } from "react-native";

import { Entypo, AntDesign, FontAwesome, MaterialCommunityIcons} from "@expo/vector-icons";

export default function AccountSetting({children,  navigation, route }) {

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
                      <FontAwesome name='user-circle-o' size = {35} />
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
                    onPress={() => navigation.navigate('ChangePass')}
                >
                      <MaterialCommunityIcons name='key-change' size = {35} />
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
                  onPress={() => navigation.navigate('Block')}
              >
                   <Entypo name='block' size = {35} />
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
  content: {
    marginHorizontal: 20,
  },
   item: {
          flexDirection: 'row',
          paddingVertical: 12,
          borderBottomWidth: 0.3,
          paddingHorizontal: 15,
   },
});



import React, { useState, useEffect } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign  from 'react-native-vector-icons/AntDesign';
import {
  Text,
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,

} from "react-native";

//import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

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
              <Text style={styles.textHeader}>Điều khoản & chính sách</Text>
               </View>
          </View>


              <TouchableOpacity style={styles.item}>
                              <Feather name='book' size = {30} />
                              <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Điều khoản dịch vụ</Text>
                                      <Text style={{ fontSize: 15, color: '#808080', top: -2 }}>
                                          Điều khoản bạn đồng ý khi sử dụng facebook
                                      </Text>
                              </View>
              </TouchableOpacity>



                <TouchableOpacity style={styles.item}>
                      <Feather name='lock' size = {30} />
                      <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Chính sách quyền riêng tư</Text>
                              <Text style={{ fontSize: 15, color: '#808080', top: -2 }}>
                                  Thông tin chúng tôi nhận và cách sử dụng
                              </Text>
                      </View>
                </TouchableOpacity>

                 <TouchableOpacity style={styles.item}>

                           <Octicons name='blocked' size = {30} />
                          <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Tiêu chuẩn cộng đồng</Text>
                                  <Text style={{ fontSize: 15, color: '#808080', top: -2 }}>
                                      Điều không cho phép và báo cáo hành
                                      vi lăng mạ/lạm dụng/ngược đãi.
                                  </Text>
                          </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection: 'row',paddingHorizontal: 15, paddingVertical: 12,}}>

                          <AntDesign name='ellipsis1' size = {30} />
                          <View style={{ flexDirection: 'column', marginLeft: 10, }}>
                                  <Text style={{ fontSize: 16, fontWeight: 'bold' , }}>Tài nguyên khác</Text>

                          </View>
                    </TouchableOpacity>




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



import React, { useState, useEffect } from "react";
import AntDesign  from 'react-native-vector-icons/AntDesign';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";


export default function AccountSetting({children,  navigation, route }) {
    const [getInfor, setGetInfor] = useState({});

    const showInfor = async () => {
    const token = await AsyncStorage.getItem("id_token");

    return fetch("https://severfacebook.up.railway.app/api/v1/users/show", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: "token " + token,
      },
      body: JSON.stringify(),
    })
      .then((response) => {
        const statusCode = response.status;
        if (statusCode === 200) {
          return (response = response.json());
        } else {
          alert("Load lỗi");
        }
      })
      .then((response) => {
        if (response !== undefined) {
          setGetInfor(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    };

    useEffect(() => {
        showInfor();
    }, []);

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
          </View>
      </View>
      <View style={{  flexDirection: 'column', marginRight: 3 ,paddingVertical: 12,paddingLeft: 10,}}>
          <View style={{ flexDirection: 'column', marginLeft: 10, paddingVertical: 12 }}>
              <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Thông tin cá nhân</Text>

      </View>

      <View style={{  flexDirection: 'column', marginRight: 3 ,paddingVertical: 12,}}>
          <View style={{ flexDirection: 'column', marginLeft: 10, paddingVertical: 12 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Chung</Text>
          </View>
          <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 10, borderBottomWidth: 0.3,}}>
              <View style={{ flex : 1, flexDirection: 'column' , }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical : 8 }}>Tên</Text>
                  <Text style={{ fontSize: 16, color: '#808080', top: -10 }}>
                      {getInfor?.username}
                  </Text>
              </View>
              <View style = {{marginVertical : 12}}>
                    <AntDesign  name='right' size = {40} />
              </View>
          </TouchableOpacity>
             <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 10, borderBottomWidth: 0.3,}}>
                <View style={{ flex : 1, flexDirection: 'column' , }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical : 8 }}>Thông tin liên hệ</Text>
                    <Text style={{ fontSize: 16, color: '#808080', top: -10 }}>
                        Quản lí số điện thoại và email của bạn
                    </Text>
                </View>
                <View style = {{marginVertical : 12}}>
                      <AntDesign  name='right' size = {40} />
                </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 10, borderBottomWidth: 0.3,}}>
              <View style={{ flex : 1, flexDirection: 'column' , }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical : 8 }}>Xác nhận danh tính</Text>
                    <Text style={{ fontSize: 16, color: '#808080', top: -10 }}>
                        Xác nhận danh tính của bạn trên facebook
                    </Text>
              </View>
              <View style = {{marginVertical : 12}}>
                    <AntDesign  name='right' size = {40} />
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 10, borderBottomWidth: 0.3,}}>
              <View style={{ flex : 1, flexDirection: 'column' , }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical : 8 }}>Quản lí tài khoản</Text>
                    <Text style={{ fontSize: 16, color: '#808080', top: -10 }}>
                        Cài đặt cách vô hiệu hoá và người liên hệ thừa kế
                    </Text>
              </View>
              <View style = {{marginVertical : 12}}>
                    <AntDesign  name='right' size = {40} />
              </View>
          </TouchableOpacity>
        </View>
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
});



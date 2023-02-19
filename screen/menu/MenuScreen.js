import React, { useEffect, useState, memo } from 'react';
import Layout from "../../components/Layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    Image,
    ScrollView,
    BackHandler
} from 'react-native';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";

import { MaterialIcons, Feather, FontAwesome, Ionicons } from '@expo/vector-icons';

function MenuScreen({ navigation , route}) {

    const [getInfor, setGetInfor] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const [currentPassword, onChangeCurrentPassword] = useState("");
    const [newPassword, onChangeNewPassword] = useState("");
    const [againNewPassword, onChangeAgainNewPassword] = useState("");

    const [isShowHelp, setIsShowHelp] = useState(false);
    const [isShowSetting, setIsShowSetting] = useState(false);


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



      const logout = async () => {
        try {
          // await AsyncStorage.removeItem("id_token");
          setIsLoggedIn(false);
          navigation.replace("Login");
        } catch (error) {
          console.error(error);
        }
      };

      useEffect(() => {
        if (isLoggedIn === true) {
          showInfor();
        }
      }, []);

    const handleExitApp = () => {
        BackHandler.exitApp();
    }
    return (
    <Layout route={route.name}>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
            style={{ flexGrow: 1, backgroundColor: '#f2f3f5', paddingTop: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, paddingHorizontal: 10 }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Menu</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}
                    style={{ borderRadius: 20, backgroundColor: 'white', padding: 5 }}>
                    <MaterialIcons name="search" size={25} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Information")}>
                <View style={{ flexDirection: 'row', marginBottom: 25, paddingHorizontal: 10 }}>
                    <Image style={{ width: 50, height: 50, borderRadius: 45 / 2, borderWidth: 0.5, borderColor: '#ccc' }} source={
                        !getInfor?.avatar ? require('./source/default_avatar.jpg') : { uri: getInfor?.avatar }
                    } />
                    <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{getInfor?.username}</Text>
                        <Text style={{ fontSize: 15, color: '#808080', top: -2 }}>Xem trang cá nhân của bạn</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', width: '100%', height: 400, paddingHorizontal: 10 }}>
                <View style={{ flex: 1, flexDirection: 'column', marginRight: 3 }}>
                    <TouchableOpacity style={styles.item}>
                        <Image style={{ width: 30, height: 30 }}
                            source={require('./source/icon_friends.png')} />
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Tìm kiếm bạn bè</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <Image style={{ width: 30, height: 30 }}
                            source={require('./source/icon_history.png')} />
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Kỷ niệm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <Image style={{ width: 30, height: 30 }}
                            source={require('./source/icon_saved.png')} />
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Đã lưu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <Image style={{ width: 30, height: 30 }}
                            source={require('./source/icon_heart.png')} />
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Hẹn hò</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <Image style={{ width: 30, height: 30 }}
                            source={require('./source/icon_game.png')} />
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Chơi game</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', marginRight: 3 }}>
                    <TouchableOpacity style={styles.item}>
                        <Image style={{ width: 30, height: 30 }}
                            source={require('./source/icon_group.png')} />
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Nhóm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <Image style={{ width: 30, height: 30 }}
                            source={require('./source/icon_watch.png')} />
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Video trên Watch</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <Image style={{ width: 30, height: 30 }}
                            source={require('./source/icon_flag.png')} />
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Trang</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <Image style={{ width: 30, height: 30 }}
                            source={require('./source/icon_event.png')} />
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Sự kiện</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <Image style={{ width: 30, height: 30 }}
                            source={require('./source/icon_todo.png')} />
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Việc làm</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ backgroundColor: '#e7e8ea', marginVertical: 10 }}>
                <View style={{
                    paddingHorizontal: 10, flexDirection: 'column',
                    borderColor: '#d8d9de', borderTopWidth: 1, justifyContent: 'center', minHeight: 45
                }}>
                    <TouchableOpacity onPress={() => {
                        setIsShowHelp(!isShowHelp);
                        setIsShowSetting(false);
                    }}
                        style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialIcons name='help-outline' size={25} />
                            <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 10, top: 3 }}>Trợ giúp & Hỗ trợ</Text>
                        </View>
                        <Feather name={isShowHelp ? 'chevron-up' : 'chevron-down'} size={20} style={{ top: 3 }} />
                    </TouchableOpacity>
                    {
                        isShowHelp && <>
                            <TouchableOpacity
                                    style={{ ...styles.item, justifyContent: 'flex-start' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
                                    <Ionicons name='ios-help-buoy' size = {30} />
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 5 }}>Trung tâm trợ giúp</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                    style={{ ...styles.item, justifyContent: 'flex-start' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
                                    <MaterialIcons name='report-problem' size = {30} />
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 5 }}>Báo cáo sự cố</Text>
                                </View>
                            </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('PolicyScreen')}
                                    style={{ ...styles.item, justifyContent: 'flex-start' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
                                    <Image style={{ width: 30, height: 30 }}
                                        source={require('./source/icon_policy.png')} />
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 5 }}>Điều khoản & chính sách</Text>
                                </View>
                            </TouchableOpacity>
                        </>
                    }
                </View>
                <View style={{
                    paddingHorizontal: 10, flexDirection: 'column',
                    borderColor: '#d8d9de', borderTopWidth: 1, justifyContent: 'center',
                    minHeight: 45
                }}>
                    <TouchableOpacity onPress={() => {
                        setIsShowSetting(!isShowSetting);
                        setIsShowHelp(false);
                    }}
                        style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialIcons name='settings' size={25} />
                            <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 10, top: 3 }}>
                                Cài đặt & quyền riêng tư
                            </Text>
                        </View>
                        <Feather name={isShowSetting ? 'chevron-up' : 'chevron-down'} size={20} style={{ top: 3 }} />
                    </TouchableOpacity>
                    {
                        isShowSetting && <>
                            <TouchableOpacity onPress={() => navigation.navigate('AccountSetting')}
                                style={{ ...styles.item, justifyContent: 'flex-start' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
                                    <FontAwesome name='user-circle' size = {30} />
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 5 }}>Cài đặt</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ ...styles.item, justifyContent: 'flex-start' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
                                    <Feather name='lock' size = {30} />
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 5 }}>Lối tắt quyền riêng tư</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.item, justifyContent: 'flex-start' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
                                    <MaterialIcons name='language' size = {30} />
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 5 }}>Ngôn ngữ</Text>
                                </View>
                            </TouchableOpacity>
                        </>


                    }
                </View>
                <TouchableOpacity onPress={() => handleExitApp()}
                    style={{
                        paddingHorizontal: 10, flexDirection: 'column',
                        borderColor: '#d8d9de', borderTopWidth: 1, borderBottomWidth: 1, justifyContent: 'center',
                        minHeight: 45
                    }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialIcons name='power-settings-new' size={25} />
                            <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 10, top: 3 }}>Thoát</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={logout}
                    style={{
                        paddingHorizontal: 10, flexDirection: 'column',
                        borderColor: '#d8d9de', borderTopWidth: 1, borderBottomWidth: 1, justifyContent: 'center',
                        minHeight: 45,
                        paddingBottom : 200
                    }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialIcons name='logout' size={25} style={{ left: 1,  }} />
                            <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 10, top: 3, }}>Đăng xuất</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </Layout>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white', flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 10,
        margin: 2,
        marginBottom: 6,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 10,

        elevation: 2,
    },
    container: {
        marginBottom: 130,
      },
})
export default memo(MenuScreen);



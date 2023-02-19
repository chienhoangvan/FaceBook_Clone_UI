import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Dimensions,
    ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Friend } from "../../components/Messenger";
import React, { useState } from "react";
import { Dialog } from 'react-native-simple-dialogs';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DeleteChat({
    chatId,
    navigation,}) {
    const DeleteChat = async () => {
        const token = await AsyncStorage.getItem("id_token");
        return fetch(
            `https://severfacebook.up.railway.app/api/v1/chats/deleteChat/${chatId}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    authorization: "token " + token,
                },
                body: JSON.stringify(),
            }
        )
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
                    setSaveMess(response.data);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
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
            <Text style={styles.textHeader}>Xoá đoạn chat</Text>
            {/* <Dialog
                visible={this.state.dialogVisible}
                title="Custom Dialog"
                onTouchOutside={() => this.setState({ dialogVisible: false })} >
                <View>
                </View>
            </Dialog> */}
            <Ionicons
                name="send"
                size={24}
                color="#3578E5"
                style={styles.iconSend}
                onPress={() => {
                    DeleteChat();
                }}
            />
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
    viewButton: {
        alignItems: "center"
    },
    button: {
        marginVertical: 25,
        backgroundColor: "#1877f2",
        paddingVertical: 15,
        alignItems: "center",
        borderRadius: 8,
        width: "80%",
        textAlign: "center"
    },
    textButton: {
        color: "#fff",
        fontSize: 20,
    },
});

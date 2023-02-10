import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
const Circle1 = () => {
  return (
    <View
      style={{
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: "#2f9a48",
        borderWidth: 2,
        borderColor: "#ffffff",
        marginLeft: 50,
        marginTop: 50,
      }}
    />
  );
};
export function Friend(props) {
  return (
    <View style={styles.friend}>
      <TouchableOpacity style={{ flex: 1 }}>
        <Image style={styles.avt} source={{ uri: props.avatar }}></Image>
      </TouchableOpacity>
      <Circle1></Circle1>
      <Text style={styles.nameFr}>{props.name}</Text>
    </View>
  );
}
export default function MesFr(props) {
  const send = (send, mes) => {
    if (send) return "You: " + mes;
    else return mes;
  };
  return (
    <View>
      <TouchableOpacity style={styles.friendMess}>
        <Image style={styles.avt} source={{ uri: props.avatar }}></Image>
        <View style={styles.user}>
          <Text style={styles.name}>{props.fullname}</Text>
          <Text style={styles.mes}>{send(props.send, props.mes)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 35,
    marginLeft: 50,
    fontSize: 28,
    fontWeight: "700",
  },
  listFr: {
    flexDirection: "row",
    marginTop: 10,
  },
  friend: {
    marginLeft: 20,
  },
  avtfr: {
    width: 60,
    height: 60,
    borderRadius: 100,
    flex: 1,
  },
  nameFr: {
    textAlign: "center",
    marginLeft: 10,
  },
  friendMess: {
    marginTop: 20,
    flexDirection: "row",
    width: "100%",
  },
  avt: {
    marginLeft: 10,
    width: 60,
    height: 60,
    borderRadius: 100,
    flex: 0,
  },
  user: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
  },
  mes: {
    textAlign: "left",
    marginTop: 8,
    fontSize: 15,
    opacity: 0.5,
  },
});

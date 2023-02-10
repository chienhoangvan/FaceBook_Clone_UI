import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Friend } from "../../components/Messenger";
import MesFr from "../../components/Messenger";

export default function Messenger({ navigation }) {
  const messengers = [
    {
      id: 1,
      fullname: "Trinh Dat",
      name: "Dat",
      avatar: "https://reactnative.dev/img/tiny_logo.png",
      mes: "OK!!!!",
      send: 1,
      online: 1,
    },
    {
      id: 2,
      fullname: "Pham Dinh Minh",
      name: "Minh",
      avatar:
        "https://gamek.mediacdn.vn/2019/10/20/photo-1-1571521922264714072244.jpg",
      mes: "I love You<3",
      send: 0,
      online: 1,
    },
    {
      id: 4,
      fullname: "Do Dang Phuong",
      name: "Phuong",
      avatar: "https://i.ytimg.com/vi/dkvaprtP6L8/maxresdefault.jpg",
      mes: "Good luck!!",
      send: 0,
      online: 1,
    },
    {
      id: 5,
      fullname: "Ho Duc Han",
      name: "Han",
      avatar:
        "https://cdna.artstation.com/p/assets/images/images/019/387/690/large/inward-vertical-city.jpg?1563272711",
      mes: "Come on!!",
      send: 1,
      online: 1,
    },
    {
      id: 6,
      fullname: "Chien Hoang Van",
      name: "Hoang",
      avatar:
        "https://www.ebtc.ie/wp-content/uploads/2017/10/bigstock-Autumn-Fall-scene-Beautiful-150998720.jpg",
      mes: "NO!!!!",
      send: 1,
      online: 1,
    },
    {
      id: 3,
      fullname: "Vu Ba Luong",
      name: "Luong",
      avatar:
        "https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687",
      mes: "See you again!!!!",
      send: 1,
      online: 1,
    },
  ];
  const list1 = () => {
    return messengers.map((element) => {
      return (
        <Friend key={element.id} avatar={element.avatar} name={element.name} />
      );
    });
  };
  const list2 = () => {
    return messengers.map((element) => {
      return (
        <MesFr
          key={element.id}
          avatar={element.avatar}
          fullname={element.fullname}
          send={element.send}
          mes={element.mes}
        />
      );
    });
  };
  return (
    <View style={styles.contentHeader}>
      <View style={styles.header}>
        <View style={styles.back}>
          <Ionicons
            name="arrow-back-sharp"
            size={28}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.textHeader}>Tin Nhắn</Text>
        </View>
        <View style={styles.group}>
          <Ionicons
            name="settings"
            size={20}
            color="black"
            style={styles.iconHeader}
          />
          <Feather
            name="search"
            size={20}
            color="black"
            style={styles.iconHeader}
          />
        </View>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.listFr}>
        {list1()}
      </ScrollView>
      <ScrollView>{list2()}</ScrollView>
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
    marginLeft: 10,
  },
  group: {
    flexDirection: "row",
  },
  iconHeader: {
    alignItems: "center",
    backgroundColor: "#ccc",
    borderRadius: 1000,
    marginRight: 10,
    padding: 5,
  },
});

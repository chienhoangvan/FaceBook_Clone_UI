import {
  Text,
  View,
  StyleSheet,
  Image,
  Avatar,
  ScrollView,
} from "react-native";
import React from "react";
import Layout from "../../components/Layout";
export default function Notification({ route }) {
  const [notify, setNotify] = React.useState([
    {
      id: 1,
      name: "Trinh Dat",
      content: "đã thích ảnh của bạn",
      time: "7:00 am",
      avatar: "https://reactnative.dev/img/tiny_logo.png",
    },
    {
      id: 2,
      name: "Pham Dinh Minh",
      content: "đã bình luận về ảnh của bạn",
      time: "8:00 am",
      avatar:
        "https://gamek.mediacdn.vn/2019/10/20/photo-1-1571521922264714072244.jpg",
    },
    {
      id: 3,
      name: "Do Dang Phuong",
      content: "đã cập nhật ảnh đại diện của anh ấy",
      time: "9:00 am",
      avatar: "https://i.ytimg.com/vi/dkvaprtP6L8/maxresdefault.jpg",
    },
    {
      id: 4,
      name: "Ho Duc Han",
      content: "đã cập nhật ảnh đại diện của anh ấy",
      time: "10:00 am",
      avatar:
        "https://cdna.artstation.com/p/assets/images/images/019/387/690/large/inward-vertical-city.jpg?1563272711",
    },
    {
      id: 5,
      name: "Chien Hoang Van",
      content: "đã cập nhật ảnh đại diện của anh ấy",
      time: "11:00 am",
      avatar:
        "https://www.ebtc.ie/wp-content/uploads/2017/10/bigstock-Autumn-Fall-scene-Beautiful-150998720.jpg",
    },
    {
      id: 6,
      name: "Vu Ba Luong",
      content: "đã cập nhật ảnh đại diện của anh ấy",
      time: "12:00 am",
      avatar:
        "https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687",
    },
    {
      id: 7,
      name: "Ronaldo",
      content: "đã cập nhật ảnh đại diện của anh ấy",
      time: "1:00 pm",
      avatar:
        "https://images.pexels.com/photos/301599/pexels-photo-301599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 8,
      name: "Ronaldo",
      content: "đã cập nhật ảnh đại diện của anh ấy",
      time: "2:00 pm",
      avatar:
        "https://images.pexels.com/photos/301599/pexels-photo-301599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 9,
      name: "Ronaldo",
      content: "đã cập nhật ảnh đại diện của anh ấy",
      time: "3:00 pm",
      avatar:
        "https://images.pexels.com/photos/301599/pexels-photo-301599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 10,
      name: "Ronaldo",
      content: "đã cập nhật ảnh đại diện của anh ấy",
      time: "4:00 pm",
      avatar:
        "https://images.pexels.com/photos/301599/pexels-photo-301599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 11,
      name: "Ronaldo",
      content: "đã cập nhật ảnh đại diện của anh ấy",
      time: "5:00 pm",
      avatar:
        "https://images.pexels.com/photos/301599/pexels-photo-301599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 12,
      name: "Ronaldo",
      content: "đã cập nhật ảnh đại diện của anh ấy",
      time: "6:00 pm",
      avatar:
        "https://images.pexels.com/photos/301599/pexels-photo-301599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 13,
      name: "Ronaldo",
      content: "đã cập nhật ảnh đại diện của anh ấy",
      time: "7:00 pm",
      avatar:
        "https://images.pexels.com/photos/301599/pexels-photo-301599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ]);
  return (
    <Layout route={route.name}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.textHeader}>Thông báo</Text>
          </View>
          {notify.map((item) => (
            <View key={item.id} style={styles.main}>
              <Image style={styles.img} source={{ uri: item.avatar }} />
              {/* <Avatar style={styles.img} rounded source={{uri: ''}}/> */}
              <View style={styles.content}>
                <Text style={styles.item}>
                  <Text style={styles.name}>{item.name}</Text> {item.content}
                </Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 10,
  },
  textHeader: {
    fontSize: 25,
    fontWeight: "600",
    marginLeft: 30,
  },
  main: {
    marginBottom: 1,
    backgroundColor: "#f6f7f9",
    flexDirection: "row",
    justifyContent: "center", //Centered horizontally
    alignItems: "center", //Centered vertically
  },
  img: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    marginTop: 5,
    width: 80,
    height: 80,
    borderRadius: 100,
    flex: 0,
  },
  content: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
  },
  time: {
    fontSize: 10,
    fontWeight: "300",
  },
});

import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { AntDesign, Feather, Octicons } from "@expo/vector-icons";

export default function AccountSetting({children,  navigation}) {

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
  textHeader: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
   item: {
      flexDirection: 'row',
      paddingVertical: 12,
      borderBottomWidth: 0.3,
      paddingHorizontal: 15,
   },
});



import { StatusBar } from "expo-status-bar";

import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screen/login/Login";
import Register from "./screen/register/Register";
import Layout from "./components/Layout";
import Home from "./screen/home/Home";
import Messenger from "./screen/messenger/Messenger";
import Friend from "./screen/friends/Friend";
import FriendInvite from "./screen/friends/FriendInvite";
import SentInvite from "./screen/friends/SentInvite";
import SuggestionFriend from "./screen/friends/SuggestionFriend";
import Notification from "./screen/notification/Notification";
import Information from "./screen/information/Information";
import MenuScreen from "./screen/menu/MenuScreen";
import OtpPhone from "./screen/otpPhone/OtpPhone";
import AddPost from "./screen/posts/AddPost";
import ShowInfor from "./screen/user/ShowInfor";
import EditPost from "./screen/posts/EditPost";
import InforFriend from "./screen/friends/InforFriend";
import Chat from "./screen/messenger/Chat";
import Search from "./screen/search/Search";
import Block from "./screen/friends/Block";
import AccountSetting from "./screen/menu/AccountSetting";
import ChangePass from "./screen/menu/ChangePass";
import PolicyScreen from "./screen/menu/PolicyScreen";
import PersonalInfor from "./screen/menu/PersonalInfor";
import DetailPost from "./screen/posts/DetailPost";
import InforUser from "./screen/friends/InforUser";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "none" }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Messenger" component={Messenger} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Friend" component={Friend} />
        <Stack.Screen name="FriendInvite" component={FriendInvite} />
        <Stack.Screen name="SentInvite" component={SentInvite} />
        <Stack.Screen name="SuggestionFriend" component={SuggestionFriend} />
        <Stack.Screen name="Layout" component={Layout} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Information" component={Information} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="OtpPhone" component={OtpPhone} />
        <Stack.Screen name="AddPost" component={AddPost} />
        <Stack.Screen name="ShowInfor" component={ShowInfor} />
        <Stack.Screen name="EditPost" component={EditPost} />
        <Stack.Screen name="InforFriend" component={InforFriend} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Block" component={Block} />
        <Stack.Screen name="AccountSetting" component={AccountSetting} />
        <Stack.Screen name="ChangePass" component={ChangePass} />
        <Stack.Screen name="PolicyScreen" component={PolicyScreen} />
        <Stack.Screen name="PersonalInfor" component={PersonalInfor} />
        <Stack.Screen name="DetailPost" component={DetailPost} />
        <Stack.Screen name="InforUser" component={InforUser} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
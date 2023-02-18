import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import TwoPicture from "./TwoPicture";
import ThreePicture from "./ThreePicture";
import FourPicture from "./FourPicture";
import DeletePost from "./DeletePost";
import { Video } from "expo-av";
import moment from "moment";

import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import CommentPost from "./CommentPost";

export default function HomeItem({
  time,
  textContent,
  Img,
  idPost,
  idUser,
  cover_image,
  avatar,
  username,
  countComments,
  countLikes,
  idAccount,
  videos,
  page,
}) {
  const [getInfor, setGetInfor] = useState({});
  const [showMore, setShowMore] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [like, setLike] = useState(countLikes.includes(idAccount));
  const [showComment, setShowComment] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(true);
  const [timeNow, setTimeNow] = useState(null);
  const navigation = useNavigation();

  const handleLikePost = async () => {
    const token = await AsyncStorage.getItem("id_token");
    return fetch(
      `https://severfacebook.up.railway.app/api/v1//postLike/action/${idPost}`,
      {
        method: "POST",
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
          alert("Chỉnh sửa thất bại");
        }
      })
      .then((response) => {
        if (response !== undefined) {
          setLike(response.data.isLike);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const showInfor = async () => {
    const token = await AsyncStorage.getItem("id_token");
    return fetch(
      `https://severfacebook.up.railway.app/api/v1/users/show/${idUser}`,
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
          setGetInfor(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // console.log(videos);
  // useEffect(() => {
  //   showInfor();
  // }, [navigation]);

  const handleTime = (time) => {
    const createdAt = new Date(time);
    const now = new Date();
    const timeDiff = now - createdAt;
    const timeDiffInMinutes = timeDiff / 1000 / 60;
    let result = "";
    if (timeDiffInMinutes < 1) {
      result = `Vừa xong`;
    } else if (timeDiffInMinutes < 60) {
      result = `${timeDiffInMinutes.toFixed(0)} phút trước`;
    } else if (timeDiffInMinutes < 1440) {
      const hours = Math.floor(timeDiffInMinutes / 60);
      const minutes = (timeDiffInMinutes % 60).toFixed(0);
      result = `${hours} giờ trước`;
    } else {
      const days = Math.floor(timeDiffInMinutes / 1440);
      result = `${days} ngày trước`;
    }
    return result;
  };
  // console.log(Img);
  return (
    <View style={styles.homeItem}>
      {modalVisible && (
        <DeletePost
          idPost={idPost}
          navigation={navigation}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
      {showComment && (
        <CommentPost
          id={idPost}
          navigation={navigation}
          showComment={showComment}
          setShowComment={setShowComment}
          username={username}
          avatar={avatar}
        />
      )}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.ItemUser}
          onPress={() =>
            page === "home"
              ? idUser === idAccount
                ? navigation.navigate("Information")
                : navigation.navigate("InforFriend", {
                  avatar: avatar,
                  idUser: idUser,
                  username: username,
                  cover_image: cover_image,
                  text: "Bạn bè",
                })
              : ""
          }>
          <View style={styles.imageAvater}>
            <Image
              source={{
                uri: avatar,
              }}
              style={styles.avatar}
            />
          </View>
          <View style={styles.infor}>
            <Text style={styles.textInfor}>{username}</Text>
            <View>
              <Text>{handleTime(time)}</Text>
            </View>
          </View>
        </TouchableOpacity>
        {page === "home" ? (
          ""
        ) : (
          <View style={styles.setting}>
            <Entypo
              name="dots-three-horizontal"
              size={18}
              color="black"
              style={styles.dotSetting}
              onPress={() =>
                navigation.navigate("EditPost", {
                  name: username,
                  described: textContent,
                  Img: Img,
                  avatar: avatar,
                  id: idPost,
                })
              }
            />
            <Feather
              name="x"
              size={22}
              color="black"
              style={styles.delete}
              onPress={() => setModalVisible(true)}
            />
          </View>
        )}
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("DetailPost", {
            time: time,
            textContent: textContent,
            Img: Img,
            idPost: idPost,
            idUser: idUser,
            cover_image: cover_image,
            avatar: avatar,
            username: username,
            countComments: countComments,
            countLikes: countLikes,
            idAccount: idAccount,
            videos: videos,
            page: page,
          })
        }>
        <View style={styles.content}>
          {videos === null || videos === [] || videos.length === 0 ? (
            Img.length === 0 ? (
              textContent.split(" ").length < 18 ? (
                <View style={styles.noImage}>
                  <Text
                    style={styles.textNoImage}
                    numberOfLines={showMore ? 2 : 0}
                    onPress={() => setShowMore(!showMore)}>
                    {textContent}
                  </Text>
                </View>
              ) : (
                <View>
                  <Text
                    style={styles.textContent}
                    numberOfLines={showMore ? 2 : 0}
                    onPress={() => setShowMore(!showMore)}>
                    {textContent}
                  </Text>
                </View>
              )
            ) : (
              <View>
                {textContent === "" ? (
                  <View>
                    {Img.length === 3 ? (
                      <ThreePicture selectedImages={Img} />
                    ) : Img.length === 2 ? (
                      <TwoPicture selectedImages={Img} />
                    ) : Img.length === 4 ? (
                      <FourPicture selectedImages={Img} />
                    ) : Img.length === 1 ? (
                      <Image
                        source={{
                          uri: Img[0],
                        }}
                        style={styles.picture}
                      />
                    ) : (
                      ""
                    )}
                  </View>
                ) : (
                  <View>
                    <Text
                      style={styles.textContent}
                      numberOfLines={showMore ? 2 : 0}
                      onPress={() => setShowMore(!showMore)}>
                      {textContent}
                    </Text>
                    <View>
                      {Img.length === 3 ? (
                        <ThreePicture selectedImages={Img} />
                      ) : Img.length === 2 ? (
                        <TwoPicture selectedImages={Img} />
                      ) : Img.length === 4 ? (
                        <FourPicture selectedImages={Img} />
                      ) : Img.length === 1 ? (
                        <Image
                          source={{
                            uri: Img[0],
                          }}
                          style={styles.picture}
                        />
                      ) : (
                        ""
                      )}
                    </View>
                  </View>
                )}
              </View>
            )
          ) : (
            <View>
              <Text
                style={styles.textContent}
                numberOfLines={showMore ? 2 : 0}
                onPress={() => setShowMore(!showMore)}>
                {textContent}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShouldPlay(!shouldPlay);
                }}>
                <Video
                  source={{
                    uri: videos[0],
                  }}
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  shouldPlay={shouldPlay}
                  isLooping={true}
                  style={styles.video}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.footer}>
        <View style={styles.headerFooter}>
          <View style={styles.countLike}>
            <Text>{countLikes.length}</Text>
            <View style={styles.iconLike}>
              <EvilIcons name="like" size={16} color="#fff" />
            </View>
          </View>
          <Text style={styles.textComment}>{countComments} bình luận</Text>
        </View>
        <View style={styles.bottomFooter}>
          <TouchableOpacity
            style={styles.groupItemFooter}
            onPress={handleLikePost}>
            {like ? (
              <AntDesign name="like1" size={24} color="#3578E5" />
            ) : (
              <AntDesign name="like2" size={24} color="#434144" />
            )}
            <Text style={styles.textIconFooter}>Thích</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.groupItemFooter}
            onPress={() => setShowComment(true)}>
            <FontAwesome5
              name="comment-alt"
              size={24}
              color="#434144"
              style={styles.iconComment}
            />
            <Text style={styles.textIconFooter}>Bình luận</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.groupItemFooter}>
            <FontAwesome
              name="share"
              size={24}
              color="#434144"
              style={styles.iconShare}
            />
            <Text style={styles.textIconFooter}>Chia sẻ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);

const styles = StyleSheet.create({
  homeItem: {},
  header: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ItemUser: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  avatar: {
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  infor: {
    flex: 1,
    marginLeft: 10,
  },
  textInfor: {
    fontSize: 17,
    fontWeight: "700",
  },
  setting: {
    flexDirection: "row",
    alignItems: "center",
  },
  dotSetting: {
    marginRight: 10,
  },
  //Content
  noImage: {
    height: 0.3 * SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7dc4ab",
  },
  textNoImage: {
    textAlign: "center",
    fontSize: 35,
    color: "#fff",
    marginHorizontal: 15,
  },
  textContent: {
    paddingBottom: 10,
    paddingHorizontal: 10,
    fontSize: 15,
  },
  groupImage: {
    width: "100%",
    height: SCREEN_HEIGHT * 0.35,
  },
  video: {
    width: 500,
    height: 270,
  },
  picture: {
    width: "100%",
    height: 400,
    overflow: "hidden",
  },
  // Footer
  headerFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  countLike: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconLike: {
    backgroundColor: "#3578E5",
    paddingVertical: 2,
    paddingHorizontal: 1,
    marginLeft: 4,
    borderRadius: 50,
    alignItems: "center",
  },
  bottomFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  groupItemFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  textIconFooter: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "300",
  },
});
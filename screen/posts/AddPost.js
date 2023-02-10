import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { ImagePicker } from "expo-image-multiple-picker";
import * as ImagePick from "expo-image-picker";
import { Video } from "expo-av";
import ThreePicture from "../../components/ThreePicture";
import TwoPicture from "../../components/TwoPicture";
import FourPicture from "../../components/FourPicture";

import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function AddPost({ navigation }) {
  const [vertical, setVertical] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [shouldPlay, setShouldPlay] = useState(true);
  const [text, onChangeText] = useState("");
  const [loading, setLoaing] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  let images = [];

  selectedImages.map((itemImage, index) => {
    images.push(itemImage.uri);
  });

  const closeImagePicker = (assets) => {
    setSelectedImages([...assets]);
    setShowImagePicker(false);
  };

  const ImagePickerContainer = () => {
    return (
      <View style={styles.imagePickerContainer}>
        <ImagePicker
          onSave={(assets) => closeImagePicker(assets)}
          onCancel={() => setShowImagePicker(false)}
          multiple
          limit={4}
        />
      </View>
    );
  };

  const handleVideoPick = async () => {
    try {
      const result = await ImagePick.launchImageLibraryAsync({
        mediaTypes: ImagePick.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedVideo(result.assets[0].uri);
      }
    } catch (e) {
      console.log(e);
    }
  };
  console.log(selectedVideo);

  const Uploadvideo = async () => {
    const fileName = "video-" + new Date().getTime();
    const storage = getStorage();
    const my_ref = ref(storage, `video/${fileName}.mp4`);
    const video = await fetch(selectedVideo);
    const bytes = await video.blob();
    await uploadBytes(my_ref, bytes)
      .then(async (res) => {
        await getDownloadURL(my_ref)
          .then((url) => {
            setSelectedVideo(url);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const handlePost = async () => {
    Uploadvideo();
    let responseImage = [];
    for (let i = 0; i < selectedImages.length; i++) {
      const fileName = "img-" + new Date().getTime();
      const storage = getStorage();
      const my_ref = ref(storage, `images/${fileName}.jpg`);
      const metadata = {
        contentType: "image/jpeg",
      };
      const img = await fetch(selectedImages[i].uri);
      const bytes = await img.blob();
      await uploadBytes(my_ref, bytes, metadata)
        .then(async (res) => {
          if (res.metadata) {
            await getDownloadURL(my_ref)
              .then((url) => {
                imageUrl = url + ".jpg";
                responseImage.push(url);
              })
              .catch((error) => console.log(error));
          } else {
            console.log("UPLOAD FILE ERROR!");
          }
        })
        .catch((error) => console.log(error));
    }

    setLoaing(true);
    const token = await AsyncStorage.getItem("id_token");
    const potion = {
      described: text,
      images: responseImage,
      videos: selectedVideo,
    };
    return fetch("https://severfacebook.up.railway.app/api/v1/posts/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: "token " + token,
      },
      body: JSON.stringify(potion),
    })
      .then((response) => {
        const statusCode = response.status;
        if (statusCode === 200) {
          return (response = response.json());
        } else {
          alert("Đăng bài thất bại");
        }
      })
      .then((response) => {
        if (response !== undefined) {
          // console.log(response.data.described);
          navigation.replace("Home", {
            _id: response.data._id,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      {showImagePicker && <ImagePickerContainer />}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#00ff00"
          style={styles.loading}
        />
      ) : (
        <View style={styles.container1}>
          <View style={styles.contentHeader}>
            <View style={styles.contentHeaderLeft}>
              <AntDesign
                name="arrowleft"
                size={28}
                color="black"
                onPress={() => navigation.goBack()}
              />
              <Text style={styles.textHeader}>Tạo bài viết</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handlePost}>
              <Text style={styles.textButton}>ĐĂNG</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contentBody}>
            <View style={styles.headerBody}>
              <View style={styles.imageAvater}>
                <Image
                  source={{
                    uri: "https://haycafe.vn/wp-content/uploads/2022/07/anh-wibu-co-gai-va-mat-na-cao.jpg",
                  }}
                  style={styles.avatar}
                />
              </View>
              <View style={styles.infor}>
                <Text style={styles.textInfor}>Pham Minh</Text>
                <TouchableOpacity style={styles.inforBottom}>
                  <FontAwesome5 name="user-friends" size={16} color="#666" />
                  <Text style={styles.textinforBottom}>Bạn bè</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.betweenBody}>
              <TextInput
                style={styles.textInput}
                multiline={true}
                onChangeText={onChangeText}
                value={text}
                placeholder={
                  selectedImages !== []
                    ? "Hãy nói gì về bức ảnh này"
                    : "Bạn đang nghĩ gì? "
                }
              />
            </View>
            <View>
              {selectedVideo !== null ? (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setShouldPlay(!shouldPlay);
                    }}>
                    <Video
                      source={{
                        uri: selectedVideo,
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
              ) : selectedImages.length === 3 ? (
                <ThreePicture selectedImages={images} />
              ) : selectedImages.length === 2 ? (
                <TwoPicture selectedImages={images} />
              ) : selectedImages.length === 4 ? (
                <FourPicture selectedImages={images} />
              ) : selectedImages.length === 1 ? (
                <Image
                  source={{
                    uri: selectedImages[0].uri,
                  }}
                  style={styles.picture}
                />
              ) : (
                ""
              )}
            </View>
          </View>
          <View style={styles.footer}>
            {vertical ? (
              <View style={styles.iconFooterCol}>
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => setShowImagePicker((pre) => !pre)}>
                  <Ionicons
                    name="md-images"
                    size={24}
                    color="green"
                    style={styles.icon}
                  />
                  <Text>Ảnh/video</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleVideoPick()}>
                  <Entypo
                    name="emoji-happy"
                    size={24}
                    color="#F5C33B"
                    style={styles.icon}
                  />
                  <Text>Video</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                  <Entypo
                    name="camera"
                    size={24}
                    color="#0091ff"
                    style={styles.icon}
                  />
                  <Text>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => setVertical(!vertical)}>
                  <MaterialCommunityIcons
                    name="dots-horizontal-circle"
                    size={24}
                    color="#555"
                    style={styles.icon}
                  />
                  <Text>Ẩn</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.iconFooter}>
                <TouchableOpacity
                  onPress={() => setShowImagePicker((pre) => !pre)}>
                  <Ionicons name="md-images" size={24} color="green" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Entypo name="emoji-happy" size={24} color="#F5C33B" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Entypo name="camera" size={24} color="#0091ff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setVertical(!vertical)}>
                  <MaterialCommunityIcons
                    name="dots-horizontal-circle"
                    size={24}
                    color="#555"
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);

const marginFootter = SCREEN_HEIGHT > 750 ? 25 : 45;

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
    flex: 1,
  },
  container1: {
    backgroundColor: "#fff",
    flex: 1,
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
  },
  contentHeader: {
    marginTop: 20,
    width: SCREEN_WIDTH,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  textHeader: {
    marginLeft: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: "#1B74E4",
    padding: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 7,
  },
  textButton: {
    color: "#fff",
    fontWeight: "600",
  },
  // Body
  contentBody: {
    width: SCREEN_WIDTH,
  },
  headerBody: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  avatar: {
    borderRadius: 50,
    width: 50,
    height: 50,
    marginRight: 15,
  },
  textInfor: {
    fontSize: 15,
    fontWeight: "600",
  },
  inforBottom: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 2,
  },
  textinforBottom: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: "700",
    color: "#666",
  },

  //Body Thân body
  betweenBody: {
    marginBottom: 10,
    paddingHorizontal: 10,
    maxHeight: 100,
  },
  textInput: {
    fontSize: 22,
    marginRight: 10,
    fontWeight: "300",
  },
  video: {
    width: 500,
    height: 1000,
  },
  picture: {
    width: "100%",
    height: 400,
    overflow: "hidden",
  },

  //Body Footer
  footer: {
    width: SCREEN_WIDTH,
    position: "absolute",
    borderTopWidth: 0.5,
    borderTopColor: "#666",
    bottom: 0,
    backgroundColor: "#fff",
  },
  iconFooter: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  //colum
  iconFooterCol: {
    flexDirection: "column",
  },
  item: {
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderTopColor: "#666",
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },

  imagePickerContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "white",
    zIndex: 9,
  },
});

export default AddPost;

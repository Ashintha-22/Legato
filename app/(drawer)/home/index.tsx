import {
  View,
  Text,
  Pressable,
  ImageBackground,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../../../shared/styles";
import { Link, useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

const imgDir = FileSystem.documentDirectory + "images/";

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

const Home = () => {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadImage();
  }, []);

  const loadImage = async () => {
    await ensureDirExists();
    const files = await FileSystem.readDirectoryAsync(imgDir);
    if (files.length > 0) {
      setImage((f) => imgDir + f);
    }
  };

  const selectImage = async (useLibrary: boolean) => {
    let result;

    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    };

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync(options);
    }

    if (!result.canceled) {
      saveImage(result.assets[0].uri);
    }
  };

  const saveImage = async (uri: string) => {
    await ensureDirExists();

    const fileName = new Date().getTime() + ".jpg";
    const dest = imgDir + fileName;
    await FileSystem.copyAsync({ from: uri, to: dest });
    setImage(dest);
  };

  return (
    <View style={[styles.container, { backgroundColor: "#222", padding: 10 }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require("../../../assets/uploadSquare.png")}
          style={{
            width: 250,
            height: 250,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            marginVertical: 50,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => selectImage(true)}
          >
            <Image
              source={require("../../../assets/plusButton.png")}
              style={{ width: 60, height: 60, top: -65 }}
            />
          </TouchableOpacity>
        </ImageBackground>

        <View>
          <Button
            title="Take Photo"
            onPress={() => selectImage(false)}
          ></Button>
        </View>

        <View>
          <Image
            source={{ uri: image }}
            style={{
              width: 300,
              height: 534,
              marginVertical: 50,
              borderRadius: 20,
            }}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

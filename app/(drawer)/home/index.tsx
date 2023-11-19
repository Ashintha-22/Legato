import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const imgDir = FileSystem.documentDirectory + "images/";

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

const Home = () => {
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [downloadImage, setDownloadImage] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");

  useEffect(() => {
    loadImage();
  }, []);

  const loadImage = async () => {
    await ensureDirExists();
    const files = await FileSystem.readDirectoryAsync(imgDir);
    if (files.length > 0) {
      setImage(files[0]);
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

    if (!result.cancelled) {
      saveImage(result.uri);
      setDownloadImage("");
    } else {
      setImage(null);
    }
  };

  const saveImage = async (uri: string) => {
    await ensureDirExists();

    const fileName = new Date().getTime() + ".jpg";
    const dest = imgDir + fileName;
    await FileSystem.copyAsync({ from: uri, to: dest });
    setImage(fileName);
  };

  const uploadImage = async () => {
    if (!image) {
      Alert.alert("No image selected", "Please select an image");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    const file = {
      uri: imgDir + image,
      name: "image.jpg",
      type: "image/jpeg",
    };
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://192.168.1.33:5000/process",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data); // Handle the response from the Python code as needed

      setDownloadImage(response.data.output_filepath);
      setOutputText(response.data.output_text);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "An error occurred while uploading the image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#222" }}>
      <ScrollView contentContainerStyle={{ alignItems: "center", padding: 10 }}>
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

        <View style={{ marginBottom: 20 }}>
          <Button title="Take Photo" onPress={() => selectImage(false)} />
        </View>

        {image && (
          <View style={{ marginBottom: 20 }}>
            <Image
              source={{ uri: imgDir + image }}
              style={{
                width: 300,
                height: 534,
                borderRadius: 20,
              }}
              resizeMode="contain"
            />
          </View>
        )}

        {image && (
          <View style={{ marginBottom: 20 }}>
            <Button
              title={uploading ? "Uploading..." : "Upload Image"}
              onPress={uploadImage}
              disabled={uploading}
            />
          </View>
        )}

        {downloadImage !== "" && (
          <View>
            <Text>Downloaded Image URL:</Text>
            <Text>{downloadImage}</Text>
          </View>
        )}

        {outputText !== "" && (
          <View style={{ backgroundColor: "#fff", padding: 10, marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Output:</Text>
            <Text>{outputText}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Home />
    </View>
  );
};

export default Home;

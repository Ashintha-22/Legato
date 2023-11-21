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
  Pressable,
} from "react-native";

import styles from "../../../shared/styles";
import { Link, useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
//
import { storage } from "../../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { db } from "../../../firebaseConfig";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

const imgDir = FileSystem.documentDirectory + "images/";

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

const Home = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [downloadURI, setDownloadURI] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [downloadImage, setDownloadImage] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  // useEffect(() => {
  //   loadImage();
  // }, []);

  console.log(image);

  const addData = async () => {
    const timestamp = new Date().getTime(); // Get current timestamp
    const fileName = `${timestamp}.jpg`; // Use timestamp as part of the filename
    // Add a new document in collection "cities"
    await setDoc(doc(db, "library", fileName), {
      title: fileName,
      uri: downloadURI,
    });
    console.log(downloadURI, "document added successfully");
  };

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
    loadImage();
    if (!result.canceled) {
      saveImage(result.uri);

      // Get the dimensions of the selected image
      Image.getSize(result.uri, (width, height) => {
        console.log(width, height);
        setImageDimensions({ width, height });
      });

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

  const uploadImage = async (uri: string) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    try {
      //timestamp with prefix Image for unique file name
      const storageRef = ref(storage, `Images/image-${Date.now()}`);
      const result = await uploadBytes(storageRef, blob as Blob);

      // We're done with the blob, close and release it
      (blob as any).close();

      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);
      setDownloadURI(downloadURL);

      addData();

      return downloadURL;
    } catch (error) {
      console.log(error);
    }
  };

  const imageToBackend = async () => {
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
        "http://192.168.8.102:5000/process",
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

  const generatePdf = async () => {
    const imageUri = imgDir + image;

    try {
      // Read the image file as a base64-encoded string
      const imageBase64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const html = `
        <html>
          <body>
            <h1>Input Image:</h1>
            <img src="data:image/jpeg;base64,${imageBase64}" style="width: 800px; height: auto; border-radius: 20px;" />
            <h1>Output:</h1>
            <p>${outputText}</p>
          </body>
        </html>
      `;

      const file = await printToFileAsync({
        html: html,
        base64: false,
      });

      await shareAsync(file.uri);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "An error occurred while generating the PDF");
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

        <View style={{ marginBottom: 20, marginTop: -20 }}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#22A6DF", width: 250 }]}
            disabled={uploading}
            onPress={() => selectImage(false)}
          >
            <Text style={[styles.textButton, { color: "#eee" }]}>
              Take Photo
            </Text>
          </TouchableOpacity>
        </View>

        {image && (
          <View style={{ marginBottom: 20, marginTop: 20 }}>
            <Image
              source={{ uri: imgDir + image }}
              style={{
                width: 300,
                height: 400,
                borderRadius: 20,
              }}
              resizeMode="contain"
            />
          </View>
        )}

        {image && (
          <View style={{ marginBottom: 20 }}>
            {/* <Button
              title={uploading ? "Uploading..." : "Convert"}
              onPress={imageToBackend}
              disabled={uploading}
            /> */}

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "#22A6DF", width: 250 },
              ]}
              disabled={uploading}
              onPress={imageToBackend}
            >
              {uploading && <Text style={styles.textButton}>Uploading...</Text>}
              {!uploading && (
                <Text style={[styles.textButton, { color: "#eee" }]}>
                  Convert
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {outputText !== "" && (
          <View style={{ backgroundColor: "#fff", padding: 10, marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Output:</Text>
            <Text>{outputText}</Text>
          </View>
        )}

        {outputText !== "" && (
          <View style={{ marginBottom: 20 }}>
            <Button title="Generate PDF" onPress={generatePdf} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

// const App = () => {
//   return (
//     <View style={{ flex: 1 }}>
//       <Home />
//     </View>
//   );
// };

export default Home;

import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: height,
    marginTop: 30,
  },
  textInput: {
    height: 60,
    width: width - 60,
    borderRadius: 10,
    backgroundColor: "white",
    marginVertical: 10,
    paddingLeft: 20,
    elevation: 2,
  },
  googleSignIn: {
    height: 70,
    width: width - 50,
    marginTop: 80,
  },
  textButton: {
    fontWeight: "bold",
    fontSize: 20,
  },
  downloadPage: {
    flex: 0.95,
    justifyContent: "center",
    alignItems: "center",
    width: width - 40,
    backgroundColor: "#666",
    borderRadius: 60,
    marginTop: 20,
    zIndex: 1,
    elevation: 5,
  },
});

export default styles;

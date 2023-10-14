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
    backgroundColor: "#AAA",
    borderRadius: 30,
    marginTop: 20,
    zIndex: 1,
    elevation: 5,
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: "#222",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 50 },
    elevation: 3,
    shadowRadius: 1,
    shadowOpacity: 0.8,
  },
});

export default styles;

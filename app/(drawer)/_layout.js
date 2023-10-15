import { Drawer } from "expo-router/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity, Alert } from "react-native";
import { auth } from "../../firebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useRouter, Redirect, router } from "expo-router";

const DrawerLayout = (navigation) => {
  const router = useRouter();

  const logout = async () => {
    await signOut(auth)
      .then(() => {
        Alert.alert("Signed out successfully!");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      if (user == null) {
        console.log(user);
        //want the code here
        router.replace(".../index");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Drawer
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#111" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        headerShadowVisible: false,
        drawerStyle: { backgroundColor: "#000", width: 240, marginTop: 90 },
        drawerActiveTintColor: "#fff",
        drawerActiveBackgroundColor: "#333",
        drawerInactiveTintColor: "#555",
        drawerLabelStyle: { fontWeight: "bold", fontSize: 16, marginLeft: 5 },
        headerRight: () => (
          <TouchableOpacity activeOpacity={0.8} onPress={logout}>
            <Ionicons
              name="log-out-outline"
              size={25}
              style={{ marginRight: 20 }}
              color="#fff"
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          title: "Home",
          drawerIcon: ({ focused, color, size }) => {
            let iconName;
            iconName = focused ? "home" : "home-outline";
            // Adjust the size value to your desired icon size
            const iconSize = 25; // Change this to your preferred size
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={iconSize} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="library"
        options={{
          title: "Music Library",
          drawerIcon: ({ focused, color, size }) => {
            let iconName;
            iconName = focused ? "library" : "library-outline";
            // Adjust the size value to your desired icon size
            const iconSize = 25; // Change this to your preferred size
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={iconSize} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: "Profile",
          drawerIcon: ({ focused, color, size }) => {
            let iconName;
            iconName = focused ? "person-circle" : "person-circle-outline";
            // Adjust the size value to your desired icon size
            const iconSize = 25; // Change this to your preferred size
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={iconSize} color={color} />;
          },
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;

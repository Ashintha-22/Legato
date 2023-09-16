import { Drawer } from "expo-router/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";

const DrawerLayout = () => {
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

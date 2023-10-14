import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          alignSelf: "center",
        },
        headerTitleAlign: "center",
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="Register"
        options={{
          headerShown: false,
          presentation: "transparentModal",
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
};

export default StackLayout;

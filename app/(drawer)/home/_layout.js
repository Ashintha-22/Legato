import { Stack } from "expo-router";

const HomeLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="upload" />
      <Stack.Screen
        name="output"
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
          animationDuration: 200,
        }}
      />
    </Stack>
  );
};

export default HomeLayout;

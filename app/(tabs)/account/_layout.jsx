import { Stack } from "expo-router";

export default function AccountLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="order" />
      <Stack.Screen name="mydetails" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="faq" />
      <Stack.Screen name="help" />

    </Stack>
  );
}
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function AuthLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar style="dark" />
      <Slot />
    </SafeAreaView>
  );
}
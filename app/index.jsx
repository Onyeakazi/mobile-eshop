import { useEffect, useState } from "react";
import { Dimensions, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import CrossVector from "../assets/vectors/cross.svg";
import Lines from "../assets/vectors/lines.svg";

// Prevent splash from auto hiding
SplashScreen.preventAutoHideAsync();

export default function Index() {
  const { width } = Dimensions.get("window");
  const aspectRatio = 571 / 390;
  const height = width * aspectRatio;

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Get stored values
        const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");

        // Convert to booleans
        const hasSeen = hasOnboarded === "true";
        const loggedIn = isLoggedIn === "true";

        // Debug (remove later)
        console.log("hasOnboarded:", hasOnboarded);
        console.log("isLoggedIn:", isLoggedIn);

        // Small delay for smooth splash UX
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Navigation logic (CORRECT FLOW)
        if (!hasSeen) {
          router.replace("/onboarding");
        } else if (loggedIn) {
          router.replace("/(tabs)");
        } else {
          router.replace("/login");
        }
      } catch (e) {
        console.warn("Startup error:", e);
        router.replace("/login"); // fallback
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  if (!isReady) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1A1A1A" }}>
      {/* Background Lines */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width,
          height,
          zIndex: -1,
        }}
      >
        <Lines width={width} height={height} />
      </View>

      {/* Center Logo */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <CrossVector width={134} height={133} />
      </View>

      {/* Bottom Image */}
      <Image
        source={require("../assets/images/Component 1.png")}
        style={{
          width: 55,
          height: 55,
          position: "absolute",
          top: "89%",
          left: "45%",
        }}
      />
    </SafeAreaView>
  );
}
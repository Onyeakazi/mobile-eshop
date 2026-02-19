import { router } from "expo-router";
import { Alert, Button, Dimensions, FlatList, Image, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import CrossVector from "../assets/vectors/cross.svg"
import Lines from "../assets/vectors/lines.svg"

export default function Index() {

  const {width} = Dimensions.get("window");
  const aspectRatio = 571 / 390;
  const height = width * aspectRatio;

  useEffect(() => {
    // const checkFirstLaunch = async () => {
    //   const firstLaunch = await AsyncStorage.getItem("firstLaunch1");

    //   if (!firstLaunch) {
    //     await AsyncStorage.setItem("firstLaunch", "true");
    //     router.replace("/onboarding");
    //   } else {
    //     router.replace("/home");
    //   }
    // };

    // checkFirstLaunch();
   
    const redirect = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));

      router.replace("/onboarding"); 
    };

    redirect();
  }, []);

  return (
    <SafeAreaView key={Date.now()} style={{ flex: 1, backgroundColor: "#1A1A1A" }}>

      {/* Background lines */}
      <View style={{ position: 'absolute', top: 0, left: 0, width, height, zIndex: -1 }}>
        <Lines width={width} height={height} />
      </View>

      {/* Centered CrossVector */}
      <View style={{ 
        justifyContent: "center", 
        alignItems: "center", 
        flex: 1 
      }}> 
        <CrossVector width={134} height={133} />
      </View>

      {/* Positioned Image */}
      <Image 
        source={require("../assets/images/Component 1.png")} 
        style={{ 
          width: 55, 
          height: 55, 
          position: "absolute", 
          top: "89%", 
          left: "45%" 
        }} 
      />

    </SafeAreaView>

  )
}
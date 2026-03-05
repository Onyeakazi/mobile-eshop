import { View, Text, Dimensions, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Lines2 from "../../assets/vectors/lines2.svg";
import { router } from "expo-router";

export default function Index() {
  const { width, height } = Dimensions.get("window");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      
      {/* Background Lines */}
      <View
        style={{
          position: "absolute",
          top: 100,
          left: 0,
          width: width,
          height: height,
        }}
      >
        <Lines2 width={width} height={height} />
      </View>

      {/* Main Content */}
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        
        {/* Heading */}
        <View style={{ paddingVertical: 20 }}>
          <Text
            style={{
              width: 370,
              fontSize: 73,
              fontWeight: "700",
              lineHeight: 58,
              letterSpacing: -5,
              paddingTop: 13,
              zIndex: 1,
            }}
          >
            Define yourself in your unique way.
          </Text>
        </View>

        {/* Image Section */}
        <View
          style={{
            alignItems: "center",
            marginTop: -200, 
          }}
        >
          <Image
            source={require("../../assets/images/onboarding.png")}
            style={{
              width: width * 1.25,  
              height: height * 0.9, 
              resizeMode: "contain",
              left: 14,
            }}
          />
        </View>
      </View>

      {/* Bottom White Container */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 130,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable
          style={{
            paddingVertical: 20,
            paddingHorizontal: 100,
            borderRadius: 10,
            backgroundColor: "black",
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => router.push("/(auth)/login")}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "700",
              fontSize: 18,
            }}
          >
            Get Started
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              marginLeft: 8,
            }}
          >
            ➔
          </Text>
        </Pressable>
      </View>

    </SafeAreaView>
  );
}

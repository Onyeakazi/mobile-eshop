import { router } from "expo-router";
import { View, Text, TextInput, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Pressable } from "react-native";
import ArrowBack from "../../assets/vectors/arrow-back.svg";
import Button from "../../components/button";

export default function ForgotPassword() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* KeyboardAvoidingView wraps everything */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header & Inputs */}
          <View style={{ paddingVertical: 15 }}>

            {/* Back button */}
            <Pressable 
                onPress={()=> {
                    router.back();
                }}
            >
                <ArrowBack width={18} height={18} />
            </Pressable>

            <Text style={{ fontSize: 32, fontWeight: 800, marginTop: 20 }}>Enter 4 Digit Code</Text>
            <Text style={{ fontSize: 16, color: "#808080", marginVertical: 5 }}>
              Enter the 4 digit code you recieved on your.
            </Text>
            <Text style={{ fontSize: 16, color: "#808080" }}>
              email (berry@gmail.com).
            </Text>

            <View style={{flexDirection: "row", marginTop: 20, justifyContent: "space-around" }}>
                {[0, 1, 2, 3].map((_, index) => (
                    <TextInput
                        key={index}
                        maxLength={1} 
                        keyboardType="numeric"
                        style={{
                            borderWidth: 1,
                            borderColor: "#d1d1d1",
                            borderRadius: 7,
                            width: 65,
                            height: 63,
                            textAlign: "center",
                            fontSize: 20,
                        }}
                    />
                ))}
            </View>
          </View>

          <View style={{ paddingHorizontal: 2, marginTop: 5 }}>
                <Text
                    style={{
                    fontSize: 15,
                    color: "#808080",
                    lineHeight: 26,
                    fontWeight: "500",
                    textAlign: "center",
                    }}
                >
                    Email not received?{" "}
                    <Text
                        onPress={() => router.push("/forgot-password")}
                        style={{
                            textDecorationLine: "underline",
                            color: "black",
                            fontSize: 15,
                            fontWeight: "500",
                        }}
                    >
                        Reset your password
                    </Text>
                </Text>
            </View>

          {/* Push the button to the bottom */}
          <View style={{ marginTop: "auto", marginBottom: 20 }}>
            <Button
              text="Continue"
              bg="#1A1A1A"
              style={{ paddingVertical: 15 }}
              textStyle={{ fontSize: 17 }}
              onPress={() => router.push("/reset-password")}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
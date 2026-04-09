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

            <Text style={{ fontSize: 32, fontWeight: 800, marginTop: 20 }}>Forgot Password</Text>
            <Text style={{ fontSize: 16, color: "#808080", marginVertical: 5 }}>
              Enter your email for the verification process.
            </Text>
            <Text style={{ fontSize: 16, color: "#808080" }}>
              We will send 4 digits code to your email.
            </Text>

            <View style={{ marginTop: 20 }}>
              <Text style={{ fontWeight: 500, fontSize: 15 }}>Email</Text>
              <TextInput
                placeholder="Enter your email address"
                style={{
                  borderWidth: 1,
                  borderColor: "#d1d1d1",
                  borderRadius: 7,
                  paddingHorizontal: 15,
                  height: 50,
                  marginTop: 5,
                }}
              />
            </View>
          </View>

          {/* Push the button to the bottom */}
          <View style={{ marginTop: "auto", marginBottom: 20 }}>
            <Button
              text="Send Code"
              bg="#1A1A1A"
              style={{ paddingVertical: 15 }}
              textStyle={{ fontSize: 17 }}
              onPress={() => router.push("/send-code")}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
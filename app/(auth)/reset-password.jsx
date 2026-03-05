import { router } from "expo-router";
import { View, Text, TextInput, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Pressable } from "react-native";
import ArrowBack from "../../assets/vectors/arrow-back.svg";
import Button from "../../components/button";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import CustomAlert from "../../components/CustomAlert";
import CheckDuotone from "../../assets/vectors/Check-duotone.svg";

export default function ForgotPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);

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

            <Text style={{ fontSize: 32, fontWeight: 800, marginTop: 20 }}>Reset Password</Text>
            <Text style={{ fontSize: 16, color: "#808080", marginVertical: 5 }}>
              Set the new password for your account so you 
            </Text>
            <Text style={{ fontSize: 16, color: "#808080" }}>
              can login and access all the features.
            </Text>

            <View style={{marginTop: 20}}>
                <Text style={{fontWeight: 500, fontSize: 15}}>New Password</Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "#d1d1d1",
                        borderRadius: 7,
                        paddingHorizontal: 15,
                        height: 50,
                        marginTop: 5,
                    }}
                >
                    <TextInput
                        placeholder="Enter your password"
                        secureTextEntry={!showPassword}
                        style={{ flex: 1 }}
                    />

                    <Pressable onPress={()=> setShowPassword(!showPassword)}>
                        <Ionicons
                            name={showPassword ? "eye-off" : "eye"}
                            size={22}
                            color="gray"
                        />
                    </Pressable>
                </View>
            </View>
            
          </View>

            {/* Push the button to the bottom */}
            <View style={{ marginTop: "auto", marginBottom: 20 }}>
                <Button
                    text="Continue"
                    bg="#1A1A1A"
                    style={{ paddingVertical: 15 }}
                    textStyle={{ fontSize: 17 }}
                    onPress={() => setAlertVisible(true)}
                />
            </View>

            <CustomAlert
                Icon={CheckDuotone}
                visible={alertVisible}
                title="Success!"
                message="You can now use your new password to login into your account."
                confirmText="Close"
                onClose={() => setAlertVisible(false)}
            />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
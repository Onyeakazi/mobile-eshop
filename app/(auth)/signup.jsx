import { router } from "expo-router";
import { View, Text, Pressable, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Button from "../../components/button";
import Facebook from "../../assets/vectors/facebook.svg";
import GoogleSVG from "../../assets/vectors/google-icon.svg";
import { createUserWithEmailAndPassword, updateProfile, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../config/firebase";
import Preloader from "../../components/Preloader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

// const REDIRECT_URI = "https://auth.expo.io/@godswill147/eshop";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    fullName: false,
    email: false,
    password: false,
  });
  const [success, setSuccess] = useState(false);

  const isLoading = loading || googleLoading;

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { idToken } = response.authentication;
      handleGoogleSignIn(idToken);
    } else if (response?.type === "error") {
      console.log("Google auth error:", response.error);
      setError("Google sign in failed. Please try again.");
    }
  }, [response]);

  const handleGoogleSignIn = async (idToken) => {
    setGoogleLoading(true);
    try {
      const credential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, credential);
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("hasOnboarded", "true");
      router.replace("/(tabs)");
    } catch (err) {
      console.log("Google sign in error:", err);
      setError("Google sign in failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const isFieldFull = fullName.trim() || email.trim() || password.trim();

  const handleSignup = async () => {
    setFieldErrors({ fullName: false, email: false, password: false });
    setSuccess(false);

    if (!fullName) {
      setFieldErrors((prev) => ({ ...prev, fullName: true }));
      setError("Please enter your full name");
      return;
    }
    if (!email) {
      setFieldErrors((prev) => ({ ...prev, email: true }));
      setError("Please enter your email");
      return;
    }
    if (!password) {
      setFieldErrors((prev) => ({ ...prev, password: true }));
      setError("Please enter your password");
      return;
    }
    if (password.length < 6) {
      setFieldErrors((prev) => ({ ...prev, password: true }));
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: fullName });
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("hasOnboarded", "true");
      setSuccess(true);
      setTimeout(() => router.replace("/(tabs)"), 500);
    } catch (err) {
      console.log("Signup error:", err);
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("An account with this email already exists");
          setFieldErrors((prev) => ({ ...prev, email: true }));
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email address");
          setFieldErrors((prev) => ({ ...prev, email: true }));
          break;
        case "auth/weak-password":
          setError("Password is too weak");
          setFieldErrors((prev) => ({ ...prev, password: true }));
          break;
        default:
          setError("Something went wrong. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading && <Preloader />}

      <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 20, backgroundColor: "white" }}>
        <Text style={{ fontSize: 35, fontWeight: "700" }}>Create an account</Text>
        <Text style={{ fontSize: 14, color: "#808080" }}>Let's create your account</Text>

        <View style={{ marginTop: 20 }}>
          {/* Full Name */}
          <View>
            <Text style={{ fontWeight: "500", fontSize: 15 }}>Full Name</Text>
            <TextInput
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={(text) => {
                setFullName(text);
                setFieldErrors((prev) => ({ ...prev, fullName: false }));
                setError("");
              }}
              style={{
                borderWidth: 1,
                borderColor: fieldErrors.fullName ? "red" : success ? "green" : "#d1d1d1",
                borderRadius: 7,
                paddingHorizontal: 15,
                height: 50,
                marginTop: 5,
              }}
            />
          </View>

          {/* Email */}
          <View style={{ marginTop: 12 }}>
            <Text style={{ fontWeight: "500", fontSize: 15 }}>Email</Text>
            <TextInput
              placeholder="Enter your email address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setFieldErrors((prev) => ({ ...prev, email: false }));
                setError("");
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{
                borderWidth: 1,
                borderColor: fieldErrors.email ? "red" : success ? "green" : "#d1d1d1",
                borderRadius: 7,
                paddingHorizontal: 15,
                height: 50,
                marginTop: 5,
              }}
            />
          </View>

          {/* Password */}
          <View style={{ marginTop: 12 }}>
            <Text style={{ fontWeight: "500", fontSize: 15 }}>Password</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: fieldErrors.password ? "red" : success ? "green" : "#d1d1d1",
                borderRadius: 7,
                paddingHorizontal: 15,
                height: 50,
                marginTop: 5,
              }}
            >
              <TextInput
                placeholder="Enter your password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setFieldErrors((prev) => ({ ...prev, password: false }));
                  setError("");
                }}
                secureTextEntry={!showPassword}
                style={{ flex: 1 }}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={22} color="gray" />
              </Pressable>
            </View>
          </View>

          {/* Error message */}
          {error ? (
            <Text style={{ color: "red", marginTop: 10, fontSize: 13 }}>{error}</Text>
          ) : null}

          {/* Terms */}
          <View style={{ paddingHorizontal: 2, marginTop: 18 }}>
            <Text style={{ fontSize: 15, color: "#808080", lineHeight: 26, fontWeight: "500" }}>
              By signing up you agree to our{" "}
              <Text style={{ textDecorationLine: "underline", color: "black" }} onPress={() => router.push("/terms")}>Terms,</Text>{" "}
              <Text style={{ textDecorationLine: "underline", color: "black" }} onPress={() => router.push("/policy")}>Privacy Policy</Text>{" "}
              and{" "}
              <Text style={{ textDecorationLine: "underline", color: "black" }} onPress={() => router.push("/cookie")}>Cookie Use</Text>
            </Text>
          </View>
        </View>

        {/* Signup Button */}
        <View>
          <Button
            text={loading ? "Creating account..." : "Create an Account"}
            bg={isFieldFull ? "#1A1A1A" : "#cdcdcd"}
            style={{ marginTop: 20 }}
            textStyle={{ fontSize: 17, color: "white" }}
            onPress={handleSignup}
            disabled={loading}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 30 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: "#d1d1d1" }} />
          <Text style={{ marginHorizontal: 10, color: "#808080", fontSize: 15 }}>Or</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: "#d1d1d1" }} />
        </View>

        {/* Google Button */}
        <View>
          <Button
            text={googleLoading ? "Signing in..." : "Sign Up with Google"}
            style={{ borderWidth: 1, borderColor: "#cdcdcd", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 20 }}
            textStyle={{ fontSize: 15, color: "black", fontWeight: "400" }}
            icon={<GoogleSVG width={20} height={20} />}
            onPress={() => promptAsync()}
            disabled={!request || googleLoading}
          />
        </View>

        {/* Facebook Button */}
        <View>
          <Button
            text="Sign Up with Facebook"
            bg="#1877F2"
            style={{ marginTop: 13, flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 20 }}
            textStyle={{ fontSize: 15 }}
            icon={<Facebook width={20} height={20} fill="white" />}
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: "auto" }}>
          <Text style={{ color: "#808080" }}>Already have an account?</Text>
          <Pressable onPress={() => router.push("./login")}>
            <Text style={{ textDecorationLine: "underline", marginLeft: 5 }}>Log in</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
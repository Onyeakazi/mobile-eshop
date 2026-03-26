import { router } from "expo-router";
import { View, Text, Pressable, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import Button from "../../components/button";
import Facebook from "../../assets/vectors/facebook.svg";
import Google from "../../assets/vectors/google-icon.svg";
import { signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../config/firebase";
import Preloader from "../../components/Preloader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import * as GoogleAuth from "expo-auth-session/providers/google";
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({
        email: false,
        password: false,
    });
    const [success, setSuccess] = useState(false);
    
    const isFormFilled = email.trim() || password.trim();
    
    const isLoading = loading || googleLoading;

    // Google auth request
    const [request, response, promptAsync] = GoogleAuth.useAuthRequest({
        webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
        androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
        redirectUri: AuthSession.makeRedirectUri({
            scheme: "myapp",
        }),
    });

    // Handle Google response
    useEffect(() => {
        if (response?.type === "success") {
            handleGoogleSignIn(response.authentication.idToken);
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
            setError("Google sign in failed. Please try again.");
        } finally {
            setGoogleLoading(false);
        }
    };

    const handleLogin = async () => {
        // Reset errors
        setFieldErrors({ email: false, password: false });
        setSuccess(false);

        // Validation
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

        setError("");
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            await AsyncStorage.setItem("isLoggedIn", "true");
            setSuccess(true);

            setTimeout(() => {
                router.replace("/(tabs)");
            }, 500);

        } catch (err) {
            switch (err.code) {
                case "auth/user-not-found":
                    setError("No account found with this email");
                    setFieldErrors((prev) => ({ ...prev, email: true }));
                    break;
                case "auth/wrong-password":
                    setError("Incorrect password");
                    setFieldErrors((prev) => ({ ...prev, password: true }));
                    break;
                case "auth/invalid-email":
                    setError("Please enter a valid email address");
                    setFieldErrors((prev) => ({ ...prev, email: true }));
                    break;
                case "auth/too-many-requests":
                    setError("Too many attempts. Please try again later");
                    break;
                case "auth/invalid-credential":
                    setError("Invalid email or password");
                    setFieldErrors((prev) => ({ ...prev, email: true, password: true }));
                    break;
                default:
                    setError("Something went wrong. Please try again");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{flex: 1}}>
            {/* Preloader */}
            {isLoading && <Preloader />}
            
            <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 20, backgroundColor: "white" }}>
                <Text style={{ fontSize: 35, fontWeight: "700" }}>Login to your account</Text>
                <Text style={{ fontSize: 14, color: "#808080" }}>It's great to see you again</Text>

                <View style={{ marginTop: 20 }}>
                    {/* Email */}
                    <View>
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
                                    setError("")
                                }}
                                secureTextEntry={!showPassword}
                                style={{ flex: 1 }}
                            />
                            <Pressable onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons
                                    name={showPassword ? "eye-off" : "eye"}
                                    size={22}
                                    color="gray"
                                />
                            </Pressable>
                        </View>
                    </View>

                    {/* Error message */}
                    {error ? (
                        <Text style={{ color: "red", marginTop: 10, fontSize: 13 }}>
                            {error}
                        </Text>
                    ) : null}

                    {/* Forgot Password */}
                    <View style={{ paddingHorizontal: 2, marginTop: 18 }}>
                        <Text style={{ fontSize: 15, color: "#808080", lineHeight: 26, fontWeight: "500" }}>
                            Forgot your password?{" "}
                            <Text
                                style={{ textDecorationLine: "underline", color: "black" }}
                                onPress={() => router.push("/forgot-password")}
                            >
                                Reset your password
                            </Text>
                        </Text>
                    </View>
                </View>

                {/* Login Button */}
                <View>
                    <Button
                        text={loading ? "Logging in..." : "Login"}
                        bg={isFormFilled ? "#1A1A1A" : "#cdcdcd"}
                        style={{ marginTop: 20 }}
                        textStyle={{ fontSize: 17, color: "white" }}
                        onPress={handleLogin}
                        disabled={loading || !isFormFilled}
                    />
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 30 }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: "#d1d1d1" }} />
                    <Text style={{ marginHorizontal: 10, color: "#808080", fontSize: 15 }}>Or</Text>
                    <View style={{ flex: 1, height: 1, backgroundColor: "#d1d1d1" }} />
                </View>

                {/* Google Login */}
                <View>
                    <Button
                        text={googleLoading ? "Signing in..." : "Login with Google"}
                        style={{ borderWidth: 1, borderColor: "#cdcdcd", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 20 }}
                        textStyle={{ fontSize: 15, color: "black", fontWeight: "400" }}
                        icon={<Google width={20} height={20} fill="white" />}
                        onPress={() => promptAsync()}
                        disabled={!request || googleLoading}
                    />
                </View>

                {/* Facebook Login */}
                <View>
                    <Button
                        text="Login with Facebook"
                        bg="#1877F2"
                        style={{ marginTop: 13, flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 20 }}
                        textStyle={{ fontSize: 15 }}
                        icon={<Facebook width={20} height={20} fill="white" />}
                    />
                </View>

                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: "auto" }}>
                    <Text style={{ color: "#808080" }}>Don't have an account?</Text>
                    <Pressable onPress={() => router.push("./signup")}>
                        <Text style={{ textDecorationLine: "underline", marginLeft: 5 }}>Join</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
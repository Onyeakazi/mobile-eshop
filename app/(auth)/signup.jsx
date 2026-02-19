import { router } from "expo-router";
import {  View, Text, Pressable, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Button from "../../components/button";
import Facebook from "../../assets/vectors/facebook.svg";
import Google from "../../assets/vectors/google-icon.svg";

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);

    return(

        <View style={{flex:1, paddingHorizontal: 20, paddingVertical: 20}}>
            <Text style={{fontSize: 35, fontWeight: 700}}>Create an account</Text>
            <Text style={{fontSize: 14, color: "#808080",}}>Let's create your account</Text>

            <View style={{marginTop: 20}}>
                <View>
                    <Text style={{fontWeight: 500, fontSize: 15}}>Full Name</Text>
                    <TextInput 
                        placeholder="Enter your full name"
                        style={{
                            borderWidth: 1,
                            borderColor: "#d1d1d1",
                            borderRadius: 7,
                            paddingHorizontal: 15,
                            height: 50,
                            marginTop: 5
                        }}    
                    />
                </View>
                <View style={{marginTop: 12}}>
                    <Text style={{fontWeight: 500, fontSize: 15}}>Email</Text>
                    <TextInput 
                        placeholder="Enter your email address"
                        style={{
                            borderWidth: 1,
                            borderColor: "#d1d1d1",
                            borderRadius: 7,
                            paddingHorizontal: 15,
                            height: 50,
                            marginTop: 5
                        }}    
                    />
                </View>

                <View style={{marginTop: 12}}>
                    <Text style={{fontWeight: 500, fontSize: 15}}>Password</Text>
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

                <View style={{ paddingHorizontal: 2, marginTop: 18 }}>
                    <Text
                        style={{
                        fontSize: 15,
                        color: "#808080",
                        lineHeight: 26,
                        fontWeight: 500
                        }}
                    >
                        By signing up you agree to our{" "}
                        <Text
                            style={{ textDecorationLine: "underline", color: "black" }}
                            onPress={() => router.push("/terms")}
                        >
                            Terms,
                        </Text>{" "}
                        <Text
                            style={{ textDecorationLine: "underline", color: "black" }}
                            onPress={() => router.push("/policy")}
                        >
                            Privacy Policy
                        </Text>{" "}
                        and{" "}
                        <Text
                            style={{ textDecorationLine: "underline", color: "black" }}
                            onPress={() => router.push("/cookie")}
                        >
                            Cookie Use
                        </Text>
                    </Text>
                </View>
            </View>

            <View>
                <Button
                    text="Create an Account"
                    bg="#cdcdcd"
                    style={{marginTop: 20}}
                    textStyle={{fontSize: 17}}
                    onPress={()=> {
                        router.replace("/(tabs)")
                    }}
                />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 30 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: "#d1d1d1" }} />
                <Text style={{ marginHorizontal: 10, color: "#808080", fontSize: 15 }}>Or</Text>
                <View style={{ flex: 1, height: 1, backgroundColor: "#d1d1d1" }} />
            </View>

            <View>
                <Button
                    text="Sign Up with Google"
                    style={{ borderWidth: 1, borderColor: "#cdcdcd", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 20}}
                    textStyle={{fontSize: 15, color: "black", fontWeight: "400"}}
                    icon={<Google width={20} height={20} fill="white" />}
                />
            </View>

            <View>
                <Button
                    text="Sign Up with Facebook"
                    bg="#1877F2"
                    style={{marginTop: 13, flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 20}}
                    textStyle={{fontSize: 15}}
                    icon={<Facebook width={20} height={20} fill="white" />}
                />
            </View>

                
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", top: 80}}>
                <Text style={{ color: "#808080" }}>Already have an account?</Text>
                <Pressable onPress={() => router.push("./login")}>
                <Text style={{ textDecorationLine: "underline", marginLeft: 5 }}>Log in</Text>
                </Pressable>
            </View>

        </View>
    )
}

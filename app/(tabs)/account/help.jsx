import { Text, View, Pressable, Dimensions } from "react-native";
import { router, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Whatsapp from "../../../assets/vectors/Whatsapp.svg";
import Web from "../../../assets/vectors/Web.svg";
import Facebook from "../../../assets/vectors/Facebook2.svg";
import Twitter from "../../../assets/vectors/Twitter.svg";
import Instagram from "../../../assets/vectors/Instagram.svg";
import HeadPhone from "../../../assets/vectors/head-phone.svg";
import Header from "../../../components/header";
import { StatusBar } from "expo-status-bar";

export default function Account() {
    const { width, height } = Dimensions.get("window");
    
    return (
        <SafeAreaView style={{flex: 1, paddingHorizontal: 20, backgroundColor: "white"}}>
            <StatusBar style="dark" />
        
            {/* header section */}
            <Header page={"Help Center"} />

            {/* Other pages */}
            <View>
                <View style={{width: "100px", height: 1, backgroundColor: "#e6e6e6", marginBottom: 15}}></View>

                <Pressable
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20,
                        borderWidth: 1,
                        borderColor: "#E6E6E6",
                        borderRadius: 10,
                        paddingVertical: 20,
                        paddingHorizontal: 14
                    }}
                    onPress={() => router.push("/customerService")}
                >
                    <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                        <HeadPhone width={24} height={24} />
                        <Text style={{fontSize: 16, fontWeight: "500"}}>Customer Service</Text>
                    </View>

                </Pressable>

                <Pressable
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20,
                        borderWidth: 1,
                        borderColor: "#E6E6E6",
                        borderRadius: 10,
                        paddingVertical: 20,
                        paddingHorizontal: 14
                    }}
                    // onPress={() => router.push("/account/")}
                >
                    <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                        <Whatsapp width={24} height={24} />
                        <Text style={{fontSize: 16, fontWeight: "500"}}>Whatsapp</Text>
                    </View>

                </Pressable>

                <Pressable
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20,
                        borderWidth: 1,
                        borderColor: "#E6E6E6",
                        borderRadius: 10,
                        paddingVertical: 20,
                        paddingHorizontal: 14
                    }}
                    // onPress={() => router.push("/account/order")}
                >
                    <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                        <Web width={24} height={24} />
                        <Text style={{fontSize: 16, fontWeight: "500"}}>Website</Text>
                    </View>

                </Pressable>

                <Pressable
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20,
                        borderWidth: 1,
                        borderColor: "#E6E6E6",
                        borderRadius: 10,
                        paddingVertical: 20,
                        paddingHorizontal: 14
                    }}
                    // onPress={() => router.push("/account/order")}
                >
                    <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                        <Facebook width={24} height={24} />
                        <Text style={{fontSize: 16, fontWeight: "500"}}>Facebook</Text>
                    </View>

                </Pressable>

                <Pressable
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20,
                        borderWidth: 1,
                        borderColor: "#E6E6E6",
                        borderRadius: 10,
                        paddingVertical: 20,
                        paddingHorizontal: 14
                    }}
                    // onPress={() => router.push("/account/order")}
                >
                    <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                        <Twitter width={24} height={24} />
                        <Text style={{fontSize: 16, fontWeight: "500"}}>Twitter</Text>
                    </View>

                </Pressable>


                <Pressable
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20,
                        borderWidth: 1,
                        borderColor: "#E6E6E6",
                        borderRadius: 10,
                        paddingVertical: 20,
                        paddingHorizontal: 14
                    }}
                    // onPress={() => router.push("/account/order")}
                >
                    <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                        <Instagram width={24} height={24} />
                        <Text style={{fontSize: 16, fontWeight: "500"}}>Instagram</Text>
                    </View>

                </Pressable>



            </View>
        </SafeAreaView>
    )
}
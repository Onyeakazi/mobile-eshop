import { Text, View, Pressable, Dimensions } from "react-native";
import { router, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Bell from "../../../assets/vectors/bell.svg";
import Box from "../../../assets/vectors/box.svg";
import ChevronRight from "../../../assets/vectors/chevron-right.svg";
import ProfileDetail from "../../../assets/vectors/my-detail.svg";
import House from "../../../assets/vectors/house.svg";
import PaymentCard from "../../../assets/vectors/payment-card.svg";
import FAQ from "../../../assets/vectors/faq.svg";
import HeadPhone from "../../../assets/vectors/head-phone.svg";
import Logout from "../../../assets/vectors/logout.svg";
import Header from "../../../components/header";
import CustomAlert from "../../../components/CustomAlert";
import Warning from "../../../assets/vectors/Warning.svg";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";


export default function Account() {
    const { width, height } = Dimensions.get("window");
    const [alertVisible, setAlertVisible] = useState(false);
    
    return (
        <SafeAreaView style={{flex: 1, paddingHorizontal: 20, backgroundColor: "white"}}>
            <StatusBar style="dark" />
        
            {/* header section */}
            <Header page={"Account"} />

            {/* Other pages */}
            <View>
                <View style={{width: "100px", height: 2, backgroundColor: "#e6e6e6", marginBottom: 15}}></View>

                <Pressable
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20
                    }}
                    onPress={() => router.push("/account/order")}
                >
                    <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                        <Box width={18} height={18} />
                        <Text style={{fontSize: 16, fontWeight: "400"}}>My Orders</Text>
                    </View>

                    <ChevronRight width={17} height={17} />
                </Pressable>

                <View style={{marginHorizontal: -20, height: 8, backgroundColor: "#e6e6e6", marginVertical: 13}}></View>

                <Pressable
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20
                    }}
                    onPress={() => router.push("/account/myDetails")}
                >
                    <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                        <ProfileDetail width={18} height={18} />
                        <Text style={{fontSize: 16, fontWeight: 400}}>My Details</Text>
                    </View>

                    <ChevronRight width={17} height={17} />
                </Pressable>

                <View style={{width: "100px", height: 2, backgroundColor: "#e6e6e6", marginVertical: 13}}></View>

                <Pressable
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20
                    }}
                    onPress={() => router.push("/address")}
                >
                    <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                        <House width={18} height={18} />
                        <Text style={{fontSize: 16, fontWeight: 400}}>Address Book</Text>
                    </View>

                    <ChevronRight width={17} height={17} />
                </Pressable>

                <View style={{width: "100px", height: 2, backgroundColor: "#e6e6e6", marginVertical: 13}}></View>

                <Pressable
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20
                    }}
                    onPress={() => router.push("/checkout/paymentMethod")}
                >
                    <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                        <PaymentCard width={18} height={18} />
                        <Text style={{fontSize: 16, fontWeight: 400}}>Payment Method</Text>
                    </View>

                    <ChevronRight width={17} height={17} />
                </Pressable>

                <View style={{width: "100px", height: 2, backgroundColor: "#e6e6e6", marginVertical: 13}}></View>

                <Pressable
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20
                    }}
                    onPress={() => router.push("/account/notifications")}
                >
                    <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                        <Bell width={18} height={18} />
                        <Text style={{fontSize: 16, fontWeight: 400}}>Notifications</Text>
                    </View>

                    <ChevronRight width={17} height={17} />
                </Pressable>

                <View style={{marginHorizontal: -20, height: 8, backgroundColor: "#e6e6e6", marginVertical: 15}}></View>

                <Pressable
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20
                    }}
                    onPress={() => router.push("/account/faq")}
                >
                    <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                        <FAQ width={18} height={18} />
                        <Text style={{fontSize: 16, fontWeight: 400}}>FAQs</Text>
                    </View>

                    <ChevronRight width={17} height={17} />
                </Pressable>

                <View style={{width: "100px", height: 2, backgroundColor: "#e6e6e6", marginVertical: 13}}></View>

                <Pressable
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20
                    }}
                    onPress={() => router.push("/account/help")}
                >
                    <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                        <HeadPhone width={18} height={18} />
                        <Text style={{fontSize: 16, fontWeight: 400}}>Help </Text>
                    </View>

                    <ChevronRight width={17} height={17} />
                </Pressable>

                <View style={{marginHorizontal: -20, height: 8, backgroundColor: "#e6e6e6", marginVertical: 15}}></View>

                <Pressable style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10, marginTop: 10}}
                    onPress={()=> {setAlertVisible(true)}}
                >
                    <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                        <Logout width={18} height={18} />
                        <Text style={{fontSize: 16, fontWeight: 400, color: "red"}}>Logout</Text>
                    </View>

                    <ChevronRight width={17} height={17}  />
                </Pressable>
            </View>

            <CustomAlert
                Icon={Warning}
                visible={alertVisible}
                title="Logout?"
                message="Are you sure you want to logout?"
                confirmStyle={{ color: "white", backgroundColor: "red" }}
                cancelStyle={{ backgroundColor: "white", borderWidth: 1, borderColor: "#CCCCCC"}}
                confirmText="Yes, Logout"
                cancelText="No, Cancel"
                onClose={() => setAlertVisible(false)}
                onClick={() => router.push("/(auth)/login")}
            />
        </SafeAreaView>
    )
}
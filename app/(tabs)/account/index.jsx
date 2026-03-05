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

export default function Account() {
    const { width, height } = Dimensions.get("window");
    
    return (
        <SafeAreaView style={{paddingHorizontal: 20}}>
        
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
                    onPress={() => router.push("/account/mydetails")}
                >
                    <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                        <ProfileDetail width={18} height={18} />
                        <Text style={{fontSize: 16, fontWeight: 400}}>My Details</Text>
                    </View>

                    <ChevronRight width={17} height={17} />
                </Pressable>

                <View style={{width: "100px", height: 2, backgroundColor: "#e6e6e6", marginVertical: 20}}></View>

                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5, marginTop: 10}}>
                    <Pressable style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                        <House width={18} height={18} />
                        <Text style={{fontSize: 16, fontWeight: 400}}>Address Book</Text>
                    </Pressable>

                    <ChevronRight width={17} height={17}  />
                </View>

                <View style={{width: "100px", height: 2, backgroundColor: "#e6e6e6", marginVertical: 20}}></View>

                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5, marginTop: 10}}>
                    <Pressable style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                        <PaymentCard width={18} height={18} />
                        <Text style={{fontSize: 16, fontWeight: 400}}>Payment Method</Text>
                    </Pressable>

                    <ChevronRight width={17} height={17}  />
                </View>

                <View style={{width: "100px", height: 2, backgroundColor: "#e6e6e6", marginVertical: 20}}></View>

                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10, marginTop: 10}}>
                    <Pressable style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                        <Bell width={18} height={18} />
                        <Text style={{fontSize: 16, fontWeight: 400}}>Notifications</Text>
                    </Pressable>

                    <ChevronRight width={17} height={17}  />
                </View>

                <View style={{marginHorizontal: -20, height: 8, backgroundColor: "#e6e6e6", marginVertical: 15}}></View>

                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5, marginTop: 10}}>
                    <Pressable style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                        <FAQ width={18} height={18} />
                        <Text style={{fontSize: 16, fontWeight: 400}}>FAQs</Text>
                    </Pressable>

                    <ChevronRight width={17} height={17}  />
                </View>

                <View style={{width: "100px", height: 2, backgroundColor: "#e6e6e6", marginVertical: 20}}></View>

                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10, marginTop: 10}}>
                    <Pressable style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                        <HeadPhone width={18} height={18} />
                        <Text style={{fontSize: 16, fontWeight: 400}}>Help Center</Text>
                    </Pressable>

                    <ChevronRight width={17} height={17}  />
                </View>

                <View style={{marginHorizontal: -20, height: 8, backgroundColor: "#e6e6e6", marginVertical: 15}}></View>

                <Pressable style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10, marginTop: 10}}
                    onPress={()=> {
                        router.push("../login")
                    }}
                >
                    <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                        <Logout width={18} height={18} />
                        <Text style={{fontSize: 16, fontWeight: 400}}>Logout</Text>
                    </View>

                    <ChevronRight width={17} height={17}  />
                </Pressable>
            </View>
        </SafeAreaView>
    )
}
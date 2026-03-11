import { FlatList, Image, Pressable, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/header";
import { router } from "expo-router";
import Location from "../../../assets/vectors/Location.svg";
import Card from "../../../assets/vectors/payment-card.svg";
import Cash from "../../../assets/vectors/Cash.svg";
import AppleLogo from "../../../assets/vectors/logos_apple-pay.svg";
import VisaCard from "../../../assets/vectors/bxl_visa.svg";
import Edit from "../../../assets/vectors/Edit.svg";
import Discount from "../../../assets/vectors/Discount.svg";
import CustomAlert from "../../../components/CustomAlert";
import CheckDuotone from "../../../assets/vectors/Check-duotone.svg";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";

export default function Checkout() {
    const [alertVisible, setAlertVisible] = useState(false);

    return (
        <SafeAreaView style={{flex: 1, paddingHorizontal: 20, backgroundColor: "white"}}>
            <StatusBar style="dark" />
        
           {/* header section */}
            <Header page={"Checkout"} />

            <View style={{width: "100px", height: 2, backgroundColor: "#e6e6e6", marginVertical: 10}}></View>
            
            <View>
                {/* Delivery */}
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <Text style={{fontSize: 16, color: "#1A1A1A", fontWeight: "900"}}>Delivery Address</Text>

                    <Pressable
                        onPress={()=> {
                            router.push("/address");
                        }}
                    >
                        <Text style={{fontSize: 14, color: "#1A1A1A", fontWeight: "700", textDecorationLine: "underline"}}>Change</Text>
                    </Pressable>
                </View>

                {/* Home Address */}
                <View style={{marginTop: 10, flexDirection: "row", gap: 10}}>
                    <Location width={24} height={24} />

                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 14, fontWeight: "700"}}>Home</Text>
                        <Text style={{fontSize: 14, fontWeight: "500", color: "#808080", marginTop: 5}}>925 S Chugach St #APT 10, Alaska 99645</Text>
                    </View>
                </View>

                <View style={{width: "100px", height: 2, backgroundColor: "#e6e6e6", marginVertical: 15}}></View>

                {/* Payment */}
                <View style={{marginBottom: 15}}>
                    <Text style={{fontSize: 16, color: "#1A1A1A", fontWeight: "900"}}>Payment Method</Text>

                    <View style={{marginTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <Pressable style={[styles.cards, styles.cardColor1]}>
                            <Card width={24} height={24} color={"#ffff"}/> 
                            <Text style={styles.cardText}>Card</Text>
                        </Pressable>
                        <Pressable style={[styles.cards, styles.cardColor2]}>
                            <Cash width={24} height={24} />
                            <Text style={styles.cardText2}>Cash</Text>
                        </Pressable>
                        <Pressable style={[styles.cards, styles.cardColor2]}>
                            <AppleLogo width={44} height={25} />
                        </Pressable>
                    </View>
                </View>

                <View style={{borderWidth: 1, borderColor: "#e0e0e0", borderRadius: 15, padding: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                        <VisaCard width={44} height={14} />
                        <Text style={{fontSize: 16, fontWeight: 500, color: "#000000"}}>**** **** **** 2512</Text>
                    </View>

                    <Pressable onPress={()=> router.push("/checkout/paymentMethod")}>
                        <Edit width={24} height={24} />
                    </Pressable>
                </View>

                <View style={{width: "100px", height: 2, backgroundColor: "#e6e6e6", marginVertical: 18}}></View>

            </View>
            
            {/* /* Summary details */ }
            <View style={{flex: 1}}>
                <Text style={{fontSize: 16, color: "#1A1A1A", fontWeight: "900", marginBottom: 10}}>Order Summary</Text>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12,}}>
                    <Text style={{fontSize: 16, color: "#808080"}}>Sub-total</Text>
                    <Text style={{fontSize: 16, fontWeight: 700}}>$ 5,870</Text>
                </View>

                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12}}>
                    <Text style={{fontSize: 16, color: "#808080"}}>VAT (%)</Text>
                    <Text style={{fontSize: 16, fontWeight: 700}}>$ 0.00</Text>
                </View>

                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12}}>
                    <Text style={{fontSize: 16, color: "#808080"}}>Shipping fee</Text>
                    <Text style={{fontSize: 16, fontWeight: 700}}>$ 80</Text>
                </View>
                
                <View style={{width: "100px", height: 2, backgroundColor: "#e6e6e6", marginVertical: 20}}></View>

                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12}}>
                    <Text style={{fontSize: 16}}>Total</Text>
                    <Text style={{fontSize: 16, fontWeight: "700"}}>$ 5, 950</Text>
                </View>

                <View style={{flexDirection: "row", alignItems: "center", marginBottom: 12}}>
                    <View style={{borderWidth: 1, borderColor: "#e0e0e0", borderRadius: 15, padding: 15, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: 10, flex:1}}>
                        <Discount width={24} height={24} />
                        <Text style={{fontSize: 16, color: "#808080"}}>Enter Promo Code</Text>
                    </View>

                    <Pressable style={{backgroundColor: "#000", paddingVertical: 19, paddingHorizontal: 20, borderRadius: 10, justifyContent: "center", alignItems: "center", marginLeft: 10}}>
                        <Text style={{fontSize: 14, color: "white", fontWeight: "700"}}>Add</Text>
                    </Pressable>
                </View>


            </View>

            <Pressable
                style={{
                paddingVertical: 15,
                paddingHorizontal: 100,
                borderRadius: 10,
                backgroundColor: "black",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "auto"
                }}
                onPress={() => setAlertVisible(true)}
            >
                <Text
                    style={{
                        color: "white",
                        fontWeight: "700",
                        fontSize: 18,
                    }}
                >
                    Place Order
                </Text>
            </Pressable>

            <CustomAlert
                Icon={CheckDuotone}
                visible={alertVisible}
                title="Congratulations!"
                message="Your order has been placed."
                confirmText="Track Your Order"
                showCancel={false}
                onClose={() => setAlertVisible(false)}
                onClick={() => router.replace("/trackOrder")}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    cards: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        paddingVertical: 5, 
        paddingHorizontal: 30, 
        borderRadius: 10, 
        gap: 6,
        borderWidth: 1,
        borderColor: "#c7c7c7"
    },

    cardColor1: {
        backgroundColor: "#000000"
    },

    cardColor2: {
        backgroundColor: "white"
    },

    cardText: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: 400
    },

    cardText2: {
        color: "#000000",
        fontSize: 14,
        fontWeight: 500
    }


})
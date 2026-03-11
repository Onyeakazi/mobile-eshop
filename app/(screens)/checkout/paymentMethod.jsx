import { FlatList, Pressable, Text, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/header";
import { router } from "expo-router";
import Location from "../../../assets/vectors/Location.svg";
import Plus from "../../../assets/vectors/plus.svg";
import PaymentCard from "../../../components/paymentCard";
import VisaCard from "../../../assets/vectors/bxl_visa.svg";
import MasterCard from "../../../assets/vectors/mastercard.svg";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";

export default function PaymentMethod() {    
    const [selected, setSelected] = useState("**** **** **** 2512");
    return (
        <SafeAreaView style={{flex: 1, paddingHorizontal: 20, backgroundColor: "white"}}>
            <StatusBar style="dark" />
        
           {/* header section */}
            <Header page={"Payment Method"} />

            <View style={{width: "100px", height: 2, backgroundColor: "#e6e6e6", marginVertical: 10}}></View>
            
            <View>
                {/* Delivery */}
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <Text style={{fontSize: 16, color: "#1A1A1A", fontWeight: "900", marginVertical: 10}}>Saved Cards</Text>
                </View>

                <PaymentCard number={"**** **** **** 2512"} selected={selected} setSelected={setSelected} 
                    card={<VisaCard width={37} height={12} />}
                />

                <PaymentCard number={"**** **** **** 3234"} selected={selected} setSelected={setSelected} 
                    card={<MasterCard width={37} height={12} />}
                />

                <PaymentCard number={"**** **** **** 1134"} selected={selected} setSelected={setSelected} 
                    card={<VisaCard width={37} height={12} />}
                />

                
                <Pressable style={{flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10, paddingVertical: 15, paddingHorizontal: 20, borderWidth: 1, borderRadius: 10, borderColor: "#e0e0e0", marginVertical: 20}}
                    onPress={() => router.push("/checkout/newCard")}
                >
                    <Plus width={24} height={24} />
                    <Text style={{fontSize: 16, fontWeight: "600"}}>Add New Card</Text>
                </Pressable>


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
                // onPress={() => router.push("/checkout")}
            >
                <Text style={{color: "white", fontWeight: "700", fontSize: 18 }}
                >
                    Apply
                </Text>
            </Pressable>

        </SafeAreaView>
    )
}


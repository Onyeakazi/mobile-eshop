import { Pressable, Text, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/header";
import { router } from "expo-router";
import Plus from "../../../assets/vectors/plus.svg";
import PaymentCard from "../../../components/paymentCard";
import VisaCard from "../../../assets/vectors/bxl_visa.svg";
import MasterCard from "../../../assets/vectors/mastercard.svg";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";

export default function PaymentMethod() {
    const [selected, setSelected] = useState("**** **** **** 2512");

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, backgroundColor: "white" }}>
            <StatusBar style="dark" />
            <Header page={"Payment Method"} />

            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <View style={styles.divider} />

                <Text style={styles.sectionTitle}>Saved Cards</Text>

                <PaymentCard 
                    number={"**** **** **** 2512"} 
                    selected={selected} 
                    setSelected={setSelected} 
                    card={<VisaCard width={37} height={12} />}
                />
                <PaymentCard 
                    number={"**** **** **** 3234"} 
                    selected={selected} 
                    setSelected={setSelected} 
                    card={<MasterCard width={37} height={12} />}
                />
                <PaymentCard 
                    number={"**** **** **** 1134"} 
                    selected={selected} 
                    setSelected={setSelected} 
                    card={<VisaCard width={37} height={12} />}
                />

                <Pressable 
                    style={styles.addCardButton}
                    onPress={() => router.push("/checkout/newCard")}
                >
                    <Plus width={24} height={24} />
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>Add New Card</Text>
                </Pressable>
            </ScrollView>

            {/* Apply Button */}
            <View style={{ paddingBottom: 20 }}>
                <Pressable
                    style={styles.applyButton}
                    // onPress={() => router.push("/checkout")}
                >
                    <Text style={styles.applyText}>Apply</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    divider: {
        width: "100%", 
        height: 2, 
        backgroundColor: "#e6e6e6", 
        marginVertical: 10
    },
    sectionTitle: {
        fontSize: 16, 
        fontWeight: "900", 
        marginBottom: 10
    },
    addCardButton: {
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center", 
        gap: 10, 
        paddingVertical: 15, 
        paddingHorizontal: 20, 
        borderWidth: 1, 
        borderRadius: 10, 
        borderColor: "#e0e0e0", 
        marginVertical: 20
    },
    applyButton: {
        width: "100%",
        paddingVertical: 16,
        borderRadius: 12,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center"
    },
    applyText: {
        color: "white",
        fontWeight: "700",
        fontSize: 18
    }
});
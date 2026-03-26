import { Pressable, Text, View, StyleSheet, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/header";
import Question from "../../../assets/vectors/Question.svg";
import { useState } from "react";
import CustomAlert from "../../../components/CustomAlert";
import CheckDuotone from "../../../assets/vectors/Check-duotone.svg";
import { StatusBar } from "expo-status-bar";

export default function NewCard() {    
    const [alertVisible, setAlertVisible] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, backgroundColor: "white" }}>
            <StatusBar style="dark" />
            <Header page={"New Card"} />

            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <View style={styles.divider} />

                <Text style={styles.sectionTitle}>Add Debit or Credit Card</Text>

                {/* Card Number */}
                <Text style={styles.inputLabel}>Card Number</Text>
                <View style={styles.inputContainer}>
                    <TextInput 
                        placeholder="Enter your card number"
                        placeholderTextColor="#808080"
                        style={{ fontSize: 14 }}
                    />
                </View>

                {/* Expiry & Security */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.inputLabel}>Expiry Date</Text>
                        <View style={styles.inputContainer}>
                            <TextInput 
                                placeholder="MM/YY"
                                placeholderTextColor="#808080"
                                style={{ fontSize: 14 }}
                            />
                        </View>
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.inputLabel}>Security Code</Text>
                        <View style={styles.inputContainer}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <TextInput 
                                    placeholder="324"
                                    placeholderTextColor="#808080"
                                    style={{ fontSize: 14 }}
                                />
                                <Question width={24} height={24} />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Add Card Button */}
            <View style={{ paddingBottom: 20 }}>
                <Pressable
                    style={styles.addButton}
                    onPress={() => setAlertVisible(true)}
                >
                    <Text style={styles.addButtonText}>Add Card</Text>
                </Pressable>
            </View>

            <CustomAlert
                Icon={CheckDuotone}
                visible={alertVisible}
                title="Congratulations!"
                message="Your new card has been added."
                confirmText="Thanks"
                showCancel={false}
                onClick={() => setAlertVisible(false)}
            />
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
    inputLabel: {
        fontSize: 16, 
        fontWeight: "500", 
        marginBottom: 7
    },
    inputContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        borderRadius: 10,
        marginBottom: 20
    },
    addButton: {
        width: "100%",
        paddingVertical: 16,
        borderRadius: 12,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center"
    },
    addButtonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 18
    }
});
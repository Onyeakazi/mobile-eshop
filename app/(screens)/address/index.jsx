import { Pressable, Text, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/header";
import { router } from "expo-router";
import Location from "../../../assets/vectors/Location.svg";
import Plus from "../../../assets/vectors/plus.svg";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";

export default function Address() {
    const [selected, setSelected] = useState("Home");
    
    const AddressCard = ({ type, address, selected, setSelected }) => {
        return (
            <Pressable
                onPress={() => setSelected(type)}
                style={styles.cardContainer}
            >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <Location width={24} height={24} />

                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                            <Text style={styles.cardTitle}>{type}</Text>

                            {selected === type && (
                                <View style={styles.defaultBadge}>
                                    <Text style={styles.defaultText}>Default</Text>
                                </View>
                            )}
                        </View>

                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.cardAddress}>
                            {address}
                        </Text>
                    </View>

                    <View style={styles.radioOuter}>
                        {selected === type && <View style={styles.radioInner} />}
                    </View>
                </View>
            </Pressable>
        )
    }

    return (
        <SafeAreaView style={{flex: 1, paddingHorizontal: 20, backgroundColor: "white"}}>
            <StatusBar style="dark" />
            <Header page={"Address"} />

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Saved Address</Text>

            <ScrollView contentContainerStyle={{paddingBottom: 20}}>
                <AddressCard type="Home" address="925 S Chugach St #APT 10, Alaska 99645" selected={selected} setSelected={setSelected}/>
                <AddressCard type="Work" address="123 Main St, New York, NY 10001" selected={selected} setSelected={setSelected}/>
                <AddressCard type="Parents" address="456 Elm St, Los Angeles, CA 90001" selected={selected} setSelected={setSelected}/>
                <AddressCard type="Friend's" address="789 Oak St, Chicago, IL 60601" selected={selected} setSelected={setSelected}/>
                <AddressCard type="Other" address="321 Pine St, Houston, TX 77001" selected={selected} setSelected={setSelected}/>

                <Pressable 
                    style={styles.addAddressButton}
                    onPress={() => router.push("/address/addAddress")}
                >
                    <Plus width={24} height={24} />
                    <Text style={{fontSize: 16, fontWeight: "600"}}>Add New Address</Text>
                </Pressable>
            </ScrollView>

            <View style={{ paddingBottom: 20}}>
                <Pressable
                    style={styles.applyButton}
                    onPress={() => router.push("/checkout")}
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
        marginHorizontal: 20, 
        marginBottom: 10
    },
    cardContainer: {
        borderWidth: 1, 
        borderColor: "#e0e0e0", 
        borderRadius: 10, 
        paddingHorizontal: 19, 
        paddingVertical: 13, 
        marginBottom: 10
    },
    cardTitle: {
        fontSize: 14, 
        fontWeight: "700"
    },
    cardAddress: {
        fontSize: 14, 
        fontWeight: "500", 
        color: "#808080", 
        marginTop: 5
    },
    radioOuter: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center"
    },
    radioInner: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#000"
    },
    defaultBadge: {
        backgroundColor: "#E6E6E6",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 7
    },
    defaultText: {
        fontSize: 10,
        fontWeight: "700",
        color: "#1A1A1A"
    },
    addAddressButton: {
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center", 
        gap: 10, 
        paddingVertical: 14, 
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
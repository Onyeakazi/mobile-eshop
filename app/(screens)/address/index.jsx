import { FlatList, Pressable, Text, View, StyleSheet, ScrollView } from "react-native";
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
        return(
            <ScrollView>
                <Pressable
                    onPress={() => setSelected(type)}
                    style={{ borderWidth: 1, borderColor: "#e0e0e0", borderRadius: 10, paddingHorizontal: 19, paddingVertical: 13, marginBottom: 10}}>

                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>

                            <Location width={24} height={24} />

                            <View style={{ flex: 1 }}>

                                {/* Title Row */}
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                    <Text style={{ fontSize: 14, fontWeight: "700" }}>
                                    {type}
                                    </Text>

                                    {selected === type && (
                                        <View style={styles.defaultBadge}>
                                            <Text style={styles.defaultText}>Default</Text>
                                        </View>
                                    )}
                                </View>

                                {/* Address */}
                                <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 14, fontWeight: "500", color: "#808080", marginTop: 5 }}>
                                    {address}
                                </Text>

                            </View>

                            {/* Bullet Selection */}
                            <View style={styles.radioOuter}>
                                {selected === type && <View style={styles.radioInner} />}
                            </View>

                        </View>

                </Pressable>
            </ScrollView>
        )
    }

    return (
        <SafeAreaView style={{flex: 1, paddingHorizontal: 20, backgroundColor: "white"}}>
            <StatusBar style="dark" />
        
           {/* header section */}
            <Header page={"Address"} />

            <View style={{width: "100px", height: 2, backgroundColor: "#e6e6e6", marginVertical: 10}}></View>
            
            <View>
                {/* Delivery */}
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <Text style={{fontSize: 16, color: "#1A1A1A", fontWeight: "900", marginVertical: 10}}>Saved Address</Text>
                </View>

                <AddressCard type="Home" address="925 S Chugach St #APT 10, Alaska 99645" selected={selected} setSelected={setSelected}/>
                <AddressCard type="Work" address="123 Main St, New York, NY 10001" selected={selected} setSelected={setSelected}/>
                <AddressCard type="Parents" address="456 Elm St, Los Angeles, CA 90001" selected={selected} setSelected={setSelected}/>
                <AddressCard type="Friend's" address="789 Oak St, Chicago, IL 60601" selected={selected} setSelected={setSelected}/>
                <AddressCard type="Other" address="321 Pine St, Houston, TX 77001" selected={selected} setSelected={setSelected}/>

                
                <Pressable style={{flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10, paddingVertical: 14, paddingHorizontal: 20, borderWidth: 1, borderRadius: 10, borderColor: "#e0e0e0", marginVertical: 20}}
                    onPress={() => router.push("/address/addAddress")}
                >
                    <Plus width={24} height={24} />
                    <Text style={{fontSize: 16, fontWeight: "600"}}>Add New Address</Text>
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
                <Text
                    style={{
                        color: "white",
                        fontWeight: "700",
                        fontSize: 18,
                    }}
                >
                    Apply
                </Text>
            </Pressable>

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
        backgroundColor: "#E6E6E6"
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
    }


})
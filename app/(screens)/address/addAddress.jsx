import { Pressable, Text, View, StyleSheet, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/header";
import { router } from "expo-router";
import Cancel from "../../../assets/vectors/Cancel.svg";
import Check from "../../../assets/vectors/Check.svg";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import CustomAlert from "../../../components/CustomAlert";
import CheckDuotone from "../../../assets/vectors/Check-duotone.svg";
import MapView, { Marker } from 'react-native-maps';
import { StatusBar } from "expo-status-bar";

export default function addAddress() {
    const [value, setValue] = useState(50);
    const [checked, setChecked] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);

    const data = [
        { label: "Recent", value: "recent" },
        { label: "Last", value: "Last" },
    ];
  
    return (
        <SafeAreaView style={{flex: 1, paddingHorizontal: 20, backgroundColor: "white"}}>
            <StatusBar style="dark" />
        
           {/* header section */}
            <Header page={"New Address"} />

            {/* Map Section */}
            <View style={{ width: "100%", height: 350, borderRadius: 10, overflow: "hidden", marginBottom: 20 }}>
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: 37.78825,      // default coordinates
                        longitude: -122.4324,
                        latitudeDelta: 0.005,    // zoom level
                        longitudeDelta: 0.005,
                    }}
                >
                    {/* Optional Marker */}
                    <Marker 
                        coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                        title="Home"
                        description="This is your address location"
                    />
                </MapView>
            </View>
            
            <View>
                {/* Delivery */}
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <Text style={{fontSize: 20, color: "#1A1A1A", fontWeight: "900", marginVertical: 10}}>Address</Text>

                    <Pressable
                        onPress={()=> {
                            router.push("/address");
                        }}
                    >
                        <Cancel width={24} height={24} />
                    </Pressable>
                </View>

                {/* Line */}
                <View style={{width: "100px", height: 2, backgroundColor: "#e6e6e6", marginVertical: 10}}></View>

                <View>

                    <Text style={{fontSize: 16, color: "#1A1A1A", fontWeight: "900", marginVertical: 10}}>Address Nickname</Text>

                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10, paddingVertical: 17, paddingHorizontal: 20, borderWidth: 1, borderRadius: 10, borderColor: "#e0e0e0"}}>
                        
                        <View style={{width: "100%"}}>
                            <Dropdown
                                style={{
                                    borderColor: "#808080",
                                    borderRadius: 8,
                                }}
                                data={data}
                                labelField="label"
                                valueField="value"
                                placeholder="Choose One"
                                value={value}
                                selectedTextStyle={{
                                    fontSize: 14,
                                    color: "#808080"
                                }}
                                placeholderStyle={{
                                    fontSize: 14,
                                    color: "#808080"
                                }}
                                onChange={item => setValue(item.value)}
                            />
                        </View>
                    </View>

                    <Text style={{fontSize: 16, color: "#1A1A1A", fontWeight: "900", marginVertical: 10}}>Full Address</Text>

                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10, paddingVertical: 10, paddingHorizontal: 20, borderWidth: 1, borderRadius: 10, borderColor: "#e0e0e0"}}>
                        
                        <View
                            style={{
                                width: "100%"
                            }}
                        >
                           <TextInput 
                                placeholder="Enter your full address..."
                                placeholderTextColor="#808080"
                                placeholderStyle={{ fontSize: 14}}
                            />
                        </View>
                    </View>

                    <View style={styles.container}>
                        <Pressable
                            style={styles.checkboxContainer}
                            onPress={() => setChecked(!checked)}
                        >
                            <View style={[styles.checkbox, checked && styles.checked]}>
                            {checked && 
                                <View style={styles.inner}>
                                    <Check width={12} height={12} />
                                </View>
                            }
                            </View>
                            <Text style={styles.label}>Make this the default address</Text>
                        </Pressable>
                    </View>
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
                    Add
                </Text>
            </Pressable>

            {/* Alert */}
            <CustomAlert
                Icon={CheckDuotone}
                visible={alertVisible}
                title="Congratulations!"
                message="Your new address has been added."
                confirmText="Thanks"
                showCancel={false}
                onClick={() => setAlertVisible(false)}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: { marginTop: 10 },
  checkboxContainer: { flexDirection: "row", alignItems: "center" },
  checkbox: {
    width: 17,
    height: 17,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    borderColor: "black",
    backgroundColor: "#000",
  },

  inner: {
    width: 12,
    height: 12,
    backgroundColor: "black",
    borderRadius: 2,
  },

  label: { marginLeft: 10, fontSize: 16 },
});
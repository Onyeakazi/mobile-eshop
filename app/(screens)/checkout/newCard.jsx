import { FlatList, Pressable, Text, View, StyleSheet, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/header";
import Question from "../../../assets/vectors/Question.svg";
import { useState } from "react";
import CustomAlert from "../../../components/CustomAlert";
import CheckDuotone from "../../../assets/vectors/Check-duotone.svg";

export default function NewCard() {    
    const [alertVisible, setAlertVisible] = useState(false);

    return (
        <SafeAreaView style={{flex: 1, paddingHorizontal: 20}}>
        
           {/* header section */}
            <Header page={"New Card"} />

            <View style={{width: "100px", height: 2, backgroundColor: "#e6e6e6", marginVertical: 10}}></View>
            
            <View>
                {/* Delivery */}
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <Text style={{fontSize: 16, color: "#1A1A1A", fontWeight: "900", marginVertical: 10}}>Add Debit or Credit Card</Text>
                </View>

                <View>
                    <Text style={{fontSize: 16, color: "#1A1A1A", fontWeight: "500", marginVertical: 10}}>Card Address</Text>

                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10, paddingVertical: 10, paddingHorizontal: 20, borderWidth: 1, borderRadius: 10, borderColor: "#e0e0e0", marginBottom: 7}}>
                        
                        <View
                            style={{
                                width: "100%"
                            }}
                        >
                            <TextInput 
                                placeholder="Enter your card number"
                                placeholderTextColor="#808080"
                                style={{ fontSize: 14}}
                            />
                        </View>
                    </View>

                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>

                        <View style={{flex: 1, marginRight: 10}}>
                            <Text style={{fontSize: 16, color: "#1A1A1A", fontWeight: "500", marginVertical: 10}}>Expiry Date</Text>

                            <View style={{paddingVertical: 7, paddingHorizontal: 10, borderWidth: 1, borderRadius: 10, borderColor: "#e0e0e0"}}>
                                
                                <View
                                    style={{
                                        flexDirection: "row", justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >
                                    <TextInput 
                                        placeholder="MM/YY"
                                        placeholderTextColor="#808080"
                                        placeholderStyle={{ fontSize: 14}}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{flex: 1}}>
                            <Text style={{fontSize: 16, color: "#1A1A1A", fontWeight: "500", marginVertical: 10}}>Security Code</Text>

                            <View style={{ paddingVertical: 7, paddingHorizontal: 10, borderWidth: 1, borderRadius: 10, borderColor: "#e0e0e0"}}>
                                
                                <View
                                    style={{
                                        // width: "45%",
                                        flexDirection: "row", justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >
                                    <TextInput 
                                        placeholder="324"
                                        placeholderTextColor="#808080"
                                        style={{ fontSize: 16}}
                                    />

                                    <Question width={24} height={24} />
                                </View>
                            </View>
                        </View>

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
                <Text style={{color: "white", fontWeight: "700", fontSize: 18 }}
                >
                    Add Card
                </Text>
            </Pressable>

            <CustomAlert
                Icon={CheckDuotone}
                visible={alertVisible}
                title="Congratulations!"
                message="Your new card has being added."
                confirmText="Thanks"
                onClose={() => setAlertVisible(false)}
            />

        </SafeAreaView>
    )
}


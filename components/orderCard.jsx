import { View, Image, Pressable, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    statusComplete: {
        backgroundColor: "#def2de", 
        paddingVertical: 5, 
        paddingHorizontal: 10, 
        borderRadius: 7, 
        marginBottom: 10
    },

    statusOngoing: {
        backgroundColor: "#E6E6E6", 
        paddingVertical: 5, 
        paddingHorizontal: 10, 
        borderRadius: 7, 
        marginBottom: 10
    },

    statusCompletedText: {
        fontSize: 13, 
        fontWeight: 500,        
        color: "#0C9409"
    },

    statusOngoingText: {
        fontSize: 13, 
        fontWeight: 500,        
        color: "#000000"
    }
})

export default function OrderCard({item, onCompletedPress}) {
    return (
        <View style={{marginTop: 15}}>
            <View style={{borderWidth: 1, borderColor: "#d4d4d4", padding: 12, borderRadius: 10, marginBottom: 1}}>
                <View style={{flexDirection: "row", gap: 15}}>
                    <View>
                        <Image 
                            source={item.image} 
                                style={{
                                width: 83,
                                height: 79,
                                resizeMode: "contain",
                                backgroundColor: "#e1e1e1",
                                borderRadius: 10,
                            }}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}> 
                            <View>
                                <Text style={{fontWeight: "700", flex: 1}}>{item.title}</Text>
                                <Text style={{fontSize: 13, fontWeight: 300}}>{item.size}</Text>
                            </View>

                            <View style={item.status === "Delivered" ? styles.statusComplete : styles.statusOngoing}>
                                <Text style={item.status === "Delivered" ? styles.statusCompletedText : styles.statusOngoingText}>{item.status}</Text>
                            </View>
                        </View>

                        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20}}>
                            <Text style={{fontWeight: "700"}}>{item.price}</Text>

                            <View>
                                <Pressable style={{borderWidth: 1, paddingHorizontal: 15, backgroundColor: "#000000", borderRadius: 9, paddingVertical: 8 }}
                                    onPress={item.status === "Delivered" ? () => onCompletedPress(item) : () => console.log("Track Order")}
                                >
                                    <Text style={{color: "white", fontSize: 12}}>{item.status === "Delivered" ? "Leave Review" : "Track Order"}</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            
        </View>

    )
}
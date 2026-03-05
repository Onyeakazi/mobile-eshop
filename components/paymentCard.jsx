import { Pressable, Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
});

export default function PaymentCard({ number, selected, setSelected, card}) {

    return(
        <Pressable
            onPress={() => setSelected(number)}
            style={{ borderWidth: 1, borderColor: "#e0e0e0", borderRadius: 10, padding: 20, marginBottom: 10}}>

                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>

                    {card && <View style={{ marginRight: 8 }}>{card}</View> }

                    <View style={{ flex: 1 }}>

                        {/* Title Row */}
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                            <Text style={{ fontSize: 14, fontWeight: "700" }}>
                            {number}
                            </Text>

                            {selected === number && (
                                <View style={styles.defaultBadge}>
                                    <Text style={styles.defaultText}>Default</Text>
                                </View>
                            )}
                        </View>

                    </View>

                    {/* Bullet Selection */}
                    <View style={styles.radioOuter}>
                        {selected === number && <View style={styles.radioInner} />}
                    </View>

                </View>

        </Pressable>
    )
}
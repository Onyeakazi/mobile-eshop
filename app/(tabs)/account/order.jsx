import { FlatList, Modal, Pressable, StyleSheet, Text, View, TextInput, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderCard from "../../../components/orderCard";
import BoxIcon from "../../../assets/vectors/box.svg";
import Header from "../../../components/header";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import Cancel from "../../../assets/vectors/Cancel.svg";
import FilledStar from "../../../assets/vectors/Star.svg";
import { StatusBar } from "expo-status-bar";

const styles = StyleSheet.create({
    active: { backgroundColor: "#ffff", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 7, flex: 1 },
    modalOverlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)", marginBottom: 10 },
    modalContainer: { backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 },
    filterButton: { backgroundColor: "#1A1A1A", padding: 15, borderRadius: 8, marginTop: 20, alignItems: "center", marginBottom: 15 },
});

function EmptyState({ message }) {
    return (
        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 200 }}>
            <BoxIcon width={60} height={60} color={"#808080"} />
            <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 10 }}>{message}</Text>
            <Text style={{ color: "#666", marginTop: 5 }}>You don't have any {message.toLowerCase()}</Text>
            <Text style={{ color: "#666" }}>at the moment.</Text>
        </View>
    );
}

export default function Order() {
    const [active, setActive] = useState("ongoing");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleCompletedPress = (item) => { setSelectedItem(item); setModalVisible(true); };
    const handleTracking = () => { router.push("/trackOrder"); };

    useEffect(() => { fetchOrders(); }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/orders/orders`);
            const data = await res.json();
            setOrders(data);
        } catch (err) {
            console.log("Fetch error:", err);
        } finally { setLoading(false); }
    };

    const ongoingOrders = orders.filter(o => o.status !== "Delivered");
    const completedOrders = orders.filter(o => o.status === "Delivered");

    if (loading) return <View style={{ marginTop: 100 }}><ActivityIndicator size="large" /></View>;

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, backgroundColor: "white" }}>
            <StatusBar style="dark" />
            <Header page={"My Orders"} />

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#E6E6E6", padding: 10, borderRadius: 10, gap: 5, marginVertical: 10 }}>
                <Pressable style={[{ flex: 1 }, active === "ongoing" && styles.active]} onPress={() => setActive("ongoing")}>
                    <Text style={{ textAlign: "center", fontSize: 14, fontWeight: 500 }}>Ongoing</Text>
                </Pressable>
                <Pressable style={[{ flex: 1 }, active === "completed" && styles.active]} onPress={() => setActive("completed")}>
                    <Text style={{ textAlign: "center", fontSize: 14, fontWeight: 500 }}>Completed</Text>
                </Pressable>
            </View>

            {/* Ongoing */}
            {active === "ongoing" && ongoingOrders.length > 0 && (
                <FlatList 
                    data={ongoingOrders}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <OrderCard item={item} trackOrder={handleTracking} />}
                    showsVerticalScrollIndicator={false}
                />
            )}

            {/* Completed */}
            {active === "completed" && completedOrders.length > 0 && (
                <FlatList 
                    data={completedOrders}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <OrderCard item={item} onCompletedPress={handleCompletedPress} />}
                    showsVerticalScrollIndicator={false}
                />
            )}

            {/* Empty state */}
            {active === "ongoing" && ongoingOrders.length === 0 && <EmptyState message="No Ongoing Orders!" />}
            {active === "completed" && completedOrders.length === 0 && <EmptyState message="No Completed Orders!" />}

            {/* Modal (unchanged) */}
            <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <Pressable style={{ flex: 1}} onPress={() => setModalVisible(false)} />
                    <View style={styles.modalContainer}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Leave a Review</Text>
                            <Cancel width={24} height={24} onPress={() => setModalVisible(false)} />
                        </View>
                        <View style={{ height: 2, backgroundColor: "#e6e6e6", marginVertical: 15 }} />
                        <Text style={{ fontWeight: "bold" }}>How was your order?</Text>
                        <View style={{ flexDirection: "row", justifyContent: "center", gap: 15, marginVertical: 15 }}>
                            {[...Array(5)].map((_, i) => <FilledStar key={i} width={30} height={30} />)}
                        </View>
                        <TextInput placeholder="Write your review..." style={{ borderWidth: 1, borderColor: "#e0e0e0", borderRadius: 10, padding: 10, height: 100 }} multiline />
                        <Pressable style={styles.filterButton}><Text style={{ color: "white" }}>Submit</Text></Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
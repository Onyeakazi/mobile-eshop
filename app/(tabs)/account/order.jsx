import { FlatList, Modal, Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderCard from "../../../components/orderCard";
import BoxIcon from "../../../assets/vectors/box.svg";
import Header from "../../../components/header";
import { router } from "expo-router";
import { useState } from "react";
import Cancel from "../../../assets/vectors/Cancel.svg";
import FilledStar from "../../../assets/vectors/Star.svg";
import { StatusBar } from "expo-status-bar";


const products = [
  {
    id: "1",
    title: "Regular Fit Slogan",
    price: "$1,390",
    image: require("../../../assets/images/clothe1.png"),
    status: "In transit",
    size: "Size: M"
  },
  {
    id: "2",
    title: "Summer Shirt",
    price: "$990",
    discount: "-30%",
    image: require("../../../assets/images/clothe2.png"),
    status: "Shipped",
    size: "Size: L"
  },
  {
    id: "3",
    title: "Regular Fit Black",
    price: "$1,390",
    discount: "-52%",
    image: require("../../../assets/images/clothe3.png"),
    status: "Delivered",
    size: "Size: S"
  },
  {
    id: "4",
    title: "Jacket",
    price: "$1,090",
    image: require("../../../assets/images/clothe4.png"),
    status: "Picked",
    size: "Size: M"
  }
];

const styles = StyleSheet.create({
    active: {
        backgroundColor: "#ffff", 
        paddingVertical: 12, 
        paddingHorizontal: 20, 
        borderRadius: 7, 
        flex: 1
    },

    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.4)",
    },

    modalContainer: {
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },

    filterButton: {
        backgroundColor: "#1A1A1A",
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        alignItems: "center",
        marginBottom: 15,
    },
})

function EmptyState({ message }) {
    return (
        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 200 }}>
            <BoxIcon width={60} height={60} color={"#808080"} />
            <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 10 }}>{message}</Text>
            <Text style={{ color: "#666", marginTop: 5 }}>You don't have any {message.toLowerCase()}</Text>
            <Text style={{ color: "#666" }}>at the moment.</Text>
        </View>
    )
}

export default function Order() {
    const [active, setActive] = useState("ongoing");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleCompletedPress = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const handleTracking = () => {
        router.push("/trackOrder")
    };

    const ongoingOrders = products.filter(p => p.status !== "Delivered");
    const completedOrders = products.filter(p => p.status === "Delivered");

    return (
        <SafeAreaView style={{flex: 1, paddingHorizontal: 20, backgroundColor: "white"}}>
            <StatusBar style="dark" />
        
           {/* header section */}
            <Header page={"My Orders"} />

            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#E6E6E6", padding: 10, borderRadius: 10, gap: 5, marginVertical: 10}}>
                <Pressable
                    style={[{ flex: 1 }, active === "ongoing" && styles.active]}
                    onPress={()=> setActive("ongoing")}
                >
                    <Text style={{textAlign: "center", fontSize: 14, fontWeight: 500}}>Ongoing</Text>
                </Pressable>
                <Pressable
                    style={[{ flex: 1 },active === "completed" && styles.active]}
                    onPress={()=> setActive("completed")}
                >
                    <Text style={{textAlign: "center", fontSize: 14, fontWeight: 500}}>Completed</Text>
                </Pressable>
            </View>

            {/* Items card */}
            {active === "ongoing" && ongoingOrders.length > 0 && (
                <FlatList 
                    data={ongoingOrders}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <OrderCard item={item}
                            trackOrder={handleTracking} 
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            )}

            {active === "completed" && completedOrders.length > 0 && (
                <FlatList 
                    data={completedOrders}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => 
                        <OrderCard item={item}  
                        onCompletedPress={handleCompletedPress}  
                    />}
                    showsVerticalScrollIndicator={false}
                />
            )}

            {/* Empty state */}
            {active === "ongoing" && ongoingOrders.length === 0 && (
                <EmptyState message="No Ongoing Orders!" />
            )}
            {active === "completed" && completedOrders.length === 0 && (
                <EmptyState message="No Completed Orders!" />
            )}
            


            {/* Add review Modal */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setModalVisible(false)}
                statusBarTranslucent={true}
                navigationBarTranslucent={true}
                >
            
                <View style={styles.modalOverlay}>
        
                    {/* Close modal when tapping outside */}
                    <Pressable
                    style={{ flex: 1}}
                    onPress={() => setModalVisible(false)}
                    />
        
                    {/* Bottom Sheet */}
                    <View style={styles.modalContainer}>
        
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            marginBottom: 5
                        }}
                        >
                        Leave a Review
                        </Text>
        
                        <Cancel width={24} height={24} onPress={() => setModalVisible(false)} />
                    </View>
        
                    <View style={{width: "100px", height: 2, backgroundColor: "#e6e6e6", marginVertical: 15}}></View>
        
                    <Text
                        style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        marginBottom: 7
                        }}
                    >
                        How was your order?
                    </Text>

                    <Text
                        style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        marginBottom: 15,
                        color: "#808080"
                        }}
                    >
                        Please give your rating and also your review.
                    </Text>
        
                    <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 15, marginBottom: 15}}>
                        {[...Array(5)].map((_, i) => (
                            <FilledStar key={i} width={30} height={30} />
                        ))}
                    </View>
        
        
                    <TextInput
                        placeholder="Write your review..."
                        style={{
                            borderWidth: 1,
                            borderColor: "#e0e0e0",
                            borderRadius: 10,
                            padding: 10,
                            height: 100,
                            textAlignVertical: "top",
                        }}
                        multiline
                    />
        
                    <Pressable style={styles.filterButton}>
                        <Text style={{ color: "white" }}>
                        Submit
                        </Text>
                    </Pressable>
        
                    </View>
        
                </View>
        
            </Modal>
           
        </SafeAreaView>
    )
}
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCart from "../../../components/mycart";
import CartIcon from "../../../assets/vectors/cart.svg";
import Header from "../../../components/header";
import { router } from "expo-router";

const products = [
  {
    id: "1",
    title: "Regular Fit Slogan",
    price: "$1,390",
    image: require("../../../assets/images/clothe1.png"),
  },
  {
    id: "2",
    title: "Summer Shirt",
    price: "$990",
    discount: "-30%",
    image: require("../../assets/images/clothe2.png"),
  },
  {
    id: "3",
    title: "Regular Fit Black",
    price: "$1,390",
    discount: "-52%",
    image: require("../../assets/images/clothe3.png"),
  },
];

export default function MyDetails() {
    return (
        <SafeAreaView style={{paddingHorizontal: 20}}>
        
           {/* header section */}
            <Header page={"My Details"} />

            {/* Items card */}
            {products.length > 0 ? (
                <FlatList 
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <ProductCart item={item} />
                    )}
                />
                ) : (
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 250 }}>
                    <CartIcon width={60} height={60} color={"#808080"} />

                    <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 10 }}>
                        Your Cart Is Empty!
                    </Text>

                    <Text style={{ color: "#666", marginTop: 5 }}>
                        When you add products, they'll
                    </Text>

                    <Text style={{ color: "#666" }}>
                        appear here.
                    </Text>
                </View>
            )}
            
            {products.length > 0 ? (
            
                /* Summary details */
                <View style={{marginTop: 10}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12,}}>
                        <Text style={{fontSize: 16, color: "#808080"}}>Sub-total</Text>
                        <Text style={{fontSize: 16, fontWeight: 700}}>$ 5,870</Text>
                    </View>

                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12}}>
                        <Text style={{fontSize: 16, color: "#808080"}}>VAT (%)</Text>
                        <Text style={{fontSize: 16, fontWeight: 700}}>$ 0.00</Text>
                    </View>

                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12}}>
                        <Text style={{fontSize: 16, color: "#808080"}}>Shipping fee</Text>
                        <Text style={{fontSize: 16, fontWeight: 700}}>$ 80</Text>
                    </View>
                    
                    <View style={{width: "100px", height: 2, backgroundColor: "#e6e6e6", marginVertical: 20}}></View>

                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12}}>
                        <Text style={{fontSize: 16}}>Total</Text>
                        <Text style={{fontSize: 16, fontWeight: "700"}}>$ 5, 950</Text>
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
                        onPress={() => router.push("/checkout")}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontWeight: "700",
                                fontSize: 18,
                            }}
                        >
                            Go to Checkout
                        </Text>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 16,
                                marginLeft: 8,
                            }}
                        >
                            ➔
                        </Text>
                    </Pressable>

                </View>
            ) : null}
        </SafeAreaView>
    )
}
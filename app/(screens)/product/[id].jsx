import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/header";
import Heart from "../../../assets/vectors/heart.svg";
import RedHeart from "../../../assets/vectors/Heart-filled.svg";
import Bag from "../../../assets/vectors/Bag.svg";
import Star from "../../../assets/vectors/Star.svg";
import Button from "../../../components/button";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCartStore } from "../../../store/cartStore";
import CustomAlert from "../../../components/CustomAlert";
import { useEffect, useState } from "react";
import Warning from "../../../assets/vectors/Check-duotone.svg";

export default function Product(){
    const {product} = useLocalSearchParams();
    const parsedProduct = product ? JSON.parse(product) : null;
    const addToCart = useCartStore((state) => state.addToCart);

    const [alertVisible, setAlertVisible] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        if (parsedProduct) {
            const inCart = useCartStore.getState().cart.find(
                (item) => item.id === parsedProduct.id
            );
            setIsInCart(!!inCart);
        }
    }, [parsedProduct]);
 
    return (
        <SafeAreaView style={{flex: 1, paddingHorizontal: 20, backgroundColor: "white"}}>
            <StatusBar style="dark" />
            
            {/* header section */}
            <Header backToHome={true} page={"Details"} />

            <View style={{position: "relative"}}>
                            
                <Image source={{uri: parsedProduct.image}}
                    style={{
                        width: "100%",
                        height: 350,
                        resizeMode: "contain",
                        backgroundColor: "#e1e1e1",
                        borderRadius: 10,
                    }}
                />
                
                <Pressable
                    style={{
                        backgroundColor: "white",
                        position: "absolute",
                        top: 12,
                        right: 12,
                        width: 48,
                        height: 48,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 13,
                        elevation: 5,
                    }}
                >
                    {isInCart ? (
                        <RedHeart width={25} height={25} />
                    ) : (
                        <Heart width={25} height={25} />
                    )}
                </Pressable>
                                    
            </View>

            <View style={{marginTop: 10}}>
                <View style={{marginBottom: 15}}>
                    <Text style={{fontSize: 24, fontWeight: "700"}}>{parsedProduct.name}</Text>
                    <Pressable style={{flexDirection: "row", marginVertical: 20, alignItems: "center"}}
                        onPress={()=> {
                            router.push({
                                pathname: "/reviews/[id]",
                                params: { productId: parsedProduct.id },
                            });
                        }}
                    >
                        <Star width={18} height={18} />
                        <Text style={{fontSize: 16, fontWeight: "600", marginLeft: 5, textDecorationLine: "underline"}}>4.0/5</Text>
                        <Text style={{fontSize: 16, color: "#808080"}}>(45 reviews)</Text>
                    </Pressable>
                    <Text style={{fontSize: 16, color: "#808080", lineHeight: 28}}>
                        {parsedProduct.description}
                    </Text>
                </View>

                <View>
                    <Text style={{fontSize: 20, fontWeight: "900", marginBottom: 10}}>Choose Size</Text>

                    <View style={{flexDirection: "row",gap: 5}}>

                        {["S", "M", "L"].map((item)=> (
                            <Pressable
                                style={{
                                    borderWidth: 1,
                                    borderColor: "#c7c7c7",
                                    borderRadius: 8,
                                    paddingHorizontal: 15,
                                    paddingVertical: 10
                                }}
                                key={item}
                            >
                                <Text style={{fontSize: 20, color: "1A1A1A", fontWeight: "700"}} key={item}>{item}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>

                <View style={{marginHorizontal: -20, height: 2, backgroundColor: "#e6e6e6", marginVertical: 13}}></View>
            </View>

            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 40, marginTop: ""}}>
                <View>
                    <Text style={{color: "#808080", fontSize: 16}}>Price</Text>
                    <Text style={{color: "#1A1A1A", fontSize: 24, fontWeight: "700"}}>₦{Number(parsedProduct.price).toLocaleString()}</Text>
                </View>

                <View style={{flex: 1}}>
                    <Button
                        text="Add To Chart"
                        bg="#1A1A1A"
                        style={{marginTop: 20, flexDirection: "row", justifyContent: "center", alignItems: "center"}}
                        textStyle={{fontSize: 17}}
                        onPress={() => {
                            setAlertVisible(true);
                        }}
                        icon={<Bag width={24} height={24} fill="white" />}
                    />
                </View>
            </View>

            <CustomAlert
                Icon={Warning}
                visible={alertVisible}
                title="Add to Cart?"
                message="Are you sure you want to add this item to your cart?"
                confirmStyle={{ color: "white", backgroundColor: "#0C9409" }}
                cancelStyle={{ backgroundColor: "white", borderWidth: 1, borderColor: "#CCCCCC"}}
                confirmText="Yes, Add to Cart"
                cancelText="No, Cancel"
                onClose={() => setAlertVisible(false)}
                onClick={() => {
                    addToCart({ ...parsedProduct, quantity: 1 }),
                    setIsInCart(true),
                    setAlertVisible(false)
                }}
            />

        </SafeAreaView>
    )
}
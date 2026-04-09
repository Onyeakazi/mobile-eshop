import { View, Image, Pressable, Text } from "react-native";
import Thrash from "../assets/vectors/thrash.svg";
import Minus from "../assets/vectors/minus.svg";
import Plus from "../assets/vectors/plus.svg";
import { useCartStore } from "../store/cartStore";

export default function ProductCart({item}) {
    const removeFromCart = useCartStore((state) => state.removeFromCart);

    return (
        <View style={{marginTop: 15}}>
            <View style={{borderWidth: 1, borderColor: "#d4d4d4", padding: 12, borderRadius: 10, marginBottom: 1}}>
                <View style={{flexDirection: "row", gap: 15}}>
                    <View>
                        <Image 
                            source={{uri: item.image}} 
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
                        <View style={{flexDirection: "row", justifyContent: "space-between",}}> 
                            <View>
                                <Text style={{fontWeight: "700", flex: 1}}>{item.name}</Text>
                                <Text style={{fontSize: 13, fontWeight: 300}}>{item.size}</Text>
                            </View>

                            <Pressable  onPress={() => removeFromCart(item.id)}>
                                <Thrash width={15} height={15} />
                            </Pressable>
                        </View>

                        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center,", marginTop: 20}}>
                            <Text style={{fontWeight: "700"}}>₦{Number(item.price).toLocaleString()}</Text>

                             <View style={{ flexDirection: "row", gap: 10, justifyContent: "center", alignItems: "center" }}>
                                <Pressable
                                    style={{ borderWidth: 1, padding: 4, borderColor: "#d4d4d4", borderRadius: 2 }}
                                    onPress={() => useCartStore.getState().updateQuantity(item.id, item.quantity - 1)}
                                >
                                    <Minus width={10} height={10} />
                                </Pressable>

                                <Text>{item.quantity}</Text>

                                <Pressable
                                    style={{ borderWidth: 1, padding: 4, borderColor: "#d4d4d4", borderRadius: 2 }}
                                    onPress={() => useCartStore.getState().updateQuantity(item.id, item.quantity + 1)}
                                >
                                    <Plus width={10} height={10} />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            
        </View>

    )
}
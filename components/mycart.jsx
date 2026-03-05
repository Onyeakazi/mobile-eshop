import { View, Image, Pressable, Text } from "react-native";
import Thrash from "../assets/vectors/thrash.svg";
import Minus from "../assets/vectors/minus.svg";
import Plus from "../assets/vectors/plus.svg";

export default function ProductCart({item}) {
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
                        <View style={{flexDirection: "row", justifyContent: "space-between",}}> 
                            <View>
                                <Text style={{fontWeight: "700", flex: 1}}>{item.title}</Text>
                                <Text style={{fontSize: 13, fontWeight: 300}}>{item.size}</Text>
                            </View>

                            <Pressable>
                                <Thrash width={15} height={15} />
                            </Pressable>
                        </View>

                        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center,", marginTop: 20}}>
                            <Text style={{fontWeight: "700"}}>{item.price}</Text>

                            <View style={{flexDirection: "row", gap: 10, justifyContent: "center", alignItems: "center"}}>
                                <Pressable style={{borderWidth: 1, padding: 4, borderColor: "#d4d4d4", borderRadius: 2 }}>
                                    <Minus width={10} height={10}/>
                                </Pressable>

                                <Text>2</Text>

                                <Pressable style={{borderWidth: 1, padding: 4, borderColor: "#d4d4d4", borderRadius: 2 }}>
                                    <Plus width={10} height={10}/>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            
        </View>

    )
}
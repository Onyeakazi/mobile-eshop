import { View, Image, Pressable, Text } from "react-native";
import Heart from "../assets/vectors/heart.svg";
import RedHeart from "../assets/vectors/Heart-filled.svg";
import { router } from "expo-router";

export default function ProductCard({
    item,
    imageHeight = 180, 
    showHeart = true,
    HeartIcon,
}) {
    return (
        <Pressable
            onPress={()=> {
                router.push("/product")
            }}
        >
            <View style={{position: "relative"}}>
                
                <Image source={{uri: item.image}}
                    style={{
                        width: 180,
                        height: imageHeight,
                        resizeMode: "contain",
                        backgroundColor: "#E6E6E6",
                        borderRadius: 10,
                    }}
                />

                {showHeart && (
                    <Pressable
                        style={{
                        backgroundColor: "white",
                        position: "absolute",
                        top: 12,
                        right: 12,
                        width: 30,
                        height: 30,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 5,
                        elevation: 5,
                        }}
                    >
                        {HeartIcon ? (
                            <RedHeart width={20} height={20} />
                            ) : (
                            <Heart width={20} height={20} />
                        )}
                    </Pressable>
                )}
            </View>

            <Text style={{fontWeight: "700", fontSize: 18, marginTop: 6}}>{item.name}</Text>

            <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
                <Text style={{fontSize: 15}}>₦{Number(item.price).toLocaleString()}</Text> 

                {item.discount && (
                    <Text style={{ color: "red", fontSize: 13 }}>
                        {item.discount}
                    </Text>
                )}
            </View>
        </Pressable>
    )
}
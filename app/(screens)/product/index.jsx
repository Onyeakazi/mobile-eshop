import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/header";
import Heart from "../../../assets/vectors/heart.svg";
import Bag from "../../../assets/vectors/Bag.svg";
import Star from "../../../assets/vectors/Star.svg";
import product1 from "../../../assets/images/clothe1.png"
import Button from "../../../components/button";
import { router } from "expo-router";

export default function Product(){
    return (
        <SafeAreaView style={{paddingHorizontal: 20}}>
            
            {/* header section */}
            <Header backToHome={true} page={"Details"} />

            <View style={{position: "relative"}}>
                            
                <Image source={product1}
                    style={{
                        width: "100%",
                        height: 368,
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
                    <Heart width={25} height={25} />
                </Pressable>
                  
            </View>

            <View style={{marginTop: 10}}>
                <View style={{marginBottom: 15}}>
                    <Text style={{fontSize: 24, fontWeight: "700"}}>Regular Fit Slogan</Text>
                    <Pressable style={{flexDirection: "row", marginVertical: 10, alignItems: "center"}}
                        onPress={()=> {
                            router.push("/reviews")
                        }}
                    >
                        <Star width={18} height={18} />
                        <Text style={{fontSize: 16, fontWeight: "600", marginLeft: 5, textDecorationLine: "underline"}}>4.0/5</Text>
                        <Text style={{fontSize: 16, color: "#808080"}}>(45 reviews)</Text>
                    </Pressable>
                    <Text style={{fontSize: 16, color: "#808080", lineHeight: 25}}>
                        The name says it all, the right size slightly snugs the body leaving enough room for comfort in the sleeves and waist.
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
                            >
                                <Text style={{fontSize: 20, color: "1A1A1A", fontWeight: "700"}} key={item}>{item}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>

                <View style={{marginHorizontal: -20, height: 2, backgroundColor: "#e6e6e6", marginVertical: 13}}></View>
            </View>

            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 40, marginTop: "auto"}}>
                <View>
                    <Text style={{color: "#808080", fontSize: 16}}>Price</Text>
                    <Text style={{color: "#1A1A1A", fontSize: 24, fontWeight: "700"}}>$1,190</Text>
                </View>

                <View style={{flex: 1}}>
                    <Button
                        text="Add To Chart"
                        bg="#1A1A1A"
                        style={{marginTop: 20, flexDirection: "row", justifyContent: "center", alignItems: "center"}}
                        textStyle={{fontSize: 17}}
                        onPress={()=> {
                            router.replace("/(tabs)")
                        }}
                        icon={<Bag width={24} height={24} fill="white" />}
                    />
                </View>
            </View>

        </SafeAreaView>
    )
}
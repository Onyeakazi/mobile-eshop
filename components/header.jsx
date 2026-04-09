import { Text, View, Pressable } from "react-native";
import Bell from "../assets/vectors/bell.svg";
import ArrowBack from "../assets/vectors/arrow-back.svg";
import { router } from "expo-router";

export default function Header({page, backToHome }) {
    return (
        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 15}}>

            <Pressable 
                onPress={() => {
                    if (backToHome) {
                        router.replace("/(tabs)");
                    } else {
                        router.back();
                    }
                }}
            >
                <ArrowBack width={24} height={24} />
            </Pressable>

            <View>
                <Text style={{fontSize: 25, fontWeight: 800}}>{page}</Text>
            </View>
            
            <Pressable 
                onPress={()=> {
                    router.push("/notifications")
                }}
            >
                <Bell width={25} height={25} />
            </Pressable>
        </View>
    )
}
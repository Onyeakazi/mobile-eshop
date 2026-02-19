import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function Cart() {
    return (
        <SafeAreaView style={{paddingHorizontal: 20}}>
        
           {/* header section */}
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 15}}>

                <Pressable 
                    onPress={() => {
                        router.push("/")
                    }}
                >
                    <ArrowBack width={24} height={24} />
                </Pressable>

                <View>
                    <Text style={{fontSize: 25, fontWeight: 800}}>Saved Items</Text>
                </View>
                
                <Pressable>
                    <Bell width={24} height={24} />
                </Pressable>
            </View>
        </SafeAreaView>
    )
}
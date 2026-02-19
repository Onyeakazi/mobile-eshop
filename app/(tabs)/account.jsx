import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function Account() {
    return (
        <SafeAreaView style={{paddingHorizontal: 20}}>
        
            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <Text>Account screen</Text>
            </View>
        </SafeAreaView>
    )
}
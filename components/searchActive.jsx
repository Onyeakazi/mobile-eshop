import { Pressable, Text, View, Image} from "react-native";
import ArrrowRightCorner from "../assets/vectors/arrow-right-corner.svg";

export default function SearchActive({item}) {
    return (
        <View style={{marginTop: 20, paddingBottom: 1}}>
            <Pressable style={{flexDirection: "row", justifyContent: "space-between", alignContent: "center", borderBottomColor: "#E6E6E6", borderBottomWidth: 1, paddingBottom: 15}}>

                <View style={{flexDirection: "row", gap: 20, alignItems: "center"}}>
                    <Image
                        source={{uri: item.image}}
                        style={{
                            width: 56,
                            height: 53,
                            resizeMode: "contain",
                            backgroundColor: "#e1e1e1",
                            borderRadius: 10,
                        }}
                    /> 

                    <View>
                        <Text style={{fontSize: 16, fontWeight: "800", color: "#000", marginBottom: 5}}>{item.name}</Text>
                        <View style={{flexDirection: "row", gap: 6}}>
                            <Text style={{fontSize: 12, color: "#888", fontWeight: "500"}}>₦{Number(item.price).toLocaleString()}</Text>
                            <Text style={{fontSize: 12, color: "#ED1010", fontWeight: "500"}}>{item.discount}</Text>
                        </View>
                    </View>
                </View>

                <View>
                    <ArrrowRightCorner width={18} height={18} />
                </View>
            </Pressable>
            
        </View>
    )
}
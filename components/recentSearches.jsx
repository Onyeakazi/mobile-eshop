import { Pressable, Text, View, } from "react-native";
import CircleCancle from "../assets/vectors/circle-cancel.svg";

export default function RecentSearches({item, onDelete}) {
    return (
        <View style={{marginTop: 20, paddingBottom: 1}}>
            <Pressable style={{flexDirection: "row", justifyContent: "space-between", alignContent: "center", borderBottomColor: "#E6E6E6", borderBottomWidth: 1, paddingBottom: 15}}>
                <Text>{item}</Text>

                <Pressable onPress={onDelete}>
                    <CircleCancle width={20} height={20} />
                </Pressable>
            </Pressable>
            
        </View>
    )
}
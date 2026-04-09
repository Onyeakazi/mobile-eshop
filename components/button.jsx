import { Pressable, Text, View } from "react-native";


export default function Button({text, bg, style, textStyle, onPress, icon}) {
    return(
        <Pressable style={[
            {
                backgroundColor: bg,
                paddingVertical: 15,
                borderRadius: 8,
                alignItems: "center",
            }, 
            style
        ]}
            onPress={onPress}
        >
            {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
            <Text 
                style={[
                    {
                        color: "white",   
                        fontWeight: "600",
                    },
                    textStyle,
                ]}
            >
                {text}
            </Text>
        </Pressable>
    )
}
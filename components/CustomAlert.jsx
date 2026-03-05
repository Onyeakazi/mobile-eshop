import { Modal, View, Text, Pressable, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function CustomAlert({
    visible = false,        
    title = "Alert",   
    Icon,     
    message = "",           
    onClose = () => {},     
    confirmText = "OK", 
}) {
    return(
        <Modal
            transparent
            visible={visible}
            animationType="fade"
        >

            <View
                style={{
                    flex: 1,
                    backgroundColor: "rgb(0,0,0, 0.5)",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <View
                    style={{
                        width: width * 0.8,
                        backgroundColor: "white",
                        borderRadius: 12,
                        padding: 20
                    }}
                >
                    {Icon && 
                        <View style={{ marginRight: 8, alignSelf: "center" }}>
                            <Icon width={78} height={78} />
                        </View>
                    }


                    <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 10, alignSelf: "center" }}>{title}</Text>
                    <Text style={{ fontSize: 15, color: "#555", marginBottom: 20, textAlign: "center"  }}>
                        {message}
                    </Text>

                    <Pressable
                        onPress={onClose}
                        style={{
                        backgroundColor: "#1A1A1A",
                        paddingVertical: 12,
                        borderRadius: 8,
                        alignItems: "center",
                        }}
                    >
                        <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>
                        {confirmText}
                        </Text>
                    </Pressable>

                </View>
            </View>
          
       </Modal>
    )
}
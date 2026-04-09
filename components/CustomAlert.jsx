import { Modal, View, Text, Pressable, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function CustomAlert({
    visible = false,        
    title = "Alert",   
    Icon,     
    message = "",           
    onClose = () => {},  
    onClick = () => {},     
    confirmText = "OK", 
    cancelText = "Cancel", 
    confirmStyle, 
    cancelStyle,   
    showCancel = true,
}) {
    return(
        <Modal
            transparent
            visible={visible}
            animationType="fade"
        >

            <Pressable
                style={{
                    flex: 1,
                    backgroundColor: "rgb(0,0,0, 0.5)",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                onPress={onClose}
            >
                <Pressable
                    style={{
                        width: width * 0.8,
                        backgroundColor: "white",
                        borderRadius: 12,
                        padding: 20
                    }}
                    onPress={(e) => e.stopPropagation()}
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
                        onPress={onClick}
                        style={[{
                            backgroundColor: "#1A1A1A",
                            paddingVertical: 12,
                            borderRadius: 8,
                            alignItems: "center",
                            marginBottom: 10
                        }, confirmStyle]}
                    >
                        <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>
                        {confirmText}
                        </Text>
                    </Pressable>

                    {showCancel && (
                        <Pressable
                            onPress={onClose}
                            style={[{
                                backgroundColor: "#1A1A1A",
                                paddingVertical: 12,
                                borderRadius: 8,
                                alignItems: "center",
                            }, cancelStyle]}
                        >
                            <Text style={{ color: "black", fontWeight: "700", fontSize: 16, }}>
                            {cancelText}
                            </Text>
                        </Pressable>
                    )}

                </Pressable>
            </Pressable>
          
       </Modal>
    )
}
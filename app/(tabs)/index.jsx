import { FlatList, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Bell from "../../assets/vectors/bell.svg";
import Search from "../../assets/vectors/search.svg";
import Voice from "../../assets/vectors/voice.svg"
import Filter from "../../assets/vectors/filter.svg";
import ProductCard from "../../components/items";

const products = [
  {
    id: "1",
    title: "Regular Fit Slogan",
    price: "$1,390",
    image: require("../../assets/images/clothe1.png"),
  },
  {
    id: "2",
    title: "Summer Shirt",
    price: "$990",
    discount: "-30%",
    image: require("../../assets/images/clothe2.png"),
  },
  {
    id: "3",
    title: "Regular Fit Black",
    price: "$1,390",
    discount: "-52%",
    image: require("../../assets/images/clothe3.png"),
  },
  {
    id: "4",
    title: "Regular Fit V-Neck",
    price: "$990",
    discount: "-30%",
    image: require("../../assets/images/clothe4.png"),
  },
  {
    id: "5",
    title: "Classic Polo",
    price: "$1,390",
    discount: "-52%",
    image: require("../../assets/images/clothe5.png"),
  },
  {
    id: "6",
    title: "Long Sleeve",
    price: "$990",
    discount: "-30%",
    image: require("../../assets/images/clothe6.png"),
  },
  {
    id: "7",
    title: "Regular Fit",
    price: "$1,390",
    discount: "-52%",
    image: require("../../assets/images/clothe1.png"),
  },
  {
    id: "2",
    title: "Summer Fit",
    price: "$990",
    discount: "-30%",
    image: require("../../assets/images/clothe3.png"),
  },
];

export default function Home() {
    return (
        <SafeAreaView style={{paddingHorizontal: 20}}>

            {/* Discover section */}
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 15}}>
                <View>
                    <Text style={{fontSize: 35, fontWeight: 800}}>Discover</Text>
                </View>
                
                <View>
                    <Bell width={25} height={25} />
                </View>
            </View>

            {/* Search Section */}
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15}}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderColor: "#9e9e9e",
                        borderWidth: 1,
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        width: "83%",
                    }}
                >
                    <Search width={20} height={20} color="#9e9e9e" />

                    <TextInput
                        placeholder="Search for clothes..."
                        placeholderTextColor="#9e9e9e"
                        style={{
                        flex: 1,              
                        marginLeft: 8,       
                        fontSize: 17,
                        color: "#000",
                        }}
                    />

                    <Voice width={23} height={23} color="#9e9e9e" />
                </View>

                <View>
                    <Pressable 
                        style={{
                            backgroundColor: "black",
                            padding: 15,
                            borderRadius: 10,
                        }}
                    >
                        <Filter width={23} height={28} />
                    </Pressable>
                </View>
            </View>
            
            {/* Scrool horizontal */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 2, paddingBottom: 13 }}
            >
                {["All", "TShirt", "Jeans", "Shoes", "Ladies"].map((item) => (
                    <Pressable key={item} style={styles.categoryButton}>
                        <Text style={styles.categoryText}>{item}</Text>
                    </Pressable>
                ))}
            </ScrollView>

            {/* Products view */}
            <FlatList 
                data={products}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }} 
                contentContainerStyle={{
                    paddingBottom: 180, 
                }}
                renderItem={({item}) => (
                    <ProductCard item={item} />
                )}
                showsVerticalScrollIndicator={false}
            />

        </SafeAreaView>
    )
}


// Vertical scroll styles
const styles = {
  categoryButton: {
    borderWidth: 1,
    borderColor: "#c7c7c7",
    borderRadius: 8,
    paddingHorizontal: 20,
    height: 36,               
    justifyContent: "center", 
    alignItems: "center",
    marginRight: 12,
    
  },
  categoryText: {
    fontSize: 15,
    fontWeight: "600",
  },
};
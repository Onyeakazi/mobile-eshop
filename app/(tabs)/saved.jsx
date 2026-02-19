import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowBack from "../../assets/vectors/arrow-back.svg";
import Bell from "../../assets/vectors/bell.svg";
import ProductCard from "../../components/items";
import RedHeart from "../../assets/vectors/Heart-filled.svg";
import HeartDuotone from "../../assets/vectors/Heart-duotone.svg";

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
    discount: null,
    image: require("../../assets/images/clothe2.png"),
  },
  {
    id: "3",
    title: "Regular Fit Black",
    price: "$1,390",
    discount: null,
    image: require("../../assets/images/clothe3.png"),
  },
  {
    id: "4",
    title: "Regular Fit V-Neck",
    price: "$990",
    discount: null,
    image: require("../../assets/images/clothe4.png"),
  },
];

export default function Saved() {
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

            {/* Products view */}
            {products.length > 0 ? (
                <FlatList 
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between" }} 
                    contentContainerStyle={{
                    paddingBottom: 180, 
                    }}
                    renderItem={({item}) => (
                    <ProductCard 
                        item={item} 
                        HeartIcon={RedHeart}
                        imageHeight={120}
                    />
                    )}
                    showsVerticalScrollIndicator={false}
                />
                ) : (
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 250 }}>
                    <HeartDuotone width={60} height={60} />

                    <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 10 }}>
                        No Saved Items!
                    </Text>

                    <Text style={{ color: "#666", marginTop: 5 }}>
                        You don't have any saved items.
                    </Text>

                    <Text style={{ color: "#666" }}>
                        Go to home and add some.
                    </Text>
                </View>
            )}

        </SafeAreaView>
    )
}
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowBack from "../../assets/vectors/arrow-back.svg";
import Bell from "../../assets/vectors/bell.svg";
import ProductCard from "../../components/items";
import RedHeart from "../../assets/vectors/Heart-filled.svg";
import HeartDuotone from "../../assets/vectors/Heart-duotone.svg";
import Header from "../../components/header";
import { StatusBar } from "expo-status-bar";
import { useFavoritesStore } from "../../store/favoritesStore";

export default function Saved() {
    const favorites = useFavoritesStore((state) => state.favorites);

    return (
        <SafeAreaView style={{flex: 1, paddingHorizontal: 20, backgroundColor: "white"}}>
            <StatusBar style="dark" />
        
           {/* header section */}
            <Header backToHome={true} page={"Saved Items"} />

            {/* Products view */}
            {favorites.length > 0 ? (
                <FlatList 
                    data={favorites}
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

                    <Text style={{ color: "#666", marginTop: 10 }}>
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
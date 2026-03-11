import { Text, View, Pressable, TextInput, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchIcon from "../../assets/vectors/search.svg";
import Voice from "../../assets/vectors/voice.svg";
import SearchActive from "../../components/searchActive";
import RecentSearch from "../../components/recentSearches";
import Header from "../../components/header";
import { StatusBar } from "expo-status-bar";

const products = [
    // {
    //     id: "1",
    //     name: "jeans"
    // },
    // {
    //     id: "2",
    //     name: "Hoddie"
    // },
    // {
    //     id: "3",
    //     name: "Casual Clothes"
    // },
    // {
    //     id: "4",
    //     name: "Summer wears"
    // }

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
]

export default function Search() {
    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, backgroundColor: "white"}}>
            <StatusBar style="dark" />
        
            {/* header section */}
            <Header page={"Searches"} />

            {/* Search Section */}
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15}}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderColor: "#9e9e9e",
                        borderWidth: 1,
                        borderRadius: 10,
                        paddingHorizontal: 20,
                        paddingVertical: 2,
                        width: "100%",
                    }}
                >
                    <SearchIcon width={20} height={20} color="#9e9e9e" />

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

                    <Pressable>
                        <Voice width={23} height={23} color="#9e9e9e" />
                    </Pressable>
                </View>
            </View>

            {/* Recent searches */}
            {/* <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 5}}>
                <Text style={{fontWeight: "700", fontSize: 20}}>Recent Searches</Text>

                <Pressable>
                    <Text style={{textDecorationLine: "underline", fontWeight: "500"}}>Clear All</Text>
                </Pressable>
            </View>

            <FlatList 
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <RecentSearch item={item} />
                )}
            /> */}

            {products.length > 0 ? (

                <FlatList 
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <SearchActive item={item} />
                    )}
                />
            ) : (
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 200 }}>
                    <SearchIcon width={60} height={60} color="#B3B3B3"/>

                    <Text style={{ fontSize: 20, fontWeight: 700, marginTop: 10 }}>
                        No Results Found!
                    </Text>

                    <Text style={{fontSize: 16, color: "#808080", marginTop: 10 }}>
                        Try a similar word or something 
                    </Text>
                    <Text style={{fontSize: 16, color: "#808080" }}>
                        more general.
                    </Text>
                </View> 
            )}

        </SafeAreaView>
    )
}
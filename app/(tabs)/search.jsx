import { Text, View, Pressable, TextInput, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Bell from "../../assets/vectors/bell.svg";
import SearchIcon from "../../assets/vectors/search.svg";
import Voice from "../../assets/vectors/voice.svg";
import ArrowBack from "../../assets/vectors/arrow-back.svg";
import RecentSearches from "../../components/recentSearches";
import { router } from "expo-router";

const products = [
    {
        id: "1",
        name: "jeans"
    },
    {
        id: "2",
        name: "Hoddie"
    },
    {
        id: "3",
        name: "Casual Clothes"
    },
    {
        id: "4",
        name: "Summer wears"
    }
]

export default function Search() {
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
                    <Text style={{fontSize: 25, fontWeight: 800}}>Search</Text>
                </View>
                
                <Pressable>
                    <Bell width={24} height={24} />
                </Pressable>
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
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 5}}>
                <Text style={{fontWeight: "700", fontSize: 20}}>Recent Searches</Text>

                <Pressable>
                    <Text style={{textDecorationLine: "underline", fontWeight: "500"}}>Clear All</Text>
                </Pressable>
            </View>

            <FlatList 
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <RecentSearches item={item} />
                )}
            />

        </SafeAreaView>
    )
}
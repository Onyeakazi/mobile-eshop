import { Text, View, Pressable, TextInput, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchIcon from "../../assets/vectors/search.svg";
import Voice from "../../assets/vectors/voice.svg";
import SearchActive from "../../components/searchActive";
import RecentSearch from "../../components/recentSearches";
import Header from "../../components/header";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

export default function Search() {
    const [query, setQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [recentSearches, setRecentSearches] = useState([]);

    const fetchProducts = async (search)=> {
        try{
            let res = await fetch(process.env.EXPO_PUBLIC_BACKEND_URL + `/products?search=${search}`);
            let data = await res.json();
            setProducts(data);
        }catch(err){
            console.log(err)
        }
    };

    const saveSearch = (search)=> {
        setRecentSearches((prev)=> {
            const updated = [
                search,
                ...prev.filter((item)=> item !== search),
            ];
            return updated.slice(0, 5)
        })

    };

    const removeSearch = (searchToRemove)=> {
        setRecentSearches((prev)=> prev.filter((item)=> item !== searchToRemove));
    }

    useEffect(()=> {
        const timer = setTimeout(()=> {
            setDebouncedQuery(query)
        }, 500);
        return ()=> clearTimeout(timer)
    }, [query]);

    useEffect(()=> {
        if(!debouncedQuery.trim()) return;

        fetchProducts(debouncedQuery);
        saveSearch(debouncedQuery);
    }, [debouncedQuery]);


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
                        value={query}
                        onChangeText={setQuery}
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
            {query === "" && recentSearches.length > 0 && (
                <>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 5}}>
                        <Text style={{fontWeight: "700", fontSize: 20}}>Recent Searches</Text>
                        
                        <Pressable onPress={()=> setRecentSearches([])}>
                            <Text style={{textDecorationLine: "underline", fontWeight: "500"}}>Clear All</Text>
                        </Pressable>
                    </View>

                    <FlatList
                        data={recentSearches}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <RecentSearch item={item} onDelete={()=> removeSearch(item)} />
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </>
            )}

            {/* Active seaarch */}
            {query !== "" && (
                products.length > 0 ? (
                    <FlatList 
                        data={products}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <SearchActive item={item} />
                        )}
                        showsVerticalScrollIndicator={false}
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
                )
            )}

        </SafeAreaView>
    )
}
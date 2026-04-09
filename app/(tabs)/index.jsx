import { FlatList, Pressable, ScrollView, Text, TextInput, View,  Modal, StyleSheet  } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Bell from "../../assets/vectors/bell.svg";
import Search from "../../assets/vectors/search.svg";
import Voice from "../../assets/vectors/voice.svg"
import Filter from "../../assets/vectors/filter.svg";
import Cancel from "../../assets/vectors/Cancel.svg";
import ProductCard from "../../components/items";
import { useEffect, useState } from "react";
import Slider from "@react-native-community/slider";
import { Dropdown } from "react-native-element-dropdown";
import { StatusBar } from "expo-status-bar";

const data = [
  { label: "L", value: "large" },
  { label: "M", value: "medium" },
  { label: "S", value: "small" },
];

export default function Index() {

  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState("All");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // filter model states
  const [sortBy, setSortBy] = useState("Relevance");
  const [price, setPrice] = useState(100000)
  const [size, setSize] = useState(null)

  const fetchProducts = async () => {
    try{
      const res = await fetch(process.env.EXPO_PUBLIC_BACKEND_URL + `/products`);
      const data = await res.json();
      if(Array.isArray(data)) setProducts(data);
      setLoading(false);
    }catch(err){
      console.log(err)
    }
  }

  const filteredProducts = products.filter((item) => {
    const marchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selected === "All" || item.category === selected;

    const matchesPrice = item.price <= price;

    const matchesSize = !size || item.size === size;

    return (marchesSearch && matchesCategory && matchesPrice && matchesSize);
  })
  .sort((a, b)=> {
    if(sortBy === "Price: Low - High") return a.price - b.price;
    if(sortBy === "Price: High - Low") return b.price - a.price;
    return 0;
  })

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 20, backgroundColor: "white"}}>
      <StatusBar style="dark" />

      {/* Discover section */}
      <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 15}}>
        <View>
          <Text style={{fontSize: 35, fontWeight: 800}}>Discover</Text>
        </View>
        
        <Pressable 
            onPress={()=> {
              router.push("/notifications")
            }}
        >
            <Bell width={25} height={25} />
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
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  width: "83%",
              }}
          >
              <Search width={20} height={20} color="#9e9e9e" />

              <TextInput
                  placeholder="Search for clothes..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
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
                  onPress={() => {
                      setModalVisible(true)
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
              <Pressable 
                key={item} 
                style={[styles.categoryButton, {backgroundColor: selected === item ? "#000" : "#fff"}]}
                onPress={()=> setSelected(item)}
              >
                  <Text style={[styles.categoryText, {color: selected === item ? "#fff" : "#000"}]}>{item}</Text>
              </Pressable>
          ))}
      </ScrollView>

      {/* Products view */}
      <FlatList 
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }} 
        contentContainerStyle={{
            paddingBottom: 1, 
        }}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", fontSize: 18, color: "#666" }}>
            No products found
          </Text>
        }
        renderItem={({item}) => (
            <ProductCard item={item} loading={loading} />
        )}
        showsVerticalScrollIndicator={false}
      />

      {/* Filter Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
        statusBarTranslucent={true}
        navigationBarTranslucent={true}
      >

        <View style={styles.modalOverlay}>

          {/* Close modal when tapping outside */}
          <Pressable
            style={{ flex: 1}}
            onPress={() => setModalVisible(false)}
          />

          {/* Bottom Sheet */}
          <View style={styles.modalContainer}>

            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 15
                }}
              >
                Filters
              </Text>

              <Cancel width={24} height={24} onPress={() => setModalVisible(false)} />
            </View>

            <View style={{width: "100px", height: 2, backgroundColor: "#e6e6e6", marginVertical: 15}}></View>

            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 15
              }}
            >
              Sort By
            </Text>

            {/* Scroll horizontal */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 2, paddingBottom: 13 }}
            >
              {["Relevance", "Price: Low - High", "Price: High - Low"].map((item) => (
                <Pressable 
                  key={item} 
                  style={[
                    styles.categoryButton,
                    {backgroundColor: sortBy === item ? "#000" : "#fff"}
                  ]}
                  onPress={()=> setSortBy(item)}
                >
                  <Text style={{color: sortBy === item ? "#fff" : "#000"}}>{item}</Text>
                </Pressable>
              ))}
            </ScrollView>

            <View style={{width: "100px", height: 2, backgroundColor: "#e6e6e6", marginVertical: 15}}></View>

            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  marginBottom: 15
                }}
              >
                Price
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  marginBottom: 15,
                  color: "#808080"
                }}
              >
                ₦0 - ₦{price.toLocaleString()}
              </Text>
            </View>

            <Slider
              minimumValue={0}
              maximumValue={100000}
              value={price}
              onValueChange={setPrice}
              minimumTrackTintColor="black"  
              maximumTrackTintColor="#e6e6e6"
              thumbTintColor="black" 
            />


            <View style={{width: "100px", height: 2, backgroundColor: "#e6e6e6", marginVertical: 15}}></View>

            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  marginBottom: 15
                }}
              >
                Size
              </Text>

              <View
                style={{
                  marginBottom: 1,
                  width: "13%",
                  marginRight: 5,
                }}
              >
                <Dropdown
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 8,
                    padding: 10,
                    width: "100px",
                  }}
                  data={data}
                  labelField="label"
                  valueField="value"
                  placeholder="L"
                  value={size}
                  onChange={item => setSize(item.value)}
                  dropdownPosition="top"
                />
              </View>
            </View>

            <Pressable 
              style={styles.filterButton}
              onPress={()=> {
                setSortBy(sortBy)
                setPrice(price)
                setSize(size)
                setModalVisible(false)
              }}
            >
              <Text style={{ color: "white" }}>
                Apply Filters
              </Text>
            </Pressable>

          </View>

        </View>

      </Modal>

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

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },

  filterButton: {
    backgroundColor: "#1A1A1A",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    marginBottom: 15,
  },
};
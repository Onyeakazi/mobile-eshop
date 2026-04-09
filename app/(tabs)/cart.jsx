import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCart from "../../components/mycart";
import CartIcon from "../../assets/vectors/cart.svg";
import Header from "../../components/header";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCartStore } from "../../store/cartStore";

export default function Cart() {
  const cart = useCartStore((state) => state.cart);
  const getTotal = useCartStore((state) => state.getTotal);

  const subtotal = getTotal();
  const vat = subtotal * 0; // if you want 0% VAT for now
  const shipping = subtotal > 0 ? 80 : 0; // flat shipping fee
  const total = subtotal + vat + shipping;

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20, backgroundColor: "white" }}
    >
      <StatusBar style="dark" />

      {/* header section */}
      <Header page={"My Cart"} />

      <View style={{ flex: 1 }}>
        {/* Items card */}
        {cart.length > 0 ? (
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ProductCart item={item} />}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 250,
            }}
          >
            <CartIcon width={60} height={60} color={"#808080"} />

            <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 20 }}>
              Your Cart Is Empty!
            </Text>

            <Text style={{ color: "#666", marginTop: 10 }}>
              When you add products, they'll
            </Text>

            <Text style={{ color: "#666" }}>appear here.</Text>
          </View>
        )}

        {cart.length > 0 && (
          /* Summary details */
          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Text style={{ fontSize: 16, color: "#808080" }}>Sub-total</Text>
              <Text style={{ fontSize: 16, fontWeight: "700" }}>
                ₦{subtotal.toLocaleString()}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Text style={{ fontSize: 16, color: "#808080" }}>VAT (%)</Text>
              <Text style={{ fontSize: 16, fontWeight: "700" }}>
                ₦{vat.toLocaleString()}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Text style={{ fontSize: 16, color: "#808080" }}>Shipping fee</Text>
              <Text style={{ fontSize: 16, fontWeight: "700" }}>
                ₦{shipping.toLocaleString()}
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                height: 2,
                backgroundColor: "#e6e6e6",
                marginVertical: 20,
              }}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Text style={{ fontSize: 16 }}>Total</Text>
              <Text style={{ fontSize: 16, fontWeight: "700" }}>
                ₦{total.toLocaleString()}
              </Text>
            </View>

            <Pressable
              style={{
                paddingVertical: 15,
                paddingHorizontal: 100,
                borderRadius: 10,
                backgroundColor: "black",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "auto",
              }}
              onPress={() => router.push("/checkout")}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "700",
                  fontSize: 18,
                }}
              >
                Go to Checkout
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  marginLeft: 8,
                }}
              >
                ➔
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
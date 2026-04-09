import { Pressable, Text, View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/header";
import { router } from "expo-router";
import Location from "../../../assets/vectors/Location.svg";
import Card from "../../../assets/vectors/payment-card.svg";
import Cash from "../../../assets/vectors/Cash.svg";
import AppleLogo from "../../../assets/vectors/logos_apple-pay.svg";
import VisaCard from "../../../assets/vectors/bxl_visa.svg";
import Edit from "../../../assets/vectors/Edit.svg";
import Discount from "../../../assets/vectors/Discount.svg";
import CustomAlert from "../../../components/CustomAlert";
import CheckDuotone from "../../../assets/vectors/Check-duotone.svg";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useCartStore } from "../../../store/cartStore";

export default function Checkout() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const cart = useCartStore((state) => state.cart);
  const getTotal = useCartStore((state) => state.getTotal);

  const subtotal = getTotal();
  const vat = subtotal * 0;
  const shipping = subtotal > 0 ? 80 : 0;
  const total = subtotal + vat + shipping;

  const placeOrder = async () => {
    if (cart.length === 0) return;

    setLoading(true);

    try {
      for (const item of cart) {
        const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: item.id,
            quantity: item.quantity,
            size: item.size || "",
            price: item.price,
            image: item.image, 
            name: item.name 
          }),
        });

        if (!response.ok) {
          const text = await response.text();
          alert("Failed to place order: " + text);
          return;
        }

        await response.json();
      }

      setAlertVisible(true);
      useCartStore.getState().removeFromCart();
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, backgroundColor: "white" }}>
      <StatusBar style="dark" />

      <Header page={"Checkout"} />

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        <View style={styles.divider} />

        {/* Delivery Section */}
        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <Pressable onPress={() => router.push("/address")}>
              <Text style={styles.changeText}>Change</Text>
            </Pressable>
          </View>

          <View style={styles.addressRow}>
            <Location width={24} height={24} />
            <View style={{ flex: 1 }}>
              <Text style={styles.addressLabel}>Home</Text>
              <Text style={styles.addressText}>925 S Chugach St #APT 10, Alaska 99645</Text>
            </View>
          </View>

          <View style={styles.divider} />
        </View>

        {/* Payment Section */}
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.sectionTitle}>Payment Method</Text>

          <View style={styles.paymentMethods}>
            <Pressable style={[styles.cards, styles.cardColor1]}>
              <Card width={24} height={24} color={"#ffff"} />
              <Text style={styles.cardText}>Card</Text>
            </Pressable>
            <Pressable style={[styles.cards, styles.cardColor2]}>
              <Cash width={24} height={24} />
              <Text style={styles.cardText2}>Cash</Text>
            </Pressable>
            <Pressable style={[styles.cards, styles.cardColor2]}>
              <AppleLogo width={44} height={25} />
            </Pressable>
          </View>

          <View style={styles.cardDetails}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <VisaCard width={44} height={14} />
              <Text style={{ fontSize: 16, fontWeight: "500", color: "#000000" }}>**** **** **** 2512</Text>
            </View>
            <Pressable onPress={() => router.push("/checkout/paymentMethod")}>
              <Edit width={24} height={24} />
            </Pressable>
          </View>

          <View style={styles.divider} />
        </View>

        {/* Order Summary */}
        <View>
          <Text style={styles.sectionTitle}>Order Summary</Text>

          {cart.map((item) => (
            <View key={item.id} style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { flex: 1 }]} numberOfLines={1}>
                {item.name} x{item.quantity}
              </Text>
              <Text style={styles.summaryValue}>₦{(item.price * item.quantity).toLocaleString()}</Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Sub-total</Text>
            <Text style={styles.summaryValue}>₦{subtotal.toLocaleString()}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>VAT (%)</Text>
            <Text style={styles.summaryValue}>₦{vat.toLocaleString()}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping fee</Text>
            <Text style={styles.summaryValue}>₦{shipping.toLocaleString()}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={{ fontSize: 16, fontWeight: "700" }}>Total</Text>
            <Text style={{ fontSize: 16, fontWeight: "700" }}>₦{total.toLocaleString()}</Text>
          </View>

          {/* Promo Code */}
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}>
            <View style={styles.promoInput}>
              <Discount width={24} height={24} />
              <Text style={{ fontSize: 16, color: "#808080" }}>Enter Promo Code</Text>
            </View>
            <Pressable style={styles.addButton}>
              <Text style={{ fontSize: 14, color: "white", fontWeight: "700" }}>Add</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View style={{ paddingBottom: 3 }}>
        <Pressable style={styles.placeOrderButton} onPress={placeOrder} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.placeOrderText}>Place Order</Text>}
        </Pressable>
      </View>

      {/* Alert */}
      <CustomAlert
        Icon={CheckDuotone}
        visible={alertVisible}
        title="Congratulations!"
        message="Your order has been placed."
        confirmText="Track Your Order"
        showCancel={false}
        onClose={() => setAlertVisible(false)}
        onClick={() => {
          setAlertVisible(false);
          router.replace("/trackOrder");
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  divider: { width: "100%", height: 2, backgroundColor: "#e6e6e6", marginVertical: 10 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  sectionTitle: { fontSize: 16, color: "#1A1A1A", fontWeight: "900", marginBottom: 10 },
  changeText: { fontSize: 14, color: "#1A1A1A", fontWeight: "700", textDecorationLine: "underline" },
  addressRow: { marginTop: 10, flexDirection: "row", gap: 10 },
  addressLabel: { fontSize: 14, fontWeight: "700" },
  addressText: { fontSize: 14, fontWeight: "500", color: "#808080", marginTop: 5 },
  paymentMethods: { marginTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cards: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 5, paddingHorizontal: 30, borderRadius: 10, gap: 6, borderWidth: 1, borderColor: "#c7c7c7" },
  cardColor1: { backgroundColor: "#000000" },
  cardColor2: { backgroundColor: "white" },
  cardText: { color: "#ffffff", fontSize: 14, fontWeight: "400" },
  cardText2: { color: "#000000", fontSize: 14, fontWeight: "500" },
  cardDetails: { borderWidth: 1, borderColor: "#e0e0e0", borderRadius: 15, padding: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5 },
  summaryLabel: { fontSize: 16, color: "#808080" },
  summaryValue: { fontSize: 16, fontWeight: "700" },
  promoInput: { borderWidth: 1, borderColor: "#e0e0e0", borderRadius: 15, padding: 15, flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  addButton: { backgroundColor: "#000", paddingVertical: 19, paddingHorizontal: 20, borderRadius: 10, justifyContent: "center", alignItems: "center", marginLeft: 10 },
  placeOrderButton: { width: "100%", paddingVertical: 13, borderRadius: 12, backgroundColor: "black", alignItems: "center", justifyContent: "center" },
  placeOrderText: { color: "white", fontWeight: "700", fontSize: 18 }
});
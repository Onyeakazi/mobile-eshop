import { Pressable, Text, View, ScrollView, TextInput, LayoutAnimation } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import Header from "../../../components/header";
import { MaterialIcons } from "@expo/vector-icons";
import SearchIcon from "../../../assets/vectors/search.svg";
import Voice from "../../../assets/vectors/voice.svg";
import { StatusBar } from "expo-status-bar";

const faqs = [
  {
    id: 1,
    question: "How do I place an order?",
    answer:
      "To place an order, browse our products, add items to your cart, and proceed to checkout. You'll need to provide your shipping address and payment details to complete the order.",
  },
  {
    id: 2,
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you'll receive a tracking number via email. You can use this number in the 'My Orders' section to track your delivery in real time.",
  },
  {
    id: 3,
    question: "What payment methods are accepted?",
    answer:
      "We accept Visa, Mastercard, PayPal, and bank transfers. All transactions are secured and encrypted for your safety.",
  },
  {
    id: 4,
    question: "Can I cancel or modify my order?",
    answer:
      "You can cancel or modify your order within 24 hours of placing it. After that, the order may already be processed and cannot be changed.",
  },
  {
    id: 5,
    question: "How do I return a product?",
    answer:
      "If you're not satisfied, you can return a product within 30 days of delivery. The item must be unused and in its original packaging. Contact support to initiate a return.",
  },
  {
    id: 6,
    question: "How long does delivery take?",
    answer:
      "Standard delivery takes 3–7 business days. Express delivery (1–2 business days) is available at checkout for an additional fee.",
  },
  {
    id: 7,
    question: "Is my personal information safe?",
    answer:
      "Yes, we take privacy seriously. Your personal data is encrypted and never shared with third parties without your consent. See our Privacy Policy for more details.",
  },
  {
    id: 8,
    question: "How do I contact customer support?",
    answer:
      "You can reach our support team via the 'Help & Support' section in the app, or email us at support@eshop.com. We're available Monday–Friday, 9am–6pm.",
  },
];

export default function FAQs() {
  const [openId, setOpenId] = useState(null);
  const [selected, setSelected] = useState("General"); 

  const toggle = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenId(openId === id ? null : id);
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, backgroundColor: "white" }}>
      <StatusBar style="dark" />

      <Header page={"FAQs"} />

      <View style={{ height: 2, backgroundColor: "#e6e6e6", marginBottom: 20 }} />

      {/* Scrool horizontal */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 2 }}
        style={{ maxHeight: 44, marginBottom: 15 }}
      >
        {["General", "Account", "Service", "Payment"].map((item) => (
            <Pressable
            key={item}
            onPress={() => setSelected(item)}
            style={[
              styles.categoryButton,
              { backgroundColor: selected === item ? "#000" : "#fff" }
            ]}
          >
            <Text style={[
              styles.categoryText,
              { color: selected === item ? "#fff" : "#000" }
            ]}>
              {item}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

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


      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}

      >
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <View
              key={faq.id}
              style={{
                borderWidth: 1,
                borderColor: isOpen ? "#E6E6E6" : "#E6E6E6",
                borderRadius: 12,
                marginBottom: 12,
                overflow: "hidden",
              }}
            >
              {/* Question Row */}
              <Pressable
                onPress={() => toggle(faq.id)}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 16,
                  backgroundColor: isOpen ? "white" : "white",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "500",
                    flex: 1,
                    color: isOpen ? "#000" : "#000",
                    paddingRight: 10,
                  }}
                >
                  {faq.question}
                </Text>
                <MaterialIcons
                  name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                  size={24}
                  color={isOpen ? "#000" : "#000"}
                />
              </Pressable>

              {/* Answer — only shows when open */}
              {isOpen && (
                <View style={{ padding: 16, backgroundColor: "white", }}>
                  <Text style={{ fontSize: 14, color: "#808080", lineHeight: 22 }}>
                    {faq.answer}
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

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

}
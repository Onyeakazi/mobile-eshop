import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Header from "../../../components/header";

const initialMessages = [
  { id: 1, text: "Hello, good morning.", sender: "agent", time: "" },
  {
    id: 2,
    text: "I am a Customer Service, is there anything I can help you with?",
    sender: "agent",
    time: "10:41 pm",
  },
  {
    id: 3,
    text: "Hi, I'm having problems with my order & payment.",
    sender: "user",
    time: "",
  },
  { id: 4, text: "Can you help me?", sender: "user", time: "10:50 pm" },
  { id: 5, text: "Of course...", sender: "agent", time: "" },
  {
    id: 6,
    text: "Can you tell me the problem you are having? so I can help solve it",
    sender: "agent",
    time: "10:51 pm",
  },
];

export default function CustomerService() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: input.trim(), sender: "user", time },
    ]);
    setInput("");
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  // Group messages to show time only on last in a sequence
  const renderMessages = () => {
    return messages.map((msg, index) => {
      const isUser = msg.sender === "user";
      const nextMsg = messages[index + 1];
      const isLastInGroup = !nextMsg || nextMsg.sender !== msg.sender;

      return (
        <View key={msg.id}>
          <View
            style={{
              alignItems: isUser ? "flex-end" : "flex-start",
              marginBottom: isLastInGroup && msg.time ? 4 : 6,
            }}
          >
            <View
              style={{
                backgroundColor: isUser ? "#000" : "#EFEFEF",
                borderRadius: 10,
                borderBottomRightRadius: isUser ? 4 : 18,
                borderBottomLeftRadius: isUser ? 18 : 4,
                paddingHorizontal: 14,
                paddingVertical: 10,
                maxWidth: "75%",
              }}
            >
              <Text
                style={{
                  color: isUser ? "#fff" : "#000",
                  fontSize: 15,
                  lineHeight: 21,
                }}
              >
                {msg.text}
              </Text>
            </View>
          </View>

          {/* Time stamp shown after last message in group */}
          {isLastInGroup && msg.time ? (
            <Text
              style={{
                fontSize: 11,
                color: "#aaa",
                textAlign: isUser ? "right" : "left",
                paddingHorizontal: 20,
                marginBottom: 10,
              }}
            >
              {msg.time}
            </Text>
          ) : null}
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 }}>
      {/* Header */}
      <Header page={"Customer Service"} />

      <View style={{width: "100px", height: 1, backgroundColor: "#e6e6e6", marginBottom: 15}}></View>

      {/* Messages */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingVertical: 20 }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            scrollRef.current?.scrollToEnd({ animated: false })
          }
        >
          {/* Date badge */}
          <View style={{ alignItems: "center", marginBottom: 16 }}>
            <View
              style={{
                backgroundColor: "#EFEFEF",
                borderRadius: 5,
                paddingHorizontal: 14,
                paddingVertical: 4,
              }}
            >
              <Text style={{ fontSize: 12, color: "#1A1A1A" }}>Today</Text>
            </View>
          </View>

          {renderMessages()}
        </ScrollView>

        {/* Input Bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
            borderTopWidth: 1,
            borderTopColor: "#f0f0f0",
            gap: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#e0e0e0",
              borderRadius: 25,
              paddingHorizontal: 16,
              paddingVertical: 8,
              gap: 8,
            }}
          >
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Write your message..."
              placeholderTextColor="#aaa"
              style={{ flex: 1, fontSize: 15, color: "#000" }}
              onSubmitEditing={sendMessage}
            />
            <Pressable>
              <MaterialIcons name="image" size={22} color="#aaa" />
            </Pressable>
          </View>

          {/* Mic / Send button */}
          <Pressable
            onPress={sendMessage}
            style={{
              width: 46,
              height: 46,
              borderRadius: 23,
              backgroundColor: "#000",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialIcons
              name={input.trim() ? "send" : "mic"}
              size={20}
              color="#fff"
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
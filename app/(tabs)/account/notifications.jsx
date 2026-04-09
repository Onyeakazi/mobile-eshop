import { Text, View, Pressable, Switch, ScrollView } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/header";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";

export default function Notifications() {
  const [toggles, setToggles] = useState({
    general: false,
    sound: false,
    vibrate: false,
    specialOffers: false,
    promoDiscount: false,
    payments: false,
    cashback: false,
    appUpdates: false,
    newService: false,
    newTips: false,
  });

  const toggle = (key) => setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  const Row = ({ label, keyName, onPress }) => (
    <Pressable
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 9,
      }}
      onPress={onPress}
    >
      <Text style={{ fontSize: 16, fontWeight: "400" }}>{label}</Text>
      <Switch
        value={toggles[keyName]}
        onValueChange={() => toggle(keyName)}
        trackColor={{ false: "#d1d1d1", true: "#000000" }}
        thumbColor={"#ffffff"}
      />
    </Pressable>
  );

  const Divider = ({ full }) => (
    <View
      style={{
        marginHorizontal: full ? -20 : 0,
        height: 1,
        backgroundColor: "#e6e6e6",
      }}
    />
  );

  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 20, backgroundColor: "white" }}>
      <StatusBar style="dark" />

      <Header page={"Notifications"} />

      <Divider />

        <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 40}}

        >
            <Row label="General Notifications" keyName="general" />
            <Divider full />
            <Row label="Sound" keyName="sound" />
            <Divider />
            <Row label="Vibrate" keyName="vibrate" />
            <Divider />
            <Row label="Special Offers" keyName="specialOffers" />
            <Divider />
            <Row label="Promo & Discount" keyName="promoDiscount" />
            <Divider full />
            <Row label="Payments" keyName="payments" />
            <Divider />
            <Row label="Cashback" keyName="cashback" />
            <Divider full />
            <Row label="App Updates" keyName="appUpdates" />
            <Divider full />
            <Row label="New Service Available" keyName="newService" />
            <Divider full />
            <Row label="New Tips Available" keyName="newTips" />
        </ScrollView>
    </SafeAreaView>
  );
}
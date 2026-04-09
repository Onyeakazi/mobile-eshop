import { Pressable, Text, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/header";
import { router } from "expo-router";
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StatusBar } from "expo-status-bar";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

const steps = [
  {
    id: 1,
    label: "Packing",
    address: "2736 Jack Warren Rd, Delta Junction, Alaska 9...",
    done: true,
  },
  {
    id: 2,
    label: "Picked",
    address: "2417 Tongass Ave #111, Ketchikan, Alaska 99901...",
    done: true,
  },
  {
    id: 3,
    label: "In Transit",
    address: "lo Rr 2, Chugiak, Alaska 99901 USA",
    done: true,
  },
  {
    id: 4,
    label: "Delivered",
    address: "926 S Chugach St #APT 10, Alaska 99645",
    done: false,
  },
];

// Route coordinates for the polyline on the map
const routeCoordinates = [
  { latitude: 37.7905, longitude: -122.4424 },
  { latitude: 37.7875, longitude: -122.4354 },
  { latitude: 37.7850, longitude: -122.4300 },
  { latitude: 37.7820, longitude: -122.4250 },
  { latitude: 37.7800, longitude: -122.4200 },
];

export default function TrackOrder() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="dark" />

      <View style={{ paddingHorizontal: 20 }}>
        <Header page={"Track Order"} />
      </View>

      {/* Map Section */}
      <View style={{ width: "100%", height: 320 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 37.7855,
            longitude: -122.4312,
            latitudeDelta: 0.018,
            longitudeDelta: 0.018,
          }}
        >
          {/* Route line */}
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#000"
            strokeWidth={3}
          />

          {/* Start marker - truck */}
          <Marker coordinate={routeCoordinates[0]} title="Origin">
            <View style={{
              backgroundColor: "white",
              borderRadius: 20,
              padding: 6,
              borderWidth: 1,
              borderColor: "#e0e0e0",
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowRadius: 4,
            }}>
              <MaterialIcons name="local-shipping" size={18} color="#000" />
            </View>
          </Marker>

          {/* Mid marker - package */}
          <Marker coordinate={routeCoordinates[2]} title="In Transit">
            <View style={{
              backgroundColor: "white",
              borderRadius: 20,
              padding: 6,
              borderWidth: 1,
              borderColor: "#e0e0e0",
            }}>
              <MaterialIcons name="inventory" size={18} color="#000" />
            </View>
          </Marker>

          {/* End marker - destination */}
          <Marker coordinate={routeCoordinates[4]} title="Destination">
            <View style={{
              backgroundColor: "#000",
              borderRadius: 20,
              padding: 8,
            }}>
              <MaterialIcons name="location-on" size={18} color="white" />
            </View>
          </Marker>
        </MapView>
      </View>

      {/* Bottom Sheet */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Order Status Header */}
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 16,
        }}>
          <Text style={{ fontSize: 20, fontWeight: "800", color: "#1A1A1A" }}>
            Order Status
          </Text>
          <Pressable onPress={() => router.back()}>
            <MaterialIcons name="close" size={24} color="#000" />
          </Pressable>
        </View>

        {/* Divider */}
        <View style={{ height: 1, backgroundColor: "#e6e6e6", marginVertical: 15 }} />

        {/* Stepper */}
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;

          return (
            <View key={step.id} style={{ flexDirection: "row", minHeight: 60 }}>

              {/* Left side - dot and line */}
              <View style={{ alignItems: "center", marginRight: 14 }}>
                {/* Circle */}
                <View style={{
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  borderWidth: 2,
                  borderColor: step.done ? "#000" : "#c0c0c0",
                  backgroundColor: step.done ? "#000" : "white",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 2,
                }}>
                  {step.done && (
                    <View style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "white",
                    }} />
                  )}
                </View>

                {/* Vertical line connecting to next step */}
                {!isLast && (
                  <View style={{
                    width: 2,
                    flex: 1,
                    backgroundColor: "#e0e0e0",
                    marginTop: 4,
                    marginBottom: 4,
                  }} />
                )}
              </View>

              {/* Right side - text */}
              <View style={{ flex: 1, paddingBottom: isLast ? 0 : 16 }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: step.done ? "#1A1A1A" : "#c0c0c0",
                }}>
                  {step.label}
                </Text>
                <Text style={{
                  fontSize: 13,
                  color: "#808080",
                  marginTop: 2,
                  lineHeight: 18,
                }}>
                  {step.address}
                </Text>
              </View>
            </View>
          );
        })}

        {/* Divider */}
        <View style={{ height: 1, backgroundColor: "#e6e6e6", marginVertical: 20 }} />

        {/* Delivery Guy */}
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            {/* Avatar */}
            <View style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: "#e0e0e0",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}>
              <MaterialIcons name="person" size={30} color="#808080" />
            </View>

            <View>
              <Text style={{ fontSize: 16, fontWeight: "700", color: "#1A1A1A" }}>
                Jacob Jones
              </Text>
              <Text style={{ fontSize: 13, color: "#808080" }}>Delivery Guy</Text>
            </View>
          </View>

          {/* Call button */}
          <Pressable style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: "#E6E6E6",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <MaterialIcons name="phone" size={24} color="#000" />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
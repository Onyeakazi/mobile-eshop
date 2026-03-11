import { TextInput, Pressable, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import Header from "../../../components/header";
import DateTimePicker from "@react-native-community/datetimepicker";
import PhoneInput from "react-native-international-phone-number";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function MyDetails() {
  const [gender, setGender] = useState(null);
  const [dob, setDob] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const data = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, backgroundColor: "white" }}>
      <StatusBar style="dark" />

      <Header page={"My Details"} />

      <View style={{width: "100px", height: 2, backgroundColor: "#e6e6e6", }}></View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 20 }}>
          {/* Full Name */}
          <View>
            <Text style={{ fontWeight: "500", fontSize: 15 }}>Full Name</Text>
            <TextInput
              placeholder="Enter your full name"
              style={{
                borderWidth: 1,
                borderColor: "#d1d1d1",
                borderRadius: 10,
                paddingHorizontal: 15,
                height: 50,
                marginTop: 5,
              }}
            />
          </View>

          {/* Email */}
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontWeight: "500", fontSize: 15 }}>Email Address</Text>
            <TextInput
              placeholder="Enter your email address"
              keyboardType="email-address"
              style={{
                borderWidth: 1,
                borderColor: "#d1d1d1",
                borderRadius: 10,
                paddingHorizontal: 15,
                height: 50,
                marginTop: 5,
              }}
            />
          </View>

          {/* Date of Birth */}
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontWeight: "500", fontSize: 15 }}>Date of Birth</Text>
            <Pressable
              onPress={() => setShowPicker(true)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#d1d1d1",
                borderRadius: 10,
                paddingHorizontal: 15,
                height: 50,
                marginTop: 5,
              }}
            >
              <Text style={{ flex: 1, color: dob ? "#000" : "#9e9e9e" }}>
                {dob ? dob.toLocaleDateString() : "Select your date of birth"}
              </Text>
              <MaterialIcons name="calendar-today" size={22} color="#9e9e9e" />
            </Pressable>
            {showPicker && (
              <DateTimePicker
                value={dob || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowPicker(false);
                  if (selectedDate) setDob(selectedDate);
                }}
              />
            )}
          </View>

          {/* Gender */}
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontWeight: "500", fontSize: 15 }}>Gender</Text>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "#c3c3c3",
                marginTop: 5,
                paddingHorizontal: 10,
              }}
            >
              <Dropdown
                data={data}
                labelField="label"
                valueField="value"
                placeholder="Choose One"
                value={gender}
                style={{ height: 50 }}
                selectedTextStyle={{ fontSize: 15, color: "#525252" }}
                placeholderStyle={{ fontSize: 15, color: "#9e9e9e" }}
                onChange={(item) => setGender(item.value)}
              />
            </View>
          </View>

          {/* Phone Number */}
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontWeight: "500", fontSize: 15 }}>Phone Number</Text>
            <PhoneInput
              value={phone}
              onChangePhoneNumber={(text) => setPhone(text)}
              selectedCountry={selectedCountry}
              onChangeSelectedCountry={(country) => setSelectedCountry(country)}
              placeholder="Enter your phone number"
              phoneInputStyles={{
                container: {
                  borderWidth: 1,
                  borderColor: "#d1d1d1",
                  backgroundColor: "white",
                  borderRadius: 10,
                  height: 50,
                  marginTop: 5,
                },
                flagContainer: {
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  backgroundColor: "white",
                },
                input: {
                  fontSize: 15,
                },
              }}
            />
          </View>
        </View>
      </ScrollView>

      {/* Submit Button — always at bottom */}
      <Pressable
        style={{
          paddingVertical: 15,
          borderRadius: 10,
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
    
        }}
      >
        <Text style={{ color: "white", fontWeight: "700", fontSize: 18 }}>
          Submit
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
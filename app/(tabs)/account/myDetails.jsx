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

      <View style={{ width: "100%", height: 2, backgroundColor: "#e6e6e6" }} />

      {/* Scrollable content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 20 }}>
          {/* Full Name */}
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            placeholder="Enter your full name"
            style={styles.input}
          />

          {/* Email */}
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            placeholder="Enter your email address"
            keyboardType="email-address"
            style={styles.input}
          />

          {/* Date of Birth */}
          <Text style={styles.label}>Date of Birth</Text>
          <Pressable
            onPress={() => setShowPicker(true)}
            style={styles.input}
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

          {/* Gender */}
          <Text style={styles.label}>Gender</Text>
          <View style={styles.dropdownContainer}>
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

          {/* Phone Number */}
          <Text style={styles.label}>Phone Number</Text>
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
      </ScrollView>

      {/* Submit Button */}
      <View style={{ paddingBottom: 20 }}>
        <Pressable
          style={styles.submitButton}
        >
          <Text style={styles.submitText}>Submit</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = {
  label: { fontWeight: "500", fontSize: 15, marginTop: 15, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#c3c3c3",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    justifyContent: "center",
  },
  submitButton: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
};
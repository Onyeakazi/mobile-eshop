import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet, Image } from "react-native";
import Logo from "../assets/images/preloader.png"; 

export default function Preloader() {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.2, duration: 700, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={Logo}
        style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  logo: {
    width: 150,
    height: 150,
  },
});
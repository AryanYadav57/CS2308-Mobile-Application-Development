import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Easing } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT, COLORS } from "../theme";

export default function SuccessScreen() {
  // Animation values
  const scaleAnim = useRef(new Animated.Value(0.6)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 120,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={GRADIENT}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Animated Check Icon */}
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
          marginBottom: 16,
        }}
      >
        <View
          style={{
            width: 96,
            height: 96,
            borderRadius: 48,
            backgroundColor: "rgba(255,255,255,0.15)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 48 }}>✓</Text>
        </View>
      </Animated.View>

      {/* Success Text */}
      <Animated.Text
        style={{
          opacity: opacityAnim,
          fontSize: 22,
          fontWeight: "700",
          color: "#FFFFFF",
          marginTop: 8,
        }}
      >
        Payment Successful
      </Animated.Text>

      <Animated.Text
        style={{
          opacity: opacityAnim,
          fontSize: 14,
          marginTop: 6,
          color: "#E0E7FF",
        }}
      >
        Your transaction was completed securely
      </Animated.Text>
    </LinearGradient>
  );
}




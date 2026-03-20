import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { StyleSheet } from "react-native";

export default function NeonBackground({ children }: any) {
  return (
    <LinearGradient
      colors={["#000000", "#0A0A0A", "#111111"]}
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
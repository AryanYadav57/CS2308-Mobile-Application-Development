import React from "react";
import { View, StyleSheet } from "react-native";
import { GLASS, RADIUS } from "../theme";

export default function GlassCard({ children, style }: any) {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: RADIUS.lg,
    padding: 20,
    backgroundColor: GLASS.background,
    borderWidth: 1,
    borderColor: GLASS.border,
  },
});
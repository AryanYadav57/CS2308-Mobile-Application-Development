import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT, COLORS, SPACING, RADIUS } from "../theme";

export default function SuccessScreen({ route, navigation }: any) {
  const insets = useSafeAreaInsets();
  const { amount = "0", name = "" } = route?.params ?? {};
  const scale = useRef(new Animated.Value(0.6)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={['#00F0FF', '#6E00FF']} 
        style={StyleSheet.absoluteFillObject} 
      />
      
      <Animated.View
        style={[
          styles.content,
          {
            paddingTop: insets.top + 60,
            transform: [{ scale }],
          },
        ]}
      >
        <View style={styles.circle}>
          <Text style={styles.tick}>✓</Text>
        </View>

        <Text style={styles.success}>₹{amount.toLocaleString("en-IN")} Sent</Text>
        <Text style={styles.sub}>Securely paid to {name}</Text>

        <Animated.View style={[styles.actions, { opacity }]}>
          <Pressable
            style={({ pressed }) => [styles.doneBtn, pressed && styles.pressed]}
            onPress={() => navigation.navigate("MainTabs")}
          >
            <Text style={styles.doneText}>Done</Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
  },
  circle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  tick: { fontSize: 64, color: "#fff", fontWeight: "900", textShadowColor: 'rgba(255,255,255,0.5)', textShadowRadius: 10 },
  success: {
    fontSize: 36,
    fontWeight: "900",
    color: "#fff",
    marginTop: SPACING.xl * 1.5,
    letterSpacing: -1,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  sub: { fontSize: 18, color: "rgba(255,255,255,0.9)", marginTop: SPACING.sm, fontWeight: '500' },
  actions: { marginTop: "auto", marginBottom: SPACING.xxl * 2, width: "100%" },
  doneBtn: {
    backgroundColor: "#FFF",
    paddingVertical: 18,
    borderRadius: RADIUS.lg,
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  doneText: { color: "#000", fontWeight: "900", fontSize: 18, textTransform: 'uppercase', letterSpacing: 1 },
  pressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
});

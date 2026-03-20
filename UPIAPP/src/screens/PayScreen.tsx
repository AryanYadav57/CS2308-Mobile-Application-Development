import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useWalletStore } from "../walletstore";
import { COLORS, SPACING, RADIUS, TYPOGRAPHY, GRADIENT } from "../theme";

const KEYS = [
  "AC", "⌫", "×",
  "7", "8", "9",
  "4", "5", "6",
  "1", "2", "3",
  "0", "+", "-",
];

export default function PayScreen({ route, navigation }: any) {
  const insets = useSafeAreaInsets();
  const { name, upi } = route?.params ?? {};
  const balance = useWalletStore((s) => s.balance);
  const addTransaction = useWalletStore((s) => s.addTransaction);
  const [expression, setExpression] = useState("");

  const formattedExpression = useMemo(() => {
    return expression.replace(/([+\-×])/g, " $1 ");
  }, [expression]);

  const computedAmount = useMemo(() => {
    if (!expression) return 0;
    try {
      const safe = expression.replace(/×/g, "*");
      const result = Function(`"use strict"; return (${safe})`)();
      return isNaN(result) ? 0 : Math.floor(result);
    } catch {
      return 0;
    }
  }, [expression]);

  const formattedAmount = computedAmount.toLocaleString("en-IN");
  const canPay = computedAmount > 0 && computedAmount <= balance;

  const onPressKey = useCallback((key: string) => {
    ReactNativeHapticFeedback.trigger("selection", { enableVibrateFallback: true });
    if (key === "AC") return setExpression("");
    if (key === "⌫") return setExpression((p) => p.slice(0, -1));
    setExpression((prev) => {
      const last = prev.slice(-1);
      const isOperator = ["+", "-", "×"].includes(key);
      const lastIsOperator = ["+", "-", "×"].includes(last);
      if (isOperator && lastIsOperator) return prev;
      return prev + key;
    });
  }, []);

  const handlePay = () => {
    if (computedAmount <= 0) return;
    if (computedAmount > balance) {
      ReactNativeHapticFeedback.trigger("notificationError", { enableVibrateFallback: true });
      Alert.alert(
        "Insufficient Balance",
        `You need ₹${(computedAmount - balance).toLocaleString("en-IN")} more. Add money to continue.`,
        [{ text: "Cancel" }, { text: "Add Money", onPress: () => navigation.navigate("AddMoney") }]
      );
      return;
    }
    ReactNativeHapticFeedback.trigger("notificationSuccess", { enableVibrateFallback: true });
    if (name) {
      addTransaction({ type: "sent", name, amount: computedAmount });
    }
    navigation.navigate("Success", {
      amount: formattedAmount,
      name,
    });
  };

  if (!name || !upi) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.error}>Invalid recipient. Go back.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + SPACING.sm }]}>
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, paddingBottom: Math.max(insets.bottom, SPACING.lg) }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </Pressable>
        </View>

        <View style={styles.recipient}>
          <View style={styles.recipientAvatar}>
            <Text style={styles.recipientInitial}>
              {name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.upi}>{upi}</Text>
        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={styles.display}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Text style={styles.expression} numberOfLines={1}>
                {formattedExpression || "0"}
              </Text>
            </ScrollView>
            <Text style={styles.result}>₹ {formattedAmount}</Text>
          </View>
        </View>

        <View style={styles.keypad}>
          {KEYS.map((key) => (
            <Pressable
              key={key}
              onPress={() => onPressKey(key)}
              style={({ pressed }) => [
                styles.key,
                (key === "AC" || key === "⌫") && styles.keyOp,
                pressed && styles.keyPressed,
              ]}
            >
              <Text
                style={[
                  styles.keyText,
                  (key === "AC" || key === "⌫") && styles.keyTextOp,
                ]}
              >
                {key}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          onPress={handlePay}
          disabled={computedAmount <= 0}
          style={({ pressed }) => [pressed && styles.payPressed, { marginTop: SPACING.md }]}
        >
          <LinearGradient
            colors={canPay ? GRADIENT : [COLORS.surfaceSoft, COLORS.surfaceSoft]}
            style={[styles.payButton, !canPay && styles.payDisabled]}
          >
            <Text
              style={[
                styles.payText,
                !canPay && styles.payTextDisabled,
              ]}
            >
              Pay ₹{formattedAmount}
            </Text>
            {computedAmount > balance && computedAmount > 0 && (
              <Text style={styles.insufficient}>Insufficient balance</Text>
            )}
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.lg,
  },
  error: { color: COLORS.error, textAlign: "center", marginTop: 40, fontSize: 16, fontWeight: '600' },
  header: { marginBottom: SPACING.lg },
  backBtn: { padding: SPACING.sm, alignSelf: "flex-start" },
  backText: { color: '#FFF', fontWeight: "600", fontSize: 16 },
  recipient: {
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  recipientAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.surfaceElevated,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  recipientInitial: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: "900",
  },
  name: { color: COLORS.textPrimary, fontSize: 22, fontWeight: "700", marginTop: SPACING.sm },
  upi: { color: COLORS.textSecondary, fontSize: 14, marginTop: 4 },
  display: {
    backgroundColor: 'rgba(20,20,30,0.6)',
    padding: SPACING.xl,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  expression: {
    color: COLORS.textSecondary,
    fontSize: 22,
    fontWeight: '500',
  },
  result: {
    color: COLORS.textPrimary,
    fontSize: 48,
    fontWeight: "900",
    marginTop: SPACING.sm,
    letterSpacing: -2,
    textShadowColor: 'rgba(255,255,255,0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  keypad: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: SPACING.sm,
  },
  key: {
    width: "31%",
    paddingVertical: 20,
    borderRadius: RADIUS.md,
    backgroundColor: 'rgba(255,255,255,0.03)',
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: 'transparent',
  },
  keyOp: { backgroundColor: 'rgba(0,240,255,0.05)' },
  keyText: { color: '#FFF', fontSize: 24, fontWeight: "600" },
  keyTextOp: { color: COLORS.primary, fontWeight: "700" },
  keyPressed: { backgroundColor: COLORS.surfaceElevated, borderColor: COLORS.border, transform: [{ scale: 0.95 }] },
  payButton: {
    marginVertical: SPACING.xl,
    paddingVertical: 18,
    borderRadius: RADIUS.lg,
    alignItems: "center",
  },
  payDisabled: { opacity: 0.5 },
  payText: { color: "#000", fontWeight: "900", fontSize: 18, textTransform: 'uppercase', letterSpacing: 1 },
  payTextDisabled: { color: COLORS.textMuted },
  payPressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
  insufficient: { color: COLORS.error, fontSize: 13, marginTop: 6, fontWeight: '600' },
});

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import { useWalletStore } from "../walletstore";
import { COLORS, SPACING, RADIUS, TYPOGRAPHY, GRADIENT } from "../theme";

const QUICK_AMOUNTS = [100, 500, 1000, 2000, 5000, 10000];

export default function AddMoneyScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [amount, setAmount] = useState("");
  const addMoney = useWalletStore((s) => s.addMoney);

  const handleAdd = (value: number) => {
    const num = value || parseInt(amount, 10);
    if (num > 0) {
      addMoney(num);
      navigation.goBack();
    }
  };

  const handleQuickAmount = (val: number) => {
    setAmount(String(val));
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top + SPACING.md }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <LinearGradient
        colors={['rgba(0,240,255,0.1)', 'transparent']}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: Math.max(insets.bottom, SPACING.lg) }} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </Pressable>
        </View>

        <Text style={styles.title}>Add Money</Text>
        <Text style={styles.subtitle}>Top up your wallet balance</Text>

        <Text style={styles.label}>Enter amount (₹)</Text>
        <TextInput
          style={styles.input}
          placeholder="0"
          placeholderTextColor={COLORS.textMuted}
          keyboardType="number-pad"
          value={amount}
          onChangeText={setAmount}
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.quickLabel}>Quick Add</Text>
          <View style={styles.quickRow}>
            {QUICK_AMOUNTS.map((val) => (
              <Pressable
                key={val}
                style={({ pressed }) => [
                  styles.quickBtn,
                  amount === String(val) && styles.quickBtnActive,
                  pressed && styles.quickPressed,
                ]}
                onPress={() => handleQuickAmount(val)}
              >
                <Text
                  style={[
                    styles.quickText,
                    amount === String(val) && styles.quickTextActive,
                  ]}
                >
                  +₹{val >= 1000 ? val / 1000 + "K" : val}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Pressable
          onPress={() => handleAdd(parseInt(amount, 10) || 0)}
          style={({ pressed }) => [pressed && styles.pressed, { marginTop: SPACING.md }]}
          disabled={!amount || parseInt(amount, 10) <= 0}
        >
          <View
            style={[
              styles.addBtn,
              (!amount || parseInt(amount, 10) <= 0) ? styles.addBtnDisabled : styles.addBtnActive
            ]}
          >
            <Text style={[styles.addBtnText, (!amount || parseInt(amount, 10) <= 0) && styles.addBtnTextDisabled]}>
              Proceed to Add ₹{(amount ? parseInt(amount, 10) : 0).toLocaleString("en-IN")}
            </Text>
          </View>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  backBtn: { padding: SPACING.sm, alignSelf: "flex-start" },
  backText: { color: '#FFF', fontWeight: "600", fontSize: 16 },
  title: { color: '#FFF', ...TYPOGRAPHY.title },
  subtitle: { color: COLORS.textSecondary, ...TYPOGRAPHY.body, marginTop: 4 },
  label: { color: COLORS.textSecondary, fontSize: 14, marginTop: SPACING.xl, textTransform: 'uppercase', letterSpacing: 1 },
  input: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    color: '#FFF',
    fontSize: 48,
    fontWeight: "900",
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginTop: SPACING.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    textAlign: 'center',
    letterSpacing: -1,
  },
  quickLabel: { color: COLORS.textSecondary, fontSize: 14, marginTop: SPACING.xl, textTransform: 'uppercase', letterSpacing: 1 },
  quickRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  quickBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceSoft,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  quickBtnActive: {
    backgroundColor: 'rgba(0,240,255,0.15)',
    borderColor: COLORS.primary,
  },
  quickPressed: { opacity: 0.8, transform: [{ scale: 0.95 }] },
  quickText: { color: COLORS.textPrimary, fontWeight: "600", fontSize: 15 },
  quickTextActive: { color: COLORS.primary, fontWeight: '800' },
  addBtn: {
    marginTop: SPACING.xl * 2,
    paddingVertical: 18,
    borderRadius: RADIUS.lg,
    alignItems: "center",
    borderWidth: 1,
  },
  addBtnActive: {
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
    borderColor: 'rgba(0, 240, 255, 0.4)',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  addBtnDisabled: {
    backgroundColor: COLORS.surfaceSoft,
    borderColor: 'transparent',
  },
  addBtnText: { color: COLORS.primary, fontWeight: "900", fontSize: 18, textTransform: 'uppercase', letterSpacing: 1 },
  addBtnTextDisabled: { color: COLORS.textMuted },
  pressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
});

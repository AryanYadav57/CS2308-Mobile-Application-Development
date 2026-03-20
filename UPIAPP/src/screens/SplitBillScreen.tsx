import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import { COLORS, SPACING, RADIUS, TYPOGRAPHY, GRADIENT } from "../theme";

const CONTACTS = [
  { id: "1", name: "Ananya", upi: "ananya@upi", initial: "A" },
  { id: "2", name: "Jeevan", upi: "jeevan@upi", initial: "J" },
  { id: "3", name: "Priya", upi: "priya@paytm", initial: "P" },
  { id: "4", name: "Rahul", upi: "rahul@okicici", initial: "R" },
  { id: "5", name: "Sneha", upi: "sneha@ybl", initial: "S" },
];

export default function SplitBillScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [amount, setAmount] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const numericAmount = parseFloat(amount) || 0;
  // Always include yourself in the split
  const totalPeople = selectedIds.length + 1; 
  const splitAmount = numericAmount / totalPeople;

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <LinearGradient 
        colors={['rgba(0,240,255,0.1)', 'transparent']} 
        style={StyleSheet.absoluteFillObject} 
        pointerEvents="none" 
      />
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={styles.title}>Split Bill</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.currencyPrefix}>₹</Text>
        <TextInput
          style={styles.amountInput}
          placeholder="0"
          placeholderTextColor={COLORS.textMuted}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          autoFocus
        />
      </View>

      <Text style={styles.sectionTitle}>Select Friends ({selectedIds.length} selected)</Text>
      
      <FlatList
        data={CONTACTS}
        keyExtractor={(item) => item.id}
        style={styles.list}
        renderItem={({ item }) => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <Pressable
              style={({ pressed }) => [
                styles.contactRow,
                isSelected && styles.contactRowSelected,
                pressed && { opacity: 0.8 },
              ]}
              onPress={() => toggleSelection(item.id)}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.initial}</Text>
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text style={styles.contactUpi}>{item.upi}</Text>
              </View>
              <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                {isSelected && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </Pressable>
          );
        }}
      />

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, SPACING.lg) }]}>
        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            Split among <Text style={{ color: COLORS.primary, fontWeight: 'bold' }}>{totalPeople}</Text> people
          </Text>
          <Text style={styles.splitAmountText}>
            ₹{splitAmount.toFixed(2)} / person
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [pressed && { opacity: 0.9 }]}
          disabled={!numericAmount || selectedIds.length === 0}
          onPress={() => {
            Alert.alert(
              "Request Sent",
              `Dummy Request sent to ${selectedIds.length} friends for ₹${splitAmount.toFixed(2)} each!`
            );
            navigation.goBack();
          }}
        >
          <LinearGradient
            colors={
              numericAmount && selectedIds.length > 0
                ? GRADIENT
                : [COLORS.surfaceSoft, COLORS.surfaceSoft]
            }
            style={styles.requestButton}
          >
            <Text
              style={[
                styles.requestButtonText,
                (!numericAmount || selectedIds.length === 0) && { color: COLORS.textMuted },
              ]}
            >
              Request Money
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.sm,
  },
  backBtn: {
    padding: SPACING.sm,
  },
  backText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    color: '#FFF',
    ...TYPOGRAPHY.subtitle,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    marginVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  currencyPrefix: {
    color: COLORS.primary,
    fontSize: 32,
    fontWeight: "800",
    marginRight: SPACING.xs,
    marginTop: 10,
  },
  amountInput: {
    color: COLORS.textPrimary,
    fontSize: 72,
    fontWeight: "900",
    minWidth: 100,
    letterSpacing: -2,
    textAlign: 'center',
  },
  sectionTitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: "600",
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  list: {
    flex: 1,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.02)',
  },
  contactRowSelected: {
    backgroundColor: 'rgba(0,240,255,0.05)',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.surfaceElevated,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  avatarText: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "700",
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
  contactUpi: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.textMuted,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.surfaceSoft,
  },
  checkboxSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  checkmark: {
    color: "#000",
    fontWeight: "900",
    fontSize: 14,
  },
  footer: {
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: 'rgba(10, 10, 15, 0.95)',
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  summaryText: {
    color: COLORS.textSecondary,
    fontSize: 15,
  },
  splitAmountText: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: "800",
  },
  requestButton: {
    paddingVertical: 18,
    borderRadius: RADIUS.lg,
    alignItems: "center",
  },
  requestButtonText: {
    color: "#000",
    fontWeight: "800",
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

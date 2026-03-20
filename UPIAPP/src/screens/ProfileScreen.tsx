import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWalletStore } from "../walletstore";
import GlassCard from "../components/GlassCard";
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from "../theme";

export default function ProfileScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const balance = useWalletStore((s) => s.balance);

  const MenuItem = ({
    icon,
    label,
    value,
    onPress,
  }: {
    icon: string;
    label: string;
    value?: string;
    onPress?: () => void;
  }) => (
    <Pressable
      style={({ pressed }) => [styles.menuItem, pressed && styles.menuPressed]}
      onPress={onPress}
      disabled={!onPress}
    >
      <Text style={styles.menuIcon}>{icon}</Text>
      <Text style={styles.menuLabel}>{label}</Text>
      {value && <Text style={styles.menuValue}>{value}</Text>}
      {onPress && <Text style={styles.menuArrow}>→</Text>}
    </Pressable>
  );

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top + SPACING.md }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Manage your account</Text>

      <GlassCard style={styles.walletCard}>
        <View style={styles.walletRow}>
          <Text style={styles.walletLabel}>Wallet Balance</Text>
          <Text style={styles.walletAmount}>
            ₹{balance.toLocaleString("en-IN")}
          </Text>
        </View>
        <Pressable
          style={({ pressed }) => [pressed && styles.pressed]}
          onPress={() => navigation.navigate("AddMoney")}
        >
          <View style={styles.addMoneyBtn}>
            <Text style={styles.addMoneyText}>+ Add Money</Text>
          </View>
        </Pressable>
      </GlassCard>

      <Text style={styles.sectionTitle}>Account</Text>
      <View style={styles.menuCard}>
        <MenuItem icon="👤" label="Personal Info" value="Update" onPress={() => {}} />
        <MenuItem icon="🔒" label="Security" onPress={() => {}} />
        <MenuItem icon="🔔" label="Notifications" value="On" onPress={() => {}} />
      </View>

      <Text style={styles.sectionTitle}>Support</Text>
      <View style={styles.menuCard}>
        <MenuItem icon="❓" label="Help & FAQ" onPress={() => {}} />
        <MenuItem icon="📧" label="Contact Us" onPress={() => {}} />
      </View>

      <Text style={styles.footer}>PayMate v0.0.1</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xxl },
  title: { color: COLORS.textPrimary, ...TYPOGRAPHY.title },
  subtitle: { color: COLORS.textMuted, fontSize: 14, marginTop: 4 },
  walletCard: { marginTop: SPACING.lg, padding: SPACING.lg },
  walletRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  walletLabel: { color: COLORS.textSecondary, fontSize: 15 },
  walletAmount: { color: COLORS.textPrimary, fontSize: 22, fontWeight: "800" },
  addMoneyBtn: {
    marginTop: SPACING.md,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },
  addMoneyText: { color: "#000", fontWeight: "700", fontSize: 15 },
  pressed: { opacity: 0.9 },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: "600",
    marginTop: SPACING.xl,
    marginBottom: SPACING.sm,
  },
  menuCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuPressed: { opacity: 0.7 },
  menuIcon: { fontSize: 20, marginRight: SPACING.md },
  menuLabel: { flex: 1, color: COLORS.textPrimary, fontSize: 16 },
  menuValue: { color: COLORS.textSecondary, fontSize: 14, marginRight: SPACING.sm },
  menuArrow: { color: COLORS.textMuted, fontSize: 16 },
  footer: {
    color: COLORS.textMuted,
    fontSize: 12,
    textAlign: "center",
    marginTop: SPACING.xl,
  },
});

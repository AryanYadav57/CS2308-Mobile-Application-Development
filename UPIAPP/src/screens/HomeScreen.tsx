import React from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useWalletStore } from "../walletstore";
import GlassCard from "../components/GlassCard";
import { COLORS, SPACING, RADIUS, TYPOGRAPHY, GRADIENT } from "../theme";

const CONTACTS = [
  { id: "1", name: "Ananya", upi: "ananya@upi", initial: "A" },
  { id: "2", name: "Jeevan", upi: "jeevan@upi", initial: "J" },
  { id: "3", name: "Priya", upi: "priya@paytm", initial: "P" },
];

export default function HomeScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const balance = useWalletStore((state) => state.balance);

  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={['rgba(110,0,255,0.15)', 'transparent']} 
        style={styles.ambientGlow} 
        pointerEvents="none" 
      />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + SPACING.lg }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>PayMate</Text>
            <Text style={styles.subtitle}>Welcome back, Aryan 👋</Text>
          </View>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileInitials}>AR</Text>
          </View>
        </View>

        <View style={styles.walletContainer}>
          <LinearGradient
            colors={GRADIENT}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.walletGlow}
          />
          <GlassCard style={styles.wallet}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balance}>₹{balance.toLocaleString("en-IN")}</Text>
            
            <View style={styles.actionButtons}>
              <Pressable
                onPress={() => {
                  ReactNativeHapticFeedback.trigger("impactLight", { enableVibrateFallback: true });
                  navigation.navigate("AddMoney");
                }}
                style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}
              >
                <Text style={styles.primaryBtnText}>+ Add Money</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [styles.secondaryBtn, pressed && styles.pressed]}
              >
                <Text style={styles.secondaryBtnText}>History</Text>
              </Pressable>
            </View>
          </GlassCard>
        </View>

        <View style={styles.toolsHeader}>
          <Text style={styles.sectionTitle}>Essentials</Text>
        </View>
      <View style={styles.toolsRow}>
        <Pressable 
          style={({pressed}) => [styles.toolBtn, pressed && styles.toolPressed]}
          onPress={() => {
            ReactNativeHapticFeedback.trigger("impactMedium", { enableVibrateFallback: true });
            navigation.navigate("Scanner");
          }}
        >
          <View style={[styles.toolIconArea, { backgroundColor: 'rgba(255,138,0,0.1)' }]}>
            <Text style={styles.toolIconText}>📷</Text>
          </View>
          <Text style={styles.toolText}>Scan & Pay</Text>
        </Pressable>
        
        <Pressable 
          style={({pressed}) => [styles.toolBtn, pressed && styles.toolPressed]}
          onPress={() => {
            ReactNativeHapticFeedback.trigger("impactMedium", { enableVibrateFallback: true });
            navigation.navigate("SplitBill");
          }}
        >
          <View style={[styles.toolIconArea, { backgroundColor: 'rgba(34,197,94,0.1)' }]}>
            <Text style={styles.toolIconText}>👥</Text>
          </View>
          <Text style={styles.toolText}>Split Bill</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Quick Pay</Text>
      <View style={styles.contactsRow}>
        {CONTACTS.map((item) => (
          <Pressable
            key={item.id}
            style={({ pressed }) => [
              styles.contactCard,
              pressed && styles.cardPressed,
            ]}
            onPress={() => {
              ReactNativeHapticFeedback.trigger("selection", { enableVibrateFallback: true });
              navigation.navigate("Pay", { name: item.name, upi: item.upi });
            }}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.initial}</Text>
            </View>
            <Text style={styles.contactName} numberOfLines={1}>
              {item.name}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Recent Contacts</Text>
      <FlatList
        data={CONTACTS}
        keyExtractor={(i) => i.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
            onPress={() => {
              ReactNativeHapticFeedback.trigger("selection", { enableVibrateFallback: true });
              navigation.navigate("Pay", { name: item.name, upi: item.upi });
            }}
          >
            <View style={styles.avatarSmall}>
              <Text style={styles.avatarTextSmall}>{item.initial}</Text>
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.upi}>{item.upi}</Text>
            </View>
            <Text style={styles.payLabel}>Pay →</Text>
          </Pressable>
        )}
      />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  ambientGlow: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 400,
  },
  content: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xxl },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: { color: COLORS.textPrimary, ...TYPOGRAPHY.title },
  subtitle: { color: COLORS.textSecondary, ...TYPOGRAPHY.body, marginTop: 4 },
  profileAvatar: {
    width: 50, height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.surfaceElevated,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.border,
  },
  profileInitials: { color: COLORS.textPrimary, fontWeight: '800', fontSize: 18 },
  
  walletContainer: {
    position: 'relative',
    marginBottom: SPACING.xl,
  },
  walletGlow: {
    position: 'absolute',
    top: 10, left: 10, right: 10, bottom: -5,
    borderRadius: RADIUS.lg,
    opacity: 0.3,
    filter: 'blur(15px)',
  },
  wallet: { 
    padding: SPACING.xl,
    backgroundColor: 'rgba(20, 20, 30, 0.8)',
    borderColor: COLORS.borderGlow,
  },
  balanceLabel: { color: COLORS.textSecondary, ...TYPOGRAPHY.caption, textTransform: 'uppercase', letterSpacing: 1 },
  balance: {
    fontSize: 48,
    fontWeight: "900",
    color: '#FFF',
    marginTop: SPACING.xs,
    letterSpacing: -2,
    textShadowColor: 'rgba(255,255,255,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: SPACING.xl,
    gap: SPACING.md,
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    alignItems: "center",
  },
  primaryBtnText: { color: "#000", fontWeight: "800", fontSize: 16 },
  secondaryBtn: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    alignItems: "center",
  },
  secondaryBtnText: { color: COLORS.textPrimary, fontWeight: "700", fontSize: 16 },
  pressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
  sectionTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "700",
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  toolsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toolsRow: { flexDirection: "row", gap: SPACING.md, marginBottom: SPACING.xl },
  toolBtn: {
    flex: 1,
    backgroundColor: COLORS.surfaceSoft,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  toolIconArea: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  toolIconText: { fontSize: 26 },
  toolText: { color: COLORS.textPrimary, fontWeight: "600", fontSize: 14 },
  toolPressed: { opacity: 0.7, transform: [{ scale: 0.98 }] },
  contactsRow: { flexDirection: "row", gap: SPACING.lg, marginBottom: SPACING.xl },
  contactCard: {
    alignItems: "center",
    width: 72,
  },
  cardPressed: { opacity: 0.7, transform: [{ scale: 0.95 }] },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.surfaceElevated,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.sm,
  },
  avatarText: { color: COLORS.primary, fontWeight: "800", fontSize: 24 },
  contactName: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceSoft,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  rowPressed: { opacity: 0.8, backgroundColor: COLORS.surfaceElevated, borderColor: COLORS.border },
  avatarSmall: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,240,255,0.1)',
    justifyContent: "center",
    alignItems: "center",
  },
  avatarTextSmall: { color: COLORS.primary, fontWeight: "800", fontSize: 18 },
  rowContent: { flex: 1, marginLeft: SPACING.md },
  name: { color: COLORS.textPrimary, fontWeight: "600", fontSize: 16 },
  upi: { color: COLORS.textSecondary, fontSize: 13, marginTop: 4 },
  payLabel: { color: COLORS.primary, fontWeight: "800", fontSize: 14, textTransform: "uppercase" },
});
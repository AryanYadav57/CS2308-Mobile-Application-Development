import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import { useWalletStore } from "../walletstore";
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from "../theme";

export default function TransactionsScreen() {
  const insets = useSafeAreaInsets();
  const transactions = useWalletStore((s) => s.transactions);

  const EmptyState = () => (
    <View style={styles.empty}>
      <Text style={styles.emptyIcon}>📋</Text>
      <Text style={styles.emptyTitle}>No transactions yet</Text>
      <Text style={styles.emptySub}>
        Payments you make will appear here
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={['rgba(110,0,255,0.1)', 'transparent']} 
        style={StyleSheet.absoluteFillObject} 
        pointerEvents="none" 
      />
      <View
        style={[
          styles.content,
          { paddingTop: insets.top + SPACING.lg },
        ]}
      >
        <Text style={styles.title}>Transactions</Text>
        <Text style={styles.subtitle}>Your payment history</Text>

      {transactions.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(i) => i.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View
                style={[
                  styles.iconWrap,
                  item.type === "sent" ? styles.iconSent : styles.iconReceived,
                ]}
              >
                <Text style={styles.iconText}>
                  {item.type === "sent" ? "→" : "←"}
                </Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.name}>
                  {item.type === "sent" ? "Paid to" : "Received from"} {item.name}
                </Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
              <Text
                style={[
                  styles.amount,
                  item.type === "sent" ? styles.amountSent : styles.amountReceived,
                ]}
              >
                {item.type === "sent" ? "-" : "+"}₹
                {item.amount.toLocaleString("en-IN")}
              </Text>
            </View>
          )}
        />
      )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  title: { color: '#FFF', ...TYPOGRAPHY.title },
  subtitle: { color: COLORS.textSecondary, ...TYPOGRAPHY.body, marginTop: 4 },
  list: { paddingTop: SPACING.xl, paddingBottom: SPACING.xxl },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: 'rgba(255,255,255,0.02)',
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  iconSent: { backgroundColor: "rgba(255,51,51,0.15)", borderWidth: 1, borderColor: "rgba(255,51,51,0.3)" },
  iconReceived: { backgroundColor: "rgba(0,255,102,0.15)", borderWidth: 1, borderColor: "rgba(0,255,102,0.3)" },
  iconText: { fontSize: 20, fontWeight: "900", color: '#FFF' },
  cardContent: { flex: 1 },
  name: { color: '#FFF', fontWeight: "600", fontSize: 16 },
  date: { color: COLORS.textSecondary, fontSize: 13, marginTop: 4 },
  amount: { fontWeight: "800", fontSize: 16, letterSpacing: 0.5 },
  amountSent: { color: COLORS.error },
  amountReceived: { color: COLORS.success },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
    paddingBottom: 100,
  },
  emptyIcon: { fontSize: 64, marginBottom: SPACING.lg, opacity: 0.5 },
  emptyTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  emptySub: {
    color: COLORS.textSecondary,
    fontSize: 15,
    marginTop: SPACING.sm,
    textAlign: "center",
  },
});

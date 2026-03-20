import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { COLORS } from "../theme";

const friends = [
  { id: "1", name: "Aryan Yadav", upi: "aryanya@upi" },
  { id: "2", name: "Ananya", upi: "ananya@upi" },
  { id: "3", name: "Sutta Wala", upi: "shop@upi" },
];

export default function FriendsScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PayMate</Text>
      <Text style={styles.subtitle}>Fast. Secure. Simple.</Text>

      <LinearGradient
        colors={["#1A1A1A", "#111"]}
        style={styles.wallet}
      >
        <Text style={styles.balanceLabel}>Wallet Balance</Text>
        <Text style={styles.balance}>₹ 27,802.05</Text>
      </LinearGradient>

      <Text style={styles.section}>Contacts</Text>

      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.card}
            onPress={() =>
              navigation.navigate("Pay", {
                name: item.name,
                upi: item.upi,
              })
            }
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.name.charAt(0)}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.upi}>{item.upi}</Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "800",
  },
  subtitle: {
    color: "#A1A1AA",
    marginBottom: 30,
  },
  wallet: {
    padding: 24,
    borderRadius: 30,
    marginBottom: 30,
  },
  balanceLabel: {
    color: "#A1A1AA",
  },
  balance: {
    fontSize: 34,
    fontWeight: "800",
    color: "#fff",
    marginTop: 6,
  },
  section: {
    color: "#A1A1AA",
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 24,
    backgroundColor: "#111",
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FF8A00",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  avatarText: {
    fontWeight: "800",
    color: "#000",
  },
  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  upi: {
    color: "#A1A1AA",
    fontSize: 13,
    marginTop: 2,
  },
  arrow: {
    color: "#6B7280",
    fontSize: 20,
  },
});
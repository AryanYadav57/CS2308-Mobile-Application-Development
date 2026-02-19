import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { COLORS } from "../theme";

const friends = [
  { id: "1", name: "Aryan Yadav", upi: "aryanya@upi" },
  { id: "2", name: "Ananya", upi: "ananya@upi" },
  { id: "3", name: "Sutta Wala", upi: "shop@upi" },
  { id: "4", name: "Jeevan", upi: "jeevan@upi" },
  { id: "5", name: "Riyan Shresta", upi: "riyanshre@upi" },
  { id: "6", name: "Girish Kailash", upi: "girish@upi" },
  { id: "7", name: "Swaroop R", upi: "swaroopr@upi" },
  { id: "8", name: "Sumukh Ravikumar", upi: "sumukhr@upi" },
  { id: "9", name: "Shrey Jind", upi: "shrey@upi" },
  { id: "10", name: "Avinash Krishna", upi: "avinashkrish@upi" },
  { id: "11", name: "Mahad Sheikh", upi: "mahadsh@upi" },
];

const recentActivity = [
  { id: "1", text: "You paid Ananya ₹450" },
  { id: "2", text: "Request from Jeevan ₹300 (Pending)" },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function FriendsScreen({ navigation }: any) {
  const [search, setSearch] = useState("");
  const [selectedFriend, setSelectedFriend] = useState<any>(null);
  const [showSheet, setShowSheet] = useState(false);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const filteredFriends = friends.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.upi.toLowerCase().includes(search.toLowerCase())
  );

  const closeSheet = () => {
    setShowSheet(false);
    setAmount("");
    setNote("");
    setSelectedFriend(null);
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={{ paddingTop: 52, paddingHorizontal: 22, paddingBottom: 20 }}>
          <Text
            style={{
              color: COLORS.textPrimary,
              fontSize: 26,
              fontWeight: "700",
            }}
          >
            PayMate
          </Text>
          <Text
            style={{
              color: COLORS.textSecondary,
              marginTop: 6,
              fontSize: 14,
            }}
          >
            Send money securely
          </Text>
        </View>

        {/* BALANCE */}
        <View
          style={{
            marginHorizontal: 20,
            backgroundColor: COLORS.surface,
            borderRadius: 22,
            padding: 20,
          }}
        >
          <Text style={{ color: COLORS.textSecondary, fontSize: 13 }}>
            Wallet Balance
          </Text>
          <Text
            style={{
              color: COLORS.textPrimary,
              fontSize: 28,
              fontWeight: "700",
              marginTop: 8,
            }}
          >
            ₹ 27,802.05
          </Text>
        </View>

        {/* QUICK ACTIONS */}
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            marginTop: 20,
          }}
        >
          {["Send", "Request", "Split", "Search"].map((action) => (
            <View
              key={action}
              style={{
                flex: 1,
                marginHorizontal: 6,
                backgroundColor: COLORS.surfaceSoft,
                borderRadius: 16,
                paddingVertical: 14,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.textPrimary,
                  fontWeight: "600",
                  fontSize: 13,
                }}
              >
                {action}
              </Text>
            </View>
          ))}
        </View>

        {/* RECENT ACTIVITY */}
        <View style={{ marginHorizontal: 20, marginTop: 26 }}>
          <Text
            style={{
              color: COLORS.textSecondary,
              fontSize: 13,
              marginBottom: 10,
            }}
          >
            Recent Activity
          </Text>

          {recentActivity.map((item) => (
            <View
              key={item.id}
              style={{
                backgroundColor: COLORS.surfaceSoft,
                borderRadius: 16,
                padding: 14,
                marginBottom: 10,
              }}
            >
              <Text style={{ color: COLORS.textPrimary, fontSize: 14 }}>
                {item.text}
              </Text>
            </View>
          ))}
        </View>

        {/* SEARCH */}
        <View style={{ marginHorizontal: 20, marginTop: 26 }}>
          <TextInput
            placeholder="Search contacts or UPI ID"
            placeholderTextColor={COLORS.textSecondary}
            value={search}
            onChangeText={setSearch}
            style={{
              backgroundColor: COLORS.surfaceSoft,
              borderRadius: 16,
              padding: 14,
              color: COLORS.textPrimary,
            }}
          />
        </View>

        {/* FRIENDS LIST */}
        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          {filteredFriends.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                setSelectedFriend(item);
                setShowSheet(true);
              }}
              activeOpacity={0.85}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: COLORS.surfaceSoft,
                borderRadius: 20,
                padding: 16,
                marginBottom: 14,
              }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: COLORS.primary,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 14,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
                  {getInitials(item.name)}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: COLORS.textPrimary,
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: COLORS.textSecondary,
                    fontSize: 13,
                    marginTop: 2,
                  }}
                >
                  {item.upi}
                </Text>
              </View>

              <Text style={{ color: COLORS.subtle, fontSize: 20 }}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* PAYMENT PREVIEW BOTTOM SHEET */}
      <Modal visible={showSheet} transparent animationType="slide">
        <Pressable
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.6)" }}
          onPress={closeSheet}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View
            style={{
              backgroundColor: COLORS.background,
              borderTopLeftRadius: 26,
              borderTopRightRadius: 26,
              padding: 20,
            }}
          >
            <Text
              style={{
                color: COLORS.textPrimary,
                fontSize: 18,
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              Pay {selectedFriend?.name}
            </Text>

            <Text
              style={{
                color: COLORS.textSecondary,
                fontSize: 13,
                textAlign: "center",
                marginTop: 4,
              }}
            >
              {selectedFriend?.upi}
            </Text>

            <TextInput
              placeholder="Enter amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              placeholderTextColor={COLORS.textSecondary}
              style={{
                backgroundColor: COLORS.surfaceSoft,
                borderRadius: 16,
                padding: 16,
                marginTop: 18,
                color: COLORS.textPrimary,
                fontSize: 20,
                textAlign: "center",
              }}
            />

            <TextInput
              placeholder="Add a note (optional)"
              value={note}
              onChangeText={setNote}
              placeholderTextColor={COLORS.textSecondary}
              style={{
                backgroundColor: COLORS.surfaceSoft,
                borderRadius: 14,
                padding: 14,
                marginTop: 12,
                color: COLORS.textPrimary,
              }}
            />

            <TouchableOpacity
              disabled={!amount}
              onPress={() => {
                closeSheet();
                navigation.navigate("Pay", {
                  name: selectedFriend.name,
                  upi: selectedFriend.upi,
                  presetAmount: amount,
                });
              }}
              style={{
                backgroundColor: amount
                  ? COLORS.primary
                  : COLORS.surfaceSoft,
                paddingVertical: 16,
                borderRadius: 18,
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  color: amount ? "#000" : COLORS.textSecondary,
                  fontSize: 16,
                  fontWeight: "700",
                }}
              >
                Proceed to Pay
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

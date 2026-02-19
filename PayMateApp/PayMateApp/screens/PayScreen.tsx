import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../theme";

const KEYS = [
  "AC", "⌫", "×",
  "7", "8", "9",
  "4", "5", "6",
  "1", "2", "3",
  "0", "+", "-",
];

export default function PayScreen({ route, navigation }: any) {
  const { name, upi } = route.params;
  const [expression, setExpression] = useState("");

  const getComputedAmount = () => {
    if (!expression) return "0";
    try {
      const safe = expression.replace(/×/g, "*");
      // eslint-disable-next-line no-eval
      const result = eval(safe);
      return isNaN(result) ? "0" : result.toString();
    } catch {
      return "0";
    }
  };

  const onPressKey = (key: string) => {
    if (key === "AC") return setExpression("");
    if (key === "⌫") return setExpression((p) => p.slice(0, -1));
    setExpression((p) => p + key);
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      {/* HEADER */}
      <View
        style={{
          paddingTop: 52,
          paddingBottom: 28,
          paddingHorizontal: 20,
          backgroundColor: COLORS.surface,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
      >
        <Text
          style={{
            color: COLORS.textPrimary,
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            color: COLORS.textSecondary,
            fontSize: 13,
            marginTop: 4,
          }}
        >
          {upi}
        </Text>
      </View>

      {/* AMOUNT */}
      <View style={{ alignItems: "center", marginVertical: 32 }}>
        <Text
          style={{
            fontSize: 42,
            fontWeight: "700",
            color: COLORS.textPrimary,
          }}
        >
          ₹ {expression || "0"}
        </Text>
        <Text
          style={{
            color: COLORS.textSecondary,
            marginTop: 6,
          }}
        >
          Enter amount
        </Text>
      </View>

      {/* KEYPAD */}
      <View style={{ paddingHorizontal: 18 }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {KEYS.map((key, index) => {
            const isOperator = ["+", "-", "×"].includes(key);
            const isClear = key === "AC";

            return (
              <TouchableOpacity
                key={index}
                onPress={() => onPressKey(key)}
                activeOpacity={0.8}
                style={{
                  width: "30%",
                  margin: "1.6%",
                  paddingVertical: 18,
                  borderRadius: 18,
                  backgroundColor: isClear
                    ? COLORS.primarySoft
                    : isOperator
                    ? "#1A1408"
                    : COLORS.surface,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    color: isClear || isOperator
                      ? COLORS.primary
                      : COLORS.textPrimary,
                  }}
                >
                  {key}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* PAY CTA */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Success")}
        activeOpacity={0.9}
        style={{
          margin: 20,
          paddingVertical: 18,
          borderRadius: 24,
          backgroundColor: COLORS.primary,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#000",
            fontSize: 18,
            fontWeight: "700",
          }}
        >
          Pay ₹{getComputedAmount()}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

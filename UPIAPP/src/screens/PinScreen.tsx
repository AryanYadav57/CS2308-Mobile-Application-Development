import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useWalletStore } from "../walletstore";
import { COLORS, SPACING, TYPOGRAPHY } from "../theme";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];
const PIN_LENGTH = 4;

export default function PinScreen() {
  const insets = useSafeAreaInsets();
  const hasPinSet = useWalletStore((state) => state.hasPinSet);
  const setPin = useWalletStore((state) => state.setPin);
  const authenticate = useWalletStore((state) => state.authenticate);

  const [pin, setPinState] = useState("");
  const [error, setError] = useState(false);
  const [setupPin, setSetupPin] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);

  const isSettingPin = !hasPinSet;

  const handleKeyPress = (key: string) => {
    if (key === "") return;

    ReactNativeHapticFeedback.trigger("selection", { enableVibrateFallback: true });
    setError(false);

    if (key === "⌫") {
      setPinState((p) => p.slice(0, -1));
      return;
    }

    if (pin.length < PIN_LENGTH) {
      const newPin = pin + key;
      setPinState(newPin);

      if (newPin.length === PIN_LENGTH) {
        setTimeout(() => processPin(newPin), 50);
      }
    }
  };

  const processPin = (enteredPin: string) => {
    if (isSettingPin) {
      if (!isConfirming) {
        setSetupPin(enteredPin);
        setPinState("");
        setIsConfirming(true);
      } else {
        if (enteredPin === setupPin) {
          setPin(enteredPin);
        } else {
          setError(true);
          setPinState("");
          setSetupPin("");
          setIsConfirming(false);
        }
      }
    } else {
      const success = authenticate(enteredPin);
      if (!success) {
        setError(true);
        ReactNativeHapticFeedback.trigger("notificationError", { enableVibrateFallback: true });
        setPinState("");
      } else {
        ReactNativeHapticFeedback.trigger("notificationSuccess", { enableVibrateFallback: true });
      }
    }
  };

  const getTitle = () => {
    if (isSettingPin) {
      return isConfirming ? "Confirm PIN" : "Set up a 4-digit PIN";
    }
    return "Enter your PIN";
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255,0,85,0.15)', 'transparent']}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />
      <View style={[styles.content, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Text style={styles.title}>{getTitle()}</Text>
          <Text style={styles.subtitle}>
            {isSettingPin
              ? "This PIN will be used to secure your app."
              : "Enter your 4-digit security PIN to continue."}
          </Text>
        </View>

        <View style={styles.pinDotsContainer}>
          {Array.from({ length: PIN_LENGTH }).map((_, index) => (
            <View
              key={`dot-${index}`}
              style={[
                styles.dot,
                pin.length > index && styles.dotFilled,
                error && styles.dotError,
              ]}
            >
              {pin.length > index && (
                <View style={[styles.innerDot, error && styles.innerDotError]} />
              )}
            </View>
          ))}
        </View>

        {error && (
          <Text style={styles.errorText}>
            {isSettingPin ? "PINs do not match. Try again." : "Incorrect PIN"}
          </Text>
        )}

        <View style={styles.keypad}>
          {KEYS.map((key, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.key,
                key === "" && styles.keyEmpty,
                pressed && key !== "" && styles.keyPressed,
              ]}
              onPress={() => handleKeyPress(key)}
              disabled={key === ""}
            >
              <Text style={styles.keyText}>{key}</Text>
            </Pressable>
          ))}
        </View>
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
    alignItems: "center",
  },
  header: {
    marginTop: SPACING.xl,
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.title,
    color: '#FFF',
    marginBottom: SPACING.xs,
    textShadowColor: 'rgba(255,255,255,0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    color: COLORS.textSecondary,
    ...TYPOGRAPHY.body,
    textAlign: "center",
  },
  pinDotsContainer: {
    flexDirection: "row",
    gap: SPACING.xl,
    marginTop: SPACING.xxl * 1.5,
    marginBottom: SPACING.xl,
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.surfaceElevated,
    backgroundColor: COLORS.surfaceSoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotFilled: {
    borderColor: COLORS.primary,
    backgroundColor: 'transparent',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  innerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  dotError: {
    borderColor: COLORS.error,
    shadowColor: COLORS.error,
  },
  innerDotError: {
    backgroundColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  keypad: {
    width: "85%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: SPACING.xl,
    marginTop: "auto",
    marginBottom: SPACING.xl,
  },
  key: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: 'rgba(30, 30, 40, 0.4)',
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  keyEmpty: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  keyText: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: "600",
  },
  keyPressed: {
    backgroundColor: COLORS.surfaceElevated,
    transform: [{ scale: 0.95 }],
    borderColor: 'rgba(255,255,255,0.1)',
  },
});

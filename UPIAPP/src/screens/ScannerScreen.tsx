import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Animated, PermissionsAndroid, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from "../theme";

export default function ScannerScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [scanLinePos] = useState(new Animated.Value(0));

  useEffect(() => {
    const requestCameraPermission = async () => {
      if (Platform.OS === "android") {
        try {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "PayMate Camera Permission",
              message: "PayMate needs access to your camera so you can scan payment QR codes.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK",
            }
          );
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestCameraPermission();
    // Mocks scanning animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLinePos, {
          toValue: 200,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(scanLinePos, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Mock an active scan after a delay for demonstration
    const timer = setTimeout(() => {
      navigation.replace("Pay", {
        name: "Cafe Coffee Day",
        upi: "ccd@upi",
      });
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={['rgba(0,240,255,0.15)', 'transparent']} 
        style={StyleSheet.absoluteFillObject} 
        pointerEvents="none" 
      />
      <View style={[styles.content, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </Pressable>
          <Text style={styles.title}>Scan & Pay</Text>
          <View style={{ width: 40 }} />
        </View>

        <Text style={styles.instruction}>
          Align QR Code within the frame to pay
        </Text>

        <View style={styles.scannerContainer}>
          <View style={styles.scannerFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
            
            <Animated.View
              style={[
                styles.scanLine,
                { transform: [{ translateY: scanLinePos }] },
              ]}
            >
              <LinearGradient 
                colors={['rgba(0,240,255,0.8)', 'transparent']} 
                style={StyleSheet.absoluteFillObject} 
              />
            </Animated.View>
          </View>
        </View>

        <View style={styles.mockOverlay}>
          <Text style={styles.mockText}>Mock Camera Active</Text>
          <Text style={styles.mockSubText}>Will auto-scan in 4 seconds...</Text>
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
  instruction: {
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: SPACING.xl * 2,
    fontSize: 16,
    paddingHorizontal: SPACING.xl,
  },
  scannerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scannerFrame: {
    width: 260,
    height: 260,
    position: "relative",
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  corner: {
    position: "absolute",
    width: 60,
    height: 60,
    borderColor: COLORS.primary,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 6,
    borderLeftWidth: 6,
    borderTopLeftRadius: RADIUS.md,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 6,
    borderRightWidth: 6,
    borderTopRightRadius: RADIUS.md,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 6,
    borderLeftWidth: 6,
    borderBottomLeftRadius: RADIUS.md,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderBottomRightRadius: RADIUS.md,
  },
  scanLine: {
    height: 40, // Expanded for gradient effect
    width: "100%",
    position: "absolute",
    top: 25, 
  },
  mockOverlay: {
    position: "absolute",
    bottom: SPACING.xxl * 2,
    left: 0,
    right: 0,
    alignItems: "center",
    backgroundColor: 'rgba(10,10,15,0.8)',
    paddingVertical: SPACING.md,
    marginHorizontal: SPACING.xl,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  mockText: {
    color: COLORS.primary,
    fontWeight: "800",
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  mockSubText: {
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
});

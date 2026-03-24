import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native';

const { height } = Dimensions.get('window');

const NAVY = '#111827';
const MID = '#1c2e5e';
const DEEP = '#0a1020';
const ACCENT = '#4f6ef7';

type Props = { onGetStarted: () => void };

export default function HomeScreen({ onGetStarted }: Props) {
  const logoAnim = useRef(new Animated.Value(0)).current;
  const headingAnim = useRef(new Animated.Value(0)).current;
  const subAnim = useRef(new Animated.Value(0)).current;
  const btnAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(140, [
      Animated.timing(logoAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(headingAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(subAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(btnAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const slideUp = (anim: Animated.Value, offset = 30) => ({
    opacity: anim,
    transform: [{
      translateY: anim.interpolate({
        inputRange: [0, 1],
        outputRange: [offset, 0],
      }),
    }],
  });

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />

      {/* Layered background */}
      <View style={[styles.bg, { backgroundColor: NAVY, top: 0, height: height * 0.55 }]} />
      <View style={[styles.bg, { backgroundColor: MID, top: height * 0.28, height: height * 0.42, opacity: 0.85 }]} />
      <View style={[styles.bg, { backgroundColor: DEEP, top: height * 0.62, height: height * 0.45 }]} />

      {/* Decorative circles */}
      <View style={[styles.circle, { width: 300, height: 300, top: -80, right: -90 }]} />
      <View style={[styles.circle, { width: 200, height: 200, top: 180, left: -70 }]} />
      <View style={[styles.circle, { width: 140, height: 140, top: 360, right: 30 }]} />
      <View style={[styles.accentGlow]} />

      <SafeAreaView style={styles.safe}>
        {/* Logo */}
        <Animated.View style={[styles.logoRow, slideUp(logoAnim, 20)]}>
          <View style={styles.logoMark}>
            <Text style={styles.logoMarkText}>⊛</Text>
          </View>
          <Text style={styles.logoText}> argon</Text>
        </Animated.View>

        {/* Content */}
        <View style={styles.content}>
          <Animated.Text style={[styles.heading, slideUp(headingAnim, 40)]}>
            {'Design\nSystem.'}
          </Animated.Text>

          <Animated.View style={[styles.subtitleRow, slideUp(subAnim, 30)]}>
            <View style={styles.accentBar} />
            <Text style={styles.subtitle}>Fully coded React Native components.</Text>
          </Animated.View>
        </View>

        {/* Button */}
        <Animated.View style={[styles.footer, slideUp(btnAnim, 20)]}>
          <TouchableOpacity style={styles.button} onPress={onGetStarted} activeOpacity={0.75}>
            <View style={styles.btnAccentLine} />
            <Text style={styles.buttonText}>Get Started</Text>
            <Text style={styles.buttonArrow}>→</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: NAVY },

  bg: { ...StyleSheet.absoluteFillObject },

  circle: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  accentGlow: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: ACCENT,
    bottom: 150,
    left: -50,
    opacity: 0.08,
  },

  safe: { flex: 1, paddingHorizontal: 28 },

  logoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 48 },
  logoMark: {
    width: 34, height: 34, borderRadius: 8,
    backgroundColor: ACCENT, alignItems: 'center', justifyContent: 'center',
  },
  logoMarkText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  logoText: { color: '#ffffff', fontSize: 20, fontWeight: '700', letterSpacing: 1.5 },

  content: { flex: 1, justifyContent: 'center', paddingBottom: 32 },

  heading: {
    color: '#ffffff', fontSize: 50, fontWeight: '800',
    lineHeight: 58, letterSpacing: -0.5, marginBottom: 22,
  },

  subtitleRow: { flexDirection: 'row', alignItems: 'center' },
  accentBar: { width: 3, height: 34, borderRadius: 4, backgroundColor: ACCENT, marginRight: 12 },
  subtitle: { color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 22, flex: 1 },

  footer: { paddingBottom: 40 },

  button: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderColor: 'rgba(255,255,255,0.18)', borderWidth: 1,
    borderRadius: 14, paddingVertical: 17, overflow: 'hidden',
  },
  btnAccentLine: {
    position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
    backgroundColor: ACCENT, borderTopLeftRadius: 14, borderBottomLeftRadius: 14,
  },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '600', letterSpacing: 0.4, marginRight: 10 },
  buttonArrow: { color: ACCENT, fontSize: 18, fontWeight: '700' },
});

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Animated,
} from 'react-native';

const BG = '#111827';
const CARD = '#1a2342';
const BORDER = 'rgba(255,255,255,0.10)';
const ACCENT = '#4f6ef7';
const MUTED = 'rgba(255,255,255,0.45)';

// ── Password strength (pure function, no hooks) ───────────────────────────
function getStrength(pw: string): { label: string; color: string; pct: number } {
  if (!pw) return { label: '', color: 'transparent', pct: 0 };
  if (pw.length < 6) return { label: 'weak', color: '#ef4444', pct: 30 };
  if (pw.length < 10) return { label: 'medium', color: '#f59e0b', pct: 65 };
  return { label: 'strong', color: '#22c55e', pct: 100 };
}

type Props = { onBack: () => void };

export default function CreateAccountScreen({ onBack }: Props) {
  // ── State ────────────────────────────────────────────────────────────────
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // ── Animated focus refs for each input ──────────────────────────────────
  const nameAnim = useRef(new Animated.Value(0)).current;
  const emailAnim = useRef(new Animated.Value(0)).current;
  const passAnim = useRef(new Animated.Value(0)).current;

  const focusAnim = (a: Animated.Value) => Animated.timing(a, { toValue: 1, duration: 200, useNativeDriver: false }).start();
  const blurAnim = (a: Animated.Value) => Animated.timing(a, { toValue: 0, duration: 200, useNativeDriver: false }).start();

  const borderColor = (a: Animated.Value) => a.interpolate({ inputRange: [0, 1], outputRange: [BORDER, ACCENT] });
  const bgColor = (a: Animated.Value) => a.interpolate({ inputRange: [0, 1], outputRange: ['rgba(255,255,255,0.05)', 'rgba(79,110,247,0.09)'] });

  const strength = getStrength(password);

  const handleCreateAccount = () => {
    if (!name || !email || !password) {
      Alert.alert('Missing Fields', 'Please fill in all the details.');
      return;
    }
    Alert.alert(
      'Account Created',
      `Welcome, ${name}!\nYour account for ${email} has been successfully created.`,
      [{ text: 'OK', onPress: onBack }]
    );
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      {/* bg decorations */}
      <View style={[styles.bgCircle, { width: 260, height: 260, top: -80, right: -80 }]} />
      <View style={[styles.bgCircle, { width: 150, height: 150, bottom: 80, left: -50 }]} />

      <SafeAreaView style={styles.safe}>
        {/* ── Header ──────────────────────────────────────────────── */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Account</Text>
          <View style={{ width: 40 }} />
        </View>

        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>

            {/* ── Social Signup ────────────────────────────────────── */}
            <Text style={styles.sectionLabel}>Sign up with</Text>
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn} activeOpacity={0.75}>
                <Text style={styles.socialIcon}>⊙</Text>
                <Text style={styles.socialLabel}>GITHUB</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn} activeOpacity={0.75}>
                <Text style={styles.socialIcon}>G</Text>
                <Text style={styles.socialLabel}>GOOGLE</Text>
              </TouchableOpacity>
            </View>

            {/* ── Separator ───────────────────────────────────────── */}
            <View style={styles.sepRow}>
              <View style={styles.sepLine} />
              <Text style={styles.sepText}>Or sign up with credentials.</Text>
              <View style={styles.sepLine} />
            </View>

            {/* ── Name Input ──────────────────────────────────────── */}
            <Animated.View style={[styles.inputWrap, { borderColor: borderColor(nameAnim), backgroundColor: bgColor(nameAnim) }]}>
              <Text style={styles.inputIcon}>👤</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor={MUTED}
                value={name}
                onChangeText={setName}
                onFocus={() => focusAnim(nameAnim)}
                onBlur={() => blurAnim(nameAnim)}
                autoCapitalize="words"
                selectionColor={ACCENT}
              />
            </Animated.View>

            {/* ── Email Input ─────────────────────────────────────── */}
            <Animated.View style={[styles.inputWrap, { borderColor: borderColor(emailAnim), backgroundColor: bgColor(emailAnim) }]}>
              <Text style={styles.inputIcon}>✉</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={MUTED}
                value={email}
                onChangeText={setEmail}
                onFocus={() => focusAnim(emailAnim)}
                onBlur={() => blurAnim(emailAnim)}
                keyboardType="email-address"
                autoCapitalize="none"
                selectionColor={ACCENT}
              />
            </Animated.View>

            {/* ── Password Input ──────────────────────────────────── */}
            <Animated.View style={[styles.inputWrap, { borderColor: borderColor(passAnim), backgroundColor: bgColor(passAnim) }]}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={MUTED}
                value={password}
                onChangeText={setPassword}
                onFocus={() => focusAnim(passAnim)}
                onBlur={() => blurAnim(passAnim)}
                secureTextEntry={!showPass}
                autoCapitalize="none"
                selectionColor={ACCENT}
              />
              <TouchableOpacity onPress={() => setShowPass(v => !v)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Text style={styles.eyeIcon}>{showPass ? '🙈' : '👁'}</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* ── Password Strength ───────────────────────────────── */}
            {password.length > 0 && (
              <View style={styles.strengthWrap}>
                <View style={styles.strengthTrack}>
                  <View style={[styles.strengthFill, { flex: strength.pct / 100, backgroundColor: strength.color }]} />
                </View>
                <Text style={[styles.strengthText, { color: strength.color }]}>
                  {'Password strength: '}
                  <Text style={styles.strengthLabel}>{strength.label}</Text>
                </Text>
              </View>
            )}

            {/* ── Checkbox ────────────────────────────────────────── */}
            <TouchableOpacity style={styles.checkRow} onPress={() => setAgreed(v => !v)} activeOpacity={0.8}>
              <View style={[styles.checkbox, agreed && styles.checkboxOn]}>
                {agreed && <Text style={styles.checkMark}>✓</Text>}
              </View>
              <Text style={styles.checkLabel}>
                {'I agree with the '}
                <Text style={styles.privacyLink}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>

            {/* ── Create Account Button ───────────────────────────── */}
            <TouchableOpacity
              style={[styles.createBtn, !agreed && styles.createBtnOff]}
              activeOpacity={0.8}
              disabled={!agreed}
              onPress={handleCreateAccount}>
              <Text style={styles.createBtnText}>CREATE ACCOUNT</Text>
            </TouchableOpacity>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },

  bgCircle: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },

  safe: { flex: 1 },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 20, paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: BORDER,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth, borderColor: BORDER,
  },
  backIcon: { color: '#fff', fontSize: 28, fontWeight: '300', lineHeight: 32 },
  headerTitle: { color: '#ffffff', fontSize: 17, fontWeight: '700', letterSpacing: 0.2 },

  scroll: { paddingHorizontal: 22, paddingTop: 28, paddingBottom: 48 },

  sectionLabel: {
    color: MUTED, fontSize: 11, fontWeight: '600',
    letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10,
  },

  socialRow: { flexDirection: 'row', gap: 12, marginBottom: 28 },
  socialBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: CARD, borderColor: BORDER, borderWidth: 1,
    borderRadius: 12, paddingVertical: 14,
  },
  socialIcon: { color: '#fff', fontSize: 16 },
  socialLabel: { color: '#fff', fontSize: 13, fontWeight: '700', letterSpacing: 1 },

  sepRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, gap: 8 },
  sepLine: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: BORDER },
  sepText: { color: MUTED, fontSize: 12, textAlign: 'center', flexShrink: 1 },

  inputWrap: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 12, borderWidth: 1,
    paddingHorizontal: 14, marginBottom: 14, height: 54,
  },
  inputIcon: { fontSize: 16, marginRight: 10 },
  input: { flex: 1, color: '#ffffff', fontSize: 15, paddingVertical: 0 },
  eyeIcon: { fontSize: 16 },

  strengthWrap: { marginTop: -4, marginBottom: 16, gap: 6 },
  strengthTrack: { height: 4, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.1)', overflow: 'hidden', flexDirection: 'row' },
  strengthFill: { height: 4, borderRadius: 4 },
  strengthText: { fontSize: 12 },
  strengthLabel: { fontStyle: 'italic', fontWeight: '700', fontSize: 12 },

  checkRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 28, gap: 12 },
  checkbox: {
    width: 22, height: 22, borderRadius: 5, borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center',
  },
  checkboxOn: { backgroundColor: ACCENT, borderColor: ACCENT },
  checkMark: { color: '#fff', fontSize: 13, fontWeight: '800', lineHeight: 15 },
  checkLabel: { color: 'rgba(255,255,255,0.75)', fontSize: 14, flex: 1 },
  privacyLink: { color: ACCENT, textDecorationLine: 'underline' },

  createBtn: {
    backgroundColor: ACCENT, borderRadius: 14,
    paddingVertical: 17, alignItems: 'center',
    elevation: 8,
  },
  createBtnOff: { opacity: 0.35, elevation: 0 },
  createBtnText: { color: '#ffffff', fontSize: 14, fontWeight: '800', letterSpacing: 2 },
});

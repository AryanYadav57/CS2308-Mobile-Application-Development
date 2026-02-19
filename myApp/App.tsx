import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  StatusBar,
  Platform,
} from 'react-native';

export default function App() {
  const [active, setActive] = useState<string | null>('About');

  const toggle = (key: string) => {
    setActive(prev => (prev === key ? null : key));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0F1E" />

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HERO */}
        <View style={styles.hero}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AY</Text>
          </View>

          <Text style={styles.name}>Aryan Yadav</Text>
          <Text style={styles.role}>
            Android • React Native • UI/UX
          </Text>
        </View>

        {/* ABOUT */}
        <Section
          title="About Me"
          icon="👋"
          open={active === 'About'}
          onPress={() => toggle('About')}
        >
          <Text style={styles.text}>
            I’m a BCA 2nd year student and aspiring mobile developer who enjoys
            building sleek, user-friendly applications. I focus on clean UI,
            intuitive UX, and writing maintainable code while constantly
            improving my skills through hands-on projects.
          </Text>
        </Section>

        {/* SKILLS */}
        <Section
          title="Skills"
          icon="🛠"
          open={active === 'Skills'}
          onPress={() => toggle('Skills')}
        >
          <View style={styles.skillGrid}>
            {[
              'React Native',
              'Java',
              'TypeScript',
              'Android',
              'UI / UX',
            ].map(skill => (
              <View key={skill} style={styles.skillPill}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </Section>

        {/* EXPERIENCE */}
        <Section
          title="Experience"
          icon="💼"
          open={active === 'Experience'}
          onPress={() => toggle('Experience')}
        >
          <Card
            title="Mobile App Developer"
            subtitle="College Projects • 2024 – Present"
            text="Built multiple React Native applications including a Calendar App and a Resume App, focusing on modern UI, responsive layouts, and scalable component-based architecture."
          />
        </Section>

        {/* EDUCATION */}
        <Section
          title="Education"
          icon="🎓"
          open={active === 'Education'}
          onPress={() => toggle('Education')}
        >
          <Card
            title="Bachelor of Computer Applications (BCA)"
            subtitle="2nd Year Student • 2023 – 2026"
            text="Studying core computer science fundamentals with a strong emphasis on programming, software development, and mobile technologies."
          />
        </Section>

        {/* CONTACT */}
        <Section
          title="Contact"
          icon="📩"
          open={active === 'Contact'}
          onPress={() => toggle('Contact')}
        >
          <TouchableOpacity
            style={styles.contactCard}
            onPress={() =>
              Linking.openURL('mailto:aryan.yadv57@gmail.com')
            }
            activeOpacity={0.85}
          >
            <Text style={styles.contactLabel}>Email</Text>
            <Text style={styles.contactValue}>
              aryan.yadv57@gmail.com
            </Text>
          </TouchableOpacity>
        </Section>

      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= COMPONENTS ================= */

function Section({ title, icon, open, onPress, children }: any) {
  return (
    <View style={styles.section}>
      <TouchableOpacity
        style={[
          styles.sectionHeader,
          open && styles.sectionHeaderActive,
        ]}
        onPress={onPress}
        activeOpacity={0.85}
      >
        <View style={styles.sectionLeft}>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <Text style={styles.expand}>{open ? '−' : '+'}</Text>
      </TouchableOpacity>

      {open && <View style={styles.sectionBody}>{children}</View>}
    </View>
  );
}

function Card({ title, subtitle, text }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F1E',
    paddingHorizontal: 16,
    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight
        : 0,
  },

  /* HERO */
  hero: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#5B8CFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  role: {
    color: '#9BA5D6',
    fontSize: 13,
    marginTop: 4,
  },

  /* SECTIONS */
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#141A36',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 18,
  },
  sectionHeaderActive: {
    backgroundColor: '#1A2250',
  },
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
    marginRight: 10,
  },
  sectionTitle: {
    color: '#ECF0FF',
    fontSize: 16,
    fontWeight: '600',
  },
  expand: {
    color: '#5B8CFF',
    fontSize: 22,
    fontWeight: '600',
  },
  sectionBody: {
    marginTop: 12,
    paddingHorizontal: 6,
  },

  /* TEXT */
  text: {
    color: '#C9D1FF',
    fontSize: 14,
    lineHeight: 22,
  },

  /* SKILLS */
  skillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillPill: {
    backgroundColor: '#1C244A',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 22,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    color: '#ECF0FF',
    fontSize: 13,
  },

  /* CARD */
  card: {
    backgroundColor: '#141A36',
    padding: 18,
    borderRadius: 18,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  cardSubtitle: {
    color: '#9BA5D6',
    fontSize: 12,
    marginBottom: 10,
  },

  /* CONTACT */
  contactCard: {
    backgroundColor: '#141A36',
    padding: 18,
    borderRadius: 18,
  },
  contactLabel: {
    color: '#9BA5D6',
    fontSize: 12,
    marginBottom: 4,
  },
  contactValue: {
    color: '#5B8CFF',
    fontSize: 15,
    fontWeight: '600',
  },
});

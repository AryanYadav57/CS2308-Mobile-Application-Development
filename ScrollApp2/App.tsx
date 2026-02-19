import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

const App = () => {
  const systemTheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemTheme === 'dark');

  const bg = isDark ? '#000' : '#fff';
  const card = isDark ? '#111' : '#fafafa';
  const text = isDark ? '#fff' : '#000';
  const sub = isDark ? '#aaa' : '#666';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bg }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={[styles.logo, { color: text }]}>ScrollApp</Text>
        <TouchableOpacity
          style={[
            styles.themeBtn,
            { backgroundColor: isDark ? '#fff' : '#000' },
          ]}
          onPress={() => setIsDark(!isDark)}
        >
          <Text style={{ color: isDark ? '#000' : '#fff' }}>
            {isDark ? 'Light' : 'Dark'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* VERTICAL SCROLL (FEED) */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* STORIES (HORIZONTAL SCROLL) */}
        <View style={[styles.storySection, { backgroundColor: card }]}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storyRow}
          >
            {/* Your Story */}
            <View style={styles.storyItem}>
              <View style={styles.storyBorder}>
                <View style={styles.storyInner} />
              </View>
              <Text style={[styles.storyText, { color: text }]}>
                Aryan Yadav
              </Text>
            </View>

            {/* Other Stories */}
            {['#ff6b6b', '#51cf66', '#339af0', '#f06595'].map(
              (color, index) => (
                <View key={index} style={styles.storyItem}>
                  <View
                    style={[styles.storyCircle, { backgroundColor: color }]}
                  />
                  <Text style={[styles.storyText, { color: text }]}>
                    Story
                  </Text>
                </View>
              )
            )}
          </ScrollView>
        </View>

        {/* POSTS */}
        {[1, 2, 3].map((item) => (
          <View
            key={item}
            style={[styles.postCard, { backgroundColor: card }]}
          >
            <Text style={[styles.postUser, { color: text }]}>
              Aryan Yadav
            </Text>

            <View style={styles.fakeImage} />

            <Text style={{ color: sub, marginTop: 8 }}>
              This is a sample Instagram-style post with vertical scrolling feed.
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  /* Header */
  header: {
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 22,
    fontWeight: '700',
  },
  themeBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  /* Stories */
  storySection: {
    paddingVertical: 10,
  },
  storyRow: {
    paddingHorizontal: 12,
    gap: 16,
  },
  storyItem: {
    alignItems: 'center',
    width: 80,
  },
  storyCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  storyBorder: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: '#ff3d81',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#999',
  },
  storyText: {
    fontSize: 12,
    marginTop: 6,
  },

  /* Post */
  postCard: {
    margin: 12,
    borderRadius: 12,
    padding: 12,
    elevation: 3,
  },
  postUser: {
    fontWeight: '600',
    marginBottom: 8,
  },
  fakeImage: {
    height: 200,
    borderRadius: 10,
    backgroundColor: '#444',
  },
});



import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import students from "./students.json";

type Student = {
  id: number;
  name: string;
  grade: string;
  section: string;
};

/* 🎨 Grade color helper */
const getGradeStyle = (grade: string) => {
  switch (grade) {
    case "A+":
      return { backgroundColor: "#7E57C2", color: "#FFFFFF" };
    case "A":
      return { backgroundColor: "#43A047", color: "#FFFFFF" };
    case "B+":
      return { backgroundColor: "#1E88E5", color: "#FFFFFF" };
    case "B":
      return { backgroundColor: "#FBC02D", color: "#000000" };
    case "C":
      return { backgroundColor: "#E53935", color: "#FFFFFF" };
    default:
      return { backgroundColor: "#757575", color: "#FFFFFF" };
  }
};

export default function App() {
  const isDark = useColorScheme() === "dark";

  const renderStudent = ({ item }: { item: Student }) => {
    const gradeStyle = getGradeStyle(item.grade);

    return (
      <View
        style={[
          styles.card,
          { backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF" },
        ]}
      >
        <Text
          style={[
            styles.name,
            { color: isDark ? "#FFFFFF" : "#000000" },
          ]}
        >
          {item.name}
        </Text>

        <View style={styles.row}>
          <View
            style={[
              styles.badge,
              { backgroundColor: gradeStyle.backgroundColor },
            ]}
          >
            <Text style={[styles.badgeText, { color: gradeStyle.color }]}>
              Grade: {item.grade}
            </Text>
          </View>

          <View
            style={[
              styles.badge,
              { backgroundColor: isDark ? "#333333" : "#E0E0E0" },
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                { color: isDark ? "#FFFFFF" : "#000000" },
              ]}
            >
              Section: {item.section}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#121212" : "#F2F2F2" },
      ]}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <Text
        style={[
          styles.header,
          { color: isDark ? "#FFFFFF" : "#000000" },
        ]}
      >
        🎓 Student Directory
      </Text>

      <FlatList<Student>
        data={students as Student[]}
        renderItem={renderStudent}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  card: {
    padding: 20,
    borderRadius: 18,
    marginBottom: 16,
    elevation: 6,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  badge: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    minWidth: 110,
    alignItems: "center",
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

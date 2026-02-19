import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import dayjs from 'dayjs';

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function App() {
  const today = dayjs();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);

  const startOfMonth = currentMonth.startOf('month');
  const daysInMonth = currentMonth.daysInMonth();
  const startDay = startOfMonth.day();

  const days: (dayjs.Dayjs | null)[] = [];

  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(currentMonth.date(i));
  }

  const isToday = (date: dayjs.Dayjs | null) =>
    date && date.isSame(today, 'day');

  const isSelected = (date: dayjs.Dayjs | null) =>
    date && date.isSame(selectedDate, 'day');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}>
          <Text style={styles.navText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.header}>
          {currentMonth.format('MMMM YYYY')}
        </Text>

        <TouchableOpacity onPress={() => setCurrentMonth(currentMonth.add(1, 'month'))}>
          <Text style={styles.navText}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weekRow}>
        {WEEK_DAYS.map(day => (
          <Text key={day} style={styles.weekText}>{day}</Text>
        ))}
      </View>

      <View style={styles.calendar}>
        {days.map((date, index) => (
          <TouchableOpacity
            key={index}
            disabled={!date}
            style={[
              styles.dayBox,
              isSelected(date) && styles.selectedDay,
              isToday(date) && styles.todayDay,
            ]}
            onPress={() => date && setSelectedDate(date)}
          >
            <Text
              style={[
                styles.dayText,
                isSelected(date) && styles.selectedText,
              ]}
            >
              {date ? date.date() : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.footer}>
        Selected Date: {selectedDate.format('DD MMM YYYY')}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0b0b',
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  navText: {
    color: '#1e90ff',
    fontSize: 28,
    paddingHorizontal: 10,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekText: {
    color: '#888',
    width: '14.28%',
    textAlign: 'center',
    fontSize: 13,
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  dayBox: {
    width: '14.28%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
    borderRadius: 8,
  },
  dayText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedDay: {
    backgroundColor: '#1e90ff',
  },
  selectedText: {
    fontWeight: 'bold',
  },
  todayDay: {
    borderWidth: 1,
    borderColor: '#1e90ff',
  },
  footer: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 15,
  },
});

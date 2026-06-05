import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface Props {
  title: string;
  onBack: () => void;
}

export default function ChatHeader({ title, onBack }: Props) {
  const { theme } = useTheme();
  return (
    <View style={[styles.header, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Text style={[styles.backText, { color: theme.accent }]}>←</Text>
      </TouchableOpacity>
      <View style={styles.center}>
        <View style={[styles.dot, { backgroundColor: theme.success }]} />
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={{ width: 40 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', alignItems: 'center',
    padding: 14, borderBottomWidth: 0.5,
  },
  backBtn: { width: 40, alignItems: 'flex-start' },
  backText: { fontSize: 22 },
  center: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  title: { fontSize: 16, fontWeight: '600', maxWidth: '80%' },
});

import React from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  TouchableOpacity, Switch, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { useChat } from '../context/ChatContext';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { theme, mode, toggleTheme } = useTheme();
  const { state, clearAll } = useChat();

  const handleClearChats = () => {
    Alert.alert(
      'Clear all chats?',
      'This will permanently delete all your conversations.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: clearAll },
      ]
    );
  };

  const Row = ({
    label, right, onPress,
  }: {
    label: string; right: React.ReactNode; onPress?: () => void;
  }) => (
    <TouchableOpacity
      style={[styles.row, { backgroundColor: theme.surface, borderColor: theme.border }]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <Text style={[styles.rowLabel, { color: theme.text }]}>{label}</Text>
      {right}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.back, { color: theme.accent }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Settings</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>
          APPEARANCE
        </Text>
        <Row
          label="Dark Mode"
          right={
            <Switch
              value={mode === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ true: theme.accent }}
              thumbColor="#fff"
            />
          }
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>
          DATA
        </Text>
        <Row
          label={`Conversations (${state.conversations.length})`}
          right={<Text style={{ color: theme.textSecondary }}>›</Text>}
        />
        <Row
          label="Clear All Chats"
          onPress={handleClearChats}
          right={<Text style={{ color: theme.error }}>Delete</Text>}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>
          ABOUT
        </Text>
        <Row
          label="Version"
          right={<Text style={{ color: theme.textSecondary }}>1.0.0</Text>}
        />
        <Row
          label="Model"
          right={
            <Text style={{ color: theme.textSecondary }}>claude-3-haiku</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  back: { fontSize: 16 },
  title: { fontSize: 18, fontWeight: '700' },
  section: { marginTop: 24, paddingHorizontal: 16 },
  sectionLabel: {
    fontSize: 11, fontWeight: '600',
    letterSpacing: 0.8, marginBottom: 8,
  },
  row: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14, borderRadius: 12, marginBottom: 8,
    borderWidth: 0.5,
  },
  rowLabel: { fontSize: 15 },
});

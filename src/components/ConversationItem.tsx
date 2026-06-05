import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Conversation } from '../models/types';
import { useTheme } from '../context/ThemeContext';
import { formatDate } from '../utils/helpers';

interface Props {
  conversation: Conversation;
  onPress: () => void;
}

export default function ConversationItem({ conversation, onPress }: Props) {
  const { theme } = useTheme();
  const lastMsg = conversation.messages[conversation.messages.length - 1];

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.surface, borderColor: theme.border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.icon, { backgroundColor: theme.accent + '20' }]}>
        <Text style={{ fontSize: 18 }}>💬</Text>
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
          {conversation.title}
        </Text>
        {lastMsg && (
          <Text style={[styles.preview, { color: theme.textSecondary }]} numberOfLines={1}>
            {lastMsg.role === 'user' ? 'You: ' : 'Nexus: '}
            {lastMsg.content}
          </Text>
        )}
      </View>
      <Text style={[styles.date, { color: theme.textSecondary }]}>
        {formatDate(conversation.updatedAt)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', alignItems: 'center',
    padding: 14, borderRadius: 14, borderWidth: 0.5, gap: 12,
  },
  icon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  content: { flex: 1 },
  title: { fontSize: 15, fontWeight: '600', marginBottom: 3 },
  preview: { fontSize: 13 },
  date: { fontSize: 11 },
});

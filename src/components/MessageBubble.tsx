import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Message } from '../models/types';
import { useTheme } from '../context/ThemeContext';
import { formatTime } from '../utils/helpers';

interface Props {
  message: Message;
}

export default function MessageBubble({ message }: Props) {
  const { theme } = useTheme();
  const isUser = message.role === 'user';

  return (
    <View style={[styles.wrapper, isUser ? styles.userWrapper : styles.aiWrapper]}>
      {!isUser && (
        <View style={[styles.avatar, { backgroundColor: theme.accent + '30' }]}>
          <Text style={styles.avatarText}>N</Text>
        </View>
      )}
      <View style={{ maxWidth: '80%' }}>
        <View
          style={[
            styles.bubble,
            {
              backgroundColor: isUser ? theme.userBubble : theme.aiBubble,
              borderColor: isUser ? 'transparent' : theme.border,
              borderWidth: isUser ? 0 : 0.5,
            },
          ]}
        >
          <Text
            style={[
              styles.content,
              { color: isUser ? '#fff' : theme.text },
            ]}
          >
            {message.content}
          </Text>
        </View>
        <Text style={[styles.time, { color: theme.textSecondary }]}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flexDirection: 'row', marginBottom: 4 },
  userWrapper: { justifyContent: 'flex-end' },
  aiWrapper: { justifyContent: 'flex-start', gap: 8 },
  avatar: {
    width: 32, height: 32, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  avatarText: { color: '#7c6aff', fontWeight: '700', fontSize: 14 },
  bubble: {
    borderRadius: 16, padding: 12,
    borderBottomRightRadius: 4,
  },
  content: { fontSize: 15, lineHeight: 22 },
  time: { fontSize: 11, marginTop: 4, marginHorizontal: 4 },
});

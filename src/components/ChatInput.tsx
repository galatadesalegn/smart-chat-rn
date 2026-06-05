import React, { useState } from 'react';
import {
  View, TextInput, TouchableOpacity, StyleSheet, Text,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState('');
  const { theme } = useTheme();

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText('');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
      <TextInput
        style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]}
        value={text}
        onChangeText={setText}
        placeholder="Message Nexus..."
        placeholderTextColor={theme.textSecondary}
        multiline
        maxLength={4000}
        editable={!disabled}
        onSubmitEditing={handleSend}
      />
      <TouchableOpacity
        style={[styles.sendBtn, { backgroundColor: disabled || !text.trim() ? theme.border : theme.accent }]}
        onPress={handleSend}
        disabled={disabled || !text.trim()}
      >
        <Text style={styles.sendIcon}>↑</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', alignItems: 'flex-end',
    padding: 12, gap: 8, borderTopWidth: 0.5,
  },
  input: {
    flex: 1, borderRadius: 16, paddingHorizontal: 14,
    paddingVertical: 10, fontSize: 15, maxHeight: 120,
    borderWidth: 0.5,
  },
  sendBtn: {
    width: 40, height: 40, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  sendIcon: { color: '#fff', fontSize: 18, fontWeight: '700' },
});

import React, { useRef, useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet,
  SafeAreaView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useChat } from '../context/ChatContext';
import { useTheme } from '../context/ThemeContext';
import { RootStackParamList } from '../navigation/AppNavigator';
import MessageBubble from '../components/MessageBubble';
import ChatInput from '../components/ChatInput';
import ChatHeader from '../components/ChatHeader';
import TypingIndicator from '../components/TypingIndicator';

type ChatRouteProp = RouteProp<RootStackParamList, 'Chat'>;

export default function ChatScreen() {
  const navigation = useNavigation();
  const route = useRoute<ChatRouteProp>();
  const { state, activeConversation, selectConversation, sendMessage } = useChat();
  const { theme } = useTheme();
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (route.params?.conversationId) {
      selectConversation(route.params.conversationId);
    }
  }, [route.params?.conversationId]);

  useEffect(() => {
    if (activeConversation?.messages?.length) {
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [activeConversation?.messages]);

  const handleSend = async (text: string) => {
    await sendMessage(text);
  };

  const messages = activeConversation?.messages ?? [];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ChatHeader
        title={activeConversation?.title ?? 'New Chat'}
        onBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <MessageBubble message={item} />}
          contentContainerStyle={styles.messageList}
          ListEmptyComponent={
            <View style={styles.emptyChat}>
              <Text style={{ fontSize: 40 }}>🤖</Text>
              <Text style={[styles.emptyChatText, { color: theme.textSecondary }]}>
                Say hello to Nexus!
              </Text>
            </View>
          }
          ListFooterComponent={state.isLoading ? <TypingIndicator /> : null}
        />
        {state.error ? (
          <View style={[styles.errorBanner, { backgroundColor: theme.error + '20' }]}>
            <Text style={[styles.errorText, { color: theme.error }]}>
              {state.error}
            </Text>
          </View>
        ) : null}
        <ChatInput onSend={handleSend} disabled={state.isLoading} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  messageList: { padding: 16, gap: 12, paddingBottom: 8 },
  emptyChat: {
    alignItems: 'center', justifyContent: 'center',
    paddingTop: 80, gap: 12,
  },
  emptyChatText: { fontSize: 15 },
  errorBanner: {
    marginHorizontal: 16, marginBottom: 8,
    padding: 10, borderRadius: 10,
  },
  errorText: { fontSize: 13, textAlign: 'center' },
});

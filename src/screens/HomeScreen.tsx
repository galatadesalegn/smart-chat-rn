import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  FlatList, SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useChat } from '../context/ChatContext';
import { useTheme } from '../context/ThemeContext';
import { RootStackParamList } from '../navigation/AppNavigator';
import { formatDate } from '../utils/helpers';
import ConversationItem from '../components/ConversationItem';

type Nav = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { state, createConversation } = useChat();
  const { theme } = useTheme();

  const handleNewChat = () => {
    createConversation();
    navigation.navigate('Chat', {});
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.logo, { color: theme.accentLight }]}>Nexus</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            AI Chat Assistant
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={[styles.settingsBtn, { backgroundColor: theme.surfaceAlt }]}
        >
          <Text style={{ color: theme.textSecondary, fontSize: 18 }}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Conversation list or empty state */}
      {state.conversations.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🤖</Text>
          <Text style={[styles.emptyTitle, { color: theme.text }]}>
            Start a conversation
          </Text>
          <Text style={[styles.emptyDesc, { color: theme.textSecondary }]}>
            Tap the button below to chat with Nexus AI
          </Text>
        </View>
      ) : (
        <FlatList
          data={state.conversations}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ConversationItem
              conversation={item}
              onPress={() => {
                navigation.navigate('Chat', { conversationId: item.id });
              }}
            />
          )}
          contentContainerStyle={{ padding: 16, gap: 8 }}
        />
      )}

      {/* New chat button */}
      <TouchableOpacity style={styles.fabWrapper} onPress={handleNewChat}>
        <LinearGradient
          colors={['#7c6aff', '#a89aff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.fab}
        >
          <Text style={styles.fabText}>＋  New Chat</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8,
  },
  logo: { fontSize: 26, fontWeight: '700', letterSpacing: -0.5 },
  subtitle: { fontSize: 13, marginTop: 2 },
  settingsBtn: {
    width: 40, height: 40, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  emptyState: {
    flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32,
  },
  emptyIcon: { fontSize: 56, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
  emptyDesc: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
  fabWrapper: { margin: 20 },
  fab: {
    borderRadius: 16, paddingVertical: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  fabText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

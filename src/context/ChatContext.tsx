import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useCallback,
} from 'react';
import { Message, Conversation } from '../models/types';
import { generateId } from '../utils/helpers';

// ── State ─────────────────────────────────────────────────────────────────────

interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  conversations: [],
  activeConversationId: null,
  isLoading: false,
  error: null,
};

// ── Actions ───────────────────────────────────────────────────────────────────

type Action =
  | { type: 'NEW_CONVERSATION'; payload: Conversation }
  | { type: 'SELECT_CONVERSATION'; payload: string }
  | { type: 'ADD_MESSAGE'; payload: { conversationId: string; message: Message } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'DELETE_CONVERSATION'; payload: string }
  | { type: 'CLEAR_ALL' };

function chatReducer(state: ChatState, action: Action): ChatState {
  switch (action.type) {
    case 'NEW_CONVERSATION':
      return {
        ...state,
        conversations: [action.payload, ...state.conversations],
        activeConversationId: action.payload.id,
      };
    case 'SELECT_CONVERSATION':
      return { ...state, activeConversationId: action.payload };
    case 'ADD_MESSAGE':
      return {
        ...state,
        conversations: state.conversations.map(conv =>
          conv.id === action.payload.conversationId
            ? {
                ...conv,
                messages: [...conv.messages, action.payload.message],
                updatedAt: new Date().toISOString(),
                title:
                  conv.messages.length === 0
                    ? action.payload.message.content.slice(0, 40)
                    : conv.title,
              }
            : conv
        ),
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'DELETE_CONVERSATION':
      return {
        ...state,
        conversations: state.conversations.filter(c => c.id !== action.payload),
        activeConversationId:
          state.activeConversationId === action.payload
            ? null
            : state.activeConversationId,
      };
    case 'CLEAR_ALL':
      return initialState;
    default:
      return state;
  }
}

// ── Context ───────────────────────────────────────────────────────────────────

interface ChatContextType {
  state: ChatState;
  activeConversation: Conversation | null;
  createConversation: () => Conversation;
  selectConversation: (id: string) => void;
  sendMessage: (content: string) => Promise<void>;
  deleteConversation: (id: string) => void;
  clearAll: () => void;
}

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const activeConversation =
    state.conversations.find(c => c.id === state.activeConversationId) ?? null;

  const createConversation = useCallback((): Conversation => {
    const conv: Conversation = {
      id: generateId(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'NEW_CONVERSATION', payload: conv });
    return conv;
  }, []);

  const selectConversation = useCallback((id: string) => {
    dispatch({ type: 'SELECT_CONVERSATION', payload: id });
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!state.activeConversationId) return;

      const userMessage: Message = {
        id: generateId(),
        role: 'user',
        content,
        timestamp: new Date().toISOString(),
      };

      dispatch({
        type: 'ADD_MESSAGE',
        payload: { conversationId: state.activeConversationId, message: userMessage },
      });

      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      try {
        const { sendToAI } = await import('../services/aiService');
        const history = activeConversation?.messages ?? [];
        const reply = await sendToAI([...history, userMessage]);

        const aiMessage: Message = {
          id: generateId(),
          role: 'assistant',
          content: reply,
          timestamp: new Date().toISOString(),
        };

        dispatch({
          type: 'ADD_MESSAGE',
          payload: {
            conversationId: state.activeConversationId,
            message: aiMessage,
          },
        });
      } catch (err: any) {
        dispatch({ type: 'SET_ERROR', payload: err.message ?? 'Something went wrong.' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    [state.activeConversationId, activeConversation]
  );

  const deleteConversation = useCallback((id: string) => {
    dispatch({ type: 'DELETE_CONVERSATION', payload: id });
  }, []);

  const clearAll = useCallback(() => dispatch({ type: 'CLEAR_ALL' }), []);

  return (
    <ChatContext.Provider
      value={{
        state,
        activeConversation,
        createConversation,
        selectConversation,
        sendMessage,
        deleteConversation,
        clearAll,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);

<div align="center">

# 🤖 Nexus AI Chat — React Native

### AI-Powered Chat App built with Expo & React Native

[![React Native](https://img.shields.io/badge/React_Native-0.74-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactnative.dev)
[![Expo](https://img.shields.io/badge/Expo-51-000020?style=flat-square&logo=expo&logoColor=white)](https://expo.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![CI](https://github.com/galatadesalegn/nexus-ai-chat-rn/actions/workflows/ci.yml/badge.svg)](https://github.com/galatadesalegn/nexus-ai-chat-rn/actions)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

> A sleek, dark-mode AI chat app powered by Claude API. Supports multi-conversation history, animated typing indicator, and theme switching.

</div>

---

## ✨ Features

- 🤖 **Claude AI** — powered by claude-3-haiku via Anthropic API
- 💬 **Multi-conversation** — create, switch, and delete conversations
- 🌑 **Dark / Light mode** — toggle with one tap
- ⌨️ **Typing indicator** — animated 3-dot indicator while AI responds
- 📱 **Cross-platform** — runs on iOS and Android
- 🧭 **Stack navigation** — Home → Chat → Settings
- 🧪 **Unit tested** — helpers fully covered

---

## 🚀 Getting Started

```bash
git clone https://github.com/galatadesalegn/nexus-ai-chat-rn.git
cd nexus-ai-chat-rn
npm install
cp .env.example .env
# Add your Anthropic API key to .env
npx expo start
```

---

## 📁 Project Structure

```
nexus-ai-chat-rn/
├── App.tsx                    # Root component
├── src/
│   ├── components/            # MessageBubble, ChatInput, ChatHeader, TypingIndicator
│   ├── screens/               # HomeScreen, ChatScreen, SettingsScreen
│   ├── context/               # ChatContext, ThemeContext
│   ├── navigation/            # AppNavigator (Stack)
│   ├── services/              # aiService.ts (Anthropic API)
│   ├── models/                # TypeScript types
│   └── utils/                 # helpers (generateId, formatTime, formatDate)
└── __tests__/                 # Jest unit tests
```

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React Native 0.74, Expo 51 |
| Language | TypeScript |
| State | React Context + useReducer |
| Navigation | React Navigation v6 |
| AI | Anthropic Claude API |
| Testing | Jest + jest-expo |
| CI | GitHub Actions |

---

## 📄 License
MIT — Built by **Galata Desalegn**

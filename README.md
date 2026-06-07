<div align="center">

![header](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6&height=120&section=header&text=NEXUS%20AI%20CHAT&fontSize=42&fontColor=ffffff&animation=fadeIn&fontAlignY=65)

### ✦ &nbsp; Claude-Powered Mobile Chat — React Native &nbsp; ✦

<br/>

[![React Native](https://img.shields.io/badge/React_Native_0.74-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo_51-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Claude](https://img.shields.io/badge/Claude_Haiku-D97706?style=for-the-badge&logo=anthropic&logoColor=white)](https://www.anthropic.com/)

<br/>

[![iOS](https://img.shields.io/badge/iOS-Supported-000000?style=flat-square&logo=apple&logoColor=white)](https://apps.apple.com)
[![Android](https://img.shields.io/badge/Android-Supported-3DDC84?style=flat-square&logo=android&logoColor=white)](https://play.google.com)
[![Repo](https://img.shields.io/badge/GitHub-smart--chat--rn-181717?style=flat-square&logo=github)](https://github.com/galatadesalegn/smart-chat-rn)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](./LICENSE)

</div>

---

<div align="center">

```
  ┌──────────┬──────────┬──────────┬──────────┐
  │   HOME   │   CHAT   │ HISTORY  │ SETTINGS │
  └──────────┴──────────┴──────────┴──────────┘
```

</div>

---

## ✦ Overview

**Nexus AI Chat** is a cross-platform mobile application that puts the power of Anthropic's Claude directly in your pocket. Built with React Native and Expo for seamless iOS and Android support, it features a fully custom dark-themed chat UI, persistent conversation history stored locally on-device, and a clean TypeScript architecture designed for scalability.

---

## ✦ Features

```
  ╔══════════════════════════════════════════════════════╗
  ║                                                      ║
  ║   🤖  Claude Haiku AI integration (Anthropic API)  ║
  ║   💬  Multi-conversation management                 ║
  ║   💾  Persistent chat history (AsyncStorage)        ║
  ║   ⌨️   Animated typing indicator                    ║
  ║   🌗  Dark / Light theme support                   ║
  ║   📱  Cross-platform — iOS & Android               ║
  ║   🔷  Full TypeScript codebase                     ║
  ║   🧩  Modular component architecture               ║
  ║                                                      ║
  ╚══════════════════════════════════════════════════════╝
```

---

## 🛠️ Tech Stack

| | Technology | Purpose |
|---|---|---|
| ⚛️ | React Native 0.74 | Cross-platform mobile framework |
| 📱 | Expo 51 | Dev tooling & build pipeline |
| 🔷 | TypeScript | Type-safe codebase |
| 🤖 | Anthropic Claude Haiku | AI chat responses |
| 🗺️ | React Navigation | Stack-based screen routing |
| 🧠 | React Context API | Global chat & theme state |
| 💾 | AsyncStorage | On-device chat persistence |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- Expo CLI: `npm install -g expo-cli`
- Anthropic API key from [console.anthropic.com](https://console.anthropic.com)
- iOS Simulator (Mac) or Android Emulator / physical device

### Setup

**1. Clone the repository**
```bash
git clone https://github.com/galatadesalegn/smart-chat-rn.git
cd smart-chat-rn
```

**2. Install dependencies**
```bash
npm install
```

**3. Add your Anthropic API key**

Open `src/services/aiService.ts` and set your key:
```ts
const API_KEY = 'your_anthropic_api_key_here';
```

**4. Start the app**
```bash
npx expo start
```

Then press:
- `i` — open in iOS Simulator
- `a` — open in Android Emulator
- `w` — open in browser
- Scan the QR code with **Expo Go** on your physical device

---

## 📁 Project Structure

```
smart-chat-rn/
│
├── src/
│   ├── components/          # Reusable UI (Bubbles, Headers, Input, Typing)
│   ├── context/
│   │   ├── ChatContext.tsx   # Message history & active conversation state
│   │   └── ThemeContext.tsx  # Dark / light theme state
│   ├── hooks/
│   │   ├── useChat.ts        # Chat interaction logic
│   │   └── useTheme.ts       # Theme toggle hook
│   ├── models/
│   │   └── types.ts          # TypeScript type definitions
│   ├── navigation/
│   │   └── AppNavigator.tsx  # Stack navigation config
│   ├── screens/
│   │   ├── HomeScreen.tsx    # Conversation list
│   │   ├── ChatScreen.tsx    # Main chat interface
│   │   └── SettingsScreen.tsx
│   ├── services/
│   │   └── aiService.ts      # Anthropic API integration
│   └── utils/                # Helper functions & constants
│
├── __tests__/                # Unit & component tests
├── App.tsx                   # Entry point — providers & navigation
├── app.json                  # Expo config
├── tsconfig.json             # TypeScript config
└── package.json
```

---

## 🔑 Getting an Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Navigate to **API Keys** → **Create Key**
4. Copy and paste it into `src/services/aiService.ts`

> ⚠️ Never commit your API key to version control. Use environment variables for production builds.

---

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

<div align="center">

![footer](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6&height=100&section=footer&animation=twinkling)

Built with ❤️ by [Galata Desalegn](https://www.galatadesalegn.me/)

</div>

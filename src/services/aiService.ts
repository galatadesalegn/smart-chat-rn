/**
 * aiService.ts — Handles communication with the Anthropic API.
 * Swap the API_URL and model to use OpenAI, Gemini, or any other provider.
 */

import { Message } from '../models/types';

const API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-3-haiku-20240307';
const MAX_TOKENS = 1024;

const SYSTEM_PROMPT = `You are Nexus, a helpful, intelligent, and friendly AI assistant 
built into a mobile chat app. You give clear, concise, and accurate responses. 
You adapt your tone based on the user's message — professional when needed, 
casual and friendly for everyday conversation.`;

/**
 * Send conversation history to the AI and return the assistant's reply.
 * Automatically trims history to last 20 messages to stay within token limits.
 */
export async function sendToAI(messages: Message[]): Promise<string> {
  const apiKey = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error(
      'API key not configured. Add EXPO_PUBLIC_ANTHROPIC_API_KEY to your .env file.'
    );
  }

  // Keep last 20 messages to manage context window
  const trimmed = messages.slice(-20).map(m => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: m.content,
  }));

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: SYSTEM_PROMPT,
      messages: trimmed,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message ?? `API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data?.content?.[0]?.text;

  if (!text) throw new Error('Empty response from AI.');
  return text;
}

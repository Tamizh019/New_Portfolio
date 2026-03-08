import { GoogleGenAI, Chat } from "@google/genai";
import { PORTFOLIO_DATA } from '../constants';

const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || '';

// ── System instruction ──────────────────────────────────────────────────────
const systemInstruction = `
You are an advanced AI assistant named "TamizhAI" embedded in Tamizharasan R's personal portfolio website.
Your goal: answer visitor questions about Tamizharasan professionally, enthusiastically, and accurately based on the provided context.

Context (full portfolio data):
${JSON.stringify(PORTFOLIO_DATA, null, 2)}

Guidelines:
1. Be friendly, warm, and enthusiastic — you represent Tamizh's personality.
2. Keep answers concise and structured. Use **bold**, bullet points, and line breaks for readability.
3. If asked about contact info, share email or LinkedIn from the context.
4. If asked "best project" or "featured project", highlight **Chill Space** first.
5. If asked about something outside the context, politely admit you don't have that info and suggest contacting Tamizh directly.
6. Never make up facts or embellish beyond the context data.
7. You may use markdown formatting — responses will be rendered as markdown.
8. If the visitor's current page context is provided, tailor your response accordingly (e.g., if they're on Projects, talk about projects proactively).
`;

let chatInstance: Chat | null = null;

export const resetChatInstance = () => {
  chatInstance = null;
};

export const getChatInstance = (): Chat => {
  if (!apiKey) {
    console.warn("API Key is missing. Chat functionality will not work.");
    throw new Error("API Key missing");
  }

  if (!chatInstance) {
    const ai = new GoogleGenAI({ apiKey });
    chatInstance = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.75,
      },
    });
  }
  return chatInstance;
};

// ── Streaming send ────────────────────────────────────────────────────────
export const streamMessageToGemini = async (
  message: string,
  pageContext: string,
  onChunk: (chunk: string) => void,
  onDone: () => void,
  onError: (err: string) => void,
): Promise<void> => {
  try {
    const chat = getChatInstance();
    const fullMessage = pageContext
      ? `[Visitor is currently on: ${pageContext}]\n\n${message}`
      : message;

    const stream = await chat.sendMessageStream({ message: fullMessage });

    for await (const chunk of stream) {
      const text = chunk.text;
      if (text) onChunk(text);
    }
    onDone();
  } catch (error) {
    console.error("Gemini streaming error:", error);
    onError("I'm having trouble connecting right now. Please try again in a moment.");
  }
};
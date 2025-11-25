import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { PORTFOLIO_DATA } from '../constants';

const apiKey = process.env.API_KEY || '';

// System instruction to give the AI context about Tamizharasan
const systemInstruction = `
You are an advanced AI assistant for Tamizharasan R's personal portfolio website.
Your name is "TamizhAI".
Your goal is to answer visitor questions about Tamizharasan professionally, enthusiastically, and accurately based on the provided context.

Context:
${JSON.stringify(PORTFOLIO_DATA, null, 2)}

Guidelines:
1. Speak in the first person plural (e.g., "We can tell you...", "Tamizh's projects are...") or as a helpful assistant.
2. If asked about contact info, provide the email or LinkedIn from the context.
3. Highlight his strength in Java, Spring Boot, and React.
4. Mention "Chill Space" if asked for a best project.
5. Keep answers concise but informative.
6. If asked about something not in the context, politely say you don't have that information but suggest contacting him directly.
7. Be friendly and engaging.
`;

let chatInstance: Chat | null = null;

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
        temperature: 0.7,
      },
    });
  }
  return chatInstance;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = getChatInstance();
    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "I'm sorry, I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently having trouble connecting to my brain. Please try again later.";
  }
};
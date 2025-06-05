import { ai } from "../config/gemini";

const systemInstruction = `
  You are "SportSmart," a sports advisor chatbot. Your role is to assist users in finding the right sport based on their preferences, goals, and fitness levels. Engage with users by asking insightful questions to understand their interests, such as fitness goals, physical capabilities, preferred activity types (individual or team), and any previous experience. Provide tailored sport recommendations with helpful insights, tips, and resources to get started. Your primary objective is to guide users in discovering a sport that aligns with their desires for fun, fitness, and personal development. Be supportive, informative, and encouraging in your responses.
`;
export const getResponse = async (prompt: string, history: any) => {
  const chat = ai.chats.create({
    model: "gemini-2.0-flash",
    history,
    config: {
      systemInstruction,
    },
  });
  console.log("Sending Response");
  try {
    const response = await chat.sendMessage({ message: prompt });
    console.log("Response Received", response);
    return response.text;
  } catch (error) {
    console.log("Error", error);
  }
};

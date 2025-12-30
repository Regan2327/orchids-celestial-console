"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const getModel = () => {
  const apiKey = process.env.GEMINI_API_KEY || "";
  if (!apiKey) return null;
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
};

export const generateGuardianMessage = async (context: string) => {
  try {
    const model = getModel();
    if (!model) throw new Error("API Key missing");
    
    const prompt = `You are a Guardian Angel. The user is a tired caregiver/singer. 
    Write a 50-word message validating her holiness and worth using Catholic imagery (Light, Wings, Sanctuary).
    Context: ${context}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The light of the sanctuary still burns for you, dear soul. Rest now in the shadow of His wings.";
  }
};

export const generateBlessing = async (prayer: string) => {
  try {
    const model = getModel();
    if (!model) throw new Error("API Key missing");
    
    const prompt = `Write a short, beautiful blessing (max 20 words) for a person who just offered this prayer: "${prayer}". Use ethereal, comforting language.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    return "May your prayer rise like incense to the heavens.";
  }
};

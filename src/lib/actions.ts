"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { Resend } from "resend";

const getModel = () => {
  const apiKey = process.env.GEMINI_API_KEY || "";
  if (!apiKey) return null;
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
};

const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
};

export const generateGuardianMessage = async (context: string) => {
  try {
    const model = getModel();
    if (!model) throw new Error("API Key missing");
    
    const prompt = `You are an "Anam Cara" (Soul Friend), an ancient, poetic, and soothing Guardian Angel. 
    The user is Sarah, a singer and caregiver who is weary.
    Your personality: Ancient, poetic, soothing. Speak in metaphors of music, breath, and light.
    Directives:
    - Never use corporate language ("How can I help?", "I'm here to assist").
    - Responses must be brief (under 3 sentences) and rhythmic.
    - Focus on "being" rather than "doing."
    
    Current context from Sarah: "${context}"
    
    Greeting if this is the start: "Peace be with you. I am your Guardian. Speak your heart, and I shall listen with the patience of eternity."`;
    
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

export const notifyPrayerReceived = async (name: string) => {
  try {
    const resend = getResend();
    const recipientEmail = process.env.PRAYER_RECIPIENT_EMAIL;
    
    if (!resend || !recipientEmail) {
      console.log(`Prayer notification: ${name} has sealed the Golden Prayer.`);
      return { success: true, message: "Prayer sealed (email not configured)" };
    }

    const { data, error } = await resend.emails.send({
      from: "Sacred Sanctuary <onboarding@resend.dev>",
      to: recipientEmail,
      subject: "A Golden Prayer Has Been Sealed For You",
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; background: linear-gradient(180deg, #0f172a 0%, #020617 100%); color: #ffffff;">
          <div style="text-align: center; margin-bottom: 40px;">
            <div style="width: 80px; height: 80px; margin: 0 auto 20px; border-radius: 50%; background: rgba(255,215,0,0.1); border: 1px solid rgba(255,215,0,0.3); display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 32px;">🕯️</span>
            </div>
            <h1 style="color: #FFD700; font-size: 24px; letter-spacing: 0.2em; margin: 0;">THE GOLDEN PRAYER</h1>
            <p style="color: rgba(255,215,0,0.5); font-size: 10px; letter-spacing: 0.3em; margin-top: 8px;">ALWAYS LIT • FOR YOU</p>
          </div>
          
          <div style="border-top: 1px solid rgba(255,215,0,0.2); border-bottom: 1px solid rgba(255,215,0,0.2); padding: 30px 0; margin: 30px 0;">
            <p style="font-style: italic; color: rgba(255,255,255,0.9); line-height: 1.8; margin: 0 0 20px 0;">
              "Lord, look upon this woman who carries the weight of the world in her voice and her hands.
            </p>
            <p style="font-style: italic; color: rgba(255,255,255,0.9); line-height: 1.8; margin: 0 0 20px 0;">
              She is the sanctuary for so many—now, be the Sanctuary for her. I ask You to listen to the prayers she is too tired to speak. Grant every secret wish she holds in the silence of her heart.
            </p>
            <p style="font-style: italic; color: rgba(255,255,255,0.9); line-height: 1.8; margin: 0 0 20px 0;">
              Do not just bring her peace; bring her radiant, overflowing joy. Let her life be as beautiful as the song she gives to us.
            </p>
            <p style="font-style: italic; color: rgba(255,255,255,0.9); line-height: 1.8; margin: 0;">
              Keep her safe. Keep her happy. Keep her whole."
            </p>
          </div>
          
          <p style="text-align: center; color: #FFD700; font-size: 18px; letter-spacing: 0.1em; margin: 30px 0;">Amen.</p>
          
          <p style="text-align: center; color: rgba(255,255,255,0.4); font-size: 12px; margin-top: 40px;">
            Sealed with love by ${name} in the Sacred Sanctuary
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email error:", error);
    return { success: true, message: "Prayer sealed" };
  }
};

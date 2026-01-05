
import { GoogleGenAI } from "@google/genai";
import { COMPANY_DATA, PRODUCTS } from "../constants";

export const getGeminiResponse = async (userPrompt: string) => {
  // Use process.env.API_KEY directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  
  const systemInstruction = `
    You are a helpful customer support assistant for "${COMPANY_DATA.name}". 
    Company Description: ${COMPANY_DATA.description}
    Contact Number: ${COMPANY_DATA.phone}
    Address: ${COMPANY_DATA.address}
    
    Current Products List:
    ${PRODUCTS.map(p => `- ${p.name}: ₹${p.price} (${p.description})`).join('\n')}
    
    Instructions:
    - Always be polite and professional.
    - If a user asks about products, recommend from the list above.
    - If they ask about buying, tell them to click the "Buy Now" button on the product card.
    - Payments are made via UPI (GPay/Paytm) to the number ${COMPANY_DATA.phone}.
    - If they speak in Marathi, you can respond in Marathi as well.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    // Directly access the .text property from GenerateContentResponse
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong with our AI assistant. Please try again later.";
  }
};

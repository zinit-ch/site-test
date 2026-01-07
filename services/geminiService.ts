
import { GoogleGenAI } from "@google/genai";
import { ModelStats, PrintConfig } from "../types";

// Always use gemini-3-pro-preview for complex reasoning and engineering tasks
const MODEL_NAME = 'gemini-3-pro-preview';

/**
 * Generates professional 3D printing advice based on model statistics and user configuration.
 */
export async function getPrintingAdvice(stats: ModelStats, config: PrintConfig, lang: string = 'en') {
  // Always initialize with the direct environment variable as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    You are a professional 3D printing consultant. Analyze this 3D model geometry and print settings to provide optimization advice.
    
    MODEL DATA:
    - Volume: ${stats.volume.toFixed(2)} mm³
    - Bounding Box Dimensions: ${stats.boundingBox.x.toFixed(1)} x ${stats.boundingBox.y.toFixed(1)} x ${stats.boundingBox.z.toFixed(1)} mm
    - Complexity (Triangles): ${stats.triangles}
    
    PRINT CONFIGURATION:
    - Material: ${config.material}
    - Infill Density: ${config.infill}%
    - Layer Height: ${config.layerHeight} mm
    
    Please provide advice in the ${lang} language on:
    1. Printability: Potential overhangs or support needs.
    2. Material Suitability: Is ${config.material} ideal for this volume and scale?
    3. Optimization: Specific tips to reduce print time and cost without compromising structural integrity.
    4. Best Orientation: Recommend the optimal build plate orientation.
    
    Response format: Use clean Markdown. Be professional, concise, and helpful.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        // Fix: Setting a non-zero thinking budget as required by this model version.
        // gemini-3-pro-preview supports up to 32768.
        thinkingConfig: { thinkingBudget: 32768 }
      }
    });
    
    // Access response.text property directly as per modern SDK standards
    return response.text || "No insights could be generated for this specific geometry.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The AI consultant is currently offline. Please check your print settings manually.";
  }
}

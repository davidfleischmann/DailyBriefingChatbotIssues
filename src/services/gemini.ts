import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config';
import { LinkedInComment, ChatbotIssue } from '../types';

const genAI = new GoogleGenerativeAI(config.GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function processComments(comments: LinkedInComment[]): Promise<ChatbotIssue[]> {
    if (comments.length === 0) return [];

    console.log(`🧠 Processing ${comments.length} comments with Gemini...`);

    const prompt = `
    You are an AI safety and performance analyst. 
    Analyze the following LinkedIn comments and identify any mentions of public-facing AI agents, chatbots, or LLMs misbehaving, hallucinating, or failing.
    
    Exclude general marketing, positive feedback, or non-specific complaints.
    
    Format the output as a JSON array of objects with the following structure:
    [{
        "postUrl": "original post url",
        "commenter": "name of the person",
        "summary": "concise description of the specific AI failure",
        "severity": "Low" | "Medium" | "High" | "Critical",
        "rawText": "the original comment text"
    }]

    If no issues are found, return an empty array [].

    Comments to analyze:
    ${JSON.stringify(comments.map(c => ({ text: c.text, postUrl: c.postUrl, author: c.authorName })), null, 2)}
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        // Basic JSON extraction cleanup in case of markdown blocks
        const jsonMatch = text.match(/\[.*\]/s);
        const jsonStr = jsonMatch ? jsonMatch[0] : text;

        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("❌ Gemini processing failed:", error);
        return [];
    }
}

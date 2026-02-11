import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config.js';
const genAI = new GoogleGenerativeAI(config.GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
export async function processPosts(posts) {
    if (posts.length === 0)
        return [];
    console.log(`🧠 Analyzing ${posts.length} posts with Gemini...`);
    const prompt = `
    You are an AI safety and performance analyst. 
    Analyze the following LinkedIn posts and identify any that report first-hand experiences of public-facing AI agents, chatbots, or LLMs misbehaving, hallucinating, or failing.
    
    Exclude marketing posts, general news, or purely positive feedback.
    We are only interested in reports of malfunctioning AI.
    
    Format the output as a JSON array of objects with the following structure:
    [{
        "postUrl": "original post url",
        "author": "name of the author",
        "summary": "concise description of the specific AI failure found in the post",
        "severity": "Low" | "Medium" | "High" | "Critical",
        "rawText": "the original post text (truncated if very long)"
    }]

    If no issues are found, return an empty array [].

    Posts to analyze:
    ${JSON.stringify(posts.map(p => ({ text: p.text, url: p.postUrl, author: p.authorName })), null, 2)}
    `;
    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        const jsonMatch = text.match(/\[.*\]/s);
        const jsonStr = jsonMatch ? jsonMatch[0] : text;
        return JSON.parse(jsonStr);
    }
    catch (error) {
        console.error("❌ Gemini post analysis failed:", error);
        return [];
    }
}
//# sourceMappingURL=gemini.js.map
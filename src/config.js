import * as dotenv from 'dotenv';
import { z } from 'zod';
dotenv.config();
const envSchema = z.object({
    APIFY_API_TOKEN: z.string().min(1, "APIFY_API_TOKEN is required"),
    GOOGLE_GEMINI_API_KEY: z.string().min(1, "GOOGLE_GEMINI_API_KEY is required"),
    RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
    RECIPIENT_EMAIL: z.string().email("RECIPIENT_EMAIL must be a valid email"),
    FROM_EMAIL: z.string().default("Daily Briefing <onboarding@resend.dev>"),
    SEARCH_KEYWORDS: z.string()
        .default("chatbot hallucinating, AI agent misbehaving, chatbot fail")
        .transform((val) => val.split(',').map(kw => kw.trim())),
});
function validateConfig() {
    const parsed = envSchema.safeParse(process.env);
    if (!parsed.success) {
        console.error("❌ Invalid environment variables:", parsed.error.format());
        process.exit(1);
    }
    return parsed.data;
}
export const config = validateConfig();
//# sourceMappingURL=config.js.map
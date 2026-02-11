import { z } from 'zod';
declare const envSchema: z.ZodObject<{
    APIFY_API_TOKEN: z.ZodString;
    GOOGLE_GEMINI_API_KEY: z.ZodString;
    RESEND_API_KEY: z.ZodString;
    RECIPIENT_EMAIL: z.ZodString;
    FROM_EMAIL: z.ZodDefault<z.ZodString>;
    SEARCH_KEYWORDS: z.ZodPipe<z.ZodDefault<z.ZodString>, z.ZodTransform<string[], string>>;
}, z.core.$strip>;
export type EnvConfig = z.infer<typeof envSchema>;
export declare const config: {
    APIFY_API_TOKEN: string;
    GOOGLE_GEMINI_API_KEY: string;
    RESEND_API_KEY: string;
    RECIPIENT_EMAIL: string;
    FROM_EMAIL: string;
    SEARCH_KEYWORDS: string[];
};
export {};
//# sourceMappingURL=config.d.ts.map
import { config } from './config';
import { scrapeLinkedInComments } from './services/apify';
import { processComments } from './services/gemini';
import { sendBriefing } from './services/resend';
import { DailyBriefingReport } from './types';

async function main() {
    console.log("🌟 Starting Daily Briefing: AI Chatbot Misbehavior");

    const targetUrls = config.TARGET_POST_URLS;

    if (!targetUrls || targetUrls.length === 0) {
        console.warn("⚠️ No TARGET_POST_URLS provided in environment. Please add them to run the briefing.");
        return;
    }

    try {
        // 1. Scrape comments
        const rawComments = await scrapeLinkedInComments(targetUrls);

        if (rawComments.length === 0) {
            console.log("📭 No comments found to process.");
            return;
        }

        // 2. Process with Gemini
        const issues = await processComments(rawComments);

        // 3. Prepare Report
        const report: DailyBriefingReport = {
            date: new Date().toLocaleDateString(),
            issues: issues,
            totalCommentsScanned: rawComments.length,
        };

        // 4. Send Briefing
        await sendBriefing(report);

        console.log("✨ Daily Briefing process completed successfully!");
    } catch (error) {
        console.error("💥 Fatal error in briefing process:", error);
        process.exit(1);
    }
}

main();

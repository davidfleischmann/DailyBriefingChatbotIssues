import { config } from './config.js';
import { searchLinkedInPosts } from './services/apify.js';
import { processPosts } from './services/gemini.js';
import { sendBriefing } from './services/resend.js';
import type { DailyBriefingReport } from './types/index.js';

async function main() {
    console.log("🌟 Starting Daily Briefing: AI Chatbot Misbehavior (Posts)");

    const keywords = config.SEARCH_KEYWORDS;

    try {
        // 1. Search for posts
        const posts = await searchLinkedInPosts(keywords);

        if (posts.length === 0) {
            console.log("📭 No posts found to process.");
            return;
        }

        // 2. Process with Gemini
        const issues = await processPosts(posts);

        // 3. Prepare Report
        const report: DailyBriefingReport = {
            date: new Date().toLocaleDateString(),
            issues: issues,
            totalPostsScanned: posts.length,
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

import { ApifyClient } from 'apify-client';
import { config } from '../config.js';
const client = new ApifyClient({
    token: config.APIFY_API_TOKEN,
});
export async function scrapeLinkedInComments(postUrls) {
    if (postUrls.length === 0)
        return [];
    console.log(`🚀 Starting scrape for ${postUrls.length} posts...`);
    // Prepare Actor input
    const input = {
        "postUrls": postUrls,
        "maxItems": 100, // Reasonable limit per post for daily briefing
        "postedLimit": "24h", // Only get recent comments
        "scrapeReplies": true,
    };
    try {
        // Run the Actor and wait for it to finish
        const run = await client.actor("apify/linkedin-post-comments-scraper").call(input);
        // Fetch and print Actor results from the run's dataset (if any)
        const { items } = await client.dataset(run.defaultDatasetId).listItems();
        return items.map((item) => ({
            id: item.id || Math.random().toString(36).substr(2, 9),
            text: item.commentText || "",
            authorName: item.authorName || "Unknown",
            authorProfileUrl: item.authorProfileUrl,
            postUrl: item.postUrl,
            postedAt: item.postedAt || new Date().toISOString(),
        }));
    }
    catch (error) {
        console.error("❌ Apify scrape failed:", error);
        return [];
    }
}
//# sourceMappingURL=apify.js.map
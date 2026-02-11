import { ApifyClient } from 'apify-client';
import { config } from '../config.js';
const client = new ApifyClient({
    token: config.APIFY_API_TOKEN,
});
export async function searchLinkedInPosts(keywords) {
    if (keywords.length === 0)
        return [];
    console.log(`🚀 Searching LinkedIn for posts with keywords: ${keywords.join(', ')}...`);
    // Prepare Actor input for apify/linkedin-post-scraper
    // This actor often supports keyword search via the searchUrl or specific keyword field
    const input = {
        "searchKeywords": keywords.join(' '),
        "maxItems": 50, // Total items to scrape
        "postedLimit": "24h", // Recency
        "scrapeCompanyPosts": false,
        "scrapePersonalPosts": true,
    };
    try {
        const run = await client.actor("apify/linkedin-post-scraper").call(input);
        const { items } = await client.dataset(run.defaultDatasetId).listItems();
        return items.map((item) => ({
            id: item.id || Math.random().toString(36).substr(2, 9),
            text: item.text || "",
            authorName: item.authorName || "Unknown",
            authorProfileUrl: item.authorProfileUrl,
            postUrl: item.url || item.postUrl,
            postedAt: item.postedAt || new Date().toISOString(),
            engagement: {
                reactions: item.reactionsCount || 0,
                comments: item.commentsCount || 0,
                shares: item.sharesCount || 0,
            }
        }));
    }
    catch (error) {
        console.error("❌ Apify post search failed:", error);
        return [];
    }
}
//# sourceMappingURL=apify.js.map
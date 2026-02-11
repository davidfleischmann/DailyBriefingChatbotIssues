export interface LinkedInPost {
    id: string;
    text: string;
    authorName: string;
    authorProfileUrl?: string;
    postUrl: string;
    postedAt: string;
    engagement: {
        reactions: number;
        comments: number;
        shares: number;
    };
}

export interface ChatbotIssue {
    postUrl: string;
    author: string;
    summary: string;
    severity: 'Low' | 'Medium' | 'High' | 'Critical';
    rawText: string;
}

export interface DailyBriefingReport {
    date: string;
    issues: ChatbotIssue[];
    totalPostsScanned: number;
}

export interface LinkedInComment {
    id: string;
    text: string;
    authorName: string;
    authorProfileUrl?: string;
    postUrl: string;
    postedAt: string;
}

export interface ChatbotIssue {
    postUrl: string;
    commenter: string;
    summary: string;
    severity: 'Low' | 'Medium' | 'High' | 'Critical';
    rawText: string;
}

export interface DailyBriefingReport {
    date: string;
    issues: ChatbotIssue[];
    totalCommentsScanned: number;
}

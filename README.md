# Daily Briefing AI Chatbot Issues

This service monitors LinkedIn for **posts** discussing AI chatbot misbehavior, hallucinations, or failures. It utilizes Apify for scraping, Google Gemini for intelligent analysis, and Resend for daily email briefings.

## Overview

This tool automates the process of monitoring LinkedIn for "AI fails".

## Features
- **LinkedIn Post Search**: Automatically searches for key terms like "chatbot hallucinating" or "AI agent fail".
- **AI Analysis**: Uses Gemini 1.5 Flash to filter out marketing and find genuine failure reports.
- **Daily Briefing**: Sends a formatted HTML email report via Resend.

## Project Structure

- `src/index.ts`: Main orchestration logic.
- `src/services/apify.ts`: Scraping logic using the Apify LinkedIn Post Comments Scraper.
- `src/services/gemini.ts`: AI analysis and filtering logic.
- `src/services/resend.ts`: Email generation and delivery logic.
- `src/config.ts`: Environment variable validation and configuration.

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/davidfleischmann/DailyBriefingChatbotIssues.git
   cd DailyBriefingChatbotIssues
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file based on `.env.example` and fill in your API keys:
   - ```env
APIFY_API_TOKEN=your_apify_token
GOOGLE_GEMINI_API_KEY=your_gemini_key
RESEND_API_KEY=your_resend_key
RECIPIENT_EMAIL=your_email@example.com
SEARCH_KEYWORDS="chatbot hallucinating, AI fail, chatbot misbehaving"
```
   - `TARGET_POST_URLS`: A comma-separated list of LinkedIn post URLs you want to monitor.

4. **Run the briefing manually**:
   ```bash
   npm start
   ```

## Workflow

The tool is designed to be run daily (e.g., via a GitHub Action or a CRON job). It will:
1. Scrape comments from the last 24 hours for the specified posts.
2. Filter for actual chatbot misbehavior reports using AI.
3. Send a summary email if any issues are found.

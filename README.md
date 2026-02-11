# Daily Briefing AI Chatbot Issues

A daily briefing service that captures LinkedIn comments and discussions regarding public-facing AI agents or chatbots misbehaving or hallucinating.

## Overview

This tool automates the process of monitoring LinkedIn for "AI fails". It uses:
- **Apify**: To scrape comments from targeted LinkedIn posts.
- **Google Gemini 1.5 Flash**: To analyze comments and filter for specific reports of chatbots misbehaving or hallucinating.
- **Resend**: To deliver a professionally formatted daily email briefing.

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
   - `APIFY_API_TOKEN`: Your Apify account token.
   - `GOOGLE_GEMINI_API_KEY`: Your Google AI Studio API key.
   - `RESEND_API_KEY`: Your Resend API key.
   - `RECIPIENT_EMAIL`: The email address where the briefing should be sent.
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

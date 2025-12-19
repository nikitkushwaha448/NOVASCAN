# 🚀 NOVASCAN  
**Discover startup opportunities hidden in social conversations**

Built for **AI Accelerate: Unlocking New Frontiers** — helping entrepreneurs validate ideas and discover real problems *before* building.

---

## 🌍 What is NOVASCAN?

**NOVASCAN** analyzes thousands of real discussions from **Reddit, Hacker News, YouTube, and Product Hunt** to help you:

- 🔍 Discover trending problems people are struggling with
- 📊 Validate startup ideas using real market demand data
- 🎯 Find early adopters before you build
- 📈 Analyze market opportunities with AI-powered insights

Instead of guessing ideas, NOVASCAN shows you **what people are already talking about, struggling with, and paying for**.

---

## ✨ Key Features

### 🤖 AI Idea Validation
Enter any startup idea and get instant validation backed by real social discussions:

- Market Demand Score (0–100)
- Problem Severity Analysis
- Competition Level Assessment
- Monetization Potential
- Target User Identification
- Final Verdict: **BUILD IT / MAYBE / DON'T BUILD**

---

### 📊 Elasticsearch Analytics Dashboard
Advanced aggregations showing:

- **Trend Over Time** – Discussion volume by hour/day
- **Platform Breakdown** – Where conversations happen most
- **Sentiment Distribution** – Positive / Neutral / Negative
- **Peak Activity Hours** – Best posting time (timezone-aware)
- **Top Posts by Engagement** – Most valuable discussions

---

### 🔎 AI-Powered Reranking
Using **Elastic Open Inference API + Vertex AI**:

- **Stage 1:** BM25 + vector search → Top 100 results
- **Stage 2:** Vertex AI semantic reranking → Top 20 results

✅ Result: **95% relevance** vs ~70% with standard search

---

### 💬 Grounded AI Chat
Ask questions about search results with:

- Answers grounded in real discussions
- Live citations to source posts
- Conversational follow-ups

No hallucinations — only real data.

---

## 🧠 Innovation Highlights

### 🔀 Elasticsearch Hybrid Search
- Combines **BM25 keyword matching** with **dense vector similarity**
- Uses **Vertex AI text-embedding-004**

---

### 📐 Advanced Elasticsearch Aggregations
Showcases:

- `date_histogram` for time-series trends
- `terms` aggregations for categories
- `avg` metrics for statistics
- `painless` scripting for custom hour extraction
- `top_hits` for document sampling

---

### ⚡ Elastic Open Inference API
- Connects **Elasticsearch → Vertex AI**
- Uses `semantic-ranker-512@latest`
- Implements `text_similarity_reranker`
- Two-stage retrieval for speed + relevance

---

### 🧬 Multi-Model Vertex AI Strategy

| Model | Purpose |
|-----|--------|
| Gemini 2.5 Flash | Fast idea validation & chat |
| Gemini 2.5 Pro | Deep opportunity analysis |
| text-embedding-004 | 768-dim semantic embeddings |
| semantic-ranker-512 | AI-powered reranking |

Cost-optimized: Flash handles volume, Pro handles depth.

---

## 🛠 Tech Stack

| Category | Technologies |
|-------|-------------|
| Search & Database | Elasticsearch 8.14+ |
| AI & ML | Vertex AI (Gemini 2.5 Flash/Pro) |
| Backend | Next.js 14 API Routes |
| Frontend | Next.js 14, React, TailwindCSS, TypeScript |
| Data Sources | Reddit, Hacker News, YouTube, Product Hunt |
| Deployment | Vercel, Elasticsearch Cloud |

---

## ⚡ Quick Start

### ✅ Prerequisites
- Node.js **18.17+**
- Google Cloud account with **Vertex AI enabled**
- Elasticsearch Cloud account
- Google Cloud CLI installed

---

### 1️⃣ Clone & Install
```bash
git clone <your-repo-url>
cd NOVASCAN
npm install

2️⃣ Set Up Environment Variables

Create a .env file:

# Google Cloud / Vertex AI
GOOGLE_CLOUD_PROJECT_ID="your-project-id"
GOOGLE_CLOUD_LOCATION="us-central1"
GOOGLE_APPLICATION_CREDENTIALS="<service-account-json or base64>"

# Elasticsearch
ELASTIC_CLOUD_ID="your-cloud-id"
ELASTIC_API_KEY="your-api-key"

# Reddit API
REDDIT_CLIENT_ID=""
REDDIT_CLIENT_SECRET=""
REDDIT_USER_AGENT=""

# Product Hunt API
PRODUCTHUNT_CLIENT_ID=""
PRODUCTHUNT_CLIENT_SECRET=""
PRODUCTHUNT_API_TOKEN=""

# Hacker News API
HACKERNEWS_API_URL=""

# YouTube API
YOUTUBE_API_KEY=""

3️⃣ Authenticate Google Cloud
gcloud auth application-default login
gcloud config set project your-project-id


Ensure these APIs are enabled:

Vertex AI API

Discovery Engine API (for reranking)

4️⃣ Set Up Elasticsearch Index
npm run setup-es


Creates social_signals index with:

Dense vectors (768 dimensions)

Sentiment fields

Quality metrics

Platform metadata

5️⃣ (Optional) Enable AI Reranking

Prerequisites:

Enable Discovery Engine API

Grant Discovery Engine Viewer role

Wait 2–3 minutes for propagation

npm run setup-reranking

6️⃣ Collect Initial Data
npm run collect-data


Fetches ~100 posts per platform

Generates embeddings

Indexes into Elasticsearch
⏱️ Takes 5–10 minutes

7️⃣ Run the App
npm run dev


Open 👉 http://localhost:3000

💡 Example Use Cases
🔍 Discover Problems

Search:

struggling with meeting notes


60+ discussions found

40% growth in last 30 days

Users: remote teams, managers, consultants

✅ Validate Ideas

Idea:
AI-powered meeting notes with action item extraction

Market Demand: 85 / 100

Willingness to Pay: 72 / 100

Verdict: BUILD IT

Recommendation: $20/month SaaS for async teams

🎯 Find Early Adopters

Top 10 active users discussing the problem

Platforms: r/startups, r/Entrepreneur, Hacker News

High engagement discussions

🗂 Project Structure

NOVASCAN/
├── app/
│   ├── api/
│   │   ├── analytics/route.ts      # Analytics aggregations
│   │   ├── analyze-opportunity/    # AI opportunity analysis
│   │   ├── validate-idea/          # AI idea validation
│   │   ├── chat/route.ts           # Grounded AI chat
│   │   └── search/route.ts         # Hybrid search + reranking
│   ├── components/
│   │   ├── AnalyticsDashboard.tsx  # Visual analytics (charts)
│   │   ├── OpportunityReport.tsx   # Opportunity analysis UI
│   │   └── SearchResults.tsx       # Search results display
│   ├── dashboard/page.tsx          # Main search interface
│   ├── validate/page.tsx           # Idea validation page
│   └── page.tsx                    # Landing page
├── lib/
│   ├── ai/
│   │   ├── embeddings.ts           # Vertex AI text-embedding-004
│   │   ├── grounding.ts            # Vertex AI grounded chat
│   │   ├── idea-validator.ts       # AI idea validation logic
│   │   └── opportunity-analyzer.ts # AI opportunity scoring
│   ├── elasticsearch/
│   │   ├── client.ts               # ES client setup
│   │   ├── search.ts               # Hybrid search + reranking
│   │   ├── analytics.ts            # Advanced aggregations
│   │   └── reranking.ts            # Open Inference API setup
│   ├── connectors/
│   │   ├── reddit.ts               # Reddit API
│   │   ├── hackernews.ts           # Hacker News API
│   │   ├── youtube.ts              # YouTube API
│   │   └── producthunt.ts          # Product Hunt API
│   └── types/index.ts              # TypeScript interfaces
├── scripts/
│   ├── setup-elasticsearch.ts      # Create ES index
│   ├── setup-reranking.ts          # Setup reranking endpoint
│   └── collect-data.ts             # Data collection job
└── package.json

Challenges I Faced

1.Deduplication turned into a bigger problem than expected. The same discussion often appears multiple times, sometimes with slight title variations or different URLs. I built a normalization system that strips protocols and URL parameters, normalizes titles by removing punctuation and truncating to 100 characters. Even then, some duplicates slip through when titles are significantly reworded.
2.API rate limits hit hard once I started scaling data collection. YouTube's quota system is particularly brutal—you burn through your daily limit fast. Reddit blocks you if you make requests too quickly. I added delays between requests (1 second for Reddit, 2 seconds for embedding batches) and implemented Promise.allSettled so one platform failure doesn't kill the entire collection job.
3.Platform-specific quirks created a normalization nightmare. Product Hunt uses GraphQL with nested topic structures (topics.edges[].node.name), Reddit has inconsistent formats where selftext might be empty and timestamps are in Unix seconds, YouTube requires two API calls (search, then fetch details) with engagement metrics as strings needing parsing, and HackerNews has two separate APIs (Firebase and Algolia) with stories that can be deleted or dead. I solved this with a unified SocialPost interface that normalizes everything—YouTube's likeCount and Reddit's score both map to a generic score field, all timestamp formats convert to JavaScript Date objects, and each connector has a normalize function.

4.The background collection pipeline needed careful orchestration. Fetching from four platforms, running sentiment analysis, calculating quality scores, generating embeddings, and bulk indexing—all while handling partial failures gracefully. I use Promise.allSettled everywhere, so one platform timeout doesn't break the entire job.


What's Next

1.Validation API performance - The /api/validate-idea endpoint takes nearly a minute to complete. The main bottleneck is sequential Gemini calls and Elasticsearch searches. Solution: Multi-layer caching. Cache Elasticsearch results for identical search queries (1-hour TTL), cache generated embeddings for common keywords, and cache entire validation reports for identical ideas (6-hour TTL). This could drop response time from 60 seconds to under 2 seconds for cache hits. Redis with query hash keys would handle this cleanly.
2.Authentication & rate limiting - Currently everything is public with no usage tracking. Adding NextAuth or Clerk would enable user accounts, and token bucket rate limiting per user would prevent abuse.
3.Better deduplication - The current URL/title normalization still lets duplicates through when titles are significantly reworded. A similarity-based approach using embeddings could catch near-duplicates more effectively.


Roadmap

 1.Add more platforms (X, GitHub, Stackoverflow, Quora)
 2.Multi-layer caching (Redis) for validation API
 3.Authentication system (NextAuth/Clerk)
 4.Add export functionality (CSV, PDF reports)
 5.Multi-lingual support
 6.Browser extension for on-the-fly validation

Acknowledgments

Built with:

1.Elasticsearch - For powerful hybrid search and aggregations
2.Google Cloud Vertex AI - For embeddings, reranking, and Gemini models
3.Next.js - For the amazing developer experience

Made for the AI Accelerate: Unlocking New Frontiers
Find problems worth solving. Build startups people want.



# NovaScan

AI-powered startup idea validation and market research platform that analyzes real discussions from Reddit, Hacker News, YouTube, and Product Hunt.

## Features

- 🔍 **Multi-Platform Search** - Search across Reddit, Hacker News, YouTube, and Product Hunt
- 🤖 **AI Idea Validation** - Get instant validation scores for market demand, problem severity, competition, and monetization potential
- 💡 **Opportunity Analysis** - Identify trending problems, early adopters, and market gaps with AI-powered scoring
- 💬 **Grounded AI Chat** - Ask questions about your search results with answers grounded in real discussions
- 📊 **Analytics Dashboard** - View sentiment analysis, quality metrics, and trending topics
- 🔄 **AI Reranking** - Semantic search with AI-powered result reranking using Google Vertex AI

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Search & Analytics**: Elasticsearch
- **AI/ML**: Google Vertex AI (Gemini 2.5)
- **APIs**: Reddit, YouTube, Product Hunt, Hacker News

## Prerequisites

- Node.js 18+
- Elasticsearch 8.x (Cloud or self-hosted)
- Google Cloud Platform account with Vertex AI enabled
- API keys for:
  - YouTube Data API
  - Product Hunt API

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/novascan.git
cd novascan
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
# Elasticsearch Configuration
ELASTIC_CLOUD_ID=your-cloud-id
ELASTIC_API_KEY=your-api-key

# Google Cloud Configuration
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_LOCATION=us-central1
GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json

# Social Media API Keys
YOUTUBE_API_KEY=your-youtube-api-key
PRODUCTHUNT_API_TOKEN=your-producthunt-token
REDDIT_USER_AGENT=NovaScan/1.0
```

4. Set up Elasticsearch index:
```bash
node scripts/setup-elasticsearch.js
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

### Validate a Startup Idea
1. Go to the "Validate" page
2. Describe your startup idea
3. Get instant validation scores and insights backed by real discussions

### Discover Problems
1. Go to the "Dashboard" page
2. Enter keywords to search for problems and discussions
3. Select platforms and date range
4. Enable AI reranking for better results
5. Analyze opportunities and view analytics

### Chat with Results
1. After searching, click "Chat about results"
2. Ask questions about the discussions
3. Get answers grounded in real data

## Project Structure

```
novascan/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── components/        # React components
│   ├── dashboard/         # Dashboard page
│   ├── validate/          # Idea validation page
│   └── settings/          # Settings page
├── lib/                   # Core libraries
│   ├── ai/               # AI services (Vertex AI, embeddings)
│   ├── analysis/         # Quality and sentiment analysis
│   ├── connectors/       # Platform connectors (Reddit, YouTube, etc.)
│   ├── elasticsearch/    # Elasticsearch client and utilities
│   ├── services/         # Background services
│   └── utils/            # Utility functions
└── scripts/              # Setup scripts
```

## API Routes

- `POST /api/search` - Search across platforms
- `POST /api/validate-idea` - Validate a startup idea
- `POST /api/analyze-opportunity` - Analyze market opportunity
- `POST /api/analytics` - Get analytics for search results
- `POST /api/chat` - Chat with grounded AI about results
- `POST /api/collect` - Collect and index data from platforms

## Configuration

### Elasticsearch
- Supports both Elasticsearch Cloud and self-hosted deployments
- Hybrid search with keyword matching and semantic embeddings
- AI-powered reranking with Vertex AI

### Google Vertex AI
- Uses Gemini 2.5 models for text generation
- Text embeddings for semantic search
- Service account authentication

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Acknowledgments

- Built with Next.js and Elasticsearch
- Powered by Google Vertex AI
- Data from Reddit, Hacker News, YouTube, and Product Hunt

# Multi-LLM NER Backend

Backend server supporting multiple AI models for Named Entity Recognition analysis in herbal medicine articles.

## Supported AI Models

### Claude (Anthropic)
- Claude Sonnet 4 (Recommended — balanced performance)
- Claude Opus 4 (Highest accuracy)
- Claude Haiku 4 (Fastest)

### GPT (OpenAI)
- GPT-4o (Latest)
- GPT-4 Turbo
- GPT-3.5 Turbo (Budget-friendly)

### Gemini (Google)
- Gemini 2.0 Flash (New)
- Gemini 1.5 Pro

### Llama (Meta via Groq)
- Llama 3.3 70B (High accuracy)
- Llama 3.1 8B (Fast)

---

## Getting Started

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

**Dependencies installed:**
- `express` - Web framework
- `@anthropic-ai/sdk` - Claude API
- `openai` - GPT API
- `@google/generative-ai` - Gemini API
- `groq-sdk` - Llama via Groq
- `cors` - Enable CORS
- `dotenv` - Environment variables

---

### Step 2: Create .env File

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
# Add only the API keys for the providers you want to use

# Anthropic Claude
ANTHROPIC_API_KEY=sk-ant-xxxxx

# OpenAI GPT
OPENAI_API_KEY=sk-xxxxx

# Google Gemini
GOOGLE_API_KEY=xxxxx

# Groq (for Llama)
GROQ_API_KEY=gsk_xxxxx
```

---

### Step 3: Start the Server

```bash
npm start
```

Or use development mode (auto-reload):

```bash
npm run dev
```

**Output:**
```
🚀 Multi-LLM NER Backend running on http://localhost:3000
📊 Supporting 10 models from 4 providers

Available models:
  - claude-sonnet-4 (anthropic)
  - claude-opus-4 (anthropic)
  - claude-haiku-4 (anthropic)
  - gpt-4 (openai)
  - gpt-4o (openai)
  - gpt-3.5-turbo (openai)
  - gemini-2.0-flash (google)
  - gemini-1.5-pro (google)
  - llama-3.3-70b (groq)
  - llama-3.1-8b (groq)
```

---

### Step 4: Open the Frontend

```bash
# Open the HTML file directly in your browser
open index.html
```

---

## Using the Frontend (index.html)

### Steps
1. **Select an AI Model** from the dropdown (Claude, GPT, Gemini, Llama)
2. **Upload an article file** (Task 13 .txt)
3. **Fill in article info** *(optional)*
   - 🌿 **Herb Name** — e.g., Ginger, Turmeric, Garlic
   - 📄 **Article Title** — for report identification (defaults to filename if left blank)
4. **Click "Analyze with AI"** — wait for analysis across 3 categories

### Results
- **PASS/FAIL** with entity counts per category
- Summary cards: Cultural, Scientific, Safety
- AI Summary (in Thai)
- Entity details with reasoning

### Export Report
All formats include **Herb Name** and **Article Title**:

| Format | Button |
|--------|--------|
| Text (.txt) | Export TXT |
| Word (.docx) | Export Word |
| Excel (.xlsx) | Export Excel |
| PDF (.pdf) | Export PDF |

---

## API Endpoints

### 1. Get Available Models

```
GET /api/models
```

**Response:**
```json
{
  "models": [
    {
      "id": "claude-sonnet-4",
      "name": "claude-sonnet-4",
      "provider": "anthropic",
      "model": "claude-sonnet-4-20250514"
    },
    ...
  ]
}
```

---

### 2. Analyze Entities

```
POST /api/analyze
```

**Request Body:**
```json
{
  "text": "Article about herbal medicine...",
  "category": "cultural",
  "model": "claude-sonnet-4"
}
```

**Parameters:**
- `text` (required) - Article text to analyze (must be longer than 100 characters)
- `category` (required) - `cultural`, `scientific`, or `safety`
- `model` (optional) - default: `claude-sonnet-4`

**Response:**
```json
{
  "entities": [
    {
      "name": "Thai",
      "count": 3,
      "reasoning": "Geographic and cultural reference..."
    }
  ],
  "count": 12,
  "completeness": 120,
  "efficacy": 100,
  "model_used": "claude-sonnet-4"
}
```

---

### 3. Generate Summary

```
POST /api/summary
```

**Request Body:**
```json
{
  "cultural": 12,
  "scientific": 20,
  "safety": 11,
  "model": "claude-sonnet-4"
}
```

**Response:**
```json
{
  "summary": "The article has high completeness across all dimensions...",
  "model_used": "claude-sonnet-4"
}
```

---

### 4. Health Check

```
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "models": 10,
  "providers": ["anthropic", "openai", "google", "groq"]
}
```

---

## Getting API Keys

### 1. Anthropic Claude
- Go to: https://console.anthropic.com/
- Sign up / Log in
- Navigate to API Keys
- Create a new API key
- Copy `sk-ant-xxxxx`

**Pricing:**
- Sonnet 4: ~$3/1M input tokens
- Opus 4: ~$15/1M input tokens
- Haiku 4: ~$0.25/1M input tokens

---

### 2. OpenAI GPT
- Go to: https://platform.openai.com/api-keys
- Log in / Sign up
- Create an API key
- Copy `sk-xxxxx`

**Pricing:**
- GPT-4o: ~$5/1M input tokens
- GPT-4: ~$30/1M input tokens
- GPT-3.5: ~$0.5/1M input tokens

---

### 3. Google Gemini
- Go to: https://makersuite.google.com/app/apikey
- Log in with Google Account
- Create an API key
- Copy the key

**Pricing:**
- Gemini 2.0 Flash: Free tier + ~$0.075/1M tokens
- Gemini 1.5 Pro: ~$1.25/1M tokens

---

### 4. Groq (Llama)
- Go to: https://console.groq.com/keys
- Sign up / Log in
- Create an API key
- Copy `gsk_xxxxx`

**Pricing:**
- **Free!** (with rate limits)
- Llama 3.3 70B: Free
- Llama 3.1 8B: Free

---

## Choosing a Model

### By Budget

| Budget | Recommended |
|--------|-------------|
| **Free** | Groq (Llama 3.3 70B) |
| **Low** | GPT-3.5 Turbo, Claude Haiku 4 |
| **Medium** | Claude Sonnet 4, Gemini 2.0 Flash |
| **Highest accuracy** | Claude Opus 4, GPT-4 |

---

### By Speed

| Need | Recommended |
|------|-------------|
| **Fastest** | Claude Haiku 4, Llama 3.1 8B |
| **Fast** | Gemini 2.0 Flash, GPT-4o |
| **Moderate** | Claude Sonnet 4, Llama 3.3 70B |
| **Slow but accurate** | Claude Opus 4, GPT-4 |

---

### By Accuracy

| Accuracy Level | Recommended |
|----------------|-------------|
| **95%+** | Claude Opus 4, GPT-4 |
| **90–95%** | Claude Sonnet 4, GPT-4o, Llama 3.3 70B |
| **85–90%** | Gemini 2.0 Flash, GPT-3.5 |
| **80–85%** | Claude Haiku 4, Llama 3.1 8B |

---

## Troubleshooting

### Invalid API Key
```
Error: Invalid API key
```

**Fix:**
1. Check the API key in your `.env` file
2. Make sure it was copied correctly (no extra spaces)
3. Verify the API key is still active (not revoked)

---

### CORS Error
```
Access to fetch has been blocked by CORS policy
```

**Fix:**
- The server already includes CORS middleware
- Verify the frontend is calling `http://localhost:3000`
- Try restarting the server

---

### Rate Limit
```
Error: Rate limit exceeded
```

**Fix:**
- Wait a moment and try again
- Switch to a model with higher rate limits
- Groq: use Llama 3.1 8B instead of 3.3 70B

---

### Server Not Running
```
Error: connect ECONNREFUSED
```

**Fix:**
1. Make sure the server is running: `npm start`
2. Check the port: `http://localhost:3000`
3. Check console logs for errors

---

## Example Usage

### Testing with curl

```bash
# Get models
curl http://localhost:3000/api/models

# Analyze with Claude
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Turmeric (Curcuma longa) is a traditional Thai herb...",
    "category": "cultural",
    "model": "claude-sonnet-4"
  }'

# Analyze with GPT
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Curcumin is the main bioactive compound...",
    "category": "scientific",
    "model": "gpt-4o"
  }'
```

---

## Docker Support (Optional)

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

Build and run:

```bash
docker build -t multi-llm-ner .
docker run -p 3000:3000 --env-file .env multi-llm-ner
```

---

## License

MIT

---

## Contributing

Pull requests are welcome!

---

## Support

If you encounter issues or have questions, please open an Issue on GitHub.

---

**Version:** 1.1.0
**Last updated:** March 17, 2026

### Changelog
- **v1.1.0** - Added Herb Name and Article Title inputs in Frontend; fields appear in all export formats
- **v1.0.0** - Multi-LLM NER analysis with TXT/Word/Excel/PDF export

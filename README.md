# Herbal Article Creator — Multi-LLM Evaluation Suite

A two-part toolkit for analyzing and evaluating AI-generated herbal medicine articles using multiple large language models (LLMs).

| Component | Version |
|---|---|
| Multi-LLM-NER-KPI-with-Backend | v1.1.0 |
| Multi-LLM-4KPIs-Evaluation | v2.0 |

---

## Repository Structure

```
.
├── Multi-LLM-NER-KPI-with-Backend/   # NER analysis backend + frontend
└── Multi-LLM-4KPIs-Evaluation/       # Automated quality scoring calculator
```

---

## Project 1: Multi-LLM-NER-KPI-with-Backend

### Overview

A full-stack application that performs **Named Entity Recognition (NER)** on herbal medicine article text across three evaluation dimensions:

| Dimension | Description |
|---|---|
| **Cultural Authenticity** | Entities related to traditional usage, cultural claims, historical context |
| **Scientific Validity** | Entities backed by research, clinical data, bioactive compounds |
| **Safety & Compliance** | Entities related to contraindications, dosage, drug interactions |

### Supported AI Models

| Provider | Display Name | Model ID |
|---|---|---|
| **Anthropic Claude** | Claude Sonnet 4 | `claude-sonnet-4-20250514` |
| | Claude Opus 4 | `claude-opus-4-20250514` |
| | Claude Haiku 4 | `claude-haiku-4-20250514` |
| **OpenAI GPT** | GPT-4o | `gpt-4o` |
| | GPT-4 Turbo | `gpt-4-turbo-preview` |
| | GPT-3.5 Turbo | `gpt-3.5-turbo` |
| **Google Gemini** | Gemini 2.0 Flash | `gemini-2.0-flash` |
| | Gemini 1.5 Pro | `gemini-1.5-pro` |
| **Meta Llama (via Groq)** | Llama 3.3 70B | `llama-3.3-70b-versatile` |
| | Llama 3.1 8B | `llama-3.1-8b-instant` |

> **Note:** The Python backend uses `gemini-2.0-flash-exp` for Gemini 2.0 Flash instead of `gemini-2.0-flash`. Both are functionally equivalent but may differ in availability.

### Architecture

- **Backend (recommended):** Node.js + Express (`server.js`)
- **Backend (alternative):** Python + Flask (`server.py`)
- **Frontend:** Single-page HTML/JS with drag-and-drop file upload

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/models` | List available models and providers |
| `POST` | `/api/analyze` | Analyze text for named entities |
| `POST` | `/api/summary` | Generate AI-driven summary from all three category results |
| `GET` | `/health` | Health check — returns status, model count, and active providers |

**POST `/api/analyze` request body:**
```json
{
  "text": "article content...",
  "category": "cultural | scientific | safety",
  "model": "claude-sonnet-4"
}
```

**POST `/api/analyze` response:**
```json
{
  "entities": [...],
  "count": 12,
  "completeness": 95,
  "efficacy": 88,
  "model_used": "claude-sonnet-4"
}
```

### Export Formats

Analysis results can be exported in four formats:

- `.txt` — plain text
- `.docx` — Word document
- `.xlsx` — Excel spreadsheet
- `.pdf` — PDF document

### Setup

**Node.js backend:**
```bash
cd Multi-LLM-NER-KPI-with-Backend
npm install
cp .env.example .env   # Add your API keys
node server.js
```

**Python backend:**
```bash
cd Multi-LLM-NER-KPI-with-Backend
pip install -r requirements.txt
cp .env.example .env   # Add your API keys
python server.py
```

### Required API Keys (`.env`)

```
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
GOOGLE_API_KEY=
GROQ_API_KEY=
```

---

## Project 2: Multi-LLM-4KPIs-Evaluation

### Overview

A browser-based **automated quality scoring calculator** that evaluates herbal article output from a multi-agent pipeline against 4 Key Performance Indicators (KPIs) before publication. No server required — runs entirely in the browser.

### The 4 KPIs

| KPI | What It Measures | Formula |
|---|---|---|
| **Robustness** | Data completeness — how much of the available research data was used | `(N_total − N_dropped) / N_total × 100` |
| **Clarity** | Hallucination detection — whether the article contains false or unsupported claims | `(1 − k/N) × 100` |
| **Efficacy** | Market trend alignment — coverage of relevant current market trends | `N_relevant / N_total × 100` |
| **Feasibility** | Implementation readiness — safety data completeness and compliance plan clarity | `E_satisfied / E_total × 100` |

### Required Input Files

The calculator processes 4 task output files from an upstream multi-agent system:

| File | Content |
|---|---|
| **Task 11** | Master Fact Sheet (consolidated research data) |
| **Task 13** | Final Article (complete herbal article draft) |
| **Task 14** | Data Integrity Report (completeness analysis) |
| **Task 15** | Strategy Report (implementation guidelines) |

### Scoring Decision Matrix

| Decision | Criteria |
|---|---|
| **GO** | Robustness ≥ 90% **and** Clarity = 100% **and** Efficacy ≥ 85% **and** Feasibility ≥ 75% |
| **CONDITIONAL GO** | Robustness 80–89% **or** Efficacy 70–84% **or** Feasibility 60–74% (with Clarity = 100%) |
| **NO-GO** | Clarity < 100% (any hallucinations), **or** Robustness < 80%, **or** Feasibility < 60%, **or** Efficacy < 70% |

### Features

- Drag-and-drop file upload for each task
- Optional herb name and article title metadata fields (saved to history)
- Entity-level detail display — shows specific dropped and hallucinated entities
- Detailed calculation breakdown with formula and actual values per KPI
- **Evaluation history** — results are persisted in browser `localStorage`; includes timestamp, herb name, article title, all 4 scores, and decision
- **CSV export** of history records
- Clear history button

### Usage

1. Open `Multi-LLM-4KPIs-Evaluation/score_calculator.html` in a browser
2. (Optional) Enter herb name and article title
3. Drop each task file into its corresponding upload area
4. Scores and decision render automatically

---

## How the Two Projects Fit Together

```
Article Draft
     │
     ▼
[Multi-LLM-NER-KPI-with-Backend]
  Extract & categorize named entities
  across Cultural / Scientific / Safety dimensions
  using any of 10 supported LLMs
     │
     ▼
[Multi-LLM-4KPIs-Evaluation]
  Score the final article against 4 KPIs
  and produce a GO / CONDITIONAL GO / NO-GO decision
```

The NER backend supports the research and analysis phase; the 4KPIs calculator performs final quality gate evaluation before publication.

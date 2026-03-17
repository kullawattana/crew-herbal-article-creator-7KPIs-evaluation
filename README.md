# Herbal Article Creator — Multi-LLM Evaluation Suite

A two-part toolkit for analyzing and evaluating AI-generated herbal medicine articles using multiple large language models (LLMs).

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
| **Safety Considerations** | Entities related to contraindications, dosage, drug interactions |

### Supported AI Models

| Provider | Models |
|---|---|
| **Anthropic Claude** | Claude Sonnet 4, Claude Opus 4, Claude Haiku 4 |
| **OpenAI GPT** | GPT-4o, GPT-4 Turbo, GPT-3.5 Turbo |
| **Google Gemini** | Gemini 2.0 Flash, Gemini 1.5 Pro |
| **Meta Llama (via Groq)** | Llama 3.3 70B, Llama 3.1 8B |

### Architecture

- **Backend (recommended):** Node.js + Express (`server.js`)
- **Backend (alternative):** Python + Flask (`server.py`)
- **Frontend:** Single-page HTML/JS with drag-and-drop file upload

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/models` | List available models |
| `POST` | `/api/analyze` | Analyze text for named entities |
| `POST` | `/api/summary` | Generate AI-driven summary |
| `GET` | `/health` | Health check |

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

A browser-based **automated quality scoring calculator** that evaluates herbal article output from a multi-agent pipeline against 4 Key Performance Indicators (KPIs) before publication.

### The 4 KPIs

| KPI | What It Measures |
|---|---|
| **Robustness** | Data completeness — how much of the available research data was used |
| **Clarity** | Hallucination detection — whether the article contains false or unsupported information |
| **Efficacy** | Market trend alignment — coverage of relevant current market trends |
| **Feasibility** | Implementation readiness — safety data completeness and compliance plan clarity |

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
| **GO** | Robustness ≥ 90%, Clarity = 100%, Efficacy ≥ 85%, Feasibility ≥ 75% |
| **CONDITIONAL GO** | Some scores below GO threshold but above NO-GO thresholds |
| **NO-GO** | Clarity < 100% (hallucinations detected), Robustness < 80%, Feasibility < 60%, or Efficacy < 70% |

### Usage

Open `Multi-LLM-4KPIs-Evaluation/score_calculator.html` directly in a browser — no server required. Drag and drop the 4 task files into the designated upload areas and the calculator will automatically score and render a decision.

---

## How the Two Projects Fit Together

```
Article Draft
     │
     ▼
[Multi-LLM-NER-KPI-with-Backend]
  Extract & categorize named entities
  across Cultural / Scientific / Safety dimensions
     │
     ▼
[Multi-LLM-4KPIs-Evaluation]
  Score the final article against 4 KPIs
  and produce a GO / CONDITIONAL GO / NO-GO decision
```

The NER backend supports the research and analysis phase; the 4KPIs calculator performs final quality gate evaluation before publication.

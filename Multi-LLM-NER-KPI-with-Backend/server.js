// server.js - Multi-LLM Backend for NER Calculator
// Supports: Claude, GPT, Gemini, Llama (via Groq)

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// LLM Clients
const Anthropic = require('@anthropic-ai/sdk');
const OpenAI = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Groq = require('groq-sdk');

// Initialize clients
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// Model configurations
const MODEL_CONFIGS = {
    // Claude models
    'claude-sonnet-4': {
        provider: 'anthropic',
        model: 'claude-sonnet-4-20250514',
        maxTokens: 4000
    },
    'claude-opus-4': {
        provider: 'anthropic',
        model: 'claude-opus-4-20250514',
        maxTokens: 4000
    },
    'claude-haiku-4': {
        provider: 'anthropic',
        model: 'claude-haiku-4-20250514',
        maxTokens: 4000
    },
    
    // OpenAI GPT models
    'gpt-4': {
        provider: 'openai',
        model: 'gpt-4-turbo-preview',
        maxTokens: 4000
    },
    'gpt-4o': {
        provider: 'openai',
        model: 'gpt-4o',
        maxTokens: 4000
    },
    'gpt-3.5-turbo': {
        provider: 'openai',
        model: 'gpt-3.5-turbo',
        maxTokens: 4000
    },
    
    // Google Gemini models
    'gemini-2.0-flash': {
        provider: 'google',
        model: 'gemini-2.0-flash-exp',
        maxTokens: 4000
    },
    'gemini-1.5-pro': {
        provider: 'google',
        model: 'gemini-1.5-pro',
        maxTokens: 4000
    },
    
    // Llama via Groq
    'llama-3.3-70b': {
        provider: 'groq',
        model: 'llama-3.3-70b-versatile',
        maxTokens: 4000
    },
    'llama-3.1-8b': {
        provider: 'groq',
        model: 'llama-3.1-8b-instant',
        maxTokens: 4000
    }
};

// Prompt templates
function createPrompt(text, category) {
    const prompts = {
        cultural: `You are analyzing a herbal medicine article for CULTURAL AUTHENTICITY entities.

Extract ALL cultural entities including:
- Geographic/cultural references (Thai, Indian, Malaysian, Japanese, Korean, Western, Middle Eastern, etc.)
- Traditional medicine systems (Ayurveda, Traditional Chinese Medicine, etc.)
- Cultural institutions (museums, foundations, centers)
- Traditional practices, wisdom, and heritage
- Cultural locations and communities
- Wellness traditions and holistic practices

For each entity found, provide:
1. The entity name (exact text from article)
2. Number of occurrences in the text
3. Brief reasoning why it's a cultural entity

Article text (first 5000 characters):
${text.substring(0, 5000)}

Respond ONLY in valid JSON format with no markdown, no backticks, no preamble:
{
  "entities": [
    {
      "name": "Thai",
      "count": 3,
      "reasoning": "Geographic and cultural reference to Thailand's traditional medicine"
    }
  ],
  "total_count": 12
}`,

        scientific: `You are analyzing a herbal medicine article for SCIENTIFIC VALIDITY entities.

Extract ALL scientific entities including:
- Chemical compounds and active ingredients (Curcumin, alkaloids, etc.)
- Scientific methods (LC-MS/MS, HPLC, clinical trials, etc.)
- Measurements and units (mg/kg, nmol, AUC, IC50, etc.)
- Biological processes and mechanisms (apoptosis, enzyme inhibition, etc.)
- Pharmacological terms (bioavailability, pharmacokinetics, etc.)
- Research methodologies and experimental approaches

For each entity found, provide:
1. The entity name (exact text from article)
2. Number of occurrences in the text
3. Brief reasoning why it's a scientific entity

Article text (first 5000 characters):
${text.substring(0, 5000)}

Respond ONLY in valid JSON format with no markdown, no backticks, no preamble:
{
  "entities": [
    {
      "name": "Curcumin",
      "count": 5,
      "reasoning": "Main bioactive compound - scientific chemical name"
    }
  ],
  "total_count": 20
}`,

        safety: `You are analyzing a herbal medicine article for SAFETY & COMPLIANCE entities.

Extract ALL safety-related entities including:
- Diseases and medical conditions (Alzheimer's, Cancer, liver injury, etc.)
- Adverse effects and toxicity (hepatotoxicity, side effects, etc.)
- Regulatory bodies (FDA, Thai FDA, WHO, etc.)
- Safety warnings, contraindications, and precautions
- Clinical symptoms and biomarkers (HLA alleles, enzyme elevations, etc.)
- Drug interactions and dosage information

For each entity found, provide:
1. The entity name (exact text from article)
2. Number of occurrences in the text
3. Brief reasoning why it's a safety entity

Article text (first 5000 characters):
${text.substring(0, 5000)}

Respond ONLY in valid JSON format with no markdown, no backticks, no preamble:
{
  "entities": [
    {
      "name": "liver injury",
      "count": 4,
      "reasoning": "Adverse effect - important safety concern"
    }
  ],
  "total_count": 11
}`
    };
    
    return prompts[category];
}

// LLM-specific API calls
async function callClaude(prompt, config) {
    const message = await anthropic.messages.create({
        model: config.model,
        max_tokens: config.maxTokens,
        messages: [
            { role: 'user', content: prompt }
        ]
    });
    
    return message.content[0].text;
}

async function callOpenAI(prompt, config) {
    const completion = await openai.chat.completions.create({
        model: config.model,
        max_tokens: config.maxTokens,
        messages: [
            { role: 'user', content: prompt }
        ]
    });
    
    return completion.choices[0].message.content;
}

async function callGemini(prompt, config) {
    const model = genAI.getGenerativeModel({ model: config.model });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
}

async function callGroq(prompt, config) {
    const completion = await groq.chat.completions.create({
        model: config.model,
        max_tokens: config.maxTokens,
        messages: [
            { role: 'user', content: prompt }
        ]
    });
    
    return completion.choices[0].message.content;
}

// Unified LLM caller
async function callLLM(modelName, prompt) {
    const config = MODEL_CONFIGS[modelName];
    
    if (!config) {
        throw new Error(`Model ${modelName} not supported`);
    }
    
    let response;
    
    switch (config.provider) {
        case 'anthropic':
            response = await callClaude(prompt, config);
            break;
        case 'openai':
            response = await callOpenAI(prompt, config);
            break;
        case 'google':
            response = await callGemini(prompt, config);
            break;
        case 'groq':
            response = await callGroq(prompt, config);
            break;
        default:
            throw new Error(`Provider ${config.provider} not implemented`);
    }
    
    return response;
}

// Parse LLM response
function parseLLMResponse(responseText) {
    // Clean up response - remove markdown code blocks
    let cleaned = responseText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
    
    // Try to parse JSON
    try {
        const parsed = JSON.parse(cleaned);
        return parsed;
    } catch (error) {
        // If parsing fails, try to extract JSON from text
        const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        throw new Error('Could not parse LLM response as JSON');
    }
}

// API Routes

// Get available models
app.get('/api/models', (req, res) => {
    const models = Object.keys(MODEL_CONFIGS).map(key => ({
        id: key,
        name: key,
        provider: MODEL_CONFIGS[key].provider,
        model: MODEL_CONFIGS[key].model
    }));
    
    res.json({ models });
});

// Analyze entities
app.post('/api/analyze', async (req, res) => {
    try {
        const { text, category, model = 'claude-sonnet-4' } = req.body;
        
        // Validate input
        if (!text || text.length < 100) {
            return res.status(400).json({
                error: 'Text must be at least 100 characters'
            });
        }
        
        if (!['cultural', 'scientific', 'safety'].includes(category)) {
            return res.status(400).json({
                error: 'Category must be cultural, scientific, or safety'
            });
        }
        
        // Create prompt
        const prompt = createPrompt(text, category);
        
        // Call LLM
        console.log(`Calling ${model} for ${category} analysis...`);
        const responseText = await callLLM(model, prompt);
        
        // Parse response
        const parsed = parseLLMResponse(responseText);
        
        // Calculate metrics
        const totalCount = parsed.total_count || parsed.entities.length;
        const completeness = Math.round((totalCount / 10) * 100);
        const efficacy = totalCount >= 10 ? 100 : Math.round((totalCount / 10) * 100);
        
        res.json({
            entities: parsed.entities || [],
            count: totalCount,
            completeness,
            efficacy,
            model_used: model
        });
        
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            error: error.message,
            details: error.stack
        });
    }
});

// Generate summary
app.post('/api/summary', async (req, res) => {
    try {
        const { cultural, scientific, safety, model = 'claude-sonnet-4' } = req.body;
        
        const prompt = `Based on the NER analysis results below, provide a brief summary (2-3 sentences in Thai) of the article's quality in terms of named entities coverage:

Cultural Entities: ${cultural}
Scientific Entities: ${scientific}
Safety Entities: ${safety}

Threshold: Each category needs ≥10 entities to pass.

Provide the summary in Thai language, focusing on strengths and areas for improvement.`;
        
        console.log(`Calling ${model} for summary...`);
        const summary = await callLLM(model, prompt);
        
        res.json({
            summary: summary.trim(),
            model_used: model
        });
        
    } catch (error) {
        console.error('Summary error:', error);
        res.status(500).json({
            error: error.message
        });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        models: Object.keys(MODEL_CONFIGS).length,
        providers: ['anthropic', 'openai', 'google', 'groq']
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Multi-LLM NER Backend running on http://localhost:${PORT}`);
    console.log(`📊 Supporting ${Object.keys(MODEL_CONFIGS).length} models from 4 providers`);
    console.log(`\nAvailable models:`);
    Object.keys(MODEL_CONFIGS).forEach(key => {
        console.log(`  - ${key} (${MODEL_CONFIGS[key].provider})`);
    });
});

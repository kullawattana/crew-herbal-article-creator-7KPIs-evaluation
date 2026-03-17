# server.py - Python Flask Backend for Multi-LLM NER
# Supports: Claude, GPT, Gemini, Llama (via Groq)

from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic
import openai
import google.generativeai as genai
from groq import Groq
import os
import json
import re
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize clients
anthropic_client = anthropic.Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))
openai_client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))
groq_client = Groq(api_key=os.getenv('GROQ_API_KEY'))

# Model configurations
MODEL_CONFIGS = {
    # Claude models
    'claude-sonnet-4': {
        'provider': 'anthropic',
        'model': 'claude-sonnet-4-20250514',
        'max_tokens': 4000
    },
    'claude-opus-4': {
        'provider': 'anthropic',
        'model': 'claude-opus-4-20250514',
        'max_tokens': 4000
    },
    'claude-haiku-4': {
        'provider': 'anthropic',
        'model': 'claude-haiku-4-20250514',
        'max_tokens': 4000
    },
    
    # OpenAI GPT models
    'gpt-4': {
        'provider': 'openai',
        'model': 'gpt-4-turbo-preview',
        'max_tokens': 4000
    },
    'gpt-4o': {
        'provider': 'openai',
        'model': 'gpt-4o',
        'max_tokens': 4000
    },
    'gpt-3.5-turbo': {
        'provider': 'openai',
        'model': 'gpt-3.5-turbo',
        'max_tokens': 4000
    },
    
    # Google Gemini models
    'gemini-2.0-flash': {
        'provider': 'google',
        'model': 'gemini-2.0-flash-exp',
        'max_tokens': 4000
    },
    'gemini-1.5-pro': {
        'provider': 'google',
        'model': 'gemini-1.5-pro',
        'max_tokens': 4000
    },
    
    # Llama via Groq
    'llama-3.3-70b': {
        'provider': 'groq',
        'model': 'llama-3.3-70b-versatile',
        'max_tokens': 4000
    },
    'llama-3.1-8b': {
        'provider': 'groq',
        'model': 'llama-3.1-8b-instant',
        'max_tokens': 4000
    }
}

def create_prompt(text, category):
    """Create prompt based on category"""
    prompts = {
        'cultural': f"""You are analyzing a herbal medicine article for CULTURAL AUTHENTICITY entities.

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
{text[:5000]}

Respond ONLY in valid JSON format with no markdown, no backticks, no preamble:
{{
  "entities": [
    {{
      "name": "Thai",
      "count": 3,
      "reasoning": "Geographic and cultural reference to Thailand's traditional medicine"
    }}
  ],
  "total_count": 12
}}""",

        'scientific': f"""You are analyzing a herbal medicine article for SCIENTIFIC VALIDITY entities.

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
{text[:5000]}

Respond ONLY in valid JSON format with no markdown, no backticks, no preamble:
{{
  "entities": [
    {{
      "name": "Curcumin",
      "count": 5,
      "reasoning": "Main bioactive compound - scientific chemical name"
    }}
  ],
  "total_count": 20
}}""",

        'safety': f"""You are analyzing a herbal medicine article for SAFETY & COMPLIANCE entities.

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
{text[:5000]}

Respond ONLY in valid JSON format with no markdown, no backticks, no preamble:
{{
  "entities": [
    {{
      "name": "liver injury",
      "count": 4,
      "reasoning": "Adverse effect - important safety concern"
    }}
  ],
  "total_count": 11
}}"""
    }
    
    return prompts[category]

def call_claude(prompt, config):
    """Call Anthropic Claude API"""
    message = anthropic_client.messages.create(
        model=config['model'],
        max_tokens=config['max_tokens'],
        messages=[
            {'role': 'user', 'content': prompt}
        ]
    )
    return message.content[0].text

def call_openai(prompt, config):
    """Call OpenAI GPT API"""
    completion = openai_client.chat.completions.create(
        model=config['model'],
        max_tokens=config['max_tokens'],
        messages=[
            {'role': 'user', 'content': prompt}
        ]
    )
    return completion.choices[0].message.content

def call_gemini(prompt, config):
    """Call Google Gemini API"""
    model = genai.GenerativeModel(config['model'])
    response = model.generate_content(prompt)
    return response.text

def call_groq(prompt, config):
    """Call Groq (Llama) API"""
    completion = groq_client.chat.completions.create(
        model=config['model'],
        max_tokens=config['max_tokens'],
        messages=[
            {'role': 'user', 'content': prompt}
        ]
    )
    return completion.choices[0].message.content

def call_llm(model_name, prompt):
    """Unified LLM caller"""
    config = MODEL_CONFIGS.get(model_name)
    
    if not config:
        raise ValueError(f"Model {model_name} not supported")
    
    provider = config['provider']
    
    if provider == 'anthropic':
        return call_claude(prompt, config)
    elif provider == 'openai':
        return call_openai(prompt, config)
    elif provider == 'google':
        return call_gemini(prompt, config)
    elif provider == 'groq':
        return call_groq(prompt, config)
    else:
        raise ValueError(f"Provider {provider} not implemented")

def parse_llm_response(response_text):
    """Parse LLM response to JSON"""
    # Clean up response
    cleaned = re.sub(r'```json\n?|```\n?', '', response_text).strip()
    
    # Try to parse JSON
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        # Try to extract JSON from text
        json_match = re.search(r'\{[\s\S]*\}', cleaned)
        if json_match:
            return json.loads(json_match.group(0))
        raise ValueError('Could not parse LLM response as JSON')

# Routes

@app.route('/api/models', methods=['GET'])
def get_models():
    """Get available models"""
    models = [
        {
            'id': key,
            'name': key,
            'provider': config['provider'],
            'model': config['model']
        }
        for key, config in MODEL_CONFIGS.items()
    ]
    return jsonify({'models': models})

@app.route('/api/analyze', methods=['POST'])
def analyze():
    """Analyze entities"""
    try:
        data = request.json
        text = data.get('text', '')
        category = data.get('category', '')
        model = data.get('model', 'claude-sonnet-4')
        
        # Validate input
        if not text or len(text) < 100:
            return jsonify({'error': 'Text must be at least 100 characters'}), 400
        
        if category not in ['cultural', 'scientific', 'safety']:
            return jsonify({'error': 'Category must be cultural, scientific, or safety'}), 400
        
        # Create prompt
        prompt = create_prompt(text, category)
        
        # Call LLM
        print(f'Calling {model} for {category} analysis...')
        response_text = call_llm(model, prompt)
        
        # Parse response
        parsed = parse_llm_response(response_text)
        
        # Calculate metrics
        total_count = parsed.get('total_count', len(parsed.get('entities', [])))
        completeness = round((total_count / 10) * 100)
        efficacy = 100 if total_count >= 10 else round((total_count / 10) * 100)
        
        return jsonify({
            'entities': parsed.get('entities', []),
            'count': total_count,
            'completeness': completeness,
            'efficacy': efficacy,
            'model_used': model
        })
        
    except Exception as e:
        print(f'Analysis error: {str(e)}')
        return jsonify({
            'error': str(e),
            'details': str(type(e).__name__)
        }), 500

@app.route('/api/summary', methods=['POST'])
def generate_summary():
    """Generate summary"""
    try:
        data = request.json
        cultural = data.get('cultural', 0)
        scientific = data.get('scientific', 0)
        safety = data.get('safety', 0)
        model = data.get('model', 'claude-sonnet-4')
        
        prompt = f"""Based on the NER analysis results below, provide a brief summary (2-3 sentences in Thai) of the article's quality in terms of named entities coverage:

Cultural Entities: {cultural}
Scientific Entities: {scientific}
Safety Entities: {safety}

Threshold: Each category needs ≥10 entities to pass.

Provide the summary in Thai language, focusing on strengths and areas for improvement."""
        
        print(f'Calling {model} for summary...')
        summary = call_llm(model, prompt)
        
        return jsonify({
            'summary': summary.strip(),
            'model_used': model
        })
        
    except Exception as e:
        print(f'Summary error: {str(e)}')
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check"""
    return jsonify({
        'status': 'ok',
        'models': len(MODEL_CONFIGS),
        'providers': ['anthropic', 'openai', 'google', 'groq']
    })

if __name__ == '__main__':
    print('🚀 Multi-LLM NER Backend (Python) running on http://localhost:3000')
    print(f'📊 Supporting {len(MODEL_CONFIGS)} models from 4 providers')
    print('\nAvailable models:')
    for key, config in MODEL_CONFIGS.items():
        print(f"  - {key} ({config['provider']})")
    
    app.run(host='0.0.0.0', port=3000, debug=True)

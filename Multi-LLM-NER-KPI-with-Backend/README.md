# 🤖 Multi-LLM NER Backend

Backend server ที่รองรับ AI Models หลายตัวสำหรับการวิเคราะห์ Named Entities ในบทความสมุนไพร

## 🎯 รองรับ AI Models

### 🟠 **Claude (Anthropic)**
- Claude Sonnet 4 (แนะนำ - สมดุลดี)
- Claude Opus 4 (แม่นยำสูงสุด)
- Claude Haiku 4 (เร็วที่สุด)

### 🟢 **GPT (OpenAI)**
- GPT-4o (ใหม่ล่าสุด)
- GPT-4 Turbo
- GPT-3.5 Turbo (ประหยัด)

### 🔵 **Gemini (Google)**
- Gemini 2.0 Flash (รุ่นใหม่)
- Gemini 1.5 Pro

### 🟣 **Llama (Meta via Groq)**
- Llama 3.3 70B (แม่นยำ)
- Llama 3.1 8B (เร็ว)

---

## 🚀 การติดตั้งและใช้งาน

### **ขั้นตอนที่ 1: ติดตั้ง Dependencies**

```bash
cd backend
npm install
```

**Dependencies ที่จะติดตั้ง:**
- `express` - Web framework
- `@anthropic-ai/sdk` - Claude API
- `openai` - GPT API
- `@google/generative-ai` - Gemini API
- `groq-sdk` - Llama via Groq
- `cors` - Enable CORS
- `dotenv` - Environment variables

---

### **ขั้นตอนที่ 2: สร้างไฟล์ .env**

```bash
cp .env.example .env
```

แก้ไขไฟล์ `.env` และใส่ API keys ของคุณ:

```env
# ใส่เฉพาะ API keys ของ providers ที่คุณต้องการใช้

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

### **ขั้นตอนที่ 3: รัน Server**

```bash
npm start
```

หรือใช้ development mode (auto-reload):

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

### **ขั้นตอนที่ 4: เปิด Frontend**

```bash
# เปิดไฟล์ HTML ใน browser
open public/index.html
```

หรือ serve ผ่าน HTTP server:

```bash
# ติดตั้ง http-server (ครั้งเดียว)
npm install -g http-server

# รัน server
cd public
http-server -p 8080
```

แล้วเปิด: `http://localhost:8080`

---

## 📡 API Endpoints

### **1. Get Available Models**

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

### **2. Analyze Entities**

```
POST /api/analyze
```

**Request Body:**
```json
{
  "text": "บทความเกี่ยวกับสมุนไพร...",
  "category": "cultural",
  "model": "claude-sonnet-4"
}
```

**Parameters:**
- `text` (required) - บทความที่ต้องการวิเคราะห์ (ต้องยาวกว่า 100 ตัวอักษร)
- `category` (required) - `cultural`, `scientific`, หรือ `safety`
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

### **3. Generate Summary**

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
  "summary": "บทความมีความสมบูรณ์สูงในทุกมิติ...",
  "model_used": "claude-sonnet-4"
}
```

---

### **4. Health Check**

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

## 🔑 วิธีขอ API Keys

### **1. Anthropic Claude**
- ไปที่: https://console.anthropic.com/
- สมัครสมาชิก / Login
- ไปที่ API Keys
- สร้าง API key ใหม่
- Copy `sk-ant-xxxxx`

**ราคา:**
- Sonnet 4: ~$3/1M input tokens
- Opus 4: ~$15/1M input tokens  
- Haiku 4: ~$0.25/1M input tokens

---

### **2. OpenAI GPT**
- ไปที่: https://platform.openai.com/api-keys
- Login / สมัครสมาชิก
- สร้าง API key
- Copy `sk-xxxxx`

**ราคา:**
- GPT-4o: ~$5/1M input tokens
- GPT-4: ~$30/1M input tokens
- GPT-3.5: ~$0.5/1M input tokens

---

### **3. Google Gemini**
- ไปที่: https://makersuite.google.com/app/apikey
- Login ด้วย Google Account
- สร้าง API key
- Copy key

**ราคา:**
- Gemini 2.0 Flash: Free tier + ~$0.075/1M tokens
- Gemini 1.5 Pro: ~$1.25/1M tokens

---

### **4. Groq (Llama)**
- ไปที่: https://console.groq.com/keys
- สมัครสมาชิก / Login
- สร้าง API key
- Copy `gsk_xxxxx`

**ราคา:**
- **ฟรี!** (มี rate limit)
- Llama 3.3 70B: Free
- Llama 3.1 8B: Free

---

## 💡 เทคนิคการเลือก Model

### **เลือกตามงบประมาณ:**

| งบประมาณ | แนะนำ |
|----------|-------|
| **ฟรี** | Groq (Llama 3.3 70B) |
| **ประหยัด** | GPT-3.5 Turbo, Claude Haiku 4 |
| **ปานกลาง** | Claude Sonnet 4, Gemini 2.0 Flash |
| **แม่นยำสูงสุด** | Claude Opus 4, GPT-4 |

---

### **เลือกตามความเร็ว:**

| ต้องการ | แนะนำ |
|---------|-------|
| **เร็วที่สุด** | Claude Haiku 4, Llama 3.1 8B |
| **เร็วพอสมควร** | Gemini 2.0 Flash, GPT-4o |
| **ปานกลาง** | Claude Sonnet 4, Llama 3.3 70B |
| **ช้า แต่แม่นยำ** | Claude Opus 4, GPT-4 |

---

### **เลือกตามความแม่นยำ:**

| ระดับแม่นยำ | แนะนำ |
|------------|-------|
| **95%+** | Claude Opus 4, GPT-4 |
| **90-95%** | Claude Sonnet 4, GPT-4o, Llama 3.3 70B |
| **85-90%** | Gemini 2.0 Flash, GPT-3.5 |
| **80-85%** | Claude Haiku 4, Llama 3.1 8B |

---

## 🔧 Troubleshooting

### **ปัญหา: API Key ไม่ถูกต้อง**
```
Error: Invalid API key
```

**แก้ไข:**
1. ตรวจสอบ API key ในไฟล์ `.env`
2. ตรวจสอบว่า copy มาถูกต้อง (ไม่มีช่องว่าง)
3. ตรวจสอบว่า API key ยังใช้งานได้ (ไม่ถูก revoke)

---

### **ปัญหา: CORS Error**
```
Access to fetch has been blocked by CORS policy
```

**แก้ไข:**
- Server มี CORS middleware แล้ว
- ตรวจสอบว่า Frontend เรียก `http://localhost:3000` ถูกต้อง
- ลอง restart server

---

### **ปัญหา: Rate Limit**
```
Error: Rate limit exceeded
```

**แก้ไข:**
- รอสักครู่แล้วลองใหม่
- ใช้ Model ที่มี rate limit สูงกว่า
- Groq: ใช้ Llama 3.1 8B แทน 3.3 70B

---

### **ปัญหา: Server ไม่ทำงาน**
```
Error: connect ECONNREFUSED
```

**แก้ไข:**
1. ตรวจสอบว่า server รันอยู่: `npm start`
2. ตรวจสอบ port: `http://localhost:3000`
3. ดู console log หา error

---

## 📊 ตัวอย่างการใช้งาน

### **ทดสอบด้วย curl:**

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

## 🐳 Docker Support (Optional)

สร้าง `Dockerfile`:

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

## 📝 License

MIT

---

## 🤝 Contributing

Pull requests are welcome!

---

## 📧 Support

หากมีปัญหาหรือคำถาม กรุณาเปิด Issue ใน GitHub

---

**เวอร์ชัน:** 1.0.0  
**วันที่อัปเดต:** 6 กุมภาพันธ์ 2026

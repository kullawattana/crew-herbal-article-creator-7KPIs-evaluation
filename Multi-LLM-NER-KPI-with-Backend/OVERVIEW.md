# 🌟 Multi-LLM NER Backend - Overview

## 📦 สิ่งที่คุณได้รับ

ระบบ Backend ที่สมบูรณ์สำหรับการวิเคราะห์ Named Entities ด้วย AI Models หลายตัว

---

## 📁 โครงสร้างไฟล์

```
backend/
├── server.js              # Node.js backend (แนะนำ)
├── server.py              # Python Flask backend (alternative)
├── package.json           # Node.js dependencies
├── requirements.txt       # Python dependencies
├── .env.example           # Template สำหรับ API keys
├── README.md              # เอกสารหลักแบบละเอียด
├── QUICKSTART.md          # คู่มือเริ่มต้นอย่างรวดเร็ว (5 นาที)
└── public/
    └── index.html         # Frontend interface พร้อม Model Selector
```

---

## 🎯 รองรับ AI Models (10 models จาก 4 providers)

### **🟠 Claude (Anthropic) - 3 models**
- **Claude Sonnet 4** - สมดุลดี ระหว่างความเร็วและความแม่นยำ
- **Claude Opus 4** - แม่นยำสูงสุด สำหรับงานที่ต้องการคุณภาพสูง
- **Claude Haiku 4** - เร็วที่สุด ราคาถูก

### **🟢 GPT (OpenAI) - 3 models**
- **GPT-4o** - รุ่นใหม่ล่าสุด multimodal
- **GPT-4 Turbo** - แม่นยำ context window ใหญ่
- **GPT-3.5 Turbo** - ประหยัด เหมาะกับงานทั่วไป

### **🔵 Gemini (Google) - 2 models**
- **Gemini 2.0 Flash** - รุ่นใหม่ เร็ว ราคาถูก
- **Gemini 1.5 Pro** - แม่นยำ context window ใหญ่มาก

### **🟣 Llama (Meta via Groq) - 2 models**
- **Llama 3.3 70B** - แม่นยำ ฟรี!
- **Llama 3.1 8B** - เร็วมาก ฟรี!

---

## 🚀 เริ่มต้นใช้งาน (เลือก 1 ใน 2 วิธี)

### **วิธีที่ 1: Node.js (แนะนำ)** ⚡

```bash
# 1. Install dependencies
npm install

# 2. Setup API keys
cp .env.example .env
nano .env

# 3. Run server
npm start

# 4. เปิด frontend
open public/index.html
```

**ข้อดี:**
- ✅ ติดตั้งง่าย
- ✅ Performance ดี
- ✅ Ecosystem ใหญ่

---

### **วิธีที่ 2: Python** 🐍

```bash
# 1. Create virtual environment
python3 -m venv venv
source venv/bin/activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Setup API keys
cp .env.example .env
nano .env

# 4. Run server
python server.py

# 5. เปิด frontend
open public/index.html
```

**ข้อดี:**
- ✅ คุ้นเคยสำหรับ Data Scientists
- ✅ ง่ายต่อการ integrate กับ ML tools
- ✅ Library เยอะ

---

## 🎨 Frontend Features

### **1. Model Selector**
เลือก AI Model ได้จาก dropdown:
- จัดกลุ่มตาม Provider (Claude, GPT, Gemini, Llama)
- แสดงคำแนะนำของแต่ละ model
- สี color-coded ตาม provider

### **2. File Upload**
- อัปโหลด `.txt` file
- Drag & drop support
- แสดงชื่อไฟล์ที่อัปโหลด

### **3. Progress Indicator**
- Progress bar แสดงความคืบหน้า
- แสดงสถานะแต่ละขั้นตอน:
  1. Cultural Analysis (25%)
  2. Scientific Analysis (50%)
  3. Safety Analysis (75%)
  4. Summary Generation (100%)

### **4. Results Display**
- **Pass/Fail Box** พร้อมแสดง model ที่ใช้
- **Summary Cards** แยกตาม 3 หมวด
- **AI Summary** สรุปโดย LLM
- **Entity Details** พร้อม reasoning

---

## 📊 ตัวอย่างการทำงาน

### **Input:**
```
บทความเกี่ยวกับขมิ้นชัน (Turmeric)
- ความยาว: 5,000 คำ
- เลือก Model: Claude Sonnet 4
```

### **Processing:**
```
1. Cultural Analysis → 12 entities found
2. Scientific Analysis → 20 entities found  
3. Safety Analysis → 11 entities found
4. Generate Summary → สรุปภาพรวม
```

### **Output:**
```json
{
  "cultural": {
    "count": 12,
    "completeness": 120%,
    "efficacy": 100%,
    "entities": [
      {
        "name": "Thai",
        "count": 3,
        "reasoning": "Geographic and cultural reference..."
      }
    ]
  },
  "decision": "PASS",
  "model_used": "claude-sonnet-4"
}
```

---

## 💰 ค่าใช้จ่าย (ประมาณการ)

### **ต่อ 1 บทความ (~5,000 คำ):**

| Model | ค่าใช้จ่าย | ความเร็ว | แม่นยำ |
|-------|-----------|---------|--------|
| **Llama 3.3 70B** | **ฟรี** | 2-3 นาที | 90% |
| **Gemini 2.0 Flash** | $0.01 | 1-2 นาที | 92% |
| **Claude Sonnet 4** | $0.02 | 2-3 นาที | 95% |
| **GPT-4o** | $0.03 | 1-2 นาที | 93% |
| **Claude Opus 4** | $0.10 | 3-4 นาที | 97% |

---

## 🔑 การขอ API Keys

### **1. ฟรี: Groq (Llama)**
- URL: https://console.groq.com/keys
- สมัคร → สร้าง key → ใช้ได้เลย (ฟรี!)
- Rate limit: ~30 requests/minute

### **2. ถูก: Google Gemini**
- URL: https://makersuite.google.com/app/apikey
- Free tier: 60 requests/minute
- ราคา: ~$0.075/1M tokens หลัง free tier

### **3. สมดุล: OpenAI GPT**
- URL: https://platform.openai.com/api-keys
- เติมเงิน $5-10 ขั้นต่ำ
- ราคา: $0.5-$5/1M tokens

### **4. แม่นยำสูง: Anthropic Claude**
- URL: https://console.anthropic.com/
- เติมเงิน $5-10 ขั้นต่ำ
- ราคา: $0.25-$15/1M tokens

---

## 🏗️ Architecture

```
┌─────────────┐
│   Browser   │
│  (Frontend) │
└──────┬──────┘
       │ HTTP Request
       │ (POST /api/analyze)
       ↓
┌──────────────┐
│ Express.js/  │
│    Flask     │ ← Backend Server (Node.js หรือ Python)
└──────┬───────┘
       │
       ├─→ Claude API     (Anthropic)
       ├─→ GPT API        (OpenAI)
       ├─→ Gemini API     (Google)
       └─→ Groq API       (Meta Llama)
       
       ↓ Response
┌──────────────┐
│   Results    │
│   Display    │
└──────────────┘
```

---

## 🎯 Use Cases

### **1. Research**
- เปรียบเทียบผลลัพธ์จาก Models ต่างๆ
- วิเคราะห์ความแม่นยำของแต่ละ provider
- ทดสอบ prompts ต่างๆ

### **2. Production**
- ใช้ Llama 3.3 70B (ฟรี) สำหรับ quick checks
- ใช้ Claude Sonnet 4 สำหรับ final review
- ใช้ GPT-3.5 สำหรับ bulk processing

### **3. Cost Optimization**
- เริ่มด้วย Llama (ฟรี) → filter บทความที่ผ่านเบื้องต้น
- ใช้ Claude Sonnet 4 → บทความที่ผ่าน filter
- ใช้ Claude Opus 4 → เฉพาะบทความสำคัญ

---

## 📈 Performance Comparison

| Model | Accuracy | Speed | Cost | Recommendation |
|-------|----------|-------|------|----------------|
| Claude Opus 4 | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐ | Final review |
| Claude Sonnet 4 | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | Best overall |
| GPT-4o | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | Fast & accurate |
| Llama 3.3 70B | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Free option |
| Gemini 2.0 Flash | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Cost-effective |

---

## 🛠️ Customization

### **1. เพิ่ม Model ใหม่**
แก้ไขใน `server.js` หรือ `server.py`:

```javascript
MODEL_CONFIGS['new-model'] = {
    provider: 'openai',
    model: 'gpt-5',
    maxTokens: 4000
};
```

### **2. ปรับ Prompts**
แก้ไขใน function `createPrompt()`:

```javascript
function createPrompt(text, category) {
    // ปรับ prompts ตามต้องการ
}
```

### **3. เพิ่ม Categories**
เพิ่มหมวดใหม่ เช่น "Efficacy", "Marketing":

```javascript
const categories = ['cultural', 'scientific', 'safety', 'efficacy'];
```

---

## 📚 Documentation

- **QUICKSTART.md** - เริ่มต้นใช้งาน 5 นาที
- **README.md** - เอกสารหลักแบบละเอียด
- **server.js** - Code documentation (Node.js)
- **server.py** - Code documentation (Python)

---

## 🔒 Security

- ✅ API keys ใน `.env` (ไม่ commit to git)
- ✅ CORS enabled สำหรับ localhost
- ✅ Input validation
- ✅ Error handling

---

## 🚢 Deployment (Optional)

### **Heroku:**
```bash
heroku create
git push heroku main
heroku config:set ANTHROPIC_API_KEY=xxx
```

### **AWS Lambda:**
- ใช้ Serverless framework
- Deploy เป็น API Gateway + Lambda

### **Google Cloud Run:**
```bash
gcloud run deploy --source .
```

---

## 🎓 Learning Resources

- Anthropic Docs: https://docs.anthropic.com/
- OpenAI Docs: https://platform.openai.com/docs
- Gemini Docs: https://ai.google.dev/docs
- Groq Docs: https://console.groq.com/docs

---

## 🤝 Support

- อ่าน QUICKSTART.md สำหรับการเริ่มต้น
- อ่าน README.md สำหรับรายละเอียด
- ดูตัวอย่าง code ใน server.js/server.py
- เปิด Issue ใน GitHub

---

## ✨ Next Steps

1. **เลือกภาษา** (Node.js หรือ Python)
2. **ติดตั้ง dependencies**
3. **ขอ API keys** (เริ่มจาก Groq - ฟรี!)
4. **รัน server**
5. **ทดลองกับ Models ต่างๆ**
6. **เปรียบเทียบผลลัพธ์**
7. **เลือก Model ที่เหมาะกับคุณ**

---

**Happy Coding!** 🚀

เวอร์ชัน: 1.0  
วันที่: 6 กุมภาพันธ์ 2026

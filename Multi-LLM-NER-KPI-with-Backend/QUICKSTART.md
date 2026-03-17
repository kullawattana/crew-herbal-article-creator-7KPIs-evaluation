# 🚀 Quick Start Guide - Multi-LLM NER Backend

## 📋 เลือกภาษาที่ต้องการใช้

คุณสามารถเลือกใช้ได้ 2 ภาษา:

### **Option A: Node.js** (แนะนำ)
✅ ง่ายกว่า  
✅ Performance ดี  
✅ Ecosystem ใหญ่

### **Option B: Python**
✅ คุ้นเคยสำหรับ Data Scientist  
✅ มี library เพิ่มเติมเยอะ  
✅ ง่ายต่อการ integrate กับ ML tools

---

## 🎯 Node.js Setup (5 นาทีเสร็จ)

### **1. Install Node.js**
```bash
# Download from: https://nodejs.org/
# หรือใช้ nvm:
nvm install 18
nvm use 18
```

### **2. Clone & Install**
```bash
cd backend
npm install
```

### **3. Configure API Keys**
```bash
cp .env.example .env
nano .env  # แก้ไขใส่ API keys
```

**ใส่ API keys:**
```env
ANTHROPIC_API_KEY=sk-ant-xxxxx
OPENAI_API_KEY=sk-xxxxx
GOOGLE_API_KEY=xxxxx
GROQ_API_KEY=gsk_xxxxx
```

### **4. Run Server**
```bash
npm start
```

### **5. Test**
```bash
# เปิด browser
open http://localhost:3000/health

# หรือใช้ curl
curl http://localhost:3000/health
```

### **6. Open Frontend**
```bash
open public/index.html
```

---

## 🐍 Python Setup (5 นาทีเสร็จ)

### **1. Install Python**
```bash
# ต้องใช้ Python 3.8+
python3 --version
```

### **2. Create Virtual Environment**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### **3. Install Dependencies**
```bash
pip install -r requirements.txt
```

### **4. Configure API Keys**
```bash
cp .env.example .env
nano .env  # แก้ไขใส่ API keys
```

### **5. Run Server**
```bash
python server.py
```

### **6. Test**
```bash
# เปิด browser
open http://localhost:3000/health

# หรือใช้ curl
curl http://localhost:3000/health
```

### **7. Open Frontend**
```bash
open public/index.html
```

---

## 🔑 ขอ API Keys (เลือกตามงบประมาณ)

### **ฟรี: Groq (Llama)** 💰💰💰
1. ไปที่: https://console.groq.com/keys
2. สมัครสมาชิก (ฟรี!)
3. สร้าง API key
4. ใส่ใน `.env`: `GROQ_API_KEY=gsk_xxxxx`

**ข้อดี:** ฟรี, เร็ว, แม่นยำพอใช้  
**ข้อจำกัด:** มี rate limit

---

### **ประหยัด: Google Gemini** 💰💰
1. ไปที่: https://makersuite.google.com/app/apikey
2. Login ด้วย Google
3. สร้าง API key
4. ใส่ใน `.env`: `GOOGLE_API_KEY=xxxxx`

**ข้อดี:** Free tier ดี, ราคาถูก  
**ราคา:** ~$0.075/1M tokens (หลัง free tier)

---

### **สมดุล: OpenAI GPT** 💰
1. ไปที่: https://platform.openai.com/api-keys
2. Login / สมัครสมาชิก
3. เติมเงิน $5-10
4. สร้าง API key
5. ใส่ใน `.env`: `OPENAI_API_KEY=sk-xxxxx`

**ข้อดี:** แม่นยำ, มีหลาย model  
**ราคา:** $0.5-$5/1M tokens

---

### **แม่นยำสูงสุด: Anthropic Claude** 💰
1. ไปที่: https://console.anthropic.com/
2. สมัครสมาชิก
3. เติมเงิน $5-10
4. สร้าง API key
5. ใส่ใน `.env`: `ANTHROPIC_API_KEY=sk-ant-xxxxx`

**ข้อดี:** แม่นยำสูงสุด, เข้าใจ context ดี  
**ราคา:** $0.25-$15/1M tokens

---

## 🎮 ทดสอบการใช้งาน

### **1. ทดสอบผ่าน Frontend**
```bash
# เปิดไฟล์ HTML
open public/index.html

# เลือก Model จาก dropdown
# อัปโหลดไฟล์บทความ
# คลิก "วิเคราะห์ด้วย AI"
# ดูผลลัพธ์!
```

---

### **2. ทดสอบผ่าน API (curl)**

**Get Models:**
```bash
curl http://localhost:3000/api/models
```

**Analyze Cultural Entities:**
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Turmeric is a traditional Thai herb used in Ayurveda...",
    "category": "cultural",
    "model": "claude-sonnet-4"
  }'
```

**Analyze Scientific Entities:**
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Curcumin is the main bioactive compound measured by LC-MS/MS...",
    "category": "scientific",
    "model": "gpt-4o"
  }'
```

---

## 📊 เปรียบเทียบ Models

### **ความเร็ว vs ความแม่นยำ**

```
แม่นยำสูง ────────────────────────► เร็ว
┌────────┬──────────┬──────────┬──────────┐
│Opus 4  │Sonnet 4  │GPT-4o    │Haiku 4   │
│GPT-4   │Llama 3.3 │Gemini 2.0│Llama 3.1 │
└────────┴──────────┴──────────┴──────────┘
แพง ◄─────────────────────────────► ถูก
```

---

### **แนะนำตามกรณีใช้งาน**

| กรณี | แนะนำ |
|------|-------|
| **ทดลองครั้งแรก** | Groq Llama 3.3 (ฟรี) |
| **ใช้งานจริง (งบประมาณจำกัด)** | Gemini 2.0 Flash |
| **ใช้งานจริง (งบประมาณปานกลาง)** | Claude Sonnet 4 |
| **Research/การประเมินขั้นสุดท้าย** | Claude Opus 4 |
| **Production (ปริมาณมาก)** | GPT-3.5 Turbo |

---

## 🛠️ Troubleshooting

### **ปัญหา: Cannot find module**
```bash
# Node.js
npm install

# Python
pip install -r requirements.txt
```

---

### **ปัญหา: Port 3000 already in use**
```bash
# แก้ไขใน .env
PORT=3001

# หรือ kill process ที่ใช้ port 3000
lsof -ti:3000 | xargs kill
```

---

### **ปัญหา: CORS Error**
```bash
# ตรวจสอบว่า server รันอยู่
curl http://localhost:3000/health

# ถ้าไม่ได้ - restart server
```

---

### **ปัญหา: API Key Invalid**
```bash
# ตรวจสอบ .env file
cat .env

# ตรวจสอบว่าไม่มีช่องว่างข้างหน้า/หลัง API key
ANTHROPIC_API_KEY=sk-ant-xxxxx  # ✅ ถูก
ANTHROPIC_API_KEY= sk-ant-xxxxx # ❌ ผิด (มีช่องว่าง)
```

---

## 📈 การ Monitor การใช้งาน

### **ดู Logs:**
```bash
# Node.js - logs แสดงที่ console

# Python - logs แสดงที่ console
# เพิ่ม logging level ใน server.py
```

---

### **ตรวจสอบค่าใช้จ่าย:**

- **Claude**: https://console.anthropic.com/settings/billing
- **GPT**: https://platform.openai.com/usage
- **Gemini**: https://console.cloud.google.com/billing
- **Groq**: https://console.groq.com/usage (ฟรี!)

---

## 🎓 Next Steps

1. **ทดลองกับ Models ต่างๆ** เพื่อหาที่เหมาะกับงานคุณ
2. **เปรียบเทียบผลลัพธ์** จาก Models ต่างๆ
3. **ปรับ Prompts** ให้เหมาะกับบทความของคุณ
4. **Deploy to Production** (Heroku, AWS, GCP, etc.)

---

## 📚 เอกสารเพิ่มเติม

- `README.md` - เอกสารหลักแบบละเอียด
- `server.js` - Node.js backend code
- `server.py` - Python backend code
- `public/index.html` - Frontend interface

---

## 🤝 Need Help?

- อ่าน README.md ฉบับเต็ม
- ดูตัวอย่างใน code comments
- เปิด Issue ใน GitHub

---

**Happy Coding!** 🚀

---

**เวอร์ชัน:** 1.0  
**วันที่อัปเดต:** 6 กุมภาพันธ์ 2026

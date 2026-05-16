# EchoScribe AI

AI-powered mobile audio transcription and summarization app built with Google Gemini AI.

EchoScribe AI enables users to record, transcribe, summarize, translate, and manage audio conversations, meetings, lectures, interviews, podcasts, and voice notes using advanced AI-powered speech recognition and natural language processing.

---

## Features

### Audio Recording
- High-quality microphone recording
- Background recording support
- Pause / Resume / Stop controls
- Lock-screen recording support
- Automatic audio saving
- Audio waveform visualization

### AI Transcription
- Speech-to-text transcription
- Multi-language support
- Real-time streaming transcription
- Timestamp generation
- Smart punctuation formatting
- Speaker segmentation
- Noise filtering

### AI-Powered Features
- Accurate Transcription
- Action item extraction
- AI chat with transcripts
- Keyword extraction

### Transcript Management
- Search transcripts
- Edit transcript text
- Auto-save functionality
---

# Tech Stack

## Mobile App
- React Native / Flutter
- TypeScript
- Zustand / Context API
- NativeWind / TailwindCSS

## Backend
- Node.js
- Express.js
- TypeScript

## AI Integration
- Google Gemini API
- Gemini 2.5 Pro / Flash

## Database
- PostgreSQL
- Prisma ORM

## Authentication
- Firebase Authentication
- Clerk Authentication

## Storage
- Firebase Storage
- Local encrypted storage

## Deployment
- Frontend → Vercel / Expo
- Backend → Railway / Render
- Database → Supabase PostgreSQL

---

# Project Structure

```bash
EchoScribe-AI/
│
├── mobile/
│   ├── components/
│   ├── screens/
│   ├── hooks/
│   ├── services/
│   ├── store/
│   ├── navigation/
│   └── utils/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── services/
│   ├── prisma/
│   ├── config/
│   └── utils/
│
├── shared/
├── docs/
├── README.md
└── package.json
```

---

# Getting Started

## 1. Clone Repository

```bash
git clone https://github.com/VaishnaviNayak2023/EchoScribe-AI.git

cd EchoScribe-AI
```

---

# ⚙ Backend Setup

## Install Dependencies

```bash
cd backend

npm install
```

## Create Environment File

Create `.env`

```env
PORT=5000

DATABASE_URL=your_postgresql_database_url

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
```

## Prisma Setup

```bash
npx prisma generate

npx prisma migrate dev
```

## Start Backend Server

```bash
npm run dev
```

---

# Mobile App Setup

## Install Dependencies

```bash
cd mobile

npm install
```

## Run Application

### React Native

```bash
npm run android
```

or

```bash
npm run ios
```

### Flutter

```bash
flutter pub get

flutter run
```

---

# Gemini AI Integration

Get your Gemini API key from:

https://aistudio.google.com

Example Gemini transcription request:

```ts
const response = await gemini.models.generateContent({
  model: "gemini-2.5-pro",
  contents: [
    {
      role: "user",
      parts: [
        {
          text: "Transcribe this audio accurately with timestamps and speaker labels."
        }
      ]
    }
  ]
});
```

---

# API Endpoints

## Authentication

```http
POST /auth/register
POST /auth/login
POST /auth/google
```

## Audio Upload

```http
POST /upload/audio
```

## Transcription

```http
POST /transcribe
GET /transcripts
GET /transcripts/:id
DELETE /transcripts/:id
```

## AI Features

```http
POST /summary
POST /translate
POST /chat
```

---

# Database Models

## User
- id
- name
- email
- password
- createdAt

## Transcript
- id
- userId
- title
- transcript
- language
- duration
- createdAt

## TranscriptSegment
- id
- transcriptId
- speaker
- timestamp
- text

---

# Real-Time Transcription

Supports:
- Streaming transcription
- Live partial transcript rendering
- Incremental updates
- WebSocket-based communication

---

# Security Best Practices

- HTTPS enabled
- Secure JWT authentication
- Environment variable protection
- File validation
- Upload size restrictions
- Input sanitization
- Rate limiting
- Encrypted storage

---

# Performance Optimizations

- Audio chunk uploads
- Lazy loading
- Query optimization
- Streaming AI responses
- Caching
- Efficient rendering
- Pagination support

---

# Future Improvements

- Team collaboration
- AI-generated chapters
- Voice emotion analysis
- Offline transcription
- PWA support
- Cloud synchronization
- Speaker recognition

---

# Deployment

## Frontend
Deploy using:
- Vercel
- Expo EAS

## Backend
Deploy using:
- Railway
- Render

## Database
Use:
- Supabase PostgreSQL

---

# License

MIT License

---

# ⚠ Disclaimer

EchoScribe AI should only be used in compliance with local laws and regulations regarding audio recording and consent.

Users are responsible for obtaining any required permissions before recording conversations.

---

# Author

Developed by Vaishnavi Nayak

GitHub:
https://github.com/VaishnaviNayak2023

---

# Support

If you like this project:
- Star the repository
- Fork the project
- Submit issues and feature requests
- Contribute improvements

Repository Link:
https://github.com/VaishnaviNayak2023/EchoScribe-AI

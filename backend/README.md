# BrandTweet AI - Django Backend

Django REST API for the BrandTweet AI application.

## Features

- RESTful API for tweet generation
- OpenAI GPT-4 integration
- CORS support for React frontend
- SQLite database for development
- Admin interface for managing generations

## Setup Instructions

### 1. Create Virtual Environment

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

```bash
cp .env.example .env
# Edit .env and add your OpenAI API key
```

### 4. Run Migrations

```bash
python manage.py migrate
```

### 5. Create Superuser (Optional)

```bash
python manage.py createsuperuser
```

### 6. Run Development Server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`

## API Endpoints

### POST /api/generate-tweets/

Generate tweets based on brand details.

**Request Body:**
```json
{
  "brandName": "Your Brand",
  "industry": "SaaS",
  "campaignObjective": "engagement",
  "tonePreference": "playful",
  "brandPersonality": "Witty and professional",
  "products": "AI-powered marketing tools",
  "targetAudience": "Marketing professionals",
  "websiteLink": "https://example.com"
}
```

**Response:**
```json
{
  "brandVoiceSummary": {
    "tone": "Playful & Professional",
    "targetAudience": "Marketing professionals",
    "contentThemes": "AI innovation, marketing efficiency",
    "communicationStyle": "Conversational with clever insights",
    "bullets": [
      "Tone: Playful yet professional",
      "Target: Marketing professionals and growth teams",
      "Themes: Innovation, efficiency, results",
      "Style: Conversational with strategic emoji use"
    ]
  },
  "tweets": [
    {
      "id": 1,
      "text": "Tweet text here...",
      "style": "conversational",
      "characterCount": 120
    }
  ]
}
```

### GET /api/health/

Health check endpoint.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DJANGO_SECRET_KEY` | Django secret key | Yes |
| `DEBUG` | Debug mode (True/False) | No (default: True) |
| `ALLOWED_HOSTS` | Comma-separated allowed hosts | No |
| `OPENAI_API_KEY` | OpenAI API key | Yes for AI generation |
| `CORS_ALLOWED_ORIGINS` | Comma-separated CORS origins | No |

## Production Deployment

1. Set `DEBUG=False`
2. Use a strong `DJANGO_SECRET_KEY`
3. Configure `ALLOWED_HOSTS` with your domain
4. Use PostgreSQL instead of SQLite
5. Set up proper static files serving
6. Use HTTPS

## License

MIT License

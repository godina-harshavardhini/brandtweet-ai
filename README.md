# BrandTweet AI - AI-Powered Brand Voice Tweet Generator

A modern SaaS web application that generates 10 on-brand tweets based on your brand's tone, personality, and communication style.

![BrandTweet AI](https://2shkglwwjxwus.ok.kimi.link)

## Features

- **AI-Powered Brand Voice Analysis**: Automatically infers your brand's tone, target audience, content themes, and communication style
- **10 Generated Tweets**: Get a diverse mix of tweet styles:
  - 3 Conversational tweets for engagement
  - 2 Promotional tweets for marketing
  - 2 Witty/meme-style tweets (when appropriate)
  - 3 Informative/value-driven tweets
- **Character Count Tracking**: All tweets are under 280 characters
- **Copy & Download**: Easy copying of individual tweets or all at once, plus TXT download
- **Tone Preferences**: Choose between Balanced, Playful, Bold, or Minimal tones
- **Responsive Design**: Works seamlessly on desktop and mobile

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui components
- Lucide React icons

### Backend
- Django 5.0
- Django REST Framework
- OpenAI GPT-4 API
- Django CORS Headers
- SQLite (development) / PostgreSQL (production)

## Project Structure

```
/mnt/okcomputer/output/
├── app/                    # React Frontend
│   ├── src/
│   │   ├── sections/       # Page sections (Hero, Form, Output, etc.)
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript types
│   │   ├── components/ui/  # shadcn/ui components
│   │   ├── App.tsx         # Main app component
│   │   └── main.tsx        # Entry point
│   ├── dist/               # Build output
│   └── package.json
│
├── backend/                # Django Backend
│   ├── brandtweet_api/     # Django project settings
│   ├── tweet_generator/    # Main Django app
│   │   ├── views.py        # API endpoints with OpenAI integration
│   │   ├── models.py       # Database models
│   │   ├── serializers.py  # DRF serializers
│   │   └── urls.py         # URL routing
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
│
└── README.md
```

## Quick Start

### Frontend Only (Demo Mode)

The deployed frontend works in demo mode with mock data:

```bash
cd app
npm install
npm run dev
```

Visit `http://localhost:5173`

### Full Stack (With Django Backend)

#### 1. Setup Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and add your OpenAI API key

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
```

Backend runs at `http://localhost:8000`

#### 2. Setup Frontend

```bash
cd app

# Install dependencies
npm install

# Create environment file
echo "VITE_API_URL=http://localhost:8000/api" > .env

# Start development server
npm run dev
```

Frontend runs at `http://localhost:5173`

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

## AI Prompt Engineering

The system uses a carefully crafted prompt to generate high-quality tweets:

```
You are a brand strategist and social media copywriter.

Based on the following inputs:
- Brand Name
- Industry
- Campaign Objective
- Brand Personality
- Products/Services
- Target Audience

Your task:
1. Infer the brand voice (tone, audience, themes, style)
2. Provide a brand voice summary (3-4 bullet points)
3. Generate 10 tweets matching the brand's voice:
   - 3 conversational
   - 2 promotional
   - 2 witty/meme-style
   - 3 informative/value-driven
   - Under 280 characters each
   - Platform-native Twitter/X style
   - Max 2 hashtags per tweet
   - Emojis only if brand tone supports it
```

## Environment Variables

### Frontend (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Django backend API URL | `http://localhost:8000/api` |

### Backend (.env)
| Variable | Description | Required |
|----------|-------------|----------|
| `DJANGO_SECRET_KEY` | Django secret key | Yes |
| `DEBUG` | Debug mode | No (default: True) |
| `ALLOWED_HOSTS` | Comma-separated allowed hosts | No |
| `OPENAI_API_KEY` | OpenAI API key | Yes for AI |
| `CORS_ALLOWED_ORIGINS` | Comma-separated CORS origins | No |

## Deployment

### Frontend (Static)

```bash
cd app
npm run build
# Deploy dist/ folder to your static hosting
```

### Backend (Production)

1. Set `DEBUG=False`
2. Use a strong `DJANGO_SECRET_KEY`
3. Configure `ALLOWED_HOSTS`
4. Use PostgreSQL database
5. Set up proper static files serving
6. Use HTTPS
7. Configure CORS properly

## Customization

### Adding New Tweet Styles

Edit `src/services/api.ts` to add new tweet generation patterns:

```typescript
const newStyleTweets = [
  {
    id: 11,
    text: `Your custom tweet template...`,
    style: 'new-style' as const,
    characterCount: 0
  }
];
```

### Modifying the AI Prompt

Edit `backend/tweet_generator/views.py` and modify the `build_prompt` function to customize AI behavior.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Credits

- Built with [React](https://react.dev/) + [Django](https://www.djangoproject.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Components from [shadcn/ui](https://ui.shadcn.com/)
- AI powered by [OpenAI GPT-4](https://openai.com/)

---

**Live Demo**: [https://2shkglwwjxwus.ok.kimi.link](https://2shkglwwjxwus.ok.kimi.link)

import os
import json
import logging
from typing import List, Dict, Any

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.conf import settings

from openai import OpenAI

from .serializers import (
    TweetGenerationInputSerializer,
    TweetGenerationResponseSerializer,
)

logger = logging.getLogger(__name__)


def get_openai_client():
    """Initialize and return OpenAI client."""
    api_key = settings.OPENAI_API_KEY or os.getenv('OPENAI_API_KEY')
    if not api_key:
        raise ValueError("OpenAI API key not configured")
    return OpenAI(api_key=api_key)


def build_prompt(data: Dict[str, Any]) -> str:
    """Build the AI prompt for tweet generation."""
    
    prompt = f"""You are a brand strategist and social media copywriter.

Based on the following inputs:
Brand Name: {data.get('brandName')}
Industry: {data.get('industry')}
Campaign Objective: {data.get('campaignObjective', 'engagement')}
Brand Personality: {data.get('brandPersonality', 'Not specified')}
Products/Services: {data.get('products', 'Not specified')}
Target Audience: {data.get('targetAudience', 'Not specified')}
Tone Preference: {data.get('tonePreference', 'balanced')}

Your task:
1. Infer the brand voice:
   - Tone (e.g., witty, bold, premium, playful, minimal, informative, professional)
   - Target audience description
   - Content themes
   - Communication style

2. Provide a short brand voice summary (3-4 bullet points).

3. Generate 10 tweets that:
   - Match the brand's voice consistently
   - Include:
     * 3 engaging/conversational tweets
     * 2 promotional tweets
     * 2 witty or meme-style tweets (if appropriate for the brand)
     * 3 informative/value-driven tweets
   - Are under 280 characters each
   - Feel platform-native (Twitter/X style)
   - Avoid excessive hashtags (max 2 per tweet)
   - Use emojis only if brand tone supports it

Output Format (JSON):
{{
  "brandVoiceSummary": {{
    "tone": "Description of tone",
    "targetAudience": "Description of target audience",
    "contentThemes": "Key content themes",
    "communicationStyle": "Communication style description",
    "bullets": [
      "Bullet point 1",
      "Bullet point 2",
      "Bullet point 3",
      "Bullet point 4"
    ]
  }},
  "tweets": [
    {{"id": 1, "text": "Tweet text here", "style": "conversational"}},
    {{"id": 2, "text": "Tweet text here", "style": "conversational"}},
    {{"id": 3, "text": "Tweet text here", "style": "conversational"}},
    {{"id": 4, "text": "Tweet text here", "style": "promotional"}},
    {{"id": 5, "text": "Tweet text here", "style": "promotional"}},
    {{"id": 6, "text": "Tweet text here", "style": "witty"}},
    {{"id": 7, "text": "Tweet text here", "style": "witty"}},
    {{"id": 8, "text": "Tweet text here", "style": "informative"}},
    {{"id": 9, "text": "Tweet text here", "style": "informative"}},
    {{"id": 10, "text": "Tweet text here", "style": "informative"}}
  ]
}}

Ensure the response is valid JSON only, with no additional text."""
    
    return prompt


def parse_ai_response(content: str) -> Dict[str, Any]:
    """Parse the AI response and extract JSON data."""
    try:
        # Try to parse directly as JSON
        return json.loads(content)
    except json.JSONDecodeError:
        # Try to extract JSON from markdown code blocks
        if '```json' in content:
            json_str = content.split('```json')[1].split('```')[0].strip()
            return json.loads(json_str)
        elif '```' in content:
            json_str = content.split('```')[1].split('```')[0].strip()
            return json.loads(json_str)
        else:
            raise ValueError("Could not parse AI response as JSON")


def generate_tweets_with_ai(data: Dict[str, Any]) -> Dict[str, Any]:
    """Generate tweets using OpenAI API."""
    
    client = get_openai_client()
    prompt = build_prompt(data)
    
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert brand strategist and social media copywriter. Always respond with valid JSON only."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.8,
            max_tokens=2500,
        )
        
        content = response.choices[0].message.content
        parsed_data = parse_ai_response(content)
        
        # Add character counts to tweets
        for tweet in parsed_data.get('tweets', []):
            tweet['characterCount'] = len(tweet.get('text', ''))
        
        return parsed_data
        
    except Exception as e:
        logger.error(f"Error generating tweets with AI: {str(e)}")
        raise


def generate_mock_tweets(data: Dict[str, Any]) -> Dict[str, Any]:
    """Generate mock tweets for testing without API key."""
    
    brand = data.get('brandName', 'Your Brand')
    industry = data.get('industry', 'your industry')
    tone = data.get('tonePreference', 'balanced')
    
    tone_descriptions = {
        'playful': 'Playful & Engaging - Light-hearted with strategic emoji use',
        'bold': 'Bold & Direct - Straight to the point, no fluff',
        'minimal': 'Minimal & Concise - Every word counts',
        'balanced': 'Professional & Approachable - Expert but relatable'
    }
    
    return {
        "brandVoiceSummary": {
            "tone": tone_descriptions.get(tone, 'Professional & Approachable'),
            "targetAudience": data.get('targetAudience', f'Professionals and enthusiasts in {industry}'),
            "contentThemes": f"Innovation, quality, and customer-centric solutions in {industry}",
            "communicationStyle": "Professional yet approachable",
            "bullets": [
                f"Tone: {tone_descriptions.get(tone, 'Professional & Approachable')}",
                f"Target: {data.get('targetAudience', f'Professionals and enthusiasts in {industry}')}",
                "Themes: Innovation, authenticity, and value-driven content",
                f"Style: {'Light-hearted with emoji use' if tone == 'playful' else 'Direct and confident' if tone == 'bold' else 'Clean, minimal communication' if tone == 'minimal' else 'Balanced professional tone'}"
            ]
        },
        "tweets": [
            {"id": 1, "text": f"What's everyone working on this week? {brand} is here to make your {industry} journey brighter! Share your wins below ✨", "style": "conversational", "characterCount": 115},
            {"id": 2, "text": f"We love hearing from our community! What's one thing you'd like to see from {brand} in the {industry} space? 💬", "style": "conversational", "characterCount": 108},
            {"id": 3, "text": f"Real talk: {industry} can be overwhelming. But with {brand}, you've got a partner in your corner 🙌", "style": "conversational", "characterCount": 95},
            {"id": 4, "text": f"Ready to elevate your {industry} game? {brand} has everything you need to succeed. Discover our solutions today 🚀", "style": "promotional", "characterCount": 108},
            {"id": 5, "text": f"Transform your approach to {industry} with {brand}. Trusted by industry leaders. Loved by teams everywhere 💼", "style": "promotional", "characterCount": 102},
            {"id": 6, "text": f"My {industry} strategy before {brand}: 🤷‍♂️ My {industry} strategy after {brand}: 🎯💪✨", "style": "witty", "characterCount": 78},
            {"id": 7, "text": f"*Checks calendar* Yep, it's time to upgrade your {industry} setup. {brand} makes it painless (and maybe even fun) 😎", "style": "witty", "characterCount": 110},
            {"id": 8, "text": f"Did you know? 73% of {industry} professionals say the right tools make all the difference. {brand} is designed to be that difference 📊", "style": "informative", "characterCount": 125},
            {"id": 9, "text": f"Pro tip for {industry} success: Consistency beats perfection. Small improvements daily lead to massive results 📈", "style": "informative", "characterCount": 105},
            {"id": 10, "text": f"The secret to winning in {industry}? Understanding your audience. {brand} gives you the insights you need 💡", "style": "informative", "characterCount": 102}
        ]
    }


@api_view(['POST'])
@permission_classes([AllowAny])
def generate_tweets(request):
    """
    API endpoint to generate tweets based on brand details.
    
    Expected POST data:
    - brandName (required): Name of the brand
    - industry (required): Industry or category
    - campaignObjective (optional): Campaign objective
    - tonePreference (optional): Tone preference
    - brandPersonality (optional): Brand personality description
    - products (optional): Products/services description
    - targetAudience (optional): Target audience description
    - websiteLink (optional): Website or social media link
    
    Returns:
    - brandVoiceSummary: Object containing tone, targetAudience, contentThemes, communicationStyle, bullets
    - tweets: Array of 10 generated tweets with id, text, style, and characterCount
    """
    
    serializer = TweetGenerationInputSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(
            {'error': 'Invalid input data', 'details': serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    data = serializer.validated_data
    
    try:
        # Check if OpenAI API key is configured
        if settings.OPENAI_API_KEY:
            result = generate_tweets_with_ai(data)
        else:
            # Use mock data if no API key
            logger.info("No OpenAI API key configured, using mock data")
            result = generate_mock_tweets(data)
        
        # Validate response format
        response_serializer = TweetGenerationResponseSerializer(data=result)
        if response_serializer.is_valid():
            return Response(result, status=status.HTTP_200_OK)
        else:
            logger.error(f"Response validation error: {response_serializer.errors}")
            return Response(
                {'error': 'Invalid response format from AI'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
    except ValueError as e:
        logger.error(f"Configuration error: {str(e)}")
        return Response(
            {'error': 'Service configuration error'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    except Exception as e:
        logger.error(f"Error generating tweets: {str(e)}")
        return Response(
            {'error': 'Failed to generate tweets', 'message': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    """Health check endpoint."""
    return Response(
        {'status': 'healthy', 'service': 'BrandTweet AI API'},
        status=status.HTTP_200_OK
    )

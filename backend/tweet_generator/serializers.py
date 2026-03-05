from rest_framework import serializers
from .models import TweetGenerationRequest, GeneratedTweet


class GeneratedTweetSerializer(serializers.ModelSerializer):
    """Serializer for generated tweets."""
    
    class Meta:
        model = GeneratedTweet
        fields = ['id', 'text', 'style', 'character_count', 'created_at']


class TweetGenerationRequestSerializer(serializers.ModelSerializer):
    """Serializer for tweet generation requests."""
    
    tweets = GeneratedTweetSerializer(many=True, read_only=True)
    
    class Meta:
        model = TweetGenerationRequest
        fields = [
            'id',
            'brand_name',
            'industry',
            'campaign_objective',
            'tone_preference',
            'brand_personality',
            'products',
            'target_audience',
            'website_link',
            'brand_voice_summary',
            'generated_tweets',
            'tweets',
            'created_at',
            'updated_at',
        ]
        read_only_fields = [
            'brand_voice_summary',
            'generated_tweets',
            'created_at',
            'updated_at',
        ]


class TweetGenerationInputSerializer(serializers.Serializer):
    """Serializer for tweet generation input."""
    
    brandName = serializers.CharField(required=True, max_length=255)
    industry = serializers.CharField(required=True, max_length=255)
    campaignObjective = serializers.ChoiceField(
        choices=[
            ('engagement', 'Engagement'),
            ('promotion', 'Promotion'),
            ('brand-awareness', 'Brand Awareness'),
            ('product-launch', 'Product Launch'),
            ('community-growth', 'Community Growth'),
        ],
        default='engagement'
    )
    tonePreference = serializers.ChoiceField(
        choices=[
            ('balanced', 'Balanced'),
            ('playful', 'Playful'),
            ('bold', 'Bold'),
            ('minimal', 'Minimal'),
        ],
        default='balanced'
    )
    brandPersonality = serializers.CharField(required=False, allow_blank=True)
    products = serializers.CharField(required=False, allow_blank=True)
    targetAudience = serializers.CharField(required=False, allow_blank=True)
    websiteLink = serializers.URLField(required=False, allow_blank=True)


class BrandVoiceSummarySerializer(serializers.Serializer):
    """Serializer for brand voice summary."""
    
    tone = serializers.CharField()
    targetAudience = serializers.CharField()
    contentThemes = serializers.CharField()
    communicationStyle = serializers.CharField()
    bullets = serializers.ListField(child=serializers.CharField())


class TweetSerializer(serializers.Serializer):
    """Serializer for a single tweet."""
    
    id = serializers.IntegerField()
    text = serializers.CharField()
    style = serializers.ChoiceField(
        choices=[
            ('conversational', 'Conversational'),
            ('promotional', 'Promotional'),
            ('witty', 'Witty'),
            ('informative', 'Informative'),
        ]
    )
    characterCount = serializers.IntegerField()


class TweetGenerationResponseSerializer(serializers.Serializer):
    """Serializer for tweet generation response."""
    
    brandVoiceSummary = BrandVoiceSummarySerializer()
    tweets = TweetSerializer(many=True)

from django.db import models


class TweetGenerationRequest(models.Model):
    """Model to store tweet generation requests."""
    
    CAMPAIGN_OBJECTIVES = [
        ('engagement', 'Engagement'),
        ('promotion', 'Promotion'),
        ('brand-awareness', 'Brand Awareness'),
        ('product-launch', 'Product Launch'),
        ('community-growth', 'Community Growth'),
    ]
    
    TONE_PREFERENCES = [
        ('balanced', 'Balanced'),
        ('playful', 'Playful'),
        ('bold', 'Bold'),
        ('minimal', 'Minimal'),
    ]
    
    brand_name = models.CharField(max_length=255)
    industry = models.CharField(max_length=255)
    campaign_objective = models.CharField(
        max_length=50, 
        choices=CAMPAIGN_OBJECTIVES,
        default='engagement'
    )
    tone_preference = models.CharField(
        max_length=50,
        choices=TONE_PREFERENCES,
        default='balanced'
    )
    brand_personality = models.TextField(blank=True)
    products = models.TextField(blank=True)
    target_audience = models.TextField(blank=True)
    website_link = models.URLField(blank=True)
    
    # Generated output
    brand_voice_summary = models.JSONField(null=True, blank=True)
    generated_tweets = models.JSONField(null=True, blank=True)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.brand_name} - {self.created_at.strftime('%Y-%m-%d %H:%M')}"


class GeneratedTweet(models.Model):
    """Model to store individual generated tweets."""
    
    STYLE_CHOICES = [
        ('conversational', 'Conversational'),
        ('promotional', 'Promotional'),
        ('witty', 'Witty'),
        ('informative', 'Informative'),
    ]
    
    request = models.ForeignKey(
        TweetGenerationRequest, 
        on_delete=models.CASCADE,
        related_name='tweets'
    )
    text = models.TextField()
    style = models.CharField(max_length=50, choices=STYLE_CHOICES)
    character_count = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.style}: {self.text[:50]}..."
    
    def save(self, *args, **kwargs):
        self.character_count = len(self.text)
        super().save(*args, **kwargs)

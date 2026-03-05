from django.contrib import admin
from .models import TweetGenerationRequest, GeneratedTweet


class GeneratedTweetInline(admin.TabularInline):
    model = GeneratedTweet
    extra = 0
    readonly_fields = ['character_count', 'created_at']


@admin.register(TweetGenerationRequest)
class TweetGenerationRequestAdmin(admin.ModelAdmin):
    list_display = [
        'brand_name',
        'industry',
        'campaign_objective',
        'tone_preference',
        'created_at',
    ]
    list_filter = [
        'campaign_objective',
        'tone_preference',
        'created_at',
    ]
    search_fields = [
        'brand_name',
        'industry',
    ]
    readonly_fields = [
        'brand_voice_summary',
        'generated_tweets',
        'created_at',
        'updated_at',
    ]
    inlines = [GeneratedTweetInline]


@admin.register(GeneratedTweet)
class GeneratedTweetAdmin(admin.ModelAdmin):
    list_display = [
        'request',
        'style',
        'character_count',
        'created_at',
    ]
    list_filter = [
        'style',
        'created_at',
    ]
    search_fields = [
        'text',
        'request__brand_name',
    ]
    readonly_fields = ['character_count', 'created_at']

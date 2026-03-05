from django.apps import AppConfig


class TweetGeneratorConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'tweet_generator'
    verbose_name = 'Tweet Generator'

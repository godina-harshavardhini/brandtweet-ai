from django.urls import path
from . import views

urlpatterns = [
    path('generate-tweets/', views.generate_tweets, name='generate-tweets'),
    path('health/', views.health_check, name='health-check'),
]

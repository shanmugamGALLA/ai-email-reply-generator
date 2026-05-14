from django.urls import path
from .views import (
    GenerateReplyView,
    EmailReplyListView,
    EmailReplyDetailView
)

urlpatterns = [
    path("generate/", GenerateReplyView.as_view()),
    path("history/", EmailReplyListView.as_view()),
    path("<int:pk>/", EmailReplyDetailView.as_view()),
]
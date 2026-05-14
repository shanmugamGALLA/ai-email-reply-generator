from django.db import models
from django.contrib.auth.models import User


class EmailReply(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    original_email = models.TextField()
    generated_reply = models.TextField()
    tone = models.CharField(max_length=50, default="professional")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.tone}"
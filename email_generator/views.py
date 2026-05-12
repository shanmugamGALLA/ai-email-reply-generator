from django.shortcuts import render
# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .services import generate_email_reply


class GenerateReplyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        email_content = request.data.get("email_content")
        tone = request.data.get("tone", "professional")

        if not email_content:
            return Response(
                {"error": "email_content is required"},
                status=400
            )

        reply = generate_email_reply(email_content, tone)

        return Response({
            "generated_reply": reply
        })

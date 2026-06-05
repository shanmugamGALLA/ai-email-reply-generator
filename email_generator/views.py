from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .services import generate_email_reply
from .models import EmailReply

from .serializers import EmailReplySerializer
from django.shortcuts import get_object_or_404

from authentication.utils.api_response import api_response


class GenerateReplyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        email_content = request.data.get("email_content")
        tone = request.data.get("tone", "professional")

        if not email_content:
            return Response(
                api_response(
                    success=False,
                    message="email_content is required"
                ),
                status=400
            )

        try:

            reply = generate_email_reply(
                email_content,
                tone
            )

            # Save to database
            email_reply = EmailReply.objects.create(
                user=request.user,
                original_email=email_content,
                generated_reply=reply,
                tone=tone
            )

            return Response(
                api_response(
                    success=True,
                    message="Reply generated successfully",
                    data={
                        "generated_reply": reply,
                        "id": email_reply.id
                    }
                ),
                status=200
            )

        except Exception as e:

            error_message = str(e).lower()

            print("FULL ERROR:", error_message)

            # Internet / OpenRouter / Network issues
            network_errors = [
                "httpsconnectionpool",
                "failed to resolve",
                "nameresolutionerror",
                "max retries exceeded",
                "connection aborted",
                "connectionerror",
                "network is unreachable",
                "temporary failure in name resolution",
                "connection",
                "timeout"
            ]

            if any(err in error_message for err in network_errors):

                return Response(
                    api_response(
                        success=False,
                        message="Internet connection lost. Please check your network and try again."
                    ),
                    status=503
                )

            # Other errors
            return Response(
                api_response(
                    success=False,
                    message="Something went wrong while generating AI reply. Please try again later."
                ),
                status=500
            )


class EmailReplyListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        replies = EmailReply.objects.filter(
            user=request.user
        ).order_by('-created_at')

        serializer = EmailReplySerializer(
            replies,
            many=True
        )

        return Response(
            api_response(
                success=True,
                message="Email history fetched successfully",
                data=serializer.data
            ),
            status=200
        )


class EmailReplyDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, request, pk):

        return get_object_or_404(
            EmailReply,
            pk=pk,
            user=request.user
        )

    # UPDATE
    def put(self, request, pk):

        email_reply = self.get_object(
            request,
            pk
        )

        serializer = EmailReplySerializer(
            email_reply,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                api_response(
                    success=True,
                    message="Reply updated successfully",
                    data=serializer.data
                ),
                status=200
            )

        return Response(
            api_response(
                success=False,
                message="Validation failed",
                error=serializer.errors
            ),
            status=400
        )

    # DELETE
    def delete(self, request, pk):

        email_reply = self.get_object(
            request,
            pk
        )

        email_reply.delete()

        return Response(
            api_response(
                success=True,
                message="Reply deleted successfully"
            ),
            status=200
        )
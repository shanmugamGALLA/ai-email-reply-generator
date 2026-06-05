from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserSecurityQuestion

class RegisterView(APIView):
    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")
        security_question = request.data.get("security_question")
        security_answer = request.data.get("security_answer")

        # Validation
        if (not username or not email or not password or not security_question or not security_answer):
            return Response(
                {
                    "error": "All fields are required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Username exists
        if User.objects.filter(username=username).exists():
            return Response(
                {
                    "error": "username already exists"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Email exists
        if User.objects.filter(email=email).exists():
            return Response(
                {
                    "error": "email already exists"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create user
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        UserSecurityQuestion.objects.create(
            user=user,
            security_question=security_question,
            security_answer=security_answer.lower()
        )

        return Response(
            {
                "message": "User created successfully",
                "username": user.username,
                "email": user.email
            },
            status=status.HTTP_201_CREATED
        )
class ResetPasswordView(APIView):

    def post(self, request):

        username = request.data.get("username")
        security_answer = request.data.get("security_answer")
        new_password = request.data.get("new_password")

        # Validation
        if not username or not security_answer or not new_password:

            return Response(
                {
                    "error": "All fields are required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check User
        try:

            user = User.objects.get(username=username)

        except User.DoesNotExist:

            return Response(
                {
                    "error": "Invalid username"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        # Check Security Answer
        try:

            security_data = UserSecurityQuestion.objects.get(user=user)

        except UserSecurityQuestion.DoesNotExist:

            return Response(
                {
                    "error": "Security data not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        # Verify Answer
        if (
            security_data.security_answer !=
            security_answer.lower()
        ):

            return Response(
                {
                    "error": "Incorrect security answer"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Update Password
        user.set_password(new_password)

        user.save()

        return Response(
            {
                "message": "Password reset successful"
            },
            status=status.HTTP_200_OK
        )
class GetSecurityQuestionView(APIView):

    def post(self, request):

        username = request.data.get("username")

        if not username:

            return Response(
                {
                    "error": "Username is required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check User
        try:

            user = User.objects.get(username=username)

        except User.DoesNotExist:

            return Response(
                {
                    "error": "User not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        # Get Security Question
        try:

            security_data = UserSecurityQuestion.objects.get(user=user)

        except UserSecurityQuestion.DoesNotExist:

            return Response(
                {
                    "error": "Security question not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        return Response(
            {
                "security_question": security_data.security_question
            },
            status=status.HTTP_200_OK
        )

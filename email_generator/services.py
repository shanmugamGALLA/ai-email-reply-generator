# from openai import OpenAI
# from django.conf import settings

# client = OpenAI(api_key=settings.OPENAI_API_KEY)


# def generate_email_reply(email_content, tone):
#     prompt = f"""
#     You are an AI assistant that writes professional email replies.

#     Original Email:
#     {email_content}

#     Tone: {tone}

#     Generate a clear, polite and contextually correct reply.
#     """

#     response = client.chat.completions.create(
#         model="gpt-4.1-mini",
#         messages=[
#             {"role": "user", "content": prompt}
#         ]
#     )

#     return response.choices[0].message.content

from decouple import config

OPEN_API_KEY = config("OPEN_API_KEY", default="")


def generate_mock_reply(email_content, tone):
    return f"""
Mock AI Reply (since API quota is unavailable):

Dear Sir/Madam,

Thank you for your email regarding: "{email_content}"

Based on a {tone} tone, here is a professional response:

We appreciate your message and will get back to you shortly regarding this matter.

Best regards,
AI Assistant
"""


def generate_email_reply(email_content, tone):
    """
    Main service function.
    Later we can switch between:
    - Mock AI
    - OpenAI
    - Other AI providers
    """

    # Currently using mock response
    return generate_mock_reply(email_content, tone)
import requests
from decouple import config


OPENROUTER_API_KEY = config(
    "OPENROUTER_API_KEY",
    default=""
)


def generate_email_reply(email_content, tone):
    """
    Generate AI email reply using OpenRouter API
    """

    if not OPENROUTER_API_KEY:
        raise Exception(
            "API configuration missing."
        )

    prompt = f"""
    Generate a {tone} email reply for the following email:

    Email:
    {email_content}
    """

    try:

        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": "openai/gpt-3.5-turbo",
                "messages": [
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            },
            timeout=20
        )

        response.raise_for_status()

        data = response.json()

        return data["choices"][0]["message"]["content"]

    except requests.exceptions.ConnectionError:

        raise Exception(
            "Internet connection lost."
        )

    except requests.exceptions.Timeout:

        raise Exception(
            "Request timed out."
        )

    except Exception:

        raise Exception(
            "AI service is temporarily unavailable."
        )
from rest_framework.views import exception_handler
from .api_response import api_response


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        response.data = api_response(
            success=False,
            message="Request failed",
            error=response.data,
            status_code=response.status_code
        )

    return response
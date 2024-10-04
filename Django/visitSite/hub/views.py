from rest_framework import views, status
from rest_framework.exceptions import APIException
from rest_framework.response import Response
from django.core.mail import send_mail
from django.utils.translation import gettext_lazy as _
from django.conf import settings

from hub import serializers


FEEDBACK_ACCEPTED_MAIL_SUBJECT = _("Ваше письмо отправлено")
FEEDBACK_ACCEPTED_MAIL_MESSAGE = _(
    "Кирилл, на вашем сайте %(user_name)s оставил(а) обращение:\n\"%(message)s\"\n\n"
    "С уважением, команда %(site_name)s"
)


class FeedbackFormView(views.APIView):
    serializer_class = serializers.FeedbackFormSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.POST)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        try:
            send_mail(
                FEEDBACK_ACCEPTED_MAIL_SUBJECT,
                FEEDBACK_ACCEPTED_MAIL_MESSAGE
                % {
                    "user_name": data["name"],
                    "site_name": settings.SITE_NAME,
                    "message": data["message"],
                },
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=["pikylevkirill@inbox.ru"],
                auth_user=settings.EMAIL_CONFIG["EMAIL_HOST_USER"],
                auth_password=settings.EMAIL_CONFIG["EMAIL_HOST_PASSWORD"],
                fail_silently=False,
            )
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            raise APIException(
                detail=str(e),
                code=status.HTTP_501_NOT_IMPLEMENTED,
            ) from e

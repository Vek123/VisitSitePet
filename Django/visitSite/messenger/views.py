from rest_framework import viewsets, status
from messenger import serializers
from messenger.models import User
from django.contrib.auth.models import User as Account
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from django.db import IntegrityError
from rest_framework.exceptions import APIException


class UserModelApiViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.CurrentUserSerializer
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        if "account" not in request.POST:
            try:
                request.data._mutable = True
                acc = Account.objects.create_user(
                    request.data["username"],
                    request.data["email"],
                    request.data["password"],
                )
                request.data["account"] = acc.pk
                request.data._mutable = False
            except IntegrityError as e:
                detail = e
                code = status.HTTP_500_INTERNAL_SERVER_ERROR
                if "unique constraint" in e.args[0]:
                    detail = "Username is already exists"
                    code = status.HTTP_409_CONFLICT
                raise APIException(
                    detail=detail,
                    code=code,
                ) from e
        return super().create(request, *args, **kwargs)

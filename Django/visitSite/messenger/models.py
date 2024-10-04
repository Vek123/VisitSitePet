import os
import re

from django.db import models
from django.utils.translation import gettext_lazy as _
from django.db.models.signals import pre_delete
from django.dispatch.dispatcher import receiver
from django.contrib.auth.models import User as Account
from django.core.exceptions import ValidationError


def validate_phone(value: str) -> None:
    formatted_value = re.sub(r"\D", "", value)
    if len(formatted_value) < 11:
        raise ValidationError(
            _("%(value)s is not a correct phone number"),
            params={"value": value},
        )


class User(models.Model):
    class RelStatuses(models.TextChoices):
        MARRIED = ("MARRIED", _("MARRIED"))
        SINGLE = ("SINGLE", _("SINGLE"))
        IN_LOVE = ("IN LOVE", _("IN LOVE"))
        ACTIVELY_SEEKING = ("ACTIVELY SEEKING", _("ACTIVELY SEEKING"))

    account = models.OneToOneField(
        to=Account,
        on_delete=models.CASCADE,
        blank=True,
    )
    first_name = models.CharField(
        verbose_name=_("First name"),
        max_length=255,
    )
    second_name = models.CharField(
        verbose_name=_("Second name"),
        max_length=255,
    )
    last_name = models.CharField(
        verbose_name=_("Last name"),
        max_length=255,
        blank=True,
    )
    birthday = models.DateField(
        verbose_name=_("Birthday"),
    )
    phone = models.CharField(
        verbose_name=_("Phone"),
        blank=True,
        validators=[validate_phone],
    )
    email = models.EmailField(
        verbose_name=_("Email"),
    )
    relationship_status = models.CharField(
        verbose_name=_("Relationship status"),
        choices=RelStatuses,
        blank=True,
    )
    friends = models.ManyToManyField(
        to="User",
        verbose_name=_("Friends"),
        editable=False,
    )

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        return f"{self.first_name} {self.second_name}"


def make_user_image_save_path(instance: "UserImage", filename: str) -> str:
    user = instance.user
    user_path = f"{user.first_name} {user.second_name} {user.birthday}".strip()
    return "images/users/%s/%s" % (user_path, filename)


class UserImage(models.Model):
    user = models.ForeignKey(
        to=User, on_delete=models.CASCADE, related_name="images", verbose_name=_("User")
    )
    image = models.ImageField(
        verbose_name=_("Image"),
        upload_to=make_user_image_save_path,
    )

    def save(
        self,
        *args,
        force_insert=False,
        force_update=False,
        using=None,
        update_fields=None,
    ):
        try:
            old_version = UserImage.objects.get(pk=self.pk)
            path = old_version.image.path

            if os.path.exists(path) and self.image != old_version.image:
                os.remove(path)
        except UserImage.DoesNotExist:
            pass

        super().save(
            force_insert=force_insert,
            force_update=force_update,
            using=using,
            update_fields=update_fields,
        )


@receiver(pre_delete, sender=UserImage)
def delete_apartment_image(
    sender: UserImage,
    instance: UserImage,
    **kwargs,
) -> None:
    instance.image.delete(False)

# Generated by Django 5.1.1 on 2024-10-04 12:51

import django.db.models.deletion
import messenger.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "first_name",
                    models.CharField(max_length=255, verbose_name="First name"),
                ),
                (
                    "second_name",
                    models.CharField(max_length=255, verbose_name="Second name"),
                ),
                (
                    "patronymic",
                    models.CharField(
                        blank=True, max_length=255, verbose_name="Patronymic"
                    ),
                ),
                ("birthday", models.DateField(verbose_name="Birthday")),
                ("phone", models.CharField(blank=True, verbose_name="Phone")),
                ("email", models.CharField(verbose_name="Email")),
                (
                    "relationship_status",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("MARRIED", "MARRIED"),
                            ("SINGLE", "SINGLE"),
                            ("IN LOVE", "IN LOVE"),
                            ("ACTIVELY SEEKING", "ACTIVELY SEEKING"),
                        ],
                        verbose_name="Relationship status",
                    ),
                ),
                (
                    "friends",
                    models.ManyToManyField(
                        editable=False, to="messenger.user", verbose_name="Friends"
                    ),
                ),
            ],
            options={
                "verbose_name": "User",
                "verbose_name_plural": "Users",
            },
        ),
        migrations.CreateModel(
            name="UserImage",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "image",
                    models.ImageField(
                        upload_to=messenger.models.make_user_image_save_path,
                        verbose_name="Image",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="images",
                        to="messenger.user",
                        verbose_name="User",
                    ),
                ),
            ],
        ),
    ]

from django.contrib import admin
from messenger.models import *


class UserImagesInline(admin.TabularInline):
    model = UserImage
    extra = 1


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "first_name", "second_name", "last_name", "email")
    list_display_links = ("id", "first_name", "second_name")
    list_per_page = 20
    search_fields = ("first_name", "second_name", "last_name")
    list_filter = ("birthday", "relationship_status")
    inlines = [UserImagesInline]


@admin.register(UserImage)
class UserImageAdmin(admin.ModelAdmin):
    list_display = ("id", "user")
    list_display_links = ("id", "user")
    list_per_page = 20
    search_fields = ("user",)
    list_filter = ("user",)

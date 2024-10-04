from rest_framework import serializers

from messenger import models


class UserImageSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        image_value = representation.pop("image")
        return image_value

    class Meta:
        model = models.UserImage
        fields = ["image"]


class CurrentUserSerializer(serializers.ModelSerializer):
    friends = serializers.StringRelatedField(many=True)
    images = UserImageSerializer(many=True, read_only=True)

    class Meta:
        model = models.User
        fields = (
            "first_name",
            "second_name",
            "last_name",
            "birthday",
            "phone",
            "email",
            "relationship_status",
            "friends",
            "images",
            "account"
        )
        read_only_fields = ("friends",)

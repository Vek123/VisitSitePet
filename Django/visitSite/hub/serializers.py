from rest_framework import serializers


class FeedbackFormSerializer(serializers.Serializer):
    name = serializers.CharField()
    email = serializers.EmailField()
    message = serializers.CharField()
    report_type = serializers.CharField()

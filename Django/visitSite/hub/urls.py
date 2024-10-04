from django.urls import path

from hub.views import FeedbackFormView


urlpatterns = [
    path("feedback/", FeedbackFormView.as_view(), name="feedbackForm"),
]

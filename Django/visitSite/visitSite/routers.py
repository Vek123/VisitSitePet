from rest_framework import routers

from messenger.views import *

router = routers.DefaultRouter()
router.register(r"users", UserModelApiViewSet)

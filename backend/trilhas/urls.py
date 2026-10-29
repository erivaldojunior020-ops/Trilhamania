from rest_framework.routers import DefaultRouter

from .views import TrilhaViewSet


router = DefaultRouter()

router.register(
    r"trilhas",
    TrilhaViewSet,
    basename="trilhas"
)

urlpatterns = router.urls

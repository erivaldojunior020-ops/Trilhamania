from rest_framework import viewsets

from .models import Trilha
from .serializers import TrilhaSerializer


class TrilhaViewSet(viewsets.ModelViewSet):

    queryset = Trilha.objects.all()

    serializer_class = TrilhaSerializer
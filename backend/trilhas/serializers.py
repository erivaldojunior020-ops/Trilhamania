from rest_framework import serializers
from .models import Trilha


class TrilhaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Trilha
        fields = "__all__"
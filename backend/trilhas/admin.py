from django.contrib import admin
from .models import Trilha


@admin.register(Trilha)
class TrilhaAdmin(admin.ModelAdmin):

    list_display = (
        "nome",
        "cidade",
        "data",
        "telefone_organizador",
    )

    list_filter = (
        "cidade",
        "data",
    )

    search_fields = (
        "nome",
        "cidade",
        "telefone_organizador",
    )

    ordering = (
        "data",
    )
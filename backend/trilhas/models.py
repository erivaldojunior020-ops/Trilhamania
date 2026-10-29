from django.db import models

class Trilha(models.Model):

    nome = models.CharField(
        max_length=200
    )

    cidade = models.CharField(
        max_length=100
    )

    data = models.DateField()

    imagem = models.ImageField(
        upload_to="trilhas/",
        blank=True,
        null=True
    )

    telefone_organizador = models.CharField(
        max_length=20
    )

    def __str__(self):
        return self.nome
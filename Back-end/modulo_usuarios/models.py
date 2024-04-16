from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Cargo(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField()

    class Meta:
        db_table = 'cargo'

    def __str__(self):
        return self.nombre


class Persona(models.Model):
    identificacion = models.CharField(max_length=10, unique=True, null=False)
    tipo_identificacion = models.CharField(max_length=10, default=None, null=False)
    genero = models.CharField(max_length=10, default=None)
    telefono = models.CharField(max_length=10, default=None)
    direccion = models.CharField(max_length=50, default=None)
    id_cargo = models.ForeignKey(Cargo, on_delete=models.CASCADE, default=None)
    id_usuario = models.ForeignKey(
        User, on_delete=models.CASCADE, default=None, related_name='id_user')

    class Meta:
        db_table = 'persona'

    def __str__(self):
        return self.identificacion + ' ' + self.id_usuario.username 


class Usuario_cargos(models.Model):
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE, related_name='id_persona')
    cargo = models.ForeignKey(Cargo, on_delete=models.CASCADE)

    class Meta:
        db_table = 'usuario_cargos'

    # def __str__(self):
    #     return self.persona.usuario + ' ' + self.cargo.nombre

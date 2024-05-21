from django.db import models
from modulo_usuarios.models import Persona

# Crear Modelos de:
# Tarea
# Avance
# Obra
# Persona_tarea
# persona_obra
# Create your models here.


class Avance(models.Model):
    descripcion = models.TextField()
    observaciones = models.TextField()
    # notas_voz = models.FileField(upload_to='notas_voz/', null=True, blank=True)
    notas_voz = models.CharField(max_length=50, default=None)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'avance'

    def __str__(self):
        return self.descripcion


class Obra (models.Model):
    descripcion = models.TextField()
    estado = models.CharField(max_length=50)
    usuarios_asignados = models.CharField(max_length=50)
    id_usuario_capataz = models.ForeignKey(
        Persona, on_delete=models.CASCADE, default=None)
    is_active = models.BooleanField(default=True)
    proveedores = models.CharField(max_length=50, default="Sin proveedores")
    pais = models.CharField(max_length=50, default="Sin país")
    nit = models.CharField(max_length=50, default="NIT")
    nit_number = models.CharField(max_length=50, default="Sin NIT")
    mes_inicio = models.CharField(max_length=50, default="Sin mes de inicio")
    tipo_pago = models.CharField(max_length=50, default="Sin pago")
    direccion = models.CharField(max_length=50, default="Sin dirección")
    telefono = models.CharField(max_length=50, default="Sin teléfono")


class Tarea (models.Model):
    # nombre = models.CharField(max_length=50)
    descripcion = models.TextField()
    estado = models.CharField(max_length=50)
    # usuarios_asignados = models.ManyToManyField(Persona, through='tareas_asignadas')
    usuarios_asignados = models.CharField(max_length=50)
    id_usuario_capataz = models.ForeignKey(
        Persona, on_delete=models.CASCADE, default=None)
    id_obra = models.ForeignKey(Obra, on_delete=models.CASCADE, default=None)
    id_avance = models.ForeignKey(
        Avance, on_delete=models.CASCADE, default=None)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'tarea'

    def __str__(self):
        return self.nombre


class Persona_tarea(models.Model):
    id_persona = models.ForeignKey(
        Persona, on_delete=models.CASCADE, related_name='id_persona_tarea')
    id_tarea = models.ForeignKey(Tarea, on_delete=models.CASCADE)

    class Meta:
        db_table = 'persona_tarea'

    # def __str__(self):
    #     return self.persona.usuario + ' ' + self.tarea.nombre


class Persona_obra (models.Model):
    id_persona = models.ForeignKey(
        Persona, on_delete=models.CASCADE, related_name='id_persona_obra')
    id_obra = models.ForeignKey(Obra, on_delete=models.CASCADE)

    class Meta:
        db_table = 'persona_obra'

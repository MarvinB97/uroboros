from django.contrib import admin
from .models import Avance, Obra, Tarea, Persona_tarea, Persona_obra, Obra_avance
# Register your models here.

admin.site.register(Avance)
admin.site.register(Obra)
admin.site.register(Tarea)
admin.site.register(Persona_tarea)
admin.site.register(Persona_obra)
admin.site.register(Obra_avance)

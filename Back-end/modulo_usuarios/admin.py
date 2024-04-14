from django.contrib import admin
from .models import Persona, Cargo, Usuario_cargos

# Register your models here.
admin.site.register(Persona)
admin.site.register(Cargo)
admin.site.register(Usuario_cargos)
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Persona(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    nombre = models.CharField(max_length=50) #      Se Puede comentar, viene por defecto en la clase User de Django
    apellido = models.CharField(max_length=50) #    Se Puede comentar, viene por defecto en la clase User de Django
    identificacion = models.CharField(max_length=10)
    # cargo = models.CharField(max_length=50)
    edad = models.IntegerField()
    email = models.EmailField()
    direccion_residencia = models.TextField()
    

    class Meta:
        db_table = 'persona'
        
    def __str__(self):
        return self.nombre + ' ' + self.apellido
    
class Cargo(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField()
    
    class Meta:
        db_table = 'cargo'
        
    def __str__(self):
        return self.nombre
    
class Usuario_cargos(models.Model):
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE)
    cargo = models.ForeignKey(Cargo, on_delete=models.CASCADE)
    # usuario = models.CharField(max_length=50)
    # contrasena = models.CharField(max_length=50)
    
    class Meta:
        db_table = 'usuario_cargos'
        
    # def __str__(self):
    #     return self.persona.usuario + ' ' + self.cargo.nombre
        


from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Avance, Obra, Tarea, Persona_tarea, Persona_obra

class AvanceSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Avance
        fields = '__all__'
        
class ObraSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Obra
        fields = '__all__'
        
class TareaSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Tarea
        fields = '__all__'
        
class Persona_tareaSerializer(serializers.ModelSerializer):
        
        class Meta:
            model = Persona_tarea
            fields = '__all__'
            
class Persona_obraSerializer(serializers.ModelSerializer):
        
        class Meta:
            model = Persona_obra
            fields = '__all__'
            

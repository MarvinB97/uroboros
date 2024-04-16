from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Persona, Cargo, Usuario_cargos
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = '__all__'
        
class CargoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cargo
        fields = '__all__'
        
class Usuario_cargosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario_cargos
        fields = '__all__'
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        
class user_token (serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('username', 'email', 'first_name', 'last_name', 'id') 
        
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    pass


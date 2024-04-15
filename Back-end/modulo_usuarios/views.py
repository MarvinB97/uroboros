from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User, Group, Permission
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView

from modulo_usuarios.serializers import UserSerializer, PersonaSerializer, CargoSerializer, Usuario_cargosSerializer, CustomTokenObtainPairSerializer
# Create your views here.


class Login(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        # print(request.data)
        username = request.data.get('username', '')
        password = request.data.get('password', '')
        user = authenticate(
            username=username,
            password=password
        )
        # print(user)
        if user:
            login_serializer = self.serializer_class(data=request.data)
            if user.is_active:
                if login_serializer.is_valid():
                    login(request, user)
                    # print(login_serializer)
                    return Response({
                        'user': UserSerializer(user).data,
                        'message': 'Inicio de Sesion Exitoso'
                    }, status=status.HTTP_200_OK)
                    # return Response(login_serializer.validated_data, status=status.HTTP_200_OK)
                else:
                    return Response({'message': 'Error de Serialización'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'message': 'Usuario Inactivo'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': 'Usuario o Contraseña Incorrectos'}, status=status.HTTP_400_BAD_REQUEST)
        
        
class crear_usuario(APIView):
    
    def post(self, request):
        print(request.data)
        user_form = request.data
        # user_serializer = UserSerializer(data=request.data)
        if user_form:
            if (User.objects.filter(username=user_form['username']).exists()):
                return Response({'message': 'Usuario ya existe'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                try:
                    Usuario = User.objects.create_user(
                        password = make_password(str(user_form.get('password'))),
                        is_superuser = False,
                        username = str(user_form.get('username')),
                        first_name = str(user_form.get('first_name')),
                        last_name = str(user_form.get('last_name')),
                        email = str(user_form.get('email')),
                        is_staff = False,
                        is_active = True
                        )
                
                except:
                    pass
            print(Usuario)
            return Response({"message": "Se creó el usuario Satisfactoriamente"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "Ocurrió  un error con el usuario"}, status=status.HTTP_400_BAD_REQUEST)

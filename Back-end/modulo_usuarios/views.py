from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.generics import GenericAPIView
from django.views.generic import View
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from modulo_usuarios.serializers import UserSerializer, PersonaSerializer, CargoSerializer, Usuario_cargosSerializer, CustomTokenObtainPairSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from rest_framework_simplejwt.views import TokenObtainPairView

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

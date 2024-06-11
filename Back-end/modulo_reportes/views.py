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

from modulo_usuarios.serializers import UserSerializer, PersonaSerializer, CargoSerializer, Usuario_cargosSerializer, CustomTokenObtainPairSerializer, user_token
from modulo_usuarios.models import Persona, Cargo, Usuario_cargos

from modulo_tareas.models import Tarea, Avance, Obra, Persona_tarea, Persona_obra, Obra_avance
from modulo_tareas.serializers import AvanceSerializer, ObraSerializer, TareaSerializer, Persona_tareaSerializer, Persona_obraSerializer

# Create your views here.


class reporte_capataz(APIView):

    def post(self, request, pk, *args, **kwargs):
        lista_obra = []
        lista_obra_final = []
        id = pk
        # print(id)
        user_capataz = User.objects.filter(id=id)
        user_data = UserSerializer(user_capataz[0]).data
        # print(user_data)
        persona_capataz = Persona.objects.filter(id_usuario=id).values()
        # print(persona_capataz)
        list_obras = Obra.objects.filter(
            id_usuario_capataz=persona_capataz[0]['id']).values()
        # print(list_obras)
        data_obras = ObraSerializer(list_obras, many=True)
        # print(data_obras.data)
        # print("#####################")
        for obra in data_obras.data:
            # print(obra)
            obra_data = {}
            obra_data = (ObraSerializer(obra).data)
            try:
                # print("SERIALIZE OBRA")
                # print(obra_data)
                dicc_obra = {
                    "nombre_capataz": user_data['first_name'] + ' ' + user_data['last_name'],
                }
            except Exception as e:
                dicc_obra = {
                    "nombre_capataz": "No hay capataz asignado",
                }
                # print("EXCEPTION")
                # print(e)
                return Response({'message': 'No se pudo listar las obras'}, status=status.HTTP_400_BAD_REQUEST)

            # print(obra['id_usuario_encargado'])
            obras_encargado_data = Obra.objects.filter(
                id=obra_data['id']).values()
            # print(obras_encargado_data)
            try:
                persona_encargado = Persona.objects.filter(
                    id=obras_encargado_data[0]['id_usuario_encargado_id']).values()
                # print(persona_encargado)

                user_encargado = User.objects.filter(
                    id=persona_encargado[0]['id_usuario_id']).values()
                # print(user_encargado)
                dicc_obra_encargado = {
                    'nombre_encargado': user_encargado[0]['first_name'] + ' ' + user_encargado[0]['last_name']
                }
            except Exception as e:
                dicc_obra_encargado = {
                    'nombre_encargado': 'No hay encargado asignado'
                }
                # print("EXCEPTION")
                # print(e)
                return Response({'message': 'No se pudo listar las obras'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                obra_data_avance = Obra_avance.objects.filter(
                    id_obra=obra_data['id']).values()
                # print(obra_data_avance)
                avance_data = Avance.objects.filter(
                    id=obra_data_avance[0]['id_avance_id']).values()
                # print(avance_data)
                data_avance = AvanceSerializer(avance_data, many=True)
                dicc_avance = {
                    'avances_obra': data_avance.data[0]['descripcion']
                }

            except Exception as e:
                dicc_avance = {
                    'avances_obra': 'No hay avance'
                }
                # print("EXCEPTION")
                # print(e)
                return Response({'message': 'No se pudo listar las obras'}, status=status.HTTP_400_BAD_REQUEST)
            data = dict(obra_data, **dicc_obra, **
                        dicc_obra_encargado, **dicc_avance)

            lista_obra.append(data)

        print(data)
        return Response(lista_obra, status=status.HTTP_200_OK)

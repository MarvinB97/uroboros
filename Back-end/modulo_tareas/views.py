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

from modulo_tareas.models import Tarea, Avance, Obra, Persona_tarea, Persona_obra
from modulo_tareas.serializers import AvanceSerializer, ObraSerializer, TareaSerializer, Persona_tareaSerializer, Persona_obraSerializer

# Create your views here.


class crear_obra(APIView):

    def post(self, request, *args, **kwargs):
        lista_obra = []

        data = request.data

        if data.get('descripcion') is None:
            return Response({'status': 'Debe ingresar un nombre'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            descripcion = data.get('descripcion')

            # direccion = 'undefined'
            # descripcion = 'undefined'
            estado = data.get('estado')
            usuarios_asignados = data.get('usuarios_asignados')
            persona = Persona.objects.get(
                id_usuario=data.get('id_usuario_capataz'))
            new_obra = Obra(
                descripcion=descripcion,
                estado=estado,
                usuarios_asignados=usuarios_asignados,
                id_usuario_capataz=persona,
            )
            lista_obra.append(new_obra)
            Obra.objects.bulk_create(lista_obra)

        try:
            # print("Persona: ")
            # print(persona)
            persona_obra = Persona_obra(
                id_persona=persona,
                id_obra=new_obra,
            )
            lista_obra = []
            lista_obra.append(persona_obra)
            Persona_obra.objects.bulk_create(lista_obra)
        except:
            return Response({'status': 'No se pudo crear la obra'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'status': 'Obra creada'}, status=status.HTTP_201_CREATED)


class listar_obras(APIView):

    def post(self, request, *args, **kwargs):
        lista_obra = []
        obras = Obra.objects.all()
        for obra in obras:
            lista_obra.append(ObraSerializer(obra).data)
        return Response(lista_obra, status=status.HTTP_200_OK)


class listar_obra_especifica(APIView):

    def post(self, request, pk, *args, **kwargs):
        data = request.data
        # print(pk)
        # id_obra = data.get('id')
        if not pk:
            return Response({'status': 'Debe ingresar un id'}, status=status.HTTP_400_BAD_REQUEST)
        obra = Obra.objects.get(id=pk)
        return Response(ObraSerializer(obra).data, status=status.HTTP_200_OK)


class listar_usuario_persona_obra(APIView):

    def post(self, request, pk, *args, **kwargs):
        data = request.data
        # # print(data)
        # print(pk)
        # id_obra = data.get('id')
        if not pk:
            return Response({'status': 'Debe ingresar un id'}, status=status.HTTP_400_BAD_REQUEST)
        persona = Persona.objects.filter(id=pk).values()
        # # print("AAAAAAAAHHHH")
        # # print(persona[0]["id_usuario_id"])
        usuario = User.objects.filter(id=persona[0]["id_usuario_id"])
        user_serialized = UserSerializer(usuario[0]).data
        # # print("Usuario:")
        # # print(user_serialized)
        list_user = []
        data = {
            "id": user_serialized["id"],
            "username": user_serialized["username"],
        }
        # list_user.append(user_serialized)
        return Response(data, status=status.HTTP_200_OK)


class editar_obra(APIView):

    def post(self, request, pk, *args, **kwargs):
        data = request.data
        # print(pk)
        # print(data.get('id_usuario_capataz'))

        # # print(id_obra)
        if not pk:
            return Response({'message': 'Debe ingresar un id'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            try:
                obra = Obra.objects.filter(id=pk).values()
                # print(obra)
                # print(data.get('pais'))
                obra.update(
                    descripcion=data.get('descripcion'),
                    estado=data.get('estado'),
                    usuarios_asignados=data.get('usuarios_asignados'),
                    # recibe un id_persona, no una persona como objeto
                    id_usuario_capataz=Persona.objects.get(
                        id_usuario=data.get('id_usuario_capataz')),
                    is_active=data.get('is_active'),
                    proveedores=data.get('proveedores'),
                    pais=data.get('pais'),
                    nit=data.get('nit'),
                    nit_number=data.get('nit_number'),
                    mes_inicio=data.get('mes_inicio'),
                    tipo_pago=data.get('tipo_pago'),
                    direccion=data.get('direccion'),
                    telefono=data.get('telefono'),
                )
            except Persona.DoesNotExist:
                return Response({'message': 'No se pudo actualizar la obra, seleccione un usuario de la lista'}, status=status.HTTP_400_BAD_REQUEST)
        # obra.save()
        return Response({'message': 'Obra actualizada'}, status=status.HTTP_200_OK)


class eliminar_obra(APIView):

    def post(self, request, *args, **kwargs):
        data = request.data
        # print(data)
        id_obra = data.get('id')

        if not id_obra:
            return Response({'status': 'Debe ingresar un id'}, status=status.HTTP_400_BAD_REQUEST)

        obra = Obra.objects.get(id=id_obra)
        obra.is_active = False
        obra.save()
        return Response({'status': 'Obra eliminada'}, status=status.HTTP_200_OK)

    # Tabla Avance


class crear_avance(APIView):

    def post(self, request, *args, **kwargs):
        lista_avance = []

        data = request.data
        # print(data)
        if data.get('descripcion') is None:
            return Response({'message': 'Debe ingresar una descripcion'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            new_avance = Avance(
                descripcion=data.get('descripcion'),
                observaciones=data.get('observaciones'),
                notas_voz=data.get('notas_voz'),
                is_active=data.get('is_active'),
            )
            lista_avance.append(new_avance)
            Avance.objects.bulk_create(lista_avance)
            return Response({'message': 'Avance creado'}, status=status.HTTP_201_CREATED)


class listar_avances(APIView):

    def post(self, request, *args, **kwargs):
        lista_avance = []
        avances = Avance.objects.all()
        for avance in avances:
            lista_avance.append(AvanceSerializer(avance).data)
        return Response(lista_avance, status=status.HTTP_200_OK)


class editar_avance(APIView):

    def post(self, request, *args, **kwargs):
        data = request.data
        id_avance = data.get('id_avance')

        if not id_avance:
            return Response({'status': 'Debe ingresar un id'}, status=status.HTTP_400_BAD_REQUEST)

        avance = Avance.objects.get(id=id_avance)
        avance.descripcion = data.get('descripcion')
        avance.observaciones = data.get('observaciones')
        avance.notas_voz = data.get('notas_voz')
        avance.is_active = data.get('is_active')
        avance.save()
        return Response({'status': 'Avance actualizado'}, status=status.HTTP_200_OK)


class eliminar_avance(APIView):

    def post(self, request, *args, **kwargs):
        data = request.data
        id_avance = data.get('id_avance')

        if not id_avance:
            return Response({'status': 'Debe ingresar un id'}, status=status.HTTP_400_BAD_REQUEST)

        avance = Avance.objects.get(id=id_avance)
        avance.is_active = False
        avance.save()
        return Response({'status': 'Avance eliminado'}, status=status.HTTP_200_OK)

# Clase Tarea

# nombre = models.CharField(max_length=50)
    # descripcion = models.TextField()
    # estado = models.CharField(max_length=50)
    # # usuarios_asignados = models.ManyToManyField(Persona, through='tareas_asignadas')
    # usuarios_asignados = models.CharField(max_length=50)
    # id_usuario_capataz = models.ForeignKey(Persona, on_delete=models.CASCADE, default=None)
    # id_obra = models.ForeignKey(Obra, on_delete=models.CASCADE, default=None)
    # id_avance = models.ForeignKey(Avance, on_delete=models.CASCADE, default=None)


class crear_tarea(APIView):

    def post(self, request, *args, **kwargs):
        lista_tarea = []

        data = request.data
        # # print(data)
        if data.get('descripcion') is None:
            return Response({'status': 'Debe ingresar una descripcion'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            descripcion = data.get('descripcion')
            estado = data.get('estado')
            usuarios_asignados = data.get('usuarios_asignados')
            id_usuario_capataz = Persona.objects.get(
                id_usuario=data.get('id_usuario_capataz'))
            id_obra = Obra.objects.get(id=data.get('id_obra'))
            id_avance = Avance.objects.get(id=data.get('id_avance'))

            new_tarea = Tarea(
                descripcion=descripcion,
                estado=estado,
                usuarios_asignados=usuarios_asignados,
                id_usuario_capataz=id_usuario_capataz,
                id_obra=id_obra,
                id_avance=id_avance,
            )
            lista_tarea.append(new_tarea)
            Tarea.objects.bulk_create(lista_tarea)
            return Response({'status': 'Tarea creada'}, status=status.HTTP_201_CREATED)


class listar_tareas(APIView):

    def post(self, request, *args, **kwargs):
        lista_tarea = []
        tareas = Tarea.objects.all()
        for tarea in tareas:
            lista_tarea.append(TareaSerializer(tarea).data)
        return Response(lista_tarea, status=status.HTTP_200_OK)

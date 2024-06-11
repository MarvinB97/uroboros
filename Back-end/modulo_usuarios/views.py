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

import json
# import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

from modulo_usuarios.serializers import UserSerializer, PersonaSerializer, CargoSerializer, Usuario_cargosSerializer, CustomTokenObtainPairSerializer, user_token
from modulo_usuarios.models import Persona, Cargo, Usuario_cargos
# Create your views here.


class Login(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        # # # # print(request.data)

        username = request.data.get('username', '')
        password = request.data.get('password', '')
        # # # # print(username)
        # # # # print(password)
        user = authenticate(
            username=username,
            password=password
        )
        # # # # print(user)
        if user:
            login_serializer = self.serializer_class(data=request.data)
            # # print(login_serializer.is_valid())
            if user.is_active:
                if login_serializer.is_valid():
                    # # # # print(login_serializer)
                    user_serializer = user_token(user)
                    # # # # print(user_serializer)
                    login(request, user)
                    # # # # print(login_serializer)
                    # # print(user_serializer)
                    return Response({
                        'token': login_serializer.validated_data.get('access'),
                        'refresh-token': login_serializer.validated_data.get('refresh'),
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
        # # # # print(request.data)
        user_form = request.data
        # # # # print(user_form['password'])
        # user_serializer = UserSerializer(data=request.data)
        # # # # print(user_form.get('password'))
        lista_usuarios = []
        lista_persona = []
        lista_cargo = []
        if user_form:
            if (User.objects.filter(username=user_form['username']).exists()):
                return Response({'message': 'Usuario ya existe'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                try:
                    Usuario = User(
                        password=make_password(str(user_form.get('password'))),
                        is_superuser=False,
                        username=str(user_form.get('username')),
                        first_name=str(user_form.get('name')),
                        last_name=str(user_form.get('lastName')),
                        email=str(user_form.get('email')),
                        is_staff=False,
                        is_active=True
                    )
                    lista_usuarios.append(Usuario)
                except:
                    return Response({"message": "Ocurrió un error con el usuario"}, status=status.HTTP_400_BAD_REQUEST)
                User.objects.bulk_create(lista_usuarios)

            # # # # print(Usuario)

            try:
                cargo_user = Cargo.objects.filter(
                    nombre=user_form['selectRol']).values()
                user_persona = User.objects.get(
                    username=user_form['username'])
                # # # # print(user_persona)
                # # # # print(cargo_user)
                persona = Persona(
                    identificacion=user_form['document'],
                    direccion=user_form['address'],
                    genero=user_form['selectGender'],
                    id_cargo_id=cargo_user[0]['id'],
                    id_usuario=user_persona,
                    telefono=user_form['tel'],
                    tipo_identificacion=user_form['selectId'],
                )
                lista_persona.append(persona)
            except:
                return Response({"message": "Ocurrió un error con la persona"}, status=status.HTTP_400_BAD_REQUEST)

            Persona.objects.bulk_create(lista_persona)

            try:
                persona_user = Persona.objects.get(
                    id_usuario_id=user_persona.id)
                # # # # print(persona_user)
                cargo = Usuario_cargos(
                    persona_id=persona_user.id,
                    cargo_id=cargo_user[0]['id']
                )
                lista_cargo.append(cargo)
            except:
                return Response({"message": "Ocurrió un error con el cargo"}, status=status.HTTP_400_BAD_REQUEST)

            Usuario_cargos.objects.bulk_create(lista_cargo)

            return Response({"message": "Se creó el usuario Satisfactoriamente"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "Ocurrió  un error con el usuario"}, status=status.HTTP_400_BAD_REQUEST)


class actualizar_usuario(APIView):

    def post(self, request):
        # print(request.data)
        # print(request.user)
        user_form = request.data
        # # # # print(user_form['password'])
        # user_serializer = UserSerializer(data=request.data)
        # # # # print(user_form.get('password'))
        lista_usuarios = []
        lista_persona = []
        lista_cargo = []
        if user_form:
            try:
                User.objects.filter(username=user_form['username']).exists()
                user = User.objects.get(username=user_form['username'])
                user.username = user_form['username']
                user.first_name = user_form['name']
                user.last_name = user_form['lastName']
                user.email = user_form['email']
                user.password = make_password(str(user_form.get('password')))
                user.save()
                # return Response({'message': 'El Usuario ha sido actualizado exitosamente'}, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                return Response({'message': 'Usuario inexistente'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                Persona.objects.filter(
                    id_usuario_id=user.id).exists()

                persona = Persona.objects.filter(
                    id_usuario_id=user.id).values()

                if not persona:
                    try:
                        cargo_user = Cargo.objects.filter(
                            nombre=user_form['selectRol']).values()
                        user_persona = User.objects.get(
                            username=user_form['username'])
                        # # # # print(user_persona)
                        # # # # print(cargo_user)
                        persona = Persona(
                            identificacion=user_form['document'],
                            direccion=user_form['address'],
                            genero=user_form['selectGender'],
                            id_cargo_id=cargo_user[0]['id'],
                            id_usuario=user_persona,
                            telefono=user_form['tel'],
                            tipo_identificacion=user_form['selectId'],
                        )
                        lista_persona.append(persona)
                    except:
                        return Response({"message": "Ocurrió un error con la persona"}, status=status.HTTP_400_BAD_REQUEST)
                    # print("creó la persona")
                    Persona.objects.bulk_create(lista_persona)
                else:
                    persona.update(
                        identificacion=user_form['document'],
                        tipo_identificacion=user_form['selectId'],
                        genero=user_form['selectGender'],
                        telefono=user_form['tel'],
                        direccion=user_form['address']
                    )
                    # print("Encontró Persona ")
            except Persona.DoesNotExist:
                try:
                    cargo_user = Cargo.objects.filter(
                        nombre=user_form['selectRol']).values()
                    user_persona = User.objects.get(
                        username=user_form['username'])
                    # # # # print(user_persona)
                    # # # # print(cargo_user)
                    persona = Persona(
                        identificacion=user_form['document'],
                        direccion=user_form['address'],
                        genero=user_form['selectGender'],
                        id_cargo_id=cargo_user[0]['id'],
                        id_usuario=user_persona,
                        telefono=user_form['tel'],
                        tipo_identificacion=user_form['selectId'],
                    )
                    lista_persona.append(persona)
                except:
                    return Response({"message": "Ocurrió un error con la persona"}, status=status.HTTP_400_BAD_REQUEST)
                # print("creó la persona")
                Persona.objects.bulk_create(lista_persona)

            try:
                persona = Persona.objects.filter(
                    id_usuario_id=user.id).values()
                Usuario_cargos.objects.filter(
                    persona_id=persona[0]['id']).exists()

                cargo = Usuario_cargos.objects.filter(
                    persona_id=persona[0]['id']).values()
                # print(cargo)

                if not cargo:
                    try:
                        user_persona = User.objects.get(
                            username=user_form['username'])
                        persona_user = Persona.objects.get(
                            id_usuario_id=user_persona.id)
                        cargo_user = Cargo.objects.filter(
                            nombre=user_form['selectRol']).values()
                        # print(user_persona)
                        # print("Persona")
                        # print(persona_user.id)
                        # print(cargo_user)
                        cargo = Usuario_cargos(
                            persona_id=persona_user.id,
                            cargo_id=cargo_user[0]['id']
                        )
                        # print(cargo)
                        lista_cargo.append(cargo)
                        # print(lista_cargo)
                    except:
                        # print(user_persona)
                        # print("No Entra primer")
                        return Response({"message": "Ocurrió un error con el cargo"}, status=status.HTTP_400_BAD_REQUEST)

                    Usuario_cargos.objects.bulk_create(lista_cargo)
                else:
                    # print("Encontró Cargo")
                    try:
                        cargo = Usuario_cargos.objects.filter(
                            persona_id=persona[0]['id']).values()
                        # # # print(cargo)
                        # print(user_form)
                        cargo_user = Cargo.objects.filter(
                            nombre=user_form['selectRol']).values()
                        # # # print(cargo_user)
                        cargo.update(
                            cargo_id=cargo_user[0]['id']
                        )
                        persona.update(
                            id_cargo_id=cargo_user[0]['id']
                        )
                    except Usuario_cargos.DoesNotExist:
                        return Response({'message': 'No se encontró el cargo'}, status=status.HTTP_400_BAD_REQUEST)

            except Usuario_cargos.DoesNotExist:
                # print("WTF")
                try:
                    persona_user = Persona.objects.get(
                        id_usuario_id=user_persona.id)
                    # # # # print(persona_user)
                    cargo = Usuario_cargos(
                        persona_id=persona_user.id,
                        cargo_id=cargo_user[0]['id']
                    )
                    lista_cargo.append(cargo)
                except:
                    return Response({"message": "Ocurrió un error con el cargo"}, status=status.HTTP_400_BAD_REQUEST)

                Usuario_cargos.objects.bulk_create(lista_cargo)

            #     return Response({"message": "Se creó el usuario Satisfactoriamente"}, status=status.HTTP_201_CREATED)
            # return Response({'message': 'No se encontró el cargo'}, status=status.HTTP_400_BAD_REQUEST)

            # updated_user = authenticate(
            #     username=user.username,
            #     password=user.password
            # )
            # login(request, updated_user)
            return Response({"message": "Se actualizó el usuario Satisfactoriamente"}, status=status.HTTP_201_CREATED)

        else:
            return Response({"message": "Ocurrió  un error con el usuario"}, status=status.HTTP_400_BAD_REQUEST)


class actualizar_usuario_especifico(APIView):

    def post(self, request, pk):
        # # # print(request.data)
        # # # print(request.user)
        # # print(pk)
        user_form = request.data
        # # # # print(user_form['password'])
        # user_serializer = UserSerializer(data=request.data)
        # # # # print(user_form.get('password'))
        lista_usuarios = []
        if user_form:
            try:
                User.objects.filter(username=user_form['username']).exists()
                user = User.objects.get(username=user_form['username'])
                user.username = user_form['username']
                user.first_name = user_form['first_name']
                user.last_name = user_form['last_name']
                user.email = user_form['email']
                user.password = make_password(str(user_form.get('password')))
                user.save()
                # return Response({'message': 'El Usuario ha sido actualizado exitosamente'}, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                return Response({'message': 'Usuario inexistente'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                persona = Persona.objects.filter(
                    id_usuario_id=user.id).values()
                persona.update(
                    identificacion=user_form['identificacion'],
                    tipo_identificacion=user_form['tipo_identificacion'],
                    genero=user_form['genero'],
                    telefono=user_form['telefono'],
                    direccion=user_form['direccion']
                )
            except Persona.DoesNotExist:
                return Response({'message': 'No se encontró la persona'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                cargo = Usuario_cargos.objects.filter(
                    persona_id=persona[0]['id']).values()
                # # # print(cargo)
                cargo_user = Cargo.objects.filter(
                    nombre=user_form['cargo']).values()
                # # # print(cargo_user)
                cargo.update(
                    cargo_id=cargo_user[0]['id']
                )
                persona.update(
                    id_cargo_id=cargo_user[0]['id']
                )
            except Usuario_cargos.DoesNotExist:
                return Response({'message': 'No se encontró el cargo'}, status=status.HTTP_400_BAD_REQUEST)

            # updated_user = authenticate(
            #     username=user.username,
            #     password=user.password
            # )
            # login(request, updated_user)
            return Response({"message": "Se actualizó el usuario Satisfactoriamente"}, status=status.HTTP_201_CREATED)

        else:
            return Response({"message": "Ocurrió  un error con el usuario"}, status=status.HTTP_400_BAD_REQUEST)


class desactivar_usuario(APIView):

    def post(self, request, pk):
        user = User.objects.filter(id=pk).values()
        # # # print(user)
        try:
            user = User.objects.get(id=pk)
            user.is_active = False
            user.save()
            return Response({'message': 'Usuario desactivado'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'message': 'No se encontró el usuario'}, status=status.HTTP_400_BAD_REQUEST)


class extra_info(APIView):
    def post(self, request, pk):
        # # # # print("Data:")
        # # # # print(request.data)
        # # # # print(pk)
        user = User.objects.filter(id=pk).values()
        # # # # print("usuario:")
        # # # # print(user)
        # serialized_user = UserSerializer(user, many=True)
        # # # # print("serialized:")
        # # # # print(serialized_user.data)
        final_user_data = []
        try:
            persona = Persona.objects.filter(
                id_usuario_id=user[0]['id']).values()
            # # # # print(persona)
        except Persona.DoesNotExist:

            return Response({'message': 'No se encontró la persona'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            cargo = Cargo.objects.filter(
                id=persona[0]['id_cargo_id']).values()
            cargo_user = cargo[0]['nombre']

        except Cargo.DoesNotExist:
            return Response({'message': 'No se encontró el cargo'}, status=status.HTTP_400_BAD_REQUEST)

        data = dict(user[0], **persona[0])
        # dicc = [
        #     user[0], persona[0]
        # ]
        data.update({'cargo': cargo_user})
        final_user_data.append(data)

        # # # print(final_user_data)
        return Response({'user_extra': final_user_data}, status=status.HTTP_200_OK)


class listar_usuarios(APIView):

    def post(self, request):
        users = User.objects.all().values()
        # # # print(users)
        lista_usuarios = []
        for user in users:
            try:
                dicc_user = [{
                    "id": user['id'],
                    "username": user['username'],
                    "name": user['first_name'],
                    "lastName": user['last_name'],
                    "email": user['email'],
                    "status": user['is_active']
                }]
            except:
                # # # print("WTF")
                dicc_user = [{
                    "id": None,
                    "username": None,
                    "name": None,
                    "lastName": None,
                    "email": None,
                }]
                return Response({'message': 'No se encontró el usuario'}, status=status.HTTP_400_BAD_REQUEST)
            try:
                persona = Persona.objects.filter(
                    id_usuario_id=user['id']).values()
                dicc_persona = [{
                    "identificacion": persona[0]['identificacion'],
                    "tipo_identificacion": persona[0]['tipo_identificacion'],
                    "direccion": persona[0]['direccion'],
                }]
                # # # print(dicc_persona)
            except Persona.DoesNotExist:
                dicc_persona = [{
                    "identificacion": None,
                    "tipo_identificacion": None,
                    "direccion": None,
                }]
                return Response({'message': 'No se encontró la persona'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                cargo = Cargo.objects.filter(
                    id=persona[0]['id_cargo_id']).values()
                cargo_user = cargo[0]['nombre']
                dicc_cargo = [{
                    "cargo": cargo_user
                }]
                # # # print(cargo_user)
            except Cargo.DoesNotExist:
                return Response({'message': 'No se encontró el cargo'}, status=status.HTTP_400_BAD_REQUEST)

            data = dict(dicc_user[0], **dicc_persona[0], **dicc_cargo[0])
            # data.update({'cargo': cargo_user})
            lista_usuarios.append(data)

        # # # print(lista_usuarios)
        return Response(lista_usuarios, status=status.HTTP_200_OK)

# @csrf_exempt
# class VerifyRecaptchaView(View):
#     def post(self, request):
#         data = json.loads(request.body)
#         recaptcha_response = data.get('recaptcha')

#         if not recaptcha_response:
#             return JsonResponse({'success': False, 'message': 'reCAPTCHA no completado'}, status=400)

#         payload = {
#             'secret': settings.RECAPTCHA_SECRET_KEY,
#             'response': recaptcha_response
#         }

#         r = requests.post('https://www.google.com/recaptcha/api/siteverify', data=payload)
#         result = r.json()

#         if result['success']:
#             return JsonResponse({'success': True, 'message': 'Verificación exitosa'})
#         else:
#             return JsonResponse({'success': False, 'message': 'Verificación fallida'}, status=400)
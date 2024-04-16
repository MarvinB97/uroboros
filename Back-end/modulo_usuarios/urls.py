from django.urls import path
from modulo_usuarios import views

urlpatterns = [
    path('login', views.Login.as_view()),
    path('crear_usuario', views.crear_usuario.as_view()),
    path('actualizar_usuario', views.actualizar_usuario.as_view()),
    path('extra_info/<int:pk>' , views.extra_info.as_view()),
    path('listar_usuarios', views.listar_usuarios.as_view()),
    path('actualizar_usuario_especifico/<int:pk>', views.actualizar_usuario_especifico.as_view()),
    path('eliminar_usuario/<int:pk>', views.desactivar_usuario.as_view()),
]

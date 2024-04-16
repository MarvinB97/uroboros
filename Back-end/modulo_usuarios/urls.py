from django.urls import path
from modulo_usuarios import views

urlpatterns = [
    path('login', views.Login.as_view()),
    path('crear_usuario', views.crear_usuario.as_view()),
    path('actualizar_usuario', views.actualizar_usuario.as_view()),
    path('extra_info/<int:pk>' , views.extra_info.as_view()),
]

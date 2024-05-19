from django.urls import path
from modulo_tareas import views

urlpatterns = [
    path('crear_obra', views.crear_obra.as_view()),
    path('listar_obras', views.listar_obras.as_view()),
    path('editar_obra', views.editar_obra.as_view()),
    path('eliminar_obra', views.eliminar_obra.as_view()),
    # path('crear_tarea', views.crear_tarea.as_view()),
]
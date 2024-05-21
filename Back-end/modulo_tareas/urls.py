from django.urls import path
from modulo_tareas import views

urlpatterns = [
    path('crear_obra', views.crear_obra.as_view()),
    path('listar_obras', views.listar_obras.as_view()),
    path('editar_obra/<int:pk>', views.editar_obra.as_view()),
    path('listar_obra_especifica/<int:pk>',
         views.listar_obra_especifica.as_view()),
    path('listar_usuario_persona_obra/<int:pk>',
         views.listar_usuario_persona_obra.as_view()),
    path('eliminar_obra/<int:pk>', views.eliminar_obra.as_view()),
    path('crear_tarea', views.crear_tarea.as_view()),
    path('listar_tareas', views.listar_tareas.as_view()),
    # path('editar_tarea/<int:pk>', views.editar_tarea.as_view()),
    # path('eliminar_tarea/<int:pk>', views.eliminar_tarea.as_view()),
    path('crear_avance', views.crear_avance.as_view()),
    path('listar_avances', views.listar_avances.as_view()),
    # path('editar_avance/<int:pk>', views.editar_avance.as_view()),
    # path('eliminar_avance/<int:pk>', views.eliminar_avance.as_view()),

    # path('crear_tarea', views.crear_tarea.as_view()),
]

"""
URL configuration for urbrs project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

# from modulo_usuarios.views import saludo

urlpatterns = [
    path('admin/', admin.site.urls),
    path('usuarios/', include('modulo_usuarios.urls')),  # Prefijos para cada módulo
    path('tareas/', include('modulo_tareas.urls')),
    path('reportes/', include('modulo_reportes.urls')),
    path('', include('modulo_usuarios.urls')),  # Asumiendo que `modulo_usuarios` maneja la raíz
]

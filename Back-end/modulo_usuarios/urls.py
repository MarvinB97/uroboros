from django.urls import path
from modulo_usuarios import views

urlpatterns = [
    path('login', views.Login.as_view()),
]

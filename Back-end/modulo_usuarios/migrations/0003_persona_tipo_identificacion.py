# Generated by Django 4.1 on 2024-04-16 02:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modulo_usuarios', '0002_remove_persona_apellido_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='persona',
            name='tipo_identificacion',
            field=models.CharField(default=None, max_length=10),
        ),
    ]

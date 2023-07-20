# Generated by Django 4.1 on 2023-07-20 18:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_zone_detail'),
        ('impression', '0004_alter_impression_taxi_zone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='impression',
            name='taxi_zone',
            field=models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_name='+', to='main.zone'),
        ),
        migrations.AlterModelTable(
            name='impression',
            table=None,
        ),
    ]

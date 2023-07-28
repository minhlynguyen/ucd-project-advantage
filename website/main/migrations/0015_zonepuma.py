# Generated by Django 4.1 on 2023-07-28 17:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0014_census'),
    ]

    operations = [
        migrations.CreateModel(
            name='ZonePuma',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('intersection', models.FloatField()),
                ('puma', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_name='puma', to='main.puma')),
                ('zone', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_name='zone', to='main.zone')),
            ],
            options={
                'db_table': 'maps"."zone_puma',
                'managed': True,
            },
        ),
    ]

# Generated by Django 4.1.7 on 2023-08-03 19:11

import django.contrib.gis.db.models.fields
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Puma',
            fields=[
                ('id', models.PositiveBigIntegerField(primary_key=True, serialize=False)),
                ('median_income', models.IntegerField(null=True)),
                ('females_under_5', models.FloatField(null=True)),
                ('females_5_14', models.FloatField(null=True)),
                ('females_15_24', models.FloatField(null=True)),
                ('females_25_34', models.FloatField(null=True)),
                ('females_35_44', models.FloatField(null=True)),
                ('females_45_54', models.FloatField(null=True)),
                ('females_55_64', models.FloatField(null=True)),
                ('females_65_74', models.FloatField(null=True)),
                ('females_75_84', models.FloatField(null=True)),
                ('females_85', models.FloatField(null=True)),
                ('males_under_5', models.FloatField(null=True)),
                ('males_5_14', models.FloatField(null=True)),
                ('males_15_24', models.FloatField(null=True)),
                ('males_25_34', models.FloatField(null=True)),
                ('males_35_44', models.FloatField(null=True)),
                ('males_45_54', models.FloatField(null=True)),
                ('males_55_64', models.FloatField(null=True)),
                ('males_65_74', models.FloatField(null=True)),
                ('males_75_84', models.FloatField(null=True)),
                ('males_85', models.FloatField(null=True)),
                ('main_demographic', models.CharField(max_length=13, null=True)),
                ('geom', django.contrib.gis.db.models.fields.MultiPolygonField(srid=4326)),
            ],
            options={
                'db_table': 'maps"."puma',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Zone',
            fields=[
                ('id', models.PositiveIntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=45)),
                ('borough', models.CharField(max_length=13)),
                ('geom', django.contrib.gis.db.models.fields.MultiPolygonField(srid=4326)),
            ],
            options={
                'db_table': 'maps"."zone',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nyc_id', models.CharField(max_length=30, unique=True)),
                ('status', models.CharField(max_length=8)),
                ('last_update', models.DateTimeField(default=django.utils.timezone.now)),
                ('small_cate', models.CharField(max_length=50)),
                ('big_cate', models.CharField(max_length=50)),
                ('name', models.CharField(max_length=150)),
                ('geom', django.contrib.gis.db.models.fields.PointField(srid=4326)),
                ('taxi_zone', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_name='zone_places', to='main.zone')),
            ],
            options={
                'db_table': 'maps"."place',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='ZonePuma',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('intersection', models.FloatField(null=True)),
                ('median_income', models.FloatField(null=True)),
                ('females_under_5', models.FloatField(null=True)),
                ('females_5_14', models.FloatField(null=True)),
                ('females_15_24', models.FloatField(null=True)),
                ('females_25_34', models.FloatField(null=True)),
                ('females_35_44', models.FloatField(null=True)),
                ('females_45_54', models.FloatField(null=True)),
                ('females_55_64', models.FloatField(null=True)),
                ('females_65_74', models.FloatField(null=True)),
                ('females_75_84', models.FloatField(null=True)),
                ('females_85', models.FloatField(null=True)),
                ('males_under_5', models.FloatField(null=True)),
                ('males_5_14', models.FloatField(null=True)),
                ('males_15_24', models.FloatField(null=True)),
                ('males_25_34', models.FloatField(null=True)),
                ('males_35_44', models.FloatField(null=True)),
                ('males_45_54', models.FloatField(null=True)),
                ('males_55_64', models.FloatField(null=True)),
                ('males_65_74', models.FloatField(null=True)),
                ('males_75_84', models.FloatField(null=True)),
                ('males_85', models.FloatField(null=True)),
                ('puma', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_name='puma_zone', to='main.puma')),
                ('zone', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_name='zone_puma', to='main.zone')),
            ],
            options={
                'db_table': 'maps"."zone_puma',
                'managed': True,
                'unique_together': {('zone', 'puma')},
            },
        ),
        migrations.CreateModel(
            name='ZoneDetail',
            fields=[
                ('zone_time_id', models.AutoField(primary_key=True, serialize=False)),
                ('datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('impression_history', models.PositiveIntegerField(null=True)),
                ('impression_predict', models.PositiveIntegerField(null=True)),
                ('place_last_update', models.DateTimeField(default=django.utils.timezone.now)),
                ('prediction_last_update', models.DateTimeField(default=django.utils.timezone.now, null=True)),
                ('month', models.CharField(max_length=2, null=True)),
                ('week', models.CharField(max_length=1)),
                ('hour', models.CharField(max_length=2)),
                ('borough', models.CharField(max_length=13, null=True)),
                ('entertainment_and_recreation', models.PositiveIntegerField(default=0)),
                ('financial_services', models.PositiveIntegerField(default=0)),
                ('food_and_beverage', models.PositiveIntegerField(default=0)),
                ('parking_and_automotive_services', models.PositiveIntegerField(default=0)),
                ('professional_services', models.PositiveIntegerField(default=0)),
                ('real_estate', models.PositiveIntegerField(default=0)),
                ('retail_services', models.PositiveIntegerField(default=0)),
                ('transportation', models.PositiveIntegerField(default=0)),
                ('hospital', models.PositiveIntegerField(default=0)),
                ('hotspots', models.PositiveIntegerField(default=0)),
                ('school', models.PositiveIntegerField(default=0)),
                ('total_business', models.PositiveIntegerField(default=0)),
                ('holiday', models.CharField(max_length=50, null=True)),
                ('taxi_zone', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_name='zone_detail', to='main.zone')),
            ],
            options={
                'db_table': 'maps"."zone_detail',
                'managed': True,
                'unique_together': {('taxi_zone', 'datetime')},
            },
        ),
    ]

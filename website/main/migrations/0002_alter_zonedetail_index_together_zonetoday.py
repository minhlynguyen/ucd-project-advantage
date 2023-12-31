# Generated by Django 4.2.4 on 2023-08-10 21:57

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("main", "0001_initial"),
    ]

    operations = [
        migrations.AlterIndexTogether(
            name="zonedetail",
            index_together={("taxi_zone", "datetime")},
        ),
        migrations.CreateModel(
            name="ZoneToday",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("zone_id", models.PositiveIntegerField(null=True)),
                ("datetime", models.DateTimeField(null=True)),
                ("impression_predict", models.PositiveIntegerField(null=True)),
                (
                    "entertainment_and_recreation",
                    models.PositiveIntegerField(null=True),
                ),
                ("financial_services", models.PositiveIntegerField(null=True)),
                ("food_and_beverage", models.PositiveIntegerField(null=True)),
                (
                    "parking_and_automotive_services",
                    models.PositiveIntegerField(null=True),
                ),
                ("professional_services", models.PositiveIntegerField(null=True)),
                ("real_estate", models.PositiveIntegerField(null=True)),
                ("retail_services", models.PositiveIntegerField(null=True)),
                ("transportation", models.PositiveIntegerField(null=True)),
                ("hospital", models.PositiveIntegerField(null=True)),
                ("hotspots", models.PositiveIntegerField(null=True)),
                ("school", models.PositiveIntegerField(null=True)),
                ("total_business", models.PositiveIntegerField(null=True)),
                ("holiday", models.CharField(max_length=50, null=True)),
            ],
            options={
                "db_table": 'maps"."zone_today',
                "managed": True,
                "unique_together": {("zone_id", "datetime")},
                "index_together": {("zone_id", "datetime")},
            },
        ),
    ]

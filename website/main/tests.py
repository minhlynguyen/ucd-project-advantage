from django.test import TestCase
from django.utils import timezone
from django.db.utils import IntegrityError
from .models import Zone, ZoneDetail, Puma, ZonePuma, Place
from django.contrib.gis.geos import GEOSGeometry, MultiPolygon
from rest_framework.test import APIClient
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.urls import reverse
from user_api.models import AppUser

polygon1 = GEOSGeometry(
'POLYGON((-74.006 40.7128, -73.995 40.7128, -73.995 40.7213, -74.006 40.7213, -74.006 40.7128))',
srid=4326
)

polygon2 = GEOSGeometry(
'POLYGON((-73.990 40.708, -73.980 40.708, -73.980 40.715, -73.990 40.715, -73.990 40.708))',
srid=4326
)

class ZoneModelTestCase(TestCase):
    def setUp(self):
        self.zone = Zone.objects.create(
            id=1,
            name="Test Zone",
            borough="Test Borough",
            geom=MultiPolygon(polygon1, polygon2, srid=4326)
        )

    def test_zone_str_representation(self):
        zone = Zone.objects.get(id=1)
        expected_representation = f"Zone(id={zone.id}, name='{zone.name}', borough='{zone.borough}')"
        self.assertEqual(str(zone), expected_representation)

    def test_zone_creation(self):
        zone = Zone.objects.get(id=1)
        self.assertEqual(zone.name, 'Test Zone')
        self.assertEqual(zone.borough, 'Test Borough')

    def test_zone_count(self):
        zone_count = Zone.objects.count()
        self.assertEqual(zone_count, 1)


class ZoneDetailModelTestCase(TestCase):

    def setUp(self):
        # Set up test data for Zone and ZoneDetail
        self.zone = Zone.objects.create(
            id=1, name='Zone A', borough='Borough 1', 
            geom=MultiPolygon(polygon1, polygon2, srid=4326))
        self.zone_detail = ZoneDetail.objects.create(
            zone_time_id=1,
            taxi_zone=self.zone,
            datetime=timezone.now(),
            impression_history=100,
            impression_predict=90,
            place_last_update=timezone.now(),
            prediction_last_update=timezone.now(),
            month='08',
            week='1',
            hour='12',
            borough='Borough 1',
            entertainment_and_recreation=10,
            financial_services=20,
            food_and_beverage=30,
            parking_and_automotive_services=5,
            professional_services=15,
            real_estate=25,
            retail_services=40,
            transportation=50,
            hospital=2,
            hotspots=8,
            school=3,
            total_business=175,
            holiday='New Year'
        )

    def test_zone_detail_str_representation(self):
        expected_representation = f"ZoneDetail(zone_time_id={self.zone_detail.zone_time_id}, taxi_zone={self.zone_detail.taxi_zone}, datetime={self.zone_detail.datetime})"
        self.assertEqual(str(self.zone_detail), expected_representation)

    def test_zone_detail_creation(self):
        self.assertEqual(self.zone_detail.zone_time_id, 1)
        self.assertEqual(self.zone_detail.taxi_zone.id, 1)
        self.assertEqual(self.zone_detail.impression_history, 100)
        # Add more assertions for other fields as needed

    def test_unique_constraint(self):
        with self.assertRaises(IntegrityError):
            # Attempt to create a duplicate ZoneDetail with the same taxi_zone and datetime
            zone_1 = Zone.objects.get(id=1)
            zone_time = ZoneDetail.objects.get(taxi_zone_id=1)
            ZoneDetail.objects.create(
                zone_time_id=2,
                taxi_zone=zone_1,
                datetime=zone_time.datetime,
            )

    # Add more test methods as needed

    def test_default_values(self):
        self.assertEqual(self.zone_detail.entertainment_and_recreation, 10)
        self.assertEqual(self.zone_detail.financial_services, 20)
        # Add assertions for other default fields


class PumaModelTestCase(TestCase):
    def setUp(self):
        self.puma = Puma.objects.create(
            id=1,
            median_income=50000,
            females_under_5=100,
            females_5_14=200,
            females_15_24=300,
            females_25_34=400,
            females_35_44=500,
            females_45_54=600,
            females_55_64=700,
            females_65_74=800,
            females_75_84=900,
            females_85=1000,
            males_under_5=50,
            males_5_14=150,
            males_15_24=250,
            males_25_34=350,
            males_35_44=450,
            males_45_54=550,
            males_55_64=650,
            males_65_74=750,
            males_75_84=850,
            males_85=950,
            main_demographic="Test Demo",
            geom=MultiPolygon(polygon1, polygon2, srid=4326)
        )

    def test_puma_creation(self):
        self.assertTrue(isinstance(self.puma, Puma))
        self.assertEqual(self.puma.median_income, 50000)
        self.assertEqual(self.puma.females_under_5, 100)
        self.assertEqual(self.puma.females_5_14, 200)
        self.assertEqual(self.puma.females_15_24, 300)
        self.assertEqual(self.puma.females_25_34, 400)
        self.assertEqual(self.puma.females_35_44, 500)
        self.assertEqual(self.puma.females_45_54, 600)
        self.assertEqual(self.puma.females_55_64, 700)
        self.assertEqual(self.puma.females_65_74, 800)
        self.assertEqual(self.puma.females_75_84, 900)
        self.assertEqual(self.puma.females_85, 1000)
        self.assertEqual(self.puma.males_under_5, 50)
        self.assertEqual(self.puma.males_5_14, 150)
        self.assertEqual(self.puma.males_15_24, 250)
        self.assertEqual(self.puma.males_25_34, 350)
        self.assertEqual(self.puma.males_35_44, 450)
        self.assertEqual(self.puma.males_45_54, 550)
        self.assertEqual(self.puma.males_55_64, 650)
        self.assertEqual(self.puma.males_65_74, 750)
        self.assertEqual(self.puma.males_75_84, 850)
        self.assertEqual(self.puma.males_85, 950)
        self.assertEqual(self.puma.main_demographic, "Test Demo")

#     # Add more test cases for other methods or functionalities in the Puma model.
#     # ...
    def test_puma_str_representation(self):
        puma = Puma.objects.get(id=1)
        expected_representation = (
            f"Puma(id={puma.id}, median_income={puma.median_income}, main_demographic='{puma.main_demographic}')"
        )
        self.assertEqual(str(puma), expected_representation)


class ZonePumaModelTestCase(TestCase):
    def setUp(self):
        self.zone = Zone.objects.create(
            id=1,
            name="Test Zone",
            borough="Test Borough",
            geom=MultiPolygon(polygon1, polygon2, srid=4326)
        )
        self.puma = Puma.objects.create(
            id=1,
            median_income=50000,
            females_under_5=100,
            females_5_14=200,
            females_15_24=300,
            females_25_34=400,
            females_35_44=500,
            females_45_54=600,
            females_55_64=700,
            females_65_74=800,
            females_75_84=900,
            females_85=1000,
            males_under_5=50,
            males_5_14=150,
            males_15_24=250,
            males_25_34=350,
            males_35_44=450,
            males_45_54=550,
            males_55_64=650,
            males_65_74=750,
            males_75_84=850,
            males_85=950,
            main_demographic="Test Demo",
            geom=MultiPolygon(polygon1, polygon2, srid=4326)
        )
        self.zone_puma = ZonePuma.objects.create(
            zone=self.zone,
            puma=self.puma,
            intersection=0.75,
            # Add other required attributes for ZonePuma instance creation
            # ...
        )

    def test_zone_puma_creation(self):
        self.assertTrue(isinstance(self.zone_puma, ZonePuma))
        self.assertEqual(self.zone_puma.zone, self.zone)
        self.assertEqual(self.zone_puma.puma, self.puma)
        self.assertEqual(self.zone_puma.intersection, 0.75)
        # Add test cases for other ZonePuma attributes here.
        # ...

    def test_zone_puma_str_representation(self):
        expected_str = f"Zone: {self.zone.name}, Puma: Puma ID: {self.puma.id}"
        self.assertEqual(str(self.zone_puma), expected_str)

    # Add more test cases for other methods or functionalities in the ZonePuma model.
    # ...


class PlaceModelTestCase(TestCase):
    def setUp(self):
        self.zone = Zone.objects.create(
            id=1,
            name="Test Zone",
            borough="Test Borough",
            geom=MultiPolygon(polygon1, polygon2, srid=4326)
        )
        self.place = Place.objects.create(
            id=1,
            nyc_id="12345",
            status="Active",
            small_cate="Test Small Cate",
            big_cate="Test Big Cate",
            name="Test Place",
            geom="POINT(0 0)",
            taxi_zone=self.zone,
        )

    def test_place_creation(self):
        self.assertTrue(isinstance(self.place, Place))
        self.assertEqual(self.place.nyc_id, "12345")
        self.assertEqual(self.place.status, "Active")
        self.assertEqual(self.place.small_cate, "Test Small Cate")
        self.assertEqual(self.place.big_cate, "Test Big Cate")
        # Add more assertions for other Place attributes here.
        # ...

    def test_place_str_representation(self):
        place = Place.objects.get(id=1)
        expected_representation = f"Place(id={place.id}, name='{place.name}', nyc_id='{place.nyc_id}', status='{place.status}')"
        self.assertEqual(str(place), expected_representation)

    # Add more test cases for other methods or functionalities in the Place model.
    # ...
class ZoneCensusViewTestCase(TestCase):

    def setUp(self):
        self.user = AppUser.objects.create_user(email='testuser@email.com', password='testpassword')
        self.client = APIClient()

    def test_zone_census_success(self):
        url = reverse('main:zones')
        self.client.force_authenticate(user=self.user)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], '1')


class PlaceInZoneViewTestCase(TestCase):

    def setUp(self):
        self.zone = Zone.objects.create(
            id=1,
            name='Test Zone',
            borough='Test Borough',
            geom=MultiPolygon(polygon1, polygon2, srid=4326),  # Replace with valid geometry
        )
        self.place = Place.objects.create(
            nyc_id='test_place',
            status='Active',
            small_cate='Test Category',
            big_cate='Test Big Category',
            name='Test Place',
            geom= GEOSGeometry('POINT(1 1)'),  
            taxi_zone_id=1,  
        )
        self.user = AppUser.objects.create_user(email='testuser@email.com', password='testpassword')
        self.client = APIClient()

    def test_place_in_zone_success(self):
        url = reverse('main:place_in_zone',args=[1])
        self.client.force_authenticate(user=self.user)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], '1')
        # Additional assertions for the data content, if needed

    def test_place_in_zone_failure(self):
        url = reverse('main:place_in_zone',args=[999])
        self.client.force_authenticate(user=self.user)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], '2')

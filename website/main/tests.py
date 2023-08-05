from django.test import TestCase
from django.utils import timezone
from .models import Zone, ZoneDetail, Puma, ZonePuma, Place

class ZoneModelTestCase(TestCase):
    def setUp(self):
        self.zone = Zone.objects.create(
            id=1,
            name="Test Zone",
            borough="Test Borough",
            geom="MultiPolygon([(((0.0, 0.0), (0.0, 1.0), (1.0, 1.0), (1.0, 0.0)),[((0.1,0.1), (0.1,0.2), (0.2,0.2), (0.2,0.1))])])"
        )

    def test_zone_creation(self):
        self.assertTrue(isinstance(self.zone, Zone))
        self.assertEqual(self.zone.name, "Test Zone")
        self.assertEqual(self.zone.borough, "Test Borough")
        self.assertEqual(str(self.zone), "Test Zone")

    # Add more test cases for other methods or functionalities in the Zone model.
    # ...


class ZoneDetailModelTestCase(TestCase):
    @classmethod
    def setUpTestData(self):
        # Reusing the existing Zone instance created in ZoneModelTestCase
        self.zone = Zone.objects.create(
            id=1,
            name="Test Zone",
            borough="Test Borough",
            geom="MultiPolygon([(((0.0, 0.0), (0.0, 1.0), (1.0, 1.0), (1.0, 0.0)),[((0.1,0.1), (0.1,0.2), (0.2,0.2), (0.2,0.1))])])"
        )

    def setUp(self):
        self.zone_detail = ZoneDetail.objects.create(
            taxi_zone=self.zone,
            datetime=timezone.now(),
            impression_history=100,
            impression_predict=50,
            place_last_update=timezone.now(),
            prediction_last_update=timezone.now(),
            month="04",
            week="3",
            hour="10",
            borough="Test Borough",
            entertainment_and_recreation=20,
            financial_services=30,
            food_and_beverage=40,
            parking_and_automotive_services=10,
            professional_services=15,
            real_estate=5,
            retail_services=25,
            transportation=35,
            hospital=8,
            hotspots=2,
            school=3,
            total_business=150,
            holiday="New Year"
        )

    def test_zone_detail_creation(self):
        self.assertTrue(isinstance(self.zone_detail, ZoneDetail))
        self.assertEqual(self.zone_detail.taxi_zone, self.zone)
        self.assertEqual(self.zone_detail.impression_history, 100)
        self.assertEqual(self.zone_detail.impression_predict, 50)
        self.assertIsNotNone(self.zone_detail.place_last_update)
        self.assertIsNotNone(self.zone_detail.prediction_last_update)
        self.assertEqual(self.zone_detail.month, "04")
        self.assertEqual(self.zone_detail.week, "3")
        self.assertEqual(self.zone_detail.hour, "10")
        self.assertEqual(self.zone_detail.borough, "Test Borough")
        self.assertEqual(self.zone_detail.entertainment_and_recreation, 20)
        self.assertEqual(self.zone_detail.financial_services, 30)
        self.assertEqual(self.zone_detail.food_and_beverage, 40)
        self.assertEqual(self.zone_detail.parking_and_automotive_services, 10)
        self.assertEqual(self.zone_detail.professional_services, 15)
        self.assertEqual(self.zone_detail.real_estate, 5)
        self.assertEqual(self.zone_detail.retail_services, 25)
        self.assertEqual(self.zone_detail.transportation, 35)
        self.assertEqual(self.zone_detail.hospital, 8)
        self.assertEqual(self.zone_detail.hotspots, 2)
        self.assertEqual(self.zone_detail.school, 3)
        self.assertEqual(self.zone_detail.total_business, 150)
        self.assertEqual(self.zone_detail.holiday, "New Year")

    def test_zone_detail_str_representation(self):
        expected_str = "Test Zone - " + str(self.zone_detail.datetime)
        self.assertEqual(str(self.zone_detail), expected_str)

    # Add more test cases for other methods or functionalities in the ZoneDetail model.
    # ...


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
            main_demographic="Test Demographic",
            geom="MULTIPOLYGON(((0 0, 0 1, 1 1, 1 0, 0 0)))"
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
        self.assertEqual(self.puma.main_demographic, "Test Demographic")
        self.assertEqual(str(self.puma), "Puma ID: 1")

#     # Add more test cases for other methods or functionalities in the Puma model.
#     # ...


class ZonePumaModelTestCase(TestCase):
    def setUp(self):
        self.zone = Zone.objects.create(
            id=1,
            name="Test Zone",
            borough="Test Borough",
            geom="POLYGON((0 0, 0 1, 1 1, 1 0, 0 0))"
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
            main_demographic="Test Demographic",
            geom="MULTIPOLYGON(((0 0, 0 1, 1 1, 1 0, 0 0)))"
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
            geom="POLYGON((0 0, 0 1, 1 1, 1 0, 0 0))"
        )
        self.place = Place.objects.create(
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
        expected_str = f"Place: {self.place.nyc_id}"
        self.assertEqual(str(self.place), expected_str)

    # Add more test cases for other methods or functionalities in the Place model.
    # ...


# Add more test cases as needed for other methods or functionalities in the models.
# ...

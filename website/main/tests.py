from django.test import TestCase
from django.utils import timezone
from .models import Zone, ZoneDetail, Puma, ZonePuma, Place

class ZoneModelTestCase(TestCase):
    def setUp(self):
        self.zone = Zone.objects.create(
            id=1,
            name="Test Zone",
            borough="Test Borough",
            geom="POLYGON((0 0, 0 1, 1 1, 1 0, 0 0))"
        )

    def test_zone_creation(self):
        self.assertEqual(self.zone.name, "Test Zone")
        self.assertEqual(self.zone.borough, "Test Borough")
        self.assertEqual(str(self.zone), "Test Zone")

    def test_current_detail(self):
        # Add test cases for the current_detail method here, if required.
        pass


class ZoneDetailModelTestCase(TestCase):
    def setUp(self):
        self.zone = Zone.objects.create(id=1, name="Test Zone", borough="Test Borough", geom="POLYGON((0 0, 0 1, 1 1, 1 0, 0 0))")
        self.zone_detail = ZoneDetail.objects.create(
            taxi_zone=self.zone,
            datetime=timezone.now(),
            # Add other required attributes for ZoneDetail instance creation
            # ...
        )

    def test_zone_detail_creation(self):
        # Add test cases for ZoneDetail model creation here.
        pass

    def test_zone_detail_str_representation(self):
        expected_str = "Test Zone - " + str(self.zone_detail.datetime)
        self.assertEqual(str(self.zone_detail), expected_str)

class PumaModelTestCase(TestCase):
    def setUp(self):
        self.puma = Puma.objects.create(
            id=1,
            median_income=50000,
            # Add other required attributes for Puma instance creation
            # ...
        )

    def test_puma_creation(self):
        # Add test cases for Puma model creation here.
        pass

    def test_puma_str_representation(self):
        expected_str = "Puma ID: 1"
        self.assertEqual(str(self.puma), expected_str)


class ZonePumaModelTestCase(TestCase):
    def setUp(self):
        self.zone = Zone.objects.create(id=1, name="Test Zone", borough="Test Borough", geom="POLYGON((0 0, 0 1, 1 1, 1 0, 0 0))")
        self.puma = Puma.objects.create(id=1, median_income=50000)
        self.zone_puma = ZonePuma.objects.create(
            zone=self.zone,
            puma=self.puma,
            # Add other required attributes for ZonePuma instance creation
            # ...
        )

    def test_zone_puma_creation(self):
        # Add test cases for ZonePuma model creation here.
        pass

    def test_zone_puma_str_representation(self):
        expected_str = "Zone: Test Zone, Puma: Puma ID: 1"
        self.assertEqual(str(self.zone_puma), expected_str)


class PlaceModelTestCase(TestCase):
    def setUp(self):
        self.zone = Zone.objects.create(id=1, name="Test Zone", borough="Test Borough", geom="POLYGON((0 0, 0 1, 1 1, 1 0, 0 0))")
        self.place = Place.objects.create(
            nyc_id="12345",
            status="Active",
            # Add other required attributes for Place instance creation
            # ...
            taxi_zone=self.zone,
        )

    def test_place_creation(self):
        # Add test cases for Place model creation here.
        pass

    def test_place_str_representation(self):
        expected_str = "Place: 12345"
        self.assertEqual(str(self.place), expected_str)
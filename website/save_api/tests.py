from django.test import TestCase, RequestFactory
from django.contrib.gis.geos import GEOSGeometry, MultiPolygon
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import SavedZone
from main.models import Zone
from user_api.models import AppUser
# from django.contrib.auth.models import User
from save_api.views import saved_list, saved_detail

polygon1 = GEOSGeometry(
'POLYGON((-74.006 40.7128, -73.995 40.7128, -73.995 40.7213, -74.006 40.7213, -74.006 40.7128))',
srid=4326
)

polygon2 = GEOSGeometry(
'POLYGON((-73.990 40.708, -73.980 40.708, -73.980 40.715, -73.990 40.715, -73.990 40.708))',
srid=4326
)

class SavedList(APITestCase):

    def test_view_save(self):
        """
        Ensure we can view all objects.
        """
        url = reverse('save_api:zone_save_list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class SavedZoneViewsTest(TestCase):

    def setUp(self):
        self.factory = RequestFactory()
        self.user = AppUser.objects.create_user(user_id=1, email='testuser@test.com', 
                                                password='testpass')
        self.zone = Zone.objects.create(id=1,name='Test Zone', borough='Test Borough',
                                        geom=MultiPolygon(polygon1, polygon2, srid=4326))
        

    def test_saved_list_get(self):
        self.saved_zone = SavedZone.objects.create(user=self.user, zone=self.zone)
        request = self.factory.get('/saved_zones/')
        request.user = self.user

        response = saved_list(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_saved_detail_get(self):
        request = self.factory.get(f'/saved_zones/{self.zone.id}/')
        request.user = self.user

        response = saved_detail(request, self.zone.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_saved_detail_delete(self):
        request = self.factory.delete(f'/saved_zones/{self.zone.id}/')
        request.user = self.user

        response = saved_detail(request, self.zone.id)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_saved_list_post(self):
        data = {'zone': self.zone.id}
        request = self.factory.post('/saved_zones/', data)
        request.user = self.user

        response = saved_list(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
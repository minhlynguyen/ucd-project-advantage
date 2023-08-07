from django.test import TestCase

# Create your tests here.
from django.test import TestCase

# Create your tests here.
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import SavedZone
from main.models import Zone
from user_api.models import AppUser
from django.contrib.auth.models import User


class SavedList(APITestCase):

    def test_view_save(self):
        """
        Ensure we can view all objects.
        """
        url = reverse('save_api:zone_save_list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
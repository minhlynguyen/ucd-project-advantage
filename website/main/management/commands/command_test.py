from django.core.management.base import BaseCommand
from django.core import management
from io import StringIO
from django.dispatch import receiver
from main.models import Place
from main.serializers import find_key_with_highest_value
from django.core.serializers import serialize
from django.test import TestCase

class Command(BaseCommand):
    def handle(self, *args, **options):
        management.call_command("update_places",limit=1000)
        
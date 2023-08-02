from django.core.management.base import BaseCommand
from django.core import management
from io import StringIO
from django.dispatch import receiver

class Command(BaseCommand):
     def handle(self, *args, **options):
        out = StringIO()
        management.call_command("command_test", start="2024-01-12", end="2024-01-13", stdout=out)
        value = out.getvalue()
        print(value)
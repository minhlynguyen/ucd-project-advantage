from django.core.management.base import BaseCommand
from django.core import management
from io import StringIO
from django.dispatch import receiver

class Command(BaseCommand):
     def handle(self, *args, **options):
        out = StringIO()
        management.call_command("command_test", start="2023-10-09", end="2023-12-08", stdout=out)
        value = out.getvalue()
        print(value)
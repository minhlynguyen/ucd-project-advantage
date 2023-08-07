from django.core.management.base import BaseCommand
from main.models import Zone, Puma, ZonePuma

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        zones = Zone.objects.all()
        pumas = Puma.objects.all()
        for zone in zones:
            zone_geom = zone.geom
            for puma in pumas:
                puma_geom = puma.geom
                if zone_geom.intersects(puma_geom): 
                    try: 
                        intersection=zone_geom.intersection(puma_geom)   
                        zonepuma = ZonePuma(
                            zone = zone,
                            puma = puma,
                            intersection = intersection.area
                        )
                        zonepuma.save()
                        print("Interection of zone", zone.id, "and puma", puma.id, "is created")
                    except Exception as e:
                        print(e)
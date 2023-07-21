from main.models import Zone, Puma
from main.serializers import ZoneSerializer
from django.core.serializers import serialize
import shapely.geometry
point1 = shapely.geometry.Point(24.952242, 60.1696017)
point2 = shapely.geometry.Point(24.976567, 60.1612500)

from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Intersection
from django.contrib.gis.measure import Area
point3 = Point(12.4604, 43.9420)

zones = Zone.objects.get(id=44)
pumas = Puma.objects.get(id=3901)
# zones_list = list(zones)
# pumas_list = list(pumas)

# zones = serialize('list',Zone.objects.all())
# serializer = ZoneSerializer(zones, many=True)
# polygon1 = zones_list[0].geom
# polygon2 = pumas_list[0].geom
polygon1 = zones.geom
# .transform(srid, clone=False)
polygon2 = pumas.geom


print(point3.within(polygon1))

# intersects=Intersection(polygon1,polygon2)
intersects=polygon1.intersection(polygon2)
print(intersects)
# intersects_area=Area(intersects)
# print((intersects_area))
print(intersects.area)




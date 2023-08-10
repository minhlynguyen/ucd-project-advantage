INSERT INTO maps.zone_today (zone_id, 
	date_time, 
	impression_predict,
	entertainment_and_recreation,
	financial_services,
	food_and_beverage,
	parking_and_automotive_services,
	professional_services,
	real_estate,
	retail_services,
	transportation,
	hospital,
	hotspots,
	school,
	total_business,
	holiday
)

SELECT
	taxi_zone_id as zone_id,
	datetime as date_time, 
	impression_predict,
	entertainment_and_recreation, 
	financial_services, 
	food_and_beverage, 
	parking_and_automotive_services, 
	professional_services,
	real_estate, 
	retail_services, 
	transportation, 
	hospital, 
	hotspots, 
	school,
	total_business,
	holiday
FROM maps.zone_detail
WHERE date(datetime) = CURRENT_DATE

ON CONFLICT (zone_id, date_time) DO UPDATE

set
date_time = EXCLUDED.date_time,
entertainment_and_recreation = EXCLUDED.entertainment_and_recreation,
financial_services = EXCLUDED.financial_services,
food_and_beverage = EXCLUDED.food_and_beverage,
parking_and_automotive_services = EXCLUDED.parking_and_automotive_services,
professional_services = EXCLUDED.professional_services, 
real_estate = EXCLUDED.real_estate, 
retail_services = EXCLUDED.retail_services, 
transportation = EXCLUDED.transportation, 
hospital = EXCLUDED.hospital, 
hotspots = EXCLUDED.hotspots, 
school = EXCLUDED.school, 
total_business = EXCLUDED.total_business, 
holiday = EXCLUDED.holiday
;
UPDATE maps.zone_today AS p
SET 
zone_id = q.zone_id,
datetime = q.datetime,
entertainment_and_recreation = q.entertainment_and_recreation,
financial_services = q.financial_services,
food_and_beverage = q.food_and_beverage,
parking_and_automotive_services = q.parking_and_automotive_services,
professional_services = q.professional_services, 
real_estate = q.real_estate, 
retail_services = q.retail_services, 
transportation = q.transportation, 
hospital = q.hospital, 
hotspots = q.hotspots, 
school = q.school, 
total_business = q.total_business, 
holiday = q.holiday
FROM (
SELECT
	taxi_zone_id as zone_id,
	datetime, 
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
WHERE date(datetime AT TIME ZONE 'America/New_York' ) = CURRENT_DATE
) AS q
WHERE p.zone_id = q.zone_id
AND EXTRACT(HOUR FROM p.datetime) = EXTRACT(HOUR FROM q.datetime)
;

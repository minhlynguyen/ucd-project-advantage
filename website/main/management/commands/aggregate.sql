INSERT INTO maps.zone_detail (datetime, week, hour, entertainment_and_recreation, financial_services, 
						 food_and_beverage, parking_and_automotive_services, professional_services, 
						 real_estate, retail_services, transportation, hospital, hotspots, school, 
						 total_business, taxi_zone_id, borough, month, place_last_update
							 )

SELECT 
	datetime, 
	EXTRACT(DOW FROM datetime) AS week, 
	EXTRACT(HOUR FROM datetime) as "hour",
	entertainment_and_recreation, financial_services, food_and_beverage, parking_and_automotive_services, 
	professional_services, real_estate, retail_services, transportation, hospital, hotspots, school,
	(entertainment_and_recreation+financial_services+food_and_beverage+parking_and_automotive_services+ 
	professional_services+real_estate+retail_services+transportation+hospital+hotspots+school) as total_business,
	taxi_zone_id, borough, 
	EXTRACT(MONTH FROM datetime) AS month,
    NOW() AS place_last_update
FROM (
select sum(entertainment_and_recreation) AS entertainment_and_recreation,
	sum(financial_services) AS financial_services,
	sum(food_and_beverage) AS food_and_beverage,
	sum(parking_and_automotive_services) AS parking_and_automotive_services,
	sum(professional_services) AS professional_services,
	sum(real_estate) AS real_estate,
	sum(retail_services) AS retail_services,
	sum(transportation) AS transportation,
	sum(hospital) AS hospital,
	sum(hotspots) AS hotspots,
	sum(school) AS school,
	taxi_zone_id
	from (
    SELECT
        CASE WHEN big_cate = 'Entertainment and Recreation' THEN 1 ELSE 0 END AS entertainment_and_recreation,
        CASE WHEN big_cate = 'Financial Services' THEN 1 ELSE 0 END AS financial_services,
        CASE WHEN big_cate = 'Food and Beverage' THEN 1 ELSE 0 END AS food_and_beverage,
        CASE WHEN big_cate = 'Parking and Automotive Services' THEN 1 ELSE 0 END AS parking_and_automotive_services,
        CASE WHEN big_cate = 'Professional Services' THEN 1 ELSE 0 END AS professional_services,
        CASE WHEN big_cate = 'Real Estate' THEN 1 ELSE 0 END AS real_estate,
        CASE WHEN big_cate = 'Retail Services' THEN 1 ELSE 0 END AS retail_services,
        CASE WHEN big_cate = 'Transportation' THEN 1 ELSE 0 END AS transportation,
        CASE WHEN big_cate = 'Health Care' THEN 1 ELSE 0 END AS hospital,
        CASE WHEN big_cate = 'Wifi hotspot' THEN 1 ELSE 0 END AS hotspots,
        CASE WHEN big_cate = 'Education' THEN 1 ELSE 0 END AS school,
        taxi_zone_id
    FROM maps.place
) as agg_count_first
	group by taxi_zone_id
) as agg

LEFT JOIN (
	SELECT id, borough
	FROM maps.zone
	group by 1,2
	) as zone

ON (agg.taxi_zone_id = zone.id)

CROSS JOIN generate_series(
         DATE_TRUNC('day', NOW()),
         DATE_TRUNC('day', NOW()) + INTERVAL '365 days',
         INTERVAL '1 hour'
       ) AS "datetime"

ON CONFLICT (taxi_zone_id, datetime) DO UPDATE

set entertainment_and_recreation = EXCLUDED.entertainment_and_recreation,
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
place_last_update = EXCLUDED.place_last_update
;
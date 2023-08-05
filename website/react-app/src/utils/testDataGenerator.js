/* 
{
    "status": "1",
    "data": {
        "1": 3000,
        "2": 4000,
        ...
    }
}
*/
export const generateAdTimeData = () => {
    const data = {};
    for (let i = 1; i <= 270; i++) {
        data[String(i)] = Math.floor(Math.random() * 1000) + 1;
    }
    return {
        "status": "1",
        "data": data
    };
};

/* 
{
    "status": "1",
    "data": {
        "1": {
            "detail": [
                {
                    "datetime": "2023-08-03T00:00:00-04:00",
                    "impression_predict": 0,
                    "entertainment_and_recreation": 8,
                    "financial_services": 0,
                    "food_and_beverage": 0,
                    "parking_and_automotive_services": 17,
                    "professional_services": 7,
                    "real_estate": 15,
                    "retail_services": 30,
                    "transportation": 1,
                    "hospital": 0,
                    "hotspots": 0,
                    "school": 0,
                    "total_business": 78,
                    "holiday": "No"
                },
                ...
            ]
        },
        ...
    }
}
*/
export const generateAdTimeDataForSingleZone = () => {
    const data = {};
    for (let i = 1; i <= 270; i++) {
        data[String(i)] = {};
        let items = [];
        for (let i = 0; i <= 23; i++) {
            let hour = (i < 10) ? `0${i}` : `${i}`;
            let item = {
                "datetime": `2023-08-03T${hour}:00:00-04:00`,
                "impression_predict": Math.floor(Math.random() * 1000) + 1,
                "entertainment_and_recreation": Math.floor(Math.random() * 100) + 1,
                "financial_services": Math.floor(Math.random() * 100) + 1,
                "food_and_beverage": Math.floor(Math.random() * 100) + 1,
                "parking_and_automotive_services": Math.floor(Math.random() * 100) + 1,
                "professional_services": Math.floor(Math.random() * 100) + 1,
                "real_estate": Math.floor(Math.random() * 100) + 1,
                "retail_services": Math.floor(Math.random() * 100) + 1,
                "transportation": Math.floor(Math.random() * 100) + 1,
                "hospital": Math.floor(Math.random() * 100) + 1,
                "hotspots": Math.floor(Math.random() * 100) + 1,
                "school": Math.floor(Math.random() * 100) + 1,
                "total_business": Math.floor(Math.random() * 100) + 1,
                "holiday": "No"
            };
            items.push(item);
        }
        data[String(i)]["detail"] = items;
    }
    return {
        "status": "1",
        "data": data
    };
};

/*
{
	'status': 1,
	'data': [
		{
			'zoneID': 5,
			'name': 'XXX AIR Port',
			'borough': xxx,
			'median_income': 3000,
			'mode_age_group': 'females_under_5'
		},
		{
			'zoneID': 6,
			'name': 'XXX AIR Port',
			'borough': xxx,
			'median_income': 3000,
			'mode_age_group': 'females_under_5'
		},
		...
	]
}
*/
export const generateAllCollection = () => {
    const nameList = ['Times Sq/Theatre District', 'Upper East Side North', 'Midtown East', 'Upper West Side South', 'JFK Airport', 'Clinton East'];
    const data = [];
    for (let i = 1; i <= 6; i++) {
        let zone = {
			'zoneID': i,
			'name': nameList[i - 1],
			'borough': 'Manhattan',
			'median_income':  Math.floor(Math.random() * 8000) + 1,
			'mode_age_group': 'males_35_44'
		}
        data.push(zone);
    }
    return {
        "status": "1",
        "data": data
    };
};
/*
{
	'status': 1,
	'data': {
		'zoneID': 5,
		'name': 'XXX AIR Port',
		'borough': xxx,
		'median_income': 3000,
		'mode_age_group': 'females_under_5',
        "females_under_5": 2.7558268021319585,
        "females_5_14": 2.9665997308383996,
        "females_15_24": 6.107989252839439,
        "females_25_34": 13.27969255949517,
        "females_35_44": 8.249790788382484,
        "females_45_54": 5.202542896394312,
        "females_55_64": 4.846418936136165,
        "females_65_74": 3.9492664386904166,
        "females_75_84": 1.638818631785998,
        "females_85": 1.1944900093432786,
        "males_under_5": 2.6688452262909155,
        "males_5_14": 3.1961412168091243,
        "males_15_24": 4.536009589917484,
        "males_25_34": 11.677496555271366,
        "males_35_44": 8.722207479985885,
        "males_45_54": 6.18666586632954,
        "males_55_64": 5.206636009528774,
        "males_65_74": 3.058561713900211,
        "males_75_84": 1.5014253766556003,
        "males_85": 3.0545749192734917,
		// this the 24 hours impression data ordered by time
		"datails": [
			{
				"datetime": "2023-07-30T00:00:00-04:00",
				"impression": 3000,
				"entertainment_and_recreation": 8,
				"financial_services": 0,
				"food_and_beverage": 0,
				"parking_and_automotive_services": 17,
				"professional_services": 7,
				"real_estate": 15,
				"retail_services": 30,
				"transportation": 1,
				"hospital": 0,
				"hotspots": 0,
				"school": 0,
				"total_business": 78,
				"holiday": "No"
			},
			{
				"datetime": "2023-07-30T01:00:00-04:00",
				"impression": 3000,
				...
			},
			...
		],
	}
}
*/
export const generateOneCollection = () => {
    let items = [];
    for (let i = 0; i <= 23; i++) {
        let hour = (i < 10) ? `0${i}` : `${i}`;
        let item = {
            "datetime": `2023-08-03T${hour}:00:00-04:00`,
            "impression_predict": Math.floor(Math.random() * 1000) + 1,
            "entertainment_and_recreation": Math.floor(Math.random() * 100) + 1,
            "financial_services": Math.floor(Math.random() * 100) + 1,
            "food_and_beverage": Math.floor(Math.random() * 100) + 1,
            "parking_and_automotive_services": Math.floor(Math.random() * 100) + 1,
            "professional_services": Math.floor(Math.random() * 100) + 1,
            "real_estate": Math.floor(Math.random() * 100) + 1,
            "retail_services": Math.floor(Math.random() * 100) + 1,
            "transportation": Math.floor(Math.random() * 100) + 1,
            "hospital": Math.floor(Math.random() * 100) + 1,
            "hotspots": Math.floor(Math.random() * 100) + 1,
            "school": Math.floor(Math.random() * 100) + 1,
            "total_business": Math.floor(Math.random() * 100) + 1,
            "holiday": "No"
        };
        items.push(item);
    }
    let data = {
		'zoneID': 5,
		'name': 'Times Sq/Theatre District',
		'borough': 'Manhatan',
		'median_income': 3000,
		'mode_age_group': 'males_35_44',
        "females_under_5": 2.7558268021319585,
        "females_5_14": 2.9665997308383996,
        "females_15_24": 6.107989252839439,
        "females_25_34": 13.27969255949517,
        "females_35_44": 8.249790788382484,
        "females_45_54": 5.202542896394312,
        "females_55_64": 4.846418936136165,
        "females_65_74": 3.9492664386904166,
        "females_75_84": 1.638818631785998,
        "females_85": 1.1944900093432786,
        "males_under_5": 2.6688452262909155,
        "males_5_14": 3.1961412168091243,
        "males_15_24": 4.536009589917484,
        "males_25_34": 11.677496555271366,
        "males_35_44": 8.722207479985885,
        "males_45_54": 6.18666586632954,
        "males_55_64": 5.206636009528774,
        "males_65_74": 3.058561713900211,
        "males_75_84": 1.5014253766556003,
        "males_85": 3.0545749192734917,
        "details": items
    }
    return {
        "status": "1",
        "data": data
    };
};
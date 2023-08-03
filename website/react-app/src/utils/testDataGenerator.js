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
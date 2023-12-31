// constants.js
/*
This file defines constants used
*/

// all boroughs in NYC
export const ALL_BOROUGHS = [
    { name: 'Manhattan', id: 1 },
    { name: 'Brooklyn', id: 2 },
    { name: 'Queens', id: 3 },
    { name: 'Bronx', id: 4 },
    { name: 'Staten Island', id: 5 },
    {name: "EWR", id: 6}
  ];

// all age-gender groups including the filter name, id and name from backend data
export const ALL_AGES = [
    { age: 'Females Under 5', id: 0, name_backend: 'females_under_5' },
    { age: 'Females 5-14', id: 1, name_backend: 'females_5_14' },
    { age: 'Females 15-24', id: 2, name_backend: 'females_15_24' },
    { age: 'Females 25-34', id: 3, name_backend: 'females_25_34' },
    { age: 'Females 35-44', id: 4, name_backend: 'females_35_44' },
    { age: 'Females 45-54', id: 5, name_backend: 'females_45_54' },
    { age: 'Females 55-64', id: 6, name_backend: 'females_55_64' },
    { age: 'Females 65-74', id: 7, name_backend: 'females_65_74' },
    { age: 'Females 75-84', id: 8, name_backend: 'females_75_84' },
    { age: 'Females 85+', id: 9, name_backend: 'females_85' },
    { age: 'Males Under 5', id: 10, name_backend: 'males_under_5' },
    { age: 'Males 5-14', id: 11, name_backend: 'males_5_14' },
    { age: 'Males 15-24', id: 12, name_backend: 'males_15_24' },
    { age: 'Males 25-34', id: 13, name_backend: 'males_25_34' },
    { age: 'Males 35-44', id: 14, name_backend: 'males_35_44' },
    { age: 'Males 45-54', id: 15, name_backend: 'males_45_54' },
    { age: 'Males 55-64', id: 16, name_backend: 'males_55_64' },
    { age: 'Males 65-74', id: 17, name_backend: 'males_65_74' },
    { age: 'Males 75-84', id: 18, name_backend: 'males_75_84' },
    { age: 'Males 85+', id: 19, name_backend: 'males_85' },
];


// Big categories for business for graphs
export const BIG_CATE = [
    "entertainment_and_recreation",
    "financial_services",
    "food_and_beverage",
    "parking_and_automotive_services",
    "professional_services",
    "real_estate",
    "retail_services",
    "transportation",
    "hospital",
    "hotspots",
    "school"
];

// Big categories for business for markers
export const BIG_CATE_ICONS = {
    "Entertainment and Recreation": '/markers/bowling-alley.png',
    "Financial Services": '/markers/dollars.png',
    "Food and Beverage": '/markers/restaurant.png',
    "Parking and Automotive Services": '/markers/parking.png',
    "Professional Services": '/markers/location.png',
    "Real Estate": '/markers/home.png',
    "Retail Services": '/markers/shopping-cart.png',
    "Transportation": '/markers/train-station.png',
    "Health Care": '/markers/first-aid-kit.png',
    "Wifi hotspot": '/markers/wifi.png',
    "Education": '/markers/university.png'
};

import React, { useEffect, useState } from 'react'
import axios from 'axios';
// axios.defaults.withCredentials = true;
function ZoneComponent() {
    const [zoneList, setZoneList] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    // const apiURL = "http://127.0.0.1:8000/api/zones/";
    const apiURL = "./NYC Taxi Zones.geojson";
    const fetchData = async () => {
        const response = await axios.get(apiURL
            // ,
            // {'withCredentials': true }
            );
        console.log(response)
        setZoneList(response.data);
        console.log(zoneList);
        console.log(response.data);
    }
    return (
        <div className="main-section">
            <h1>All Zones</h1>
            <div className="zone-list">
                <ul>
                    <li>{zoneList}</li>
                </ul>
            </div>
        </div>
    );
}
export default ZoneComponent;
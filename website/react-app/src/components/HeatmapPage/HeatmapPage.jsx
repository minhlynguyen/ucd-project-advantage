import React, { useEffect, useRef, useState , useContext} from 'react';
import 'leaflet/dist/leaflet.css';

import "./HeatmapPage.css"
import FunctionArea from './FunctionArea.jsx';
import Map from './Map';
import axios from 'axios';

function Details({zone}) {
  console.log("zone in Details:", zone);
  return (
    <div className="DetailsCard">
      <h2>Zone Details</h2>
      <p><strong>ID:</strong> {zone.id}</p>
      <p><strong>Zone:</strong> {zone.properties.name}</p>
    </div>
  );
}


function HeatmapPage() {

  console.log('Rendering HeatmapPage');
  const [zones, setZones] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log('Before fetching data');
      // preflight requests? so twice?
      const response = await axios.get("http://127.0.0.1:8000/api/zones/");
      // const response = await axios.get("./NYC Taxi Zones.geojson");
      console.log('After fetching data, before setting zones');
      setZones(response.data);
      console.log('After setting zones');
    }
    fetchData();
  }, []);

  return (
    <div className="HeatmapPage">
      <FunctionArea />
      <div className="MapArea">
        <Map zones={zones} setZones={setZones} selectedZone={selectedZone} setSelectedZone={setSelectedZone} />
        <div className={selectedZone ? "DetailsContainer" : "DetailsContainer DetailsHidden"}>
          {selectedZone && <Details zone={zones.features.find(zone => zone.id === selectedZone)} />}
        </div>
      </div>
    </div>
  );
}


export default HeatmapPage;
// export default React.memo(HeatmapPage);

import React, { useEffect, useRef, useState , useContext} from 'react';
import 'leaflet/dist/leaflet.css';
import { UserContext } from '../../App';
import L from 'leaflet';
import choropleth from 'leaflet-choropleth';
import zones from './data.jsx';
import { useNavigate } from 'react-router-dom';
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
  const { currentUser } = useContext(UserContext);
  const [selectedZone, setSelectedZone] = useState(null);
  const navigate = useNavigate();



  if (!currentUser){
    navigate('/signup')
  }
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




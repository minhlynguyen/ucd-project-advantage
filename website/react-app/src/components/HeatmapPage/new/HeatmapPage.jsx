import React from 'react';
import './HeatmapPage.css';
import FunctionModule from './FunctionModule';
import MapModule from './MapModule';
import InfoModule from './InfoModule';

function HeatmapPage() {
  return (
    <div className="heatmap-page">
      <FunctionModule />
      <div className="map-info-container">
        <MapModule />
        <InfoModule />
      </div>
    </div>
  );
};

export default HeatmapPage;



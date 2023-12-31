import { Box, Button, Card, Container, IconButton, Paper, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DifferenceIcon from '@mui/icons-material/Difference';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SolutionsContext from '../Solutions/SolutionsContext';
import { notify } from '../../utils/notify';

const paperStyle = {
  padding: 20,
  'paddingTop': '5px',
  'paddingBottom': '5px'
};


export default function BriefZoneCard({ zone, setSelectedZone }) {
  // zone is a feature for now

  const { compareZones, setCompareZones, collection, addCollection, deleteCollection } = React.useContext(SolutionsContext);
  const isCompared = compareZones.includes(zone);
  const isSaved = collection.includes(zone.id);

  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);


  const handleClickLocate = (clickedZone) => {
    return () => setSelectedZone(clickedZone);
  };

  const handleClickCompare = (clickedZone) => {
    return () => {
      if (isCompared) {
        const index = compareZones.indexOf(clickedZone);
        const newCompareZones = [...compareZones];
        newCompareZones[index] = null;
        setCompareZones(newCompareZones);

      } else {
        // Check if there is a null element in the compareZones array
        const index = compareZones.findIndex(item => item === null);
        if (index !== -1) {
          // If there is a null element, replace it with the clickedZone
          const newCompareZones = [...compareZones];
          newCompareZones[index] = clickedZone;
          setCompareZones(newCompareZones);
        } else {
          // If there is no null element, show the Snackbar
          notify('Currently only supports comparing two zones.', "warn");          
        }
      }
    };
  };

  const handleClickSave = (clickedZone) => {    
    if (isSaved) {
      // delete
      deleteCollection(clickedZone.id);
    } else {
      // add
      addCollection(clickedZone.id);
    }
  };


  const skeleton = 
    <Container>
      <Stack spacing={1}>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="circular" width={30} height={30} />
        <Skeleton variant="rounded" height={60} />
      </Stack>
    </Container>;

  return (
    
      (Object.keys(zone).length === 0) ?
        skeleton :
        <Paper className="zone-card" style={paperStyle}
        elevation={hover ? 8 : 2} 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >
        <h3>{zone.properties.name}</h3>
        <Typography style={{ fontStyle: 'italic', color: 'grey' }}>Borough: {zone.properties.borough}</Typography>
        <Typography>Total Impression: {zone.properties.impression.display.total}</Typography>
        <Typography>Target Impression: {zone.properties.impression.display.valid}</Typography>
        <Box display="flex" justifyContent="flex-end">
          <IconButton aria-label="Locate" onClick={handleClickLocate(zone)}>
            <Tooltip title='Locate in the map'><LocationOnIcon /></Tooltip>
          </IconButton>
          <IconButton aria-label="Add to compare" onClick={handleClickCompare(zone)}>
            <Tooltip title='Add to compare'><DifferenceIcon color={isCompared ? "primary" : "inherit"} /></Tooltip>
          </IconButton>
          <IconButton aria-label="Save" onClick={() => handleClickSave(zone)}>
            <Tooltip title='Add to collection'><FavoriteIcon color={isSaved ? 'secondary' : 'inherit'} /></Tooltip>
          </IconButton>
        </Box>
      </Paper>        
  );
}
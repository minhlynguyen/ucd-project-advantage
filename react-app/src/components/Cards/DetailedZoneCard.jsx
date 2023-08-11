import { Box, Button, Card, Container, IconButton, Paper, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DifferenceIcon from '@mui/icons-material/Difference';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SolutionsContext from '../Solutions/SolutionsContext';
import { convertToReadableForGroup } from '../../utils/distributionUtils';

export default function DetailedZoneCard({ zone }) {
    // zone is a feature for now
    const { handleClickMore, compareZones, setCompareZones, collection, addCollection, deleteCollection } = React.useContext(SolutionsContext);
    const isCompared = compareZones.includes(zone);
    const isSaved = collection.includes(zone.id);

    const paperStyle = {
      padding: 20
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
            toast.error('Currently only supports comparing two zones.', {
              position: 'bottom-center',
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            
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

    return (
      (!zone) ?
        <Skeleton variant="rectangular" width={210} height={60} /> :
          <Paper className='detailed-zone-card' elevation={2} style={paperStyle}>
          <h3>{zone.properties.name}</h3>
          <Typography style={{ fontStyle: 'italic', color: 'grey' }}>Borough: {zone.properties.borough}</Typography>
          <Typography>Total Impression: {zone.properties.impression.display.total}</Typography>
          <Typography>Target Impression: {zone.properties.impression.display.valid}</Typography>
          <Typography>Median Income: {`$${zone.properties.average_income}`}</Typography>
          <Typography>Most common group: {convertToReadableForGroup(zone.properties.mode_group)}</Typography>
          <Box display="flex" justifyContent="flex-end">
            <IconButton aria-label="Add to compare" onClick={handleClickCompare(zone)}>
              <Tooltip title='Add to compare'><DifferenceIcon color={isCompared ? "primary" : "inherit"} /></Tooltip>
            </IconButton>
            <IconButton aria-label="Save" onClick={() => handleClickSave(zone)}>
              <Tooltip title='Add to collection'><FavoriteIcon color={isSaved ? 'secondary' : 'inherit'} /></Tooltip>
            </IconButton>
            <IconButton aria-label="More" onClick={() => handleClickMore(zone)}>
            <Tooltip title='Show more details'><MoreHorizIcon /></Tooltip>
            </IconButton>
          </Box>
        </Paper>
    );
}

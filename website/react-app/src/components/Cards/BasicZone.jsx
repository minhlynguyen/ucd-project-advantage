import React, { useEffect, useRef, useState }  from 'react';
import { Box, Divider, Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { getGenderPercFloat, getGenderPercString } from '../../utils/distributionUtils';

export default function BasicZone({zone, totalBusiness}) {

  return (
    zone ? 
    <div style={{ textAlign: 'center' }}>

        <Typography variant='h5' sx={{ mb: 2, color: 'rgba(50, 67, 95)', fontWeight: 'bold'}}>{zone.properties.name}</Typography>
        <Typography sx={{fontStyle: 'italic', mb: 1}}>Borough: {zone.properties.borough}</Typography>
        <Divider variant="middle" />
        {zone.properties.impression ?
        <div>
        <Typography component="span" sx={{ fontSize: '32px', color: '#8fafef', fontFamily: 'Arial', fontStyle: 'italic', mr: 2 }}>{zone.properties.impression.display.total}</Typography>
        <Typography component="span">Total Impression</Typography>
        </div> : null
        }
        {zone.properties.impression ?
        <div>                
        <Typography component="span" sx={{ fontSize: '32px', color: '#c57682', fontFamily: 'Arial', fontStyle: 'italic', mr: 2 }}>{zone.properties.impression.display.valid}</Typography>
        <Typography component="span">Target Impression</Typography>
        </div> : null
        }
        <div>
        <Typography component="span">Average Age: </Typography>
        <Typography component="span" sx={{ fontSize: '28px', color: '#8b87d9', fontFamily: 'Arial', fontStyle: 'italic', mr: 2 }}>{zone.properties.average_age}</Typography>
        </div>
        <div>
        <Typography component="span">Median Income: </Typography>
        <Typography component="span" sx={{ fontSize: '28px', color: '#58882a', fontFamily: 'Arial', fontStyle: 'italic', mr: 2 }}>{zone.properties.average_income}</Typography>
        </div>

        {totalBusiness ?
        <div>
        <Typography component="span">Total Business: </Typography>
        <Typography component="span" sx={{ fontSize: '28px', color: '#4bc0c0', fontFamily: 'Arial', fontStyle: 'italic', mr: 2 }}>{totalBusiness}</Typography>
        </div> : null
        }

        <Box display="flex" alignItems="center" justifyContent="center">
          <Box maxWidth="50%" display="flex" flexDirection="row" justifyContent="space-around">
            <Box display="flex" flexDirection="column" alignItems="center" flex={getGenderPercFloat(zone.properties.age, 'female')} bgcolor="skyblue" p={1} borderRadius='10px'>
              <FemaleIcon color="primary" />
              <Typography variant="h6">{getGenderPercString(zone.properties.age, 'female')}</Typography>
            </Box>
            
            <Box display="flex" flexDirection="column" alignItems="center" flex={getGenderPercFloat(zone.properties.age, 'male')} bgcolor="pink" p={1} borderRadius='10px'>
              <MaleIcon color="secondary" />
              <Typography variant="h6">{getGenderPercString(zone.properties.age, 'male')}</Typography>
            </Box>
          </Box>
        </Box>
    </div>
    : null

  );
}

import React, { useEffect, useRef, useState }  from 'react';
import { Box, Divider, Typography } from '@mui/material';

export default function BasicZone({zone, totalBusiness}) {

  return (
    zone ? 
    <div>

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
        <Typography component="span">Average Income: </Typography>
        <Typography component="span" sx={{ fontSize: '28px', color: '#58882a', fontFamily: 'Arial', fontStyle: 'italic', mr: 2 }}>{zone.properties.average_income}</Typography>
        </div>
        {totalBusiness ?
        <div>
        <Typography component="span">Total Business: </Typography>
        <Typography component="span" sx={{ fontSize: '28px', color: '#4bc0c0', fontFamily: 'Arial', fontStyle: 'italic', mr: 2 }}>{totalBusiness}</Typography>
        </div> : null
        }

    </div>
    : null

  );
}

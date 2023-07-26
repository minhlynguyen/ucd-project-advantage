import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';

export default function CompareDetail() {

  return (
    // <Container sx={{ mt: 4, mb: 4, height: '60vh'}}>
      <Grid container spacing={3} className='compare-detail'>

        <Grid item xs={12} md={3} lg={3} sx={{ display: 'flex' }}>
          <Paper
            sx={{
              p: 2,
              width: '100%', // ensure that the paper takes full width of the grid item
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography sx={{ wordBreak: 'break-all' }}>Zone1 Summary</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={6} sx={{ display: 'flex' }}>
          <Paper
            sx={{
              p: 2,
              width: '100%', // ensure that the paper takes full width of the grid item
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography>impression line graphs /user can choose time range</Typography>
            {/* <Box width={600}>hello</Box> */}
          </Paper>
        </Grid>

        <Grid item xs={12} md={3} lg={3} sx={{ display: 'flex' }}>
          <Paper
            sx={{
              p: 2,
              width: '100%', // ensure that the paper takes full width of the grid item
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography sx={{ wordBreak: 'break-all' }}>Zone2 Summary</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography>Age Distribution / pie chart</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography>Income Distribution / pie chart</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography>Business Distribution / table or graph?</Typography>
          </Paper>
        </Grid>
      </Grid>
    // </Container>
  );
}

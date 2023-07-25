import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';


export default function ZoneBoard() {

  return (
    <Container sx={{ mt: 4, mb: 4, height: '60vh'}}>
              <Grid container spacing={3}>

                <Grid item xs={12} md={4} lg={4} sx={{ display: 'flex' }}>
                <Paper
                    sx={{
                    p: 2,
                    width: '100%', // ensure that the paper takes full width of the grid item
                    display: 'flex',
                    flexDirection: 'column',
                    }}
                >
                    <Typography sx={{ wordBreak: 'break-all' }}>Zone Summary</Typography>
                </Paper>
                </Grid>

                <Grid item xs={12} md={8} lg={8} sx={{ display: 'flex' }}>
                <Paper
                    sx={{
                    p: 2,
                    width: '100%', // ensure that the paper takes full width of the grid item
                    display: 'flex',
                    flexDirection: 'column',
                    }}
                >
                    <Typography>impression line graphs</Typography>
                    {/* <Box width={600}>hello</Box> */}
                </Paper>
                </Grid>


                <Grid item xs={12} md={6} lg={6}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography>Age Distribution</Typography>
                </Paper>
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography>Income Distribution</Typography>
                </Paper>
                </Grid>

                <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography>Business Distribution</Typography>
                </Paper>
                </Grid>
                </Grid>
    </Container>
  );
}

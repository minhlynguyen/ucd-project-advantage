import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import ZoneBoard from '../Cards/ZoneBoard';


const defaultTheme = createTheme();

export default function SavedPage() {
  // const [zones, setZones] = React.useState(null);
  const [zones, setZones] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  // const [zones, setZones] = React.useState([]);
  const [info, setInfo] = React.useState('');
  const [openZoneBoard, setOpenZoneBoard] = React.useState(false); // zone board dialog
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // const handleClickMore = () => {
  //   setOpenZoneBoard(true);
  // }

  // const handleView = (index) => {
  //   setOpenZoneBoard(true);
  // }


  const handleCloseZoneBoard = () => {
    setOpenZoneBoard(false);
  }

  // when loading, fetch data from backend and set as zones
  React.useEffect(() => {
    const fetchData = async () => {
      const url = '/user/saved';
      const response = await axios.get(url);
      setZones(response.data);
    }
    // fetchData();
  }, []);

  // when zones change, change info displayed in the container
  // zones = null : loading
  // zones = [] : no collection yet
  // otherwise, show cards for each zone
  React.useEffect(() => {
    let infoContent;
    if (zones === null) {
      infoContent = 
      // <Typography variant="h5" align="center" color="text.secondary" paragraph>
      // Loading...
      // </Typography>;
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          // zIndex: 1000,  // add this line
        }}
      >
        <CircularProgress size={60}/>
      </Box>;
    } else if (zones.length === 0) {
      infoContent = 
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
      No collection yet...
      </Typography>;
    } else {
      infoContent =         
      <Grid container spacing={4}>
        {zones.map((card, index) => (
          <Grid item key={card} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Zone {index + 1}
                </Typography>
                <Typography>
                  borough: XXX
                </Typography>
                <Typography>
                  Average Income: XXX
                </Typography>
                <Typography>
                  Average Age: XXX
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleView(index)}>View</Button>
                <Button size="small" onClick={() => handleDelete(index)}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>;
    }

    setInfo(infoContent);

  }, [zones]);

  const handleDelete = (index) => {
    const newZones = zones.filter((zone, idx) => idx !== index);
    setZones(newZones);
  };
  const handleView = (index) => {
    setOpenZoneBoard(true);
  };


  return (
    <ThemeProvider theme={defaultTheme}>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 4,
            pb: 2,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h3"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Your Collection
            </Typography>
            {/* <Button variant='outlined'>Seek for More Solutions</Button> */}
            {/* <Typography variant="h5" align="center" color="text.secondary" paragraph>
              No collection yet...
            </Typography> */}
          </Container>
        </Box>
        <Container sx={{ py: 8, minHeight: '50vh' }} maxWidth="md">
            {info}
        </Container>

        <Dialog open={openZoneBoard} onClose={handleCloseZoneBoard} fullScreen={fullScreen} maxWidth='lg'>
          <DialogTitle>Zone Board</DialogTitle>
          <DialogContent>
            <ZoneBoard />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseZoneBoard}>Close</Button>
          </DialogActions>
        </Dialog>

      {/* </main> */}
    </ThemeProvider>
  );
}
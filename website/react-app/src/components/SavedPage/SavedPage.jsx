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
import { generateAllCollection } from '../../utils/testDataGenerator';
import { convertToReadableForGroup } from '../../utils/distributionUtils';
import SavedZoneBoard from './SavedZoneBoard';
import axiosInstance from '../../AxiosConfig';

const defaultTheme = createTheme();

export default function SavedPage() {
  const [zones, setZones] = React.useState(null);
  // const [zones, setZones] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  // const [zones, setZones] = React.useState([]);
  const [info, setInfo] = React.useState('');
  const [openZoneBoard, setOpenZoneBoard] = React.useState(false); // zone board dialog
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedZoneID, setSelectedZoneID] = React.useState(null);

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
    // const fetchData = async () => {

    //   let data = [];
    //   // axiosInstance.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/user/save/`)
    //   // .then((response) => {
    //   //   if (response.data.status !== "1") {
    //   //     throw new Error("Can't fetch collection data for current user now!");
    //   //   }
        
    //   //   data = response.data.data;
    //   //   setZones(data);
    //   // }).catch((error) => {
    //   //   console.log(error);
    //   // });
    //   data = generateAllCollection().data;
    //   setZones(data);
    // }
    const fetchData = async () => {

      let data = [];
      axiosInstance.get(`/api/user/save/`)
      // axiosInstance.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/user/save/`)
      .then((response) => {
        if (response.data.status !== "1") {
          throw new Error("Can't fetch collection data for current user now!");
        }
        
        data = response.data.data;
        setZones(data);
      }).catch((error) => {
        console.log(error);
      });
    }
    fetchData();
  }, []);

  // when zones change, change info displayed in the container
  // zones = null : loading
  // zones = [] : no collection yet
  // otherwise, show cards for each zone
  React.useEffect(() => {
    let infoContent;
    console.log(typeof zones, Array.isArray(zones))
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
        {zones.map((zone) => (
          <Grid item key={zone.zoneID} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {zone.name}
                </Typography>
                <Typography>
                  Borough: {zone.borough}
                </Typography>
                <Typography>
                  Median Income: {zone.median_income.toFixed(0)}
                </Typography>
                <Typography>
                  Most common group: 
                </Typography>
                <Typography>
                  {convertToReadableForGroup(zone.mode_age_group)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleView(zone.zoneID)}>View</Button>
                <Button size="small" onClick={() => handleDelete(zone.zoneID)}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>;
    }

    setInfo(infoContent);

  }, [zones]);

  const handleDelete = (zoneID) => {
    const updateData = async (id) => {
      axiosInstance.delete(`/api/user/save/${id}/`)
      .then(response => {
        // if (response.data.status !== "1") {S
        //   throw new Error("Failed to delete collection!");
        // }
        setZones(prev => prev.filter(item => item.zoneID !== id));
        console.log("Collection removed succussfully!");
      })
      .catch(error => {
        console.log(error);
      });
    };

    updateData(zoneID);
  };




  const handleView = (zoneID) => {
    setSelectedZoneID(zoneID);
    setOpenZoneBoard(true);
  };


  return (
    <ThemeProvider theme={defaultTheme}>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 14,
            // pb: 2,
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
            <SavedZoneBoard zoneID={selectedZoneID}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseZoneBoard}>Close</Button>
          </DialogActions>
        </Dialog>

      {/* </main> */}
    </ThemeProvider>
  );
}
import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import CompareDetail from './CompareDetail';

export default function CompareBoard() {

  return (
    <Container sx={{ mt: 4, mb: 4, height: '60vh'}}>
      <CompareDetail />
    </Container>
  );
}

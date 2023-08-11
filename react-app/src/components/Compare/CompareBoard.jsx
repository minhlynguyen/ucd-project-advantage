import React, { useEffect, useRef, useState }  from 'react';
import Container from '@mui/material/Container';
import CompareDetail from './CompareDetail';
import CompareConfirm from './CompareConfirm';

export default function CompareBoard() {

  const [confirmMode, setConfirmMode] = React.useState(true);

  return (
    <Container sx={{ mt: 4, mb: 4, height: '60vh'}}>
      {confirmMode ? <CompareConfirm setConfirmMode={setConfirmMode}/> : <CompareDetail setConfirmMode={setConfirmMode} />}
    </Container>
  );
}

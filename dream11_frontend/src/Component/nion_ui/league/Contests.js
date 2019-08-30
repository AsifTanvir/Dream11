import React from 'react';
import {Link } from 'react-router-dom';
import axios from "axios";
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import { DialogContent } from '@material-ui/core';
import CreateLeague from './CreateLeague';
import JoinLeague from './JoinLeague';
import styled from 'styled-components';

const Container = styled.div`
 text-align: center;
`;


export default function Contest() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  let userName = 'nion';
  let userID = '1';
  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = value => {
    setOpen(false);
  };

  function handleClickOpen2() {
    setOpen2(true);
  }

  const handleClose2 = value => {
    setOpen2(false);
  };

  return (
    <Container>
    <div>
      <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="add"
          onClick={handleClickOpen}
        >
        Create League
      </Fab>
      <Dialog open={open} onClose={handleClose} >
          <DialogContent>
          <DialogContentText>
            Enter the Name and Password for Your new League
          </DialogContentText>
              <CreateLeague />
          </DialogContent>
      </Dialog>
    </div>
    <br />
    <div>
      <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="add"
          onClick={handleClickOpen2}
      >
        Join League
      </Fab>
      <Dialog open={open2} onClose={handleClose2} >
          <DialogContent>
          <DialogContentText>
            Please Enter the Name and Password of the League 
          </DialogContentText>
              <JoinLeague />
          </DialogContent>
      </Dialog>
    </div>
    <br />
    <div>
      <Link to={`/dream11/core/login/loggedIN/MyLeagues/${userID}/${userName}/`} >
      <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="add"
          onClick={handleClickOpen}
      >
        My Leagues
      </Fab>
      </Link>
      
    </div>
    </Container>
    
  );
}
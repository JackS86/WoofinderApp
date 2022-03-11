import * as React from 'react';
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CancelIcon from '@mui/icons-material/Cancel';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getFirestore,collection, addDoc} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import {firebaseConfig} from "../../firebase-config";

const app = initializeApp(firebaseConfig);
const db = getFirestore();

const BootstrapDialog = styled(Dialog)`
  background-color: rgba(210, 210, 210, 0.18);
  
`;

export const Note = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleChange = (e) => {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value
      })
    }
  
    const [formData, setFormData] = useState({
      city:'', 
      address:'', 
      comments: '',
      timeOfseeing: '',
      latitude: '',
      longitude: ''
     
    });
  
   const { city,address,comments,timeOfseeing,latitude,longitude } = formData;
  
   const handleAdd = async () => {
        
     await addDoc(collection(db, "LocationNotes"), {
         
         city: city,
         address: address,
         comments: comments,
         timeOfseeing:timeOfseeing,
         latitude:latitude,
         longitude:longitude
         
    });
          setOpen(false);
  }   
  
  
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
  
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <CancelIcon
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'black',
              width: '36px',
              height: '36px',
              mr: 3,
              mt: 3
  
            }}
          >
            <CloseIcon />
          </CancelIcon>
        ) : null}
      </DialogTitle>
    );
  };
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  
    return (
      <div>
        <Button variant="contained" sx={{ color: 'black', fontSize: '16px', border: 'none ', borderRadius: '20px', backgroundColor: '#e2e2e2', textTransform: 'capitalize', fontWeight: 'bold', mb: 3 }} onClick={handleClickOpen}>
          DODAJ NOTATKĘ
        </Button>
        <BootstrapDialog
          
          onClose={handleClose} maxWidth="lg"
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle variant="h4" sx={{  fontFamily: 'Segoe UI', fontWeight: 'bold', textTransform: "uppercase" }} id="customized-dialog-title" onClose={handleClose}>
            DODAJ NOTKĘ
          </BootstrapDialogTitle>
  
          <DialogContent>
            <TextField className="inputRounded" sx={{ fontSize: '0.6em', borderRadius: '25px', border: '1px solid silver' }} id="city" name="city" value={city} onChange={handleChange} label="Podaj miasto..." type="text" />
            <TextField className="inputRounded" sx={{ fontSize: '0.6em', borderRadius: '25px', border: '1px solid silver' }} id="address" name="address" value={address} onChange={handleChange} label="Podaj adres" type="text" />
            <TextField className="inputRounded" sx={{ fontSize: '0.6em', borderRadius: '25px', border: '1px solid silver' }} id="timeOfseeing" name="timeOfseeing" value={timeOfseeing} onChange={handleChange} label="Wybierz datę i czas" type="date" />
            <TextField className="inputRounded" sx={{ fontSize: '0.6em', borderRadius: '25px', border: '1px solid silver' }} id="comments" name="comments" value={comments} onChange={handleChange} label="Uwagi" type="text" />
            <TextField className="inputRounded" sx={{ fontSize: '0.6em', borderRadius: '25px', border: '1px solid silver' }} id="latitude" name="latitude" value={latitude} onChange={handleChange} label="Szerokość geograficzna" type="text" />
            <TextField className="inputRounded" sx={{ fontSize: '0.6em', borderRadius: '25px', border: '1px solid silver' }} id="longitude" name="longitude" value={longitude} onChange={handleChange} label="Długość geograficzna" type="text" />
           </DialogContent>
  
          <DialogActions>
            <Button variant="contained" sx={{ color: 'black', fontSize: '0.8em', borderRadius: '20px', backgroundColor: '#E2E2E2', textTransform: 'capitalize', fontWeight: 'bold' }} autoFocus onClick={handleAdd}>
              Zapisz
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    );
};
 

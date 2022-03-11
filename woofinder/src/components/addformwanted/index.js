/* eslint-disable no-undef */
import * as React from 'react';
import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Typography } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { firebaseConfig } from "../../firebase-config";
import Snackbar from '@mui/material/Snackbar';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AddAPhoto from "@mui/icons-material/AddAPhoto";
import { ButtonGroup } from "@mui/material";
import Button from '@mui/material/Button';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useUserContext } from "../../services/user-context";
import { useFormik } from "formik";
import * as yup from "yup";
import { BiErrorCircle } from 'react-icons/bi';
import { AddDogContextProvider, useAddDogContext } from '../../services/add-dog-context';


const app = initializeApp(firebaseConfig);
const db = getFirestore();


const BootstrapDialog = styled(Dialog)`
  background-color: rgba(210, 210, 210, 0.18);
`;

const DialogContentStyle = styled(DialogContent)`
background-image: linear-gradient(90deg, rgba(89, 252, 170, 1) 0%, rgba(41, 86, 78, 1) 100%);
width:700px;
height:900px;
overflow-x:hidden;
`;

const validationSchema = yup.object({
  address: yup.string("Podaj adres").required("Pole jest wymagane"),
  breed: yup.string("Podaj rasę").required("Pole jest wymagane"),
  citylost: yup.string("Podaj Miasto zaginięcia").required("Pole jest wymagane"),
  lost_date: yup.string("Podaj datę zaginięcia").required("Pole jest wymagane"),
  name: yup.string("Podaj Imię psa").required("Pole jest wymagane"),
  owner: yup.string("Podaj imię właściciela").required("Pole jest wymagane"),
  phone: yup.string("Podaj numer telefonu").max(9, "Numer telefonu musi składać się z 9 cyfr").required("Pole jest wymagane")
})

export const AddFormWanted = () => {

  const [isSubmit, setIsSubmit] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const { dogPhotoUrl, setDogPhotoUrl } = useAddDogContext();
  const { user } = useUserContext();
  const [file, setFile] = useState(null);

  const onSubmit = async (values, onSubmitProps) => {
    const { name, address, breed, citylost, lost_date, phone, owner, description, details } = values;

    console.log(values);
    setIsSubmit(true);




    await addDoc(collection(db, "Wanted"), {

      address: address,
      breed: breed.toLowerCase(),
      citylost: citylost.toLowerCase(),
      lost_date: lost_date,
      name: name.toLowerCase(),
      owner: owner,
      phone: phone,
      photolink: "link",
      description: description,
      details: details

    });
    setOpen(true);
    setOpenSnack(true);
    onSubmitProps.resetForm()

  }

  const formik = useFormik({
    initialValues: {
      address: '',
      breed: '',
      citylost: '',
      lost_date: '',
      name: '',
      owner: '',
      phone: '',
      photolink: '',
      description: '',
      details: ''
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  console.log("Error: ", formik.errors);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenS = () => {
    setOpenSnack(true);
  };

  const handleCloseS = () => {
    setOpenSnack(false);
  };

  const handleChangePhoto = (e) => {

    setFile(e.target.files[0]);
  }

  const handleCancelPhoto = (e) => {
    setFile(null)
  }

  const handleSavePhoto = (e) => {
    const storage = getStorage();
    const storageRef = ref(storage, `dogs/${user.uid}`);

    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(storageRef).then((url) => {
        setDogPhotoUrl(url);
        setFile(null);
      })
    });

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

    <>
      <button className="wanted-button" onClick={handleClickOpen}>
        Dodaj ogłoszenie
      </button>
      <BootstrapDialog
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle variant="h4" sx={{ mt: 1, ml: 3, fontFamily: 'Segoe UI', fontWeight: 'bold', textTransform: "uppercase" }} id="customized-dialog-title" onClose={handleClose}>
          <Typography sx={{ fontSize: "26px", fontWeight: "bold", textTransform: 'capitalize' }}>Formularz zgłoszeniowy</Typography>

        </BootstrapDialogTitle>

        {Object.keys(formik.errors).length === 0 && isSubmit ?
          (
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Snackbar open={openSnack} onClose={handleCloseS}>

                <Alert
                  onClose={() => { handleCloseS() }}
                  severity="success"
                  sx={{ width: '100%' }}><AlertTitle>Success</AlertTitle>Ogłoszenie zostało dodane</Alert>
              </Snackbar>
            </Stack>
          ) : (
            <Alert severity="info"><p>Aby dodać ogłoszenie musisz uzupełnić formularz</p></Alert>
          )}


        <DialogContentStyle>
          <form onSubmit={formik.handleSubmit}>

            <div className="input-content">
              <Avatar src={dogPhotoUrl} alt="profile" sx={{ width: "186px", height: "186px" }} />
              <Button sx={{ mt: 2, backgroundColor: "#e2e2e2", color: "black" }}
                component="label"
              >
                <AddAPhoto />
                <input
                  onChange={handleChangePhoto}
                  type="file"
                  hidden
                />
              </Button>

              {file && file.name}
              {file && (
                <ButtonGroup>
                  <Button sx={{ mt: 2 }} variant="contained" onClick={handleSavePhoto}>Zapisz</Button>
                  <Button sx={{ mt: 2 }} variant="contained" color="inherit" onClick={handleCancelPhoto}>Nie zapisuj</Button>
                </ButtonGroup>
              )}


              <label className='labelform'>Imię psa</label>
              <input className="inputRounded"
                type="text"
                id="name"
                name="name"
                placeholder='Imię psa'
                required
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name ? <p className='error'>{formik.errors.name}<BiErrorCircle
                style={{ width: "20px", height: "20px" }} /></p> : null}


              <label className='labelform'>Rasa psa</label>
              <input className="inputRounded"
                type="text"
                id="breed"
                name="breed"
                placeholder="Rasa psa"
                value={formik.values.breed}
                onChange={formik.handleChange}
              />
              {formik.touched.breed && formik.errors.breed ? <p className='error'>{formik.errors.breed}<BiErrorCircle
                style={{ width: "20px", height: "20px" }} /></p> : null}



              <label className='labelform'>Data zaginięcia</label>
              <input className='inputRounded'
                type="date"
                id="lost_date"
                name="lost_date"
                value={formik.values.lost_date}
                onChange={formik.handleChange}
              />
              {formik.touched.lost_date && formik.errors.lost_date ? <p className='error'>{formik.errors.lost_date}<BiErrorCircle
                style={{ width: "20px", height: "20px" }} /></p> : null}



              <label className='labelform'>Ostatnia lokalizacja psa</label>
              <input className='inputRounded'
                type="text"
                id="citylost"
                name="citylost"
                placeholder="Ostatnia lokalizacja psa"
                value={formik.values.citylost}
                onChange={formik.handleChange}
              />
              {formik.touched.citylost && formik.errors.citylost ? <p className='error'>{formik.errors.citylost}<BiErrorCircle
                style={{ width: "20px", height: "20px" }} /></p> : null}




              <label className='labelform'>Imię właściciela</label>
              <input className='inputRounded'
                type="text"
                id="owner"
                name="owner"
                placeholder="Imię właściciela"
                value={formik.values.owner}
                onChange={formik.handleChange}
              />
              {formik.touched.owner && formik.errors.owner ? <p className='error'>{formik.errors.owner}<BiErrorCircle
                style={{ width: "20px", height: "20px" }} /></p> : null}



              <label className='labelform'>Telefon właściciela</label>
              <input className='inputRounded'
                type="number"
                id="phone"
                name="phone"
                placeholder="Telefon"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
              {formik.touched.phone && formik.errors.phone ? <p className='error'>{formik.errors.phone}<BiErrorCircle
                style={{ width: "20px", height: "20px" }} /></p> : null}



              <label className='labelform'>Adres właściciela</label>
              <input className='inputRounded'
                type="text"
                id="address"
                name="address"
                placeholder="Adres"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
              {formik.touched.address && formik.errors.address ? <p className='error'>{formik.errors.address}<BiErrorCircle
                style={{ width: "20px", height: "20px" }} /></p> : null}


              <label className='labelform'>Opis</label>
              <input className='inputRounded'
                type="text"
                id="description"
                name="description"
                placeholder="Opis"
                value={formik.values.description}
                onChange={formik.handleChange}
              />


              <label className='labelform'>Znaki szczególne</label>
              <input className='inputRounded'
                type="text"
                id="details"
                name="details"
                placeholder="Znaki szczególne"
                value={formik.values.details}
                onChange={formik.handleChange} />


              <button type='submit' className="wanted-button" onClick={formik.handleSubmit} >Dodaj ogłoszenie</button>

            </div>
          </form>

        </DialogContentStyle>
      </BootstrapDialog>
    </>
  );
}


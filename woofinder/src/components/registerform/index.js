//Jacek
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import { styled, Typography } from '@mui/material';

import CancelIcon from '@mui/icons-material/Cancel';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { BiErrorCircle } from 'react-icons/bi';


const BootstrapDialog = styled(Dialog)`
  background-color: rgba(210, 210, 210, 0.18);
  
`;

const DialogContentStyle = styled(DialogContent)`
background-image: linear-gradient(90deg, rgba(89, 252, 170, 1) 0%, rgba(41, 86, 78, 1) 100%);
width:500px;
height:500px;
`;





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
            left: 475,
            bottom: 545,
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

// const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/;

const validationSchema = yup.object({
  email: yup.string().email("Podaj email").required("Email jest wymagany"),
  password: yup.string().required("Hasło jest wymagane"),
  confirmPassword: yup.string().when("password", {
    is: val => (val && val.length > 0 ? true : false),
    then: yup.string().oneOf([yup.ref("password")], "Hasło się różni")
  }),
})

export const RegisterForm = () => {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const onSubmit = (values) => {
    const auth = getAuth();
    console.log(values);

    createUserWithEmailAndPassword(auth, formik.values.email, formik.values.password,)
      .then(() => {
        handleClose();
        navigate('/');
      })

  }

  const formik = useFormik({
    initialValues: {
      email: "", password: "", confirmPassword:""
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

  return (
    <>
      <Button variant="text" sx={{ color: 'black', textTransform: 'capitalize' }} onClick={handleClickOpen}>
        Zarejestruj
      </Button>
      <BootstrapDialog
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle variant="h4" sx={{ mt: 1, ml: 3, fontFamily: 'Segoe UI', fontWeight: 'bold', textTransform: "uppercase" }} id="customized-dialog-title" onClose={handleClose}>
          <Typography sx={{ fontSize: "26px", fontWeight: "bold", textTransform: 'capitalize' }}> Zarejestruj się.</Typography>

        </BootstrapDialogTitle>
        <DialogContentStyle>

          <form onSubmit={formik.handleSubmit}>
            <div className="input-content">
              <label className='labelform'>Email</label>
              <input className="inputRounded"
                type="email"
                id="email"
                name="email"
                placeholder='Email'
                value={formik.values.email}
                autoComplete='email'
                onChange={formik.handleChange}
                required
              />
              {formik.touched.email && formik.errors.email ? <p className='error'>{formik.errors.email}<BiErrorCircle
                style={{ width: "20px", height: "20px" }} /></p> : null}

              <label className='labelform'>Hasło</label>
              <input className="inputRounded"
                type="password"
                id="password"
                name="password"
                placeholder='Hasło'
                value={formik.values.password}
                autoComplete='current-password'
                onChange={formik.handleChange}
                required
              />
              {formik.touched.password && formik.errors.password ? <p className='error'>{formik.errors.password}<BiErrorCircle
                style={{ width: "20px", height: "20px" }} /></p> : null}


              <label className='labelform'>Potwierdź hasło</label>
              <input className="inputRounded"
                type="password"
                id="password"
                name="confirmPassword"
                placeholder='Potwierdź hasło'
                value={formik.values.confirmPassword}
                autoComplete='current-password'
                onChange={formik.handleChange}
                required
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p className='error'>{formik.errors.confirmPassword}<BiErrorCircle
                style={{ width: "20px", height: "20px" }} /></p> : null}


              <button  type='submit'className='form-button' onClick={formik.handleSubmit}>
                Zarejestruj
              </button>
            </div>
          </form>
        </DialogContentStyle>
      </BootstrapDialog>
    </>
  );
}





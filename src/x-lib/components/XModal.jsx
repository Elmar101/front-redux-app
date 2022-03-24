import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { XButton } from './XButton';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    width: "500px",
    //textAlign: "center"
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
      </DialogTitle>
    );
  };
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
 

export const XModal= (props) => {
  const {title, open, setOpen, message, pendingApiCall, onClickSave,dangerText } = props;
  const {t} = useTranslation();
  const handleClose = () => { setOpen(false) };
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {t(title)}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography>
            {message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <XButton 
            color="inherit"  
            onClick={handleClose}
            text = { t("Cancel") }
            disabled = {pendingApiCall}
          />

          <XButton 
            color="error" 
            onClick={()=> {onClickSave(); setOpen(false)}}
            text = {t(dangerText)}
            pendingApiCall = {pendingApiCall}
            disabled = {pendingApiCall}
          />
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
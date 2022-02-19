import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import { useTranslation } from 'react-i18next';

const NotFound = (props) => {
  const {t} = useTranslation();
  return (
    <div className="container">
      <div className="alert alert-danger text-center">
        <div>
            <ErrorIcon className="material-icons" style={{ fontSize: '48px' }}/> 
        </div>
        {t('User not found')}
      </div>
    </div>
  );
}

export default NotFound
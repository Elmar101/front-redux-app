import React from 'react'
import Container from '@mui/material/Container';
import LanguageSelector from '../../components/LanguageSelector';
import UserList from '../user-page/user-list/UserList';

const HomePage = () => {
    return (
        <Container>
            <h1> Home Page </h1>
            <UserList/>
            <LanguageSelector/>
        </Container>
    )
}

export default HomePage;

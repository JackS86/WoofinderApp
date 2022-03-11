import styled from 'styled-components';
import Typography from "@mui/material/Typography";
import * as React from 'react';
import { UserPanel } from '../userpanel';
import { Link } from 'react-router-dom';

import { useUserContext } from '../../services/user-context';
import { LoginForm } from '../loginform';
import { RegisterForm } from '../registerform';
import { Button } from '@mui/material';


const TopBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    height: 120px;
    background-color: rgba(89, 252, 170, 1);
background-image: linear-gradient(90deg, rgba(89, 252, 170, 1) 0%, rgba(41, 86, 78, 1) 100%);
`;





export const Top = () => {
    const { user } = useUserContext()

    return (
        <>
            <TopBar>

                <Typography variant="h4" sx={{ color: 'black', fontSize: '3em', fontFamily: 'Segoe UI', fontWeight: 'bold', margin: '30px' }}>WOOF<span className='stylefont'>inder</span>
                </Typography>
                <Typography variant="subtitle1" sx={{ color: 'white', margin: '54px' }}>
                    {user ? `Witaj ${user.email} na naszej stronie` : `Witaj na naszej stronie`}</Typography>



                {
                    user ? (
                        <UserPanel />


                    ) : (
                        <>
                            <Button sx={{ mt: 2, color: 'white' }} component={Link} to='/'><LoginForm /></Button>
                            <Button variant="text" sx={{ mt: 2, color: 'white' }} component={Link} to='/'><RegisterForm /></Button>
                        </>
                    )
                }


            </TopBar>

        </>
    );
}


//Marcin
import styled from 'styled-components';
import Typography from "@mui/material/Typography";
import { AddFormWanted } from '../addformwanted';
import {AddDogContextProvider} from "../../services/add-dog-context"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px;
    height: 120px;
      
`;


export const AddWanted = () => {

    return (
        <>
            <hr></hr>
            <Container>
                <Typography variant="h4" sx={{ mb: 2, fontFamily: 'Segoe UI', fontWeight: 'bold' }}>CHCESZ ZGŁOSIĆ ZAGINIĘCIE ZWIERZAKA ?</Typography>
                <AddDogContextProvider>
                    <AddFormWanted></AddFormWanted>
                </AddDogContextProvider>
            </Container>
            <hr></hr>

        </>
    );
}


//Bartosz
import { useParams, } from "react-router-dom";
import { useState, useEffect } from 'react'
import { db } from '../../firebase-config';
import { collection, getDocs } from 'firebase/firestore'
import styled from 'styled-components';
import { Button, Typography } from '@mui/material';
import { Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PlaceIcon from '@mui/icons-material/Place';
import CallIcon from '@mui/icons-material/Call';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from "react-router-dom"

const Container = styled.div`
    max-width: 1300px;
    margin: 0 auto;
 `;

const DetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    background-color: #e2e2e2;
 `;

const WantedItem = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    border-radius: 0 50px 0 0;
 `;

const WantedItemInfoBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
 `;

const ContainerEdit = styled.div`
    display:flex;
    justify-content:space-evenly;
    background-color:none;
    border:3px dotted black;
    border-radius:25px;
    width:220px;
    height:80px;
`;

const Circle = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    background-color:#64C2A7;
    color:white;
    border-radius:175px;
    width: 50px;
    height:50px;
    margin-top:10px;
 `;

const Question = styled.p`
    font-weight:bold;
    width:120px;
    margin:5px;
`;

const Specyfic = styled.div`
    padding-top: 40px;
`;

const WantedDescription = styled.div`
    width: 100%;
 `;

const WantedContact = styled.div`
    display: flex;
    
    justify-content: space-between;
    width: 100%;
    margin: auto;
 `;

const ContactWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 30px 30px;
    align-items: center;
 `;

export const Wanted = () => {
    const [wantedListData, setWantedListData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);


    const wantedListCollectionRef = collection(db, "Wanted");
    let params = useParams();
    console.log(params)


    const getWantedList = async () => {
        setIsLoading(true);
        const data = await getDocs(wantedListCollectionRef);
        console.log('kupa2', data.docs)
        setWantedListData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setIsLoading(false)
    };

    useEffect(() => {
        getWantedList();
    }, []);

    const filteredWantedList = wantedListData.filter(item =>
        item.name === params.name &&
        item.id === params.id
    );

    console.log(filteredWantedList)
    function copy() {
        const el = document.createElement("input");
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true);
    }

    const handleClickCircle = () => {
        console.log("mapa");
        Map()
      }

    if (isLoading && filteredWantedList.length) {
        return (
            <Container>
                <CircularProgress></CircularProgress>
            </Container>
        )
    }
    else {
        return <>
            <Typography variant='h6' sx={{ margin: '20px 0 20px 250px' }}>Liczba zaginięć zwierząt: {filteredWantedList.length}</Typography>
            <Container >
                {filteredWantedList.map((wantedList) => {
                    const name = wantedList.name[0].toUpperCase() + wantedList.name.substring(1);
                    const breed = wantedList.breed[0].toUpperCase() + wantedList.breed.substring(1);
                    const city = wantedList.citylost[0].toUpperCase() + wantedList.citylost.substring(1);

                    return (
                        <Container key={wantedList.name}>
                            <DetailsWrapper>
                                <WantedItem key={wantedList.name} style={{ minWidth: '20px' }}>
                                    <WantedItemInfoBox>
                                        <Avatar src="https://picsum.photos/100/100" alt="dog" sx={{ width: '6em', height: '6em', marginLeft: "15px" }} />
                                    </WantedItemInfoBox>
                                    <WantedItemInfoBox>
                                        <Typography sx={{ fontSize: '25px', fontWeight: 'bold' }}>
                                            {name ? name : '---'}
                                        </Typography>
                                        <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                                            {breed ? breed : '---'}
                                        </Typography>
                                    </WantedItemInfoBox>
                                    <WantedItemInfoBox>
                                        <Specyfic>
                                            <Typography sx={{ fontSize: '1em', fontStyle: 'italic', fontWeight: '500', mb: 1 }}>
                                                Szczegóły zwierzaka:
                                            </Typography>
                                            <Typography sx={{
                                                maxWidth: '160px',
                                                minHeight: '100px',
                                                overflow: 'scroll',
                                                padding: '0 2px',
                                                "&::-webkit-scrollbar": {
                                                    width: 0
                                                },
                                            }}>
                                                {wantedList.details}
                                            </Typography>
                                        </Specyfic>
                                    </WantedItemInfoBox>
                                    <WantedItemInfoBox>
                                        <Typography sx={{ fontSize: '1.1em', fontWeight: '500' }}>
                                            {city ? city : '---'}
                                        </Typography>
                                    </WantedItemInfoBox>
                                    <WantedItemInfoBox>
                                        <Button sx={{ color: "#64C2A7" }} variant="text">
                                            {<PlaceIcon fontSize="large" />}
                                            Zobacz na mapie</Button>
                                    </WantedItemInfoBox>
                                    <WantedItemInfoBox>
                                        <ContainerEdit>
                                            <Question>
                                                Jeśli widziałeś zwierzaka napisz
                                            </Question>
                                            <Circle sx={{color:"#64C2A7"}} component={Link} to='/map'>
                                                <EditIcon fontSize='large' />
                                               
                                            </Circle>
                                        </ContainerEdit>
                                    </WantedItemInfoBox>
                                </WantedItem>
                                <WantedDescription>
                                    <Typography sx={{
                                        margin: '20px 20px',
                                        padding: '10px',
                                        backgroundColor: 'white',
                                        borderRadius: '15px',
                                        minHeight: '120px',
                                    }}>
                                        {wantedList.description ? wantedList.description : 'brak opisu'}

                                    </Typography>
                                </WantedDescription>
                                <WantedContact>
                                    <ContactWrapper>
                                        <Typography>Skontaktuj się z właścicielem:</Typography>
                                        <CallIcon sx={{ marginLeft: '1.8em' }} />
                                        <Typography sx={{ fontWeight: '500' }}>
                                            {wantedList.phone ? wantedList.phone : '---'}
                                        </Typography>
                                    </ContactWrapper>
                                    <ContactWrapper >
                                        <Typography sx={{ marginRight: '0.2em' }}>Link do ogłoszenia:</Typography>
                                        <Typography sx={{ fontStyle: 'italic' }}>{window.location.href}</Typography>
                                        <Button sx={{ color: "#64C2A7", fontSize: '30px' }} variant="text" onClick={copy}>
                                            <Tooltip disableFocusListener disableTouchListener title="Kopiuj">
                                                <ContentCopyIcon sx={{ color: "#64C2A7", fontSize: '30px' }} />
                                            </Tooltip>
                                        </Button>
                                    </ContactWrapper>
                                </WantedContact>
                            </DetailsWrapper>
                        </Container>
                    )
                })}
            </Container>
        </>
    }
};

//Bartosz
import { useNavigate, useLocation, useParams } from "react-router-dom";
import queryString from 'query-string'
import { useState, useEffect } from 'react'
import { db } from '../../firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore'
import styled from 'styled-components';
import { Button, Typography } from '@mui/material';
import { Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import PlaceIcon from '@mui/icons-material/Place';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
 `;

const WantedItem = styled.div`
    width: 70%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    margin: 10px 20px;
    padding: 10px;
    background-color: #e2e2e2;
    border-radius: 0 50px 0 0;
 `;

const WantedItemInfoBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
 `;

const ContainerEdit = styled.div`
    display:flex;
    justify-content:space-evenly;
    background-color:none;
    border:3px dotted black;
    border-radius:25px;
    margin-left:60px;
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
    width:100%;
    margin-top:25px;
`;



export const WantedList = () => {

    const params = useParams();

    const [wantedListData, setWantedListData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { search } = useLocation();
    const { city, breed, name } = queryString.parse(search);

    const navigate = useNavigate();

    const handleShowMore = (name, id) => {
        navigate(`/wanted-page/${name}/${id}`)
    };

    const handleClickCircle = () => {
        console.log("mapalalla");
        navigate(`/map-view`);
        
      }

    const wantedListCollectionRef = collection(db, "Wanted");
    const q = query(collection(db, "Wanted"),
        where("citylost", "==", city),
        where("breed", "==", breed),
        where("name", "==", name)
    );

    const getQuery = () => {
        if (breed && !name) {
            return query(collection(db, "Wanted"),
                where("citylost", "==", city),
                where("breed", "==", breed),
            )
        }
        if (!breed && name) {
            return query(collection(db, "Wanted"),
                where("citylost", "==", city),
                where("name", "==", name),
            )
        }
        if (!breed && !name) {
            return query(collection(db, "Wanted"),
                where("citylost", "==", city),
            )
        }
        if (breed && name) {
            return query(collection(db, "Wanted"),
                where("citylost", "==", city),
                where("name", "==", name),
                where("breed", "==", breed),
            )
        }
    }



    let cityToUpperCase = ''
    let cityToLowerCase = ''
    if (typeof city[0] !== 'undefined' && city[0] !== '') {
        cityToUpperCase = city[0].toUpperCase() + city.substring(1);
        cityToLowerCase = city[0].toLowerCase() + city.substring(1);
    }

    let breedToLowerCase = ''
    let breedToUpperCase = ''
    if (typeof breed[0] !== 'undefined' && city[0] !== '') {
        breedToUpperCase = breed[0].toUpperCase() + breed.substring(1);
        breedToLowerCase = breed[0].toLowerCase() + breed.substring(1);
    }

    let nameToLowerCase = ''
    let nameToUpperCase = ''
    if (typeof name[0] !== 'undefined' && city[0] !== '') {
        nameToLowerCase = name[0].toUpperCase() + name.substring(1);
        nameToUpperCase = name[0].toLowerCase() + name.substring(1);
    }

    const getWantedList = async () => {
        setIsLoading(true);
        const data = await getDocs(getQuery());
        setWantedListData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setIsLoading(false)
    };

    useEffect(() => {
        getWantedList();
    }, []);


    const filteredWantedList = wantedListData.filter(item =>
        ((item.citylost === city || item.citylost === cityToLowerCase || item.citylost === cityToUpperCase) && (item.citylost !== '')) ||
        ((item.breed === breed || item.breed === breedToLowerCase || item.breed === breedToUpperCase) && (item.breed !== '')) ||
        ((item.name === name || item.name === nameToLowerCase || item.name === nameToUpperCase) && (item.name !== ''))
    );

    if (city === '' && breed === '' && name === '') {
        return (
            <Container >
                <Typography>Brak Wyników, wypełnij formularz</Typography>
            </Container>
        )
    }

    if (!filteredWantedList.length && !isLoading) {
        return (
            <Container>
                <Typography variant='h4'>Nie znaleziono takiego pieska!</Typography>
                <Typography variant='caption'>Upewnij się, czy wszystko dobrze wpisałeś</Typography>
                <Button component={Link} to='/' sx={{ color: '#3D9C75' }}>Powrót do strony głownej</Button>
            </Container>)

    }
    else if (!filteredWantedList.length && isLoading) {
        return (
            <Container style={{ margin: '5em' }}>
                <CircularProgress></CircularProgress>
            </Container>
        )
    }
    else {
        return <>
            <Typography variant='h6' sx={{ marginLeft: '300px', mt: 2 }}>Liczba zaginięć zwierząt: {wantedListData.length}</Typography>
            <Container >
                {filteredWantedList.map((wantedList) => {
                    const name = wantedList.name[0].toUpperCase() + wantedList.name.substring(1);
                    const breed = wantedList.breed[0].toUpperCase() + wantedList.breed.substring(1);
                    const city = wantedList.citylost[0].toUpperCase() + wantedList.citylost.substring(1);

                    return (
                        <WantedItem key={wantedList.id} style={{ minWidth: '20px' }}>
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
                                        {wantedList.details ? wantedList.details : 'brak szczegółów'}
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
                                    <Circle sx={{color:"#64C2A7"}}  onClick={handleClickCircle}>
                                        <EditIcon fontSize='large' />
                                    </Circle>
                                </ContainerEdit>
                            </WantedItemInfoBox>
                            <WantedItemInfoBox>
                                {/* <ExpandMoreOutlinedIcon fontSize='large' sx={{ padding: 'none' }}></ExpandMoreOutlinedIcon> */}
                                <Button onClick={() => handleShowMore(wantedList.name, wantedList.id)} sx={{ color: "#64C2A7" }}>Więcej</Button>
                            </WantedItemInfoBox>
                        </WantedItem>
                    )
                })}
            </Container>
        </>
    }

};
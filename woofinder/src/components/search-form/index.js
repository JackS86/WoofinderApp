//Bartosz
import styled from 'styled-components';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button'
import { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { useNavigate, Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { InputLabel } from '@mui/material';
import { Input } from '@mui/material';



const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4em;

`;
const TextFieldStyled = styled(TextField)`
  fieldset {
    border-radius: 25px;
  }
`;

const LinkStyled = styled(Link)`
    color:black;
    text-decoration: none;
`;

const SearchButton = styled('button')`
    cursor: pointer;    
    margin-top: 20px;
    margin-bottom: 20px;
    background-color:#E2E2E2;
    text-transform: capitalize;
    color:black;
    width: 120px;
    padding: 15px 20px;
    height: 45px;
    font-weight: bold;
    border-radius:35px;
    -webkit-border-radius:35px;
    -moz-border-radius:35px;
    -ms-border-radius:35px;
    -o-border-radius:35px;
    border: none;
    transition: 1s;
    -webkit-transition: 1s;
    -moz-transition: 1s;
    -ms-transition: 1s;
    -o-transition: 1s;
    &:hover {
            cursor: pointer;
            margin-top: 20px;
            margin-bottom: 20px;
            background-color:#292929;
            color:rgb(255, 255, 255);
            letter-spacing: 1px;
            font-size: 15px;
            width: 140px;
            padding: 15px 20px;
            height: 50px;
            font-weight: bold;
            border-radius:35px;
            -webkit-border-radius:35px;
            -moz-border-radius:35px;
            -ms-border-radius:35px;
            -o-border-radius:35px;
            border: 1px solid white;
    }
`;

export const SearchForm = () => {
    const [cityData, setCityData] = useState([]);

    //fetching data from ./public
    const getCityData = () => {
        fetch('city-data.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (res) {
                return res.json();
            })
            .catch((error) => {
                console.error(`Error at fetch ${error}`);
            })
            .then(function (dogsData) {
                setCityData(dogsData)
            })
            .catch((error) => {
                console.error(`Error at setting data to the state ${error}`);
            });
    }

    useEffect(() => {
        getCityData()
    }, [])

    //catching only city names
    const arrayOfCityNames = cityData.map(city => city.name)

    const [dogsData, setDogsData] = useState([]);
    //fetching data from ./public/dogs-data.json
    const fetchdogsData = () => {
        fetch('dogs-data.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (res) {
                return res.json();
            })
            .catch((error) => {
                console.error(`Error at fetch ${error}`);
            })
            .then(function (dogsData) {
                setDogsData(dogsData)
            })
            .catch((error) => {
                console.error(`Error at setting data to the state ${error}`);
            });
    }

    useEffect(() => {
        fetchdogsData();
    }, []);


    //getting only dog names to an array
    const dogNamesArray = dogsData.map(dog => dog.name);

    //creating states to contain values from search inputs
    const [city, setCity] = useState('');
    const [breed, setBreed] = useState('');
    const [name, setName] = useState('');


    //creating function to capture values of a states
    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleBreedChange = (event) => {
        setBreed(event.target.value);
    };

    const handleDogNameChange = (event) => {
        setName(event.target.value);
    };

    const navigate = useNavigate()
    const handleSearch = (event) => {
        if (city) {
            navigate(`/wanted-page?city=${city.toLowerCase()}&breed=${breed.toLowerCase()}&name=${name.toLowerCase()}`)
        }
        else {
            setError(true);
        }
    };

    const [errors, setError] = useState(false);

    //Limiting showed city suggestions in Autocomplete MUI Component
    const OPTIONS_LIMIT = 10;
    const filterOptions = createFilterOptions({
        limit: OPTIONS_LIMIT
    });



    return (
        <Wrapper>
            <FormControl fullWidth required sx={{ maxWidth: '900px' }} >
                {/* <Alert Alert severity="error" >
                    <AlertTitle>Error</AlertTitle>
                    This is an error alert — <strong>check it out!</strong>
                </Alert > */}
                <Autocomplete
                    freeSolo
                    filterOptions={filterOptions}
                    onChange={(event, newValue) => {
                        setCity(newValue);
                    }}
                    options={arrayOfCityNames}
                    renderInput={(params) => <TextFieldStyled
                        {...params}
                        error={errors}
                        label="Podaj miasto..."

                        onChange={handleCityChange}
                    />}
                />
                <Autocomplete
                    freeSolo
                    filterOptions={filterOptions}
                    onChange={(event, newValue) => { setBreed(newValue) }}
                    options={dogNamesArray}
                    sx={{ margin: '2em 0' }}
                    renderInput={(params) => <TextFieldStyled
                        {...params}
                        label="Podaj rasę psa..."
                        onChange={handleBreedChange}
                    />}
                />
                <TextFieldStyled
                    value={name}
                    label="Podaj imię psa..."
                    onChange={handleDogNameChange} />
                <SearchButton
                    style={{ textTransform: 'capitalize', margin: '20px auto' }}
                    onClick={handleSearch}
                // component={Link}
                // to={`/wanted-page?city=${city}&breed=${breed}&name=${name}`}
                >
                    Szukaj
                </SearchButton>
                {errors ?
                    <>
                        <Alert variant="outlined" severity="error">
                            Błąd wyszukiwania — musisz wprowadźić nazwę miasta!
                        </Alert>
                    </>
                    : ''
                }


            </FormControl>


        </Wrapper >
    );
};
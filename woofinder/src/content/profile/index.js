import { useState, useEffect } from "react";
import { Top } from "../../components/topbar"
import { UserContextProvider } from "../../services/user-context"
import styled from 'styled-components'
import { Avatar } from "@mui/material";
import { Button } from "@mui/material";
import AddAPhoto from "@mui/icons-material/AddAPhoto";
import { ButtonGroup } from "@mui/material";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useUserContext } from "../../services/user-context";
import { Breadcrumbs } from "../../components/breadcrumps";



const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  margin-top:60px;
  margin-bottom:40px;
  color:#706F6F;
`;

const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items:center;
    
`;



export const Profile = () => {

    const { user, avatarUrl, setAvatarUrl } = useUserContext();
    const [file, setFile] = useState(null);
  

   


    const handleChangePhoto = (e) => {

        setFile(e.target.files[0]);
    }

    const handleCancelPhoto = (e) => {
        setFile(null)
    }

    const handleSavePhoto = (e) => {
        const storage = getStorage();
        const storageRef = ref(storage, `avatars/${user.uid}`);

        uploadBytes(storageRef, file).then((snapshot) => {
            getDownloadURL(storageRef).then((url) => {
                setAvatarUrl(url);
                setFile(null);
            })


        });

    }


    return (
        <>
            <UserContextProvider>
                <Top></Top>
                <Breadcrumbs></Breadcrumbs>
                <Container>
                    <Title>Panel użytkownika</Title>
                    <Avatar src={avatarUrl} alt="profile" sx={{ height: "186px", width: "186px" }} ></Avatar>
                    <Button sx={{ mt: 2 }}
                        variant="contained"
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
                </Container>
            </UserContextProvider>
        </>
    )


}
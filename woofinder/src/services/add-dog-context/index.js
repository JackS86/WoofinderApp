import { createContext, useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';

export const AddDogContext = createContext(null);

export const AddDogContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [dogPhotoUrl, setDogPhotoUrl] = useState(null);

    useEffect(() => {

        const auth = getAuth();

        onAuthStateChanged(auth, (userData) => {
            setUser(userData);

            if (userData) {
                const storage = getStorage();
                const storageRef = ref(storage, `dogs/${userData.uid}`);
                getDownloadURL(storageRef).then((url) => {
                    setDogPhotoUrl(url);
                }).catch(err => {
                    setDogPhotoUrl(null);
                });
            }


        })
    }, [user]);


    return <AddDogContext.Provider value={
        {
            user,
            dogPhotoUrl,
            setDogPhotoUrl
        }
    }>
        {children}
    </AddDogContext.Provider>

}
export const useAddDogContext = () => useContext(AddDogContext);
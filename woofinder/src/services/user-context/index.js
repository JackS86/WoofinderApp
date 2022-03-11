import { createContext, useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {

        const auth = getAuth();

        onAuthStateChanged(auth, (userData) => {
            setUser(userData);

            if (userData) {
                const storage = getStorage();
                const storageRef = ref(storage, `avatars/${userData.uid}`);
                getDownloadURL(storageRef).then((url) => {
                    setAvatarUrl(url);
                }).catch(err => {
                    setAvatarUrl(null);
                });
            }


        })
    }, [user]);


    return <UserContext.Provider value={
        {
            user,
            avatarUrl,
            setAvatarUrl
        }
    }>
        {children}
    </UserContext.Provider>

}
export const useUserContext = () => useContext(UserContext);
import { Routes, Route } from 'react-router-dom';
import MainPage from './main-page';
import WantedPage from './wanted-page';
import WantedDetails from './wanted-details';
import { RegisterForm } from '../components/registerform';
import { LoginForm } from './../components/loginform';
import { Profile } from './profile';
import  MapView  from './map-view';

export const Content = () => (
    <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/wanted-page" element={<WantedPage />} />
        <Route path="/wanted-page/:name/:id" element={<WantedDetails />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/map-view" element={<MapView />} />
    </Routes>
);
import React from 'react';
import { Top } from '../../components/topbar'
import { Map } from '../map';
import { Note } from '../note';
import { Breadcrumbs } from '../../components/breadcrumps';

const MapView = () => {
    return <>
        <Top></Top>
        <Breadcrumbs></Breadcrumbs>
        <Map></Map>
        <Note></Note>
    </>;
};

export default MapView;
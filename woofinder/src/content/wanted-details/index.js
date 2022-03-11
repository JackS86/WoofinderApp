import React from 'react';
import { Top } from '../../components/topbar'
import { Wanted } from '../../components/wanted';
import { Breadcrumbs } from '../../components/breadcrumps';

const WantedDetails = () => {
    return <>
        <Top></Top>
        <Breadcrumbs></Breadcrumbs>
        <Wanted></Wanted>
    </>;
};

export default WantedDetails;
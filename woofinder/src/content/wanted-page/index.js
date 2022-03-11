import React from 'react';
import { Top } from '../../components/topbar'
import { WantedList } from '../../components/wanted-list';
import { Breadcrumbs } from '../../components/breadcrumps';

const WantedPage = () => {
    return <>
        <Top></Top>
        <Breadcrumbs></Breadcrumbs>
        <WantedList></WantedList>
    </>;
};

export default WantedPage;
import React from 'react';
import { SearchForm } from '../../components/search-form';
import { Top } from '../../components/topbar'
import { AddWanted } from '../../components/addwanted'
import { Breadcrumbs } from '../../components/breadcrumps';


const MainPage = () => {
    return <>
        <Top></Top>
        <Breadcrumbs></Breadcrumbs>
        <SearchForm></SearchForm>
        <AddWanted></AddWanted>
    </>;
};

export default MainPage;

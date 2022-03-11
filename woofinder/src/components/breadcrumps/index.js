import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const LinkElem = styled(NavLink)`
  font-size: 18px;
  text-decoration:none;
  font-weight: 400;
  padding-left:12px;
  color:white;
`;

const BreadContainer = styled.div`
background-color:#293132;
display:flex;
justify-content: flex-start;
align-items:center;

`;

const Local = styled.p`
font-weight:bold;
margin-left:90px;
color:white;
text-transform:uppercase;
`;

const userNamesById = { '1': 'John' }

const DynamicUserBreadcrumb = ({ match }) => (
    <span>{userNamesById[match.params.name]}</span>
);



const routes = [
    { path: '/users/:userId', breadcrumb: DynamicUserBreadcrumb },
    { path: '/example', breadcrumb: 'Custom Example' },

];

export const Breadcrumbs = () => {
    const breadcrumbs = useBreadcrumbs(routes);

    return (
        <>
            <BreadContainer>
                <Local>Jesteś na stronie :</Local>
                {breadcrumbs.map(({
                    match,
                    breadcrumb
                }) => (
                    <span key={match.pathname}>
                        <LinkElem
                            to={match.pathname}>{breadcrumb}<span>  </span><ArrowForwardIosIcon sx={{ fontSize: "small" }} /></LinkElem>
                    </span>
                ))}
            </BreadContainer>
        </>
    );
};
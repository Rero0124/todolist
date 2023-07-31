import { Link } from "react-router-dom";
import { styled } from "styled-components";

const HeaderDiv = styled.div`
    
`;

const LinkHome = styled(Link)`
    
`;

const LinkLogin = styled(Link)`
    
`;

const LinkLogout = styled(Link)`
    
`;

const LinkRegister = styled(Link)`
    
`;

const Header = () => {
    return (
        <HeaderDiv>
            <LinkHome to='/'>홈</LinkHome>
            <LinkLogin to='/login'>홈</LinkLogin>
            <LinkLogout to='/logout'>홈</LinkLogout>
            <LinkRegister to='/register'>홈</LinkRegister>
        </HeaderDiv>
    );
}

export default Header;
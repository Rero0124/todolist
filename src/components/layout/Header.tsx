import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { Div } from "../global/StyledElements";

const HeaderDiv = styled(Div)`
    position: absolute;
    left: 0px;
    top: 0px;
`;

const HeaderLink = styled(Link)`
    
`;

const Header = () => {
    return (
        <HeaderDiv>
            <HeaderLink to='/'>홈</HeaderLink>
            <HeaderLink to='/login'>로그인</HeaderLink>
            <HeaderLink to='/logout'>로그아웃</HeaderLink>
            <HeaderLink to='/register'>회원가입</HeaderLink>
        </HeaderDiv>
    );
}

export default Header;
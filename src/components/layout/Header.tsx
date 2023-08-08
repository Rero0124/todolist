import { useState, useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { Div } from "../global/StyledElements";
import { UserContext } from '../../Contexts/User';

const HeaderDiv = styled(Div)`
    position: absolute;
    left: 0px;
    top: 0px;
`;

const HeaderLink = styled(Link)`
    
`;

const Header = () => {
    const { logging } = useContext(UserContext);
    const [element, setElement] = useState<JSX.Element>(<></>)

    const loginBeforeElement = (
        <>
            <HeaderLink to='/login'>로그인</HeaderLink>
            <HeaderLink to='/register'>회원가입</HeaderLink>
        </>
    )

    const loginAfterElement = (
        <>
            <HeaderLink to='/logout'>로그아웃</HeaderLink>
        </>
    )

    useEffect(() => {
        setElement(logging ? loginAfterElement : loginBeforeElement);
    }, [])
    
    return (
        <HeaderDiv>
            <HeaderLink to='/'>홈</HeaderLink>
            {element}
        </HeaderDiv>
    );
}

export default Header;
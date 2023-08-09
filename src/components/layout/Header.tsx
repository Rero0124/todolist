import { useState, useEffect } from 'react';
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

interface Props {
    logging: boolean;
}

const Header = ({ logging }: Props) => {
    const [ element, setElement ] = useState<JSX.Element>(<></>)

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
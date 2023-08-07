import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { Div } from "../global/StyledElements";
import { loginCheck } from "../../Util/User";

const HeaderDiv = styled(Div)`
    position: absolute;
    left: 0px;
    top: 0px;
`;

const HeaderLink = styled(Link)`
    
`;

const Header = () => {
    const loginAfterElement = (
        <>
            <HeaderLink to='/login'>로그인</HeaderLink>
            <HeaderLink to='/register'>회원가입</HeaderLink>
        </>
    )

    const loginBeforeElement = (
        <>
            <HeaderLink to='/logout'>로그아웃</HeaderLink>
        </>
    )

    let printElement = <></>;

    loginCheck().then((result) => { printElement = result ? loginAfterElement : loginBeforeElement})

    return (
        <HeaderDiv>
            <HeaderLink to='/'>홈</HeaderLink>
            {printElement}
        </HeaderDiv>
    );
}

export default Header;
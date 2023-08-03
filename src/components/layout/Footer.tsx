import { styled } from "styled-components";
import { Div } from "../global/StyledElements";

const FooterDiv = styled(Div)`
    position: absolute;
    left: 0px;
    bottom: 0px;
`;

const Footer = () => {
    return (
        <FooterDiv>
            footer입니다.
        </FooterDiv>
    );
}

export default Footer;
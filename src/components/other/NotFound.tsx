import { styled } from "styled-components";
import { Div, P } from "../global/StyledElements";
import { Link } from "react-router-dom";

const NotFoundDiv = styled(Div)`
    
`;

const ContentDiv = styled(Div)`
    
`;

const LinkHome = styled(Link)`
    
`;

const NotFound = () => {
    return (
        <NotFoundDiv>
            <ContentDiv>
                <P>잘못된 페이지 입니다.</P>
                <LinkHome to='/'>돌아가기</LinkHome>
            </ContentDiv>
        </NotFoundDiv>
    );
}

export default NotFound;
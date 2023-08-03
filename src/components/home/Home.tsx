import { styled } from "styled-components";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Div } from "../global/StyledElements";

const HomeDiv = styled(Div)`
    
`;

const Home = () => {
    return (
        <HomeDiv>
            <Header />
            <Footer />
        </HomeDiv>
    );
}

export default Home;
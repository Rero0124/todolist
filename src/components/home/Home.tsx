import Footer from "../layout/Footer";
import { useState, useEffect } from 'react';
import { HomeButton, HomeDiv, HomeInput } from "./Style";

const Home = () => {
    const [ element, setElement ] = useState<JSX.Element>(<></>)

    return (
        <HomeDiv>
            <HomeInput />
            <HomeButton>추가</HomeButton>
            <Footer />
        </HomeDiv>
    );
}

export default Home;
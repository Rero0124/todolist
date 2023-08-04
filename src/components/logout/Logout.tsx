import { useEffect } from "react";
import { loginCheck } from "../../Util/User";
import { useNavigate } from "react-router-dom";
import { LogoutDiv } from "./style";



const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        loginCheck().then(result => { if(!result) navigate(-1)})
    })
    return (
        <LogoutDiv>
            
        </LogoutDiv>
    );
}

export default Logout;
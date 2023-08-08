import { useContext, useEffect } from "react";
import { logoutUser } from "../../Util/User";
import { useNavigate } from "react-router-dom";
import { LogoutDiv } from "./style";
import { UserContext } from "../../Contexts/User";

const Logout = () => {
    const { logging, setLogging } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!logging) {
            navigate(-1);
        } else {
            logoutUser().then(result => {
                if(result) alert('로그아웃 성공');
                else alert('로그아웃 실패');
                setLogging(false)
                navigate('/');
            })
        }
    }, [])

    
    
    return (
        <LogoutDiv>
            <p>로그아웃중</p>
        </LogoutDiv>
    );
}

export default Logout;
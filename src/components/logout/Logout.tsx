import { useEffect } from "react";
import { logoutUser } from "../../Util/User";
import { LogoutDiv } from "./style";

interface Props {
    onRemoveUser: () => void
}

const Logout = ({ onRemoveUser }: Props) => {

    useEffect(() => {
        logoutUser().then(result => {
            if(result) alert('로그아웃 성공');
            else alert('로그아웃 실패');
            onRemoveUser();
        })
    }, [])
    
    return (
        <LogoutDiv>
            <p>로그아웃중</p>
        </LogoutDiv>
    );
}

export default Logout;
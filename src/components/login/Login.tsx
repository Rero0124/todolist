import { useEffect } from "react";
import { LoginDiv, LoginTable, LoginInput, LoginButton, FindIdButton, FindPwButton, RegisterButton, LoginButtonTd, LoginSubTd, LoginInputTd } from "./Style";
import { loginCheck, loginUser } from "../../Util/User";
import { useNavigate } from "react-router-dom";

interface LoginInputs extends HTMLFormControlsCollection {
    id: HTMLInputElement;
    pw: HTMLInputElement;
}

interface LoginForm extends HTMLFormElement {
    readonly elements : LoginInputs;
}

const Login = () => {
    const navigate = useNavigate();
    const loginSubmit = async (e: React.FormEvent<LoginForm>) => {
        e.preventDefault();
        const form = e.currentTarget.elements;
        loginUser(form.id.value, form.pw.value).then(result => {
            if(result) {
                alert('로그인 성공');
                navigate('/');
            } else {
                alert('아이디와 비밀번호를 확인해주세요');
            }
        });
    }

    useEffect(() => {
        loginCheck().then(result => { if(result) navigate(-1)})
    })

    return (
        <LoginDiv>
            <form id="login" onSubmit={loginSubmit}>
                <LoginTable>
                    <tr>
                        <LoginSubTd>아이디</LoginSubTd>
                        <LoginInputTd><LoginInput type="text" name="id" /></LoginInputTd>
                    </tr>
                    <tr>
                        <LoginSubTd>비밀번호</LoginSubTd>
                        <LoginInputTd><LoginInput type="password" name="pw" /></LoginInputTd>
                    </tr>
                    <tr>
                        <LoginButtonTd colSpan={2}>
                            <LoginButton>로그인</LoginButton>
                        </LoginButtonTd>
                    </tr>
                    <tr>
                        <LoginButtonTd colSpan={2}>
                            <FindIdButton type='button'>아이디찾기</FindIdButton>
                            <FindPwButton type='button'>비밀번호찾기</FindPwButton>
                            <RegisterButton type='button'>회원가입</RegisterButton>
                        </LoginButtonTd>
                    </tr>
                </LoginTable>
            </form>
        </LoginDiv>
    );
}

export default Login;
import { FormEvent } from "react";
import { LoginDiv, LoginTable, SubTd, InputTd, ButtonTd, LoginInput, LoginButton, FindIdButton, FindPwButton, RegisterButton } from "./Style";
import { encryptoSHA256 } from "../../Util/Crypto";
import { getUser } from "../../Util/DB/User";

interface LoginInputs extends HTMLFormControlsCollection {
    id: HTMLInputElement;
    pw: HTMLInputElement;
}

interface LoginForm extends HTMLFormElement {
    readonly elements : LoginInputs;
}

const Login = () => {
    const LoginSubmit = (e: FormEvent<LoginForm>) => {
        e.preventDefault();
        const form = e.currentTarget.elements;
        const userInfo: UserType = getUser(form.id.value);
        const encryptoResult = encryptoSHA256(userInfo.);
        const pw = encryptoResult.str;
        const salt = encryptoResult.salt;
        
        getUser)
    }

    return (
        <LoginDiv>
            <form id="login" onSubmit={LoginSubmit}>
                <LoginTable>
                    <tr>
                        <SubTd>아이디</SubTd>
                        <InputTd><LoginInput type="text" name="id" /></InputTd>
                    </tr>
                    <tr>
                        <SubTd>비밀번호</SubTd>
                        <InputTd><LoginInput type="password" name="pw" /></InputTd>
                    </tr>
                    <tr>
                        <ButtonTd colSpan={2}>
                            <LoginButton>로그인</LoginButton>
                        </ButtonTd>
                    </tr>
                    <tr>
                        <ButtonTd colSpan={2}>
                            <FindIdButton type='button'>아이디찾기</FindIdButton>
                            <FindPwButton type='button'>비밀번호찾기</FindPwButton>
                            <RegisterButton type='button'>회원가입</RegisterButton>
                        </ButtonTd>
                    </tr>
                </LoginTable>
            </form>
        </LoginDiv>
    );
}

export default Login;
import { LoginDiv, LoginTable, LoginInput, LoginButton, FindIdButton, FindPwButton, RegisterButton, LoginButtonTd, LoginSubTd, LoginInputTd } from "./Style";
import { loginUser } from "../../Util/User";
import { Link } from "react-router-dom";
import { UserState } from "../../redux/user";

interface LoginInputs extends HTMLFormControlsCollection {
    id: HTMLInputElement;
    pw: HTMLInputElement;
}

interface LoginForm extends HTMLFormElement {
    readonly elements : LoginInputs;
}

interface Props {
    onSetUser: (userInfo: UserState) => void
}

const Login = ({ onSetUser }: Props) => {
    const loginSubmit = async (e: React.FormEvent<LoginForm>) => {
        e.preventDefault();
        const form = e.currentTarget.elements;
        loginUser(form.id.value, form.pw.value).then(data => {
            if(data.test && data.result) {
                onSetUser({ userId: data.result.userId, sessionId: data.result.sessionId, logging: true });
                alert('로그인 성공');
            } else {
                alert('아이디와 비밀번호를 확인해주세요');
            }
        });
    }

    return (
        <LoginDiv>
            <form id="login" onSubmit={loginSubmit}>
                <LoginTable>
                    <tbody>
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
                                <FindIdButton type='button'><Link to='/findId'>아이디찾기</Link></FindIdButton>
                                <FindPwButton type='button'><Link to='/findPw'>비밀번호찾기</Link></FindPwButton>
                                <RegisterButton type='button'><Link to='/register'>회원가입</Link></RegisterButton>
                            </LoginButtonTd>
                        </tr>
                    </tbody>
                </LoginTable>
            </form>
        </LoginDiv>
    );
}

export default Login;
import { useNavigate } from "react-router-dom";
import { RegisterButton, RegisterButtonTd, RegisterDiv, RegisterInput, RegisterInputTd, RegisterSubTd, RegisterTable } from "./style";
import { hasId, registerUser } from "../../Util/User";

interface RegisterInputs extends HTMLFormControlsCollection {
    id: HTMLInputElement;
    pw: HTMLInputElement;
}

interface RegisterForm extends HTMLFormElement {
    readonly elements : RegisterInputs;
}

const Register = () => {
    const navigate = useNavigate();

    const registerSubmit = (e: React.FormEvent<RegisterForm>) => {
        e.preventDefault();
        const form = e.currentTarget.elements;
        registerUser(form.id.value, form.pw.value).then( result => {
            if(result) {
                alert('회원가입 성공');
                navigate('/login');
            } else {
                alert('회원가입 실패');
            }
        })
    }

    const checkId = (e: React.FocusEvent<HTMLInputElement>) => {
        const userId = e.target.value;
        hasId(userId).then(result => {
            if(result) alert('사용 가능한 아이디 입니다.')
            else alert('사용 불가능한 아이디 입니다.')
        })
    }

    return (
        <RegisterDiv>
            <form id="login" onSubmit={registerSubmit}>
                <RegisterTable>
                    <tbody>
                        <tr>
                            <RegisterSubTd>아이디</RegisterSubTd>
                            <RegisterInputTd>
                                <RegisterInput type="text" name="id" onBlur={checkId}/>
                            </RegisterInputTd>
                        </tr>
                        <tr>
                            <RegisterSubTd>비밀번호</RegisterSubTd>
                            <RegisterInputTd><RegisterInput type="password" name="pw" /></RegisterInputTd>
                        </tr>
                        <tr>
                            <RegisterButtonTd colSpan={2}>
                                <RegisterButton>회원가입</RegisterButton>
                            </RegisterButtonTd>
                        </tr>
                    </tbody>
                </RegisterTable>
            </form>
        </RegisterDiv>
    );
}

export default Register;
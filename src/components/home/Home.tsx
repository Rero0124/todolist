import Footer from "../layout/Footer";
import { useState, useEffect } from 'react';
import { HomeButton, HomeDiv, HomeInput, PostCheckBox, PostDiv, PostRemoveButton, PostSpan } from "./Style";
import { insertPost, deletePost, selectPostList, updatePostCheck } from "../../Util/Post";
import { UserState } from "../../redux/user";

interface Props {
    user: UserState;
};

const Home = ({ user }: Props) => {
    const [ element, setElement ] = useState<JSX.Element[]>([])

    const addPost = () => { insertPost((document.getElementById('content') as HTMLInputElement).value, user.userId).then(() => getPost()); }

    const removePost = (postId: number) => { deletePost(postId).then(() => getPost()); };

    const togglePost = (postId: number, e: React.ChangeEvent<HTMLInputElement>) => { updatePostCheck(postId, !e.currentTarget.checked).then(() => getPost()); };

    const getPost = () => {
        selectPostList(user.userId).then((data) => {
            if(data.test) {
                let arrElement = [];
                for(let i = 0; i < data.result!.length; i++) {
                    arrElement.push(
                        <>
                            <PostSpan>{data.result![i].content}</PostSpan>
                            <PostCheckBox type="checkbox" checked={data.result![i].checked} onChange={(e) => {togglePost(data.result![i].postId, e)}}/>
                            <PostRemoveButton onClick={() => removePost(data.result![i].postId)}>삭제</PostRemoveButton>                           
                        </>
                    )
                }
                setElement(arrElement);
            } 
        })
    }

    useEffect(() => {
        if(user.logging) {
            getPost();
        }
    }, [user])

    return (
        <HomeDiv>
            {
                user.logging ? (
                    <>
                        <HomeInput id="content" />
                        <HomeButton onClick={addPost}>추가</HomeButton>
                        <br />
                        {element.map((item, index) => <PostDiv key={index}>{item}</PostDiv>)}
                    </>
                ) : (
                    <>
                        <p>로그인을 먼저 해주세요</p>
                    </>
                )
            }
            
            <Footer />
        </HomeDiv>
    );
}

export default Home;
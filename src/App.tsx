import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { styled } from 'styled-components';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Logout from './components/logout/Logout';
import NotFound from './components/other/NotFound';
import Header from './components/layout/Header';
import { loginCheck } from './Util/User';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux';
import { UserState, setUser, removeUser } from './redux/user';

const AppDiv = styled.div`
	
`;

function App() {
	const [ location, setLocation ] = useState<string>('');
	const user = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	const nowLocation = useLocation();
	const navigate = useNavigate();

	const onSetUser = (userInfo: UserState) => {
		dispatch(setUser(userInfo));
	}

	const onRemoveUser = () => {
		dispatch(removeUser());
	}

	if(location !== nowLocation.pathname) setLocation(nowLocation.pathname);

	useEffect(() => {
		if(location === '/login' || location === '/register' ) {
			if(user.logging) { navigate(-1); }
		} else if (location === '/logout') {
			if(!user.logging) { navigate(-1); }
		}
    }, [location, user.logging])

	useEffect(() => {
		if(user.logging) {
			loginCheck(user.userId, user.sessionId).then((data) => {
				if(((data.test) && data.result?.remove === false) && data.result.sessionId !== undefined) {
					onSetUser({userId: data.result.userId, sessionId: data.result.sessionId, logging: true});
				} else {
					onRemoveUser();
				}		
			})
		}
	}, [location]);

	return (
		<AppDiv>
			<Header logging={ user.logging } />
			<Routes>
				<Route path='/' element={<Home />}/>
				<Route path='/logout' element={<Logout onRemoveUser={onRemoveUser} />}/>
				<Route path='/login' element={<Login onSetUser={onSetUser} />}/>
				<Route path='/register' element={<Register />}/>
				<Route path='*' element={<NotFound />}/>
			</Routes>
		</AppDiv>
	);
}

export default App;

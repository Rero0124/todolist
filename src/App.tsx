import { useContext, useState, useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { UserContext, UserProvider } from './Contexts/User';
import { styled } from 'styled-components';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Logout from './components/logout/Logout';
import NotFound from './components/other/NotFound';
import { loginCheck } from './Util/User';

const AppDiv = styled.div`
	
`;

function App() {
	const { userId, sessionId, logging, setUserId, setSessionId, setLogging } = useContext(UserContext);
	const [ location, setLocation ] = useState<string>('');
	const [ init, setInit ] = useState<boolean>(true);
	const nowLocation = useLocation();
	if(location !== nowLocation.pathname) setLocation(nowLocation.pathname);
	
	useEffect(() => {
		if(!init) {
			if(userId) localStorage.setItem('userId', JSON.stringify(userId));
			else localStorage.removeItem('userId');
			if(sessionId) localStorage.setItem('sessionId', JSON.stringify(sessionId));
			else localStorage.removeItem('logging'); 
			if(logging) localStorage.setItem('logging', JSON.stringify(logging)); 
			else localStorage.removeItem('logging'); 
		}
	}, [logging])

	useEffect(() => {
		if(init) {
			const oldUserId = localStorage.getItem('userId') ?? ''
			const oldSessionId = localStorage.getItem('sessionId') ?? ''
			const oldLogging = localStorage.getItem('logging') === 'true' ? true : false
			setUserId(oldUserId);
			setSessionId(oldSessionId);
			setLogging(oldLogging);
			setInit(false);
		}
    }, [])

	useEffect(() => {
		loginCheck(userId, sessionId).then((data) => {
			if(data.test) {
				if(data.result?.remove === false) {
					if(data.result.sessionId !== undefined) {
						setSessionId(data.result.sessionId);
						setLogging(true);
					} else {
						setLogging(false);
					}
				} else {
					setUserId('');
					setSessionId('');
					setLogging(false);
				}
			} else {
				setLogging(false);
			}
		})
	}, [location]);

	return (
		<AppDiv>
			<UserProvider>
				<Routes>
					<Route path='/' element={<Home />}/>
					<Route path='/logout' element={<Logout />}/>
					<Route path='/login' element={<Login />}/>
					<Route path='/register' element={<Register />}/>
					<Route path='*' element={<NotFound />}/>
				</Routes>
			</UserProvider>
		</AppDiv>
	);
}

export default App;

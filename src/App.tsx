import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { styled } from 'styled-components';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Logout from './components/logout/Logout';
import NotFound from './components/other/NotFound';

const AppDiv = styled.div`
	
`;

function App() {
	return (
		<AppDiv>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />}/>
					<Route path='/login' element={<Login />}/>
					<Route path='/logout' element={<Logout />}/>
					<Route path='/register' element={<Register />}/>
					<Route path='*' element={<NotFound />}/>
				</Routes>
			</BrowserRouter>
		</AppDiv>
	);
}

export default App;

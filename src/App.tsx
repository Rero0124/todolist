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
		<BrowserRouter>
			<AppDiv>
				<Routes>
					<Route path='/' element={<Home />}/>
					{ localStorage.getItem('userId') ? (
						<>
							<Route path='/logout' element={<Logout />}/>
						</>
						) : (
						<>
							<Route path='/login' element={<Login />}/>
							<Route path='/register' element={<Register />}/>
						</> ) 
					}
					<Route path='*' element={<NotFound />}/>
				</Routes>
			</AppDiv>
		</BrowserRouter>
	);
}

export default App;

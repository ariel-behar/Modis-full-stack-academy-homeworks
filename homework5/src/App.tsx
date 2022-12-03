import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Main from "./components/Main";
import Register from "./components/Register";
import { Container } from "./components/styles/Container.styled";


function App() {
	return (
		<Container>
			<Header />

			<Main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</Main>

			<Footer />

		</Container>
	);
}

export default App;

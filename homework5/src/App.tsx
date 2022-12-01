import Header from "./components/Header";
import Register from "./components/Register";
import { Container } from "./components/styles/Container.styled";


function App() {
	return (
		// Need to continue with the ROUTER
		<Container>
			<Header />
			<Register />
		</Container>
	);
}

export default App;

import { ThemeProvider } from "styled-components";

import { StyledApp } from './App.styled';
import CommentsSection from './components/CommentsSection/CommentsSection';
import HeadingSection from './components/HeadingSection/HeadingSection';
import JokesSection from './components/JokesSection/JokesSection';


const theme = {
	colors: {
		blueBtn: "#0d47a1",
		greenBtn: "#00701a",
		redBtn: "#e53935",
		commentBg: "#faebd7"
	}
}

function App() {

	return (
		<ThemeProvider theme={ theme }>
			<StyledApp className="App">
				<HeadingSection />

				<JokesSection />

				<CommentsSection />

			</StyledApp>
		</ThemeProvider>
	);
}

export default App;

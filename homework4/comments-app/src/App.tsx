
import { StyledApp } from './App.styled';
import CommentsSection from './components/CommentsSection/CommentsSection';
import HeadingSection from './components/HeadingSection/HeadingSection';
import JokesSection from './components/JokesSection/JokesSection';

function App() {

  return (
    <StyledApp className="App">
      <HeadingSection />

      <JokesSection />

      <CommentsSection />
      
    </StyledApp>
  );
}

export default App;

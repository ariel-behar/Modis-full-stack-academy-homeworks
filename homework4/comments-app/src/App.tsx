import { useEffect, useState } from "react";
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
	let [comments, setComments] = useState<any[]>([])

	useEffect(() => {
		try {
			updateComments()
		}
		catch (err) {
			console.log(err)
		}

	}, [comments])
	
	function updateComments(){
		let storedComments: string | null = localStorage.getItem('jokeComments')

		if (typeof storedComments === 'string') {
			if(storedComments !== JSON.stringify(comments)) {
				let parsedStoredComments = JSON.parse(storedComments)

				let sortedComments = sortComments(parsedStoredComments)

				setComments(sortedComments)
			}
		}
	}

	function sortComments(parsedStoredComments: object[]) {
		let filteredStoredCommentsWithModifiedAt = parsedStoredComments.filter((comment: any) => comment.hasOwnProperty('modifiedAt'))

		let filteredStoredCommentsWithoutModifiedAt = parsedStoredComments.filter((comment: any) => !comment.hasOwnProperty('modifiedAt'))
		
		filteredStoredCommentsWithModifiedAt.sort((a:any, b:any) => (new Date(b.modifiedAt) as any) - (new Date(a.modifiedAt) as any) );

		let parsedFilteredStoredComments: object[] = filteredStoredCommentsWithModifiedAt.concat(filteredStoredCommentsWithoutModifiedAt)

		return parsedFilteredStoredComments;
	}

	return (
		<ThemeProvider theme={ theme }>
			<StyledApp className="App">
				<HeadingSection />

				<JokesSection updateComments={updateComments}/>

				<CommentsSection comments={comments} updateComments={updateComments}/>

			</StyledApp>
		</ThemeProvider>
	);
}

export default App;

import styled from 'styled-components'


export const StyledApp = styled.div`
    margin: 0 auto;
    height: 100vh;
    max-width: 70%;
    background-color: rgb(240, 248, 255);


    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-areas: 
        "heading heading"
        "jokes comments"
        "jokes comments"
        "jokes comments"
        "jokes comments"
        "jokes comments";
`
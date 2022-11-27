import styled from 'styled-components'

export const StyledApp = styled.div`

    margin: 0 auto;
    height: 100%;
    min-height: 100vh;
    max-width: 70%;
    
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 15% 20% 65%;
    grid-template-areas: 
        "heading heading"
        "jokes jokes"
        "comments comments";
        
    button, input[type="submit"] {
        border: none;
        color: white;
        padding: 5px 10px;
        width: 200px;
        font-size: 1rem;
        cursor: pointer;

        &:hover {
            box-shadow: 1px 1px 5px grey;
            transform: scale(1.05);
        }
    }

`
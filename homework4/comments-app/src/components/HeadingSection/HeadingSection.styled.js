import styled from 'styled-components'
import imgLaughingEmojis from '../../img/laughing-emojis.jpg'

export const StyledHeadingSection = styled.section`
    background-image: url(${imgLaughingEmojis});
    background-size: cover;
    width: 100%;

    grid-area: heading;

    .mask {
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0,0.5);

        color: white;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`
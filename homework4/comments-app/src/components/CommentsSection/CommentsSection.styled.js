import styled from 'styled-components'

export const StyledCommentsSection = styled.section`
    grid-area: comments;

    padding: 20px;

    position: relative;
    border: 1px solid ${({theme}) => theme.colors.commentBg};
    margin-top: 20px;

    .section-corner-title {
        position: absolute;
        left: -30px;
        top: -35px;
        font-size: 50px;
        font-weight: bold;
        font-style: italic;
        transform: rotate(-5deg);
    }

    .comments-radio-buttons {
        text-align: center;

        input[type="radio"] {
            margin: 0 20px 0 5px;
        }
    }
`
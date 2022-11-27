import styled from 'styled-components'

export const StyledJokesSection = styled.section`
    grid-area: jokes;

    background-color: rgb(240, 248, 255);
    border: 1px solid ${({theme}) => theme.colors.blueBtn};
    margin-top: 20px;

    display: flex;
    justify-content: center;

    .joke-generator-div {
        position: relative;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 100%;
        padding: 20px;

        .section-corner-title {
            position: absolute;
            left: -30px;
            top: -30px;
            font-size: 50px;
            font-weight: bold;
            font-style: italic;
            transform: rotate(-5deg);
        }

        .joke-generator-buttons {
            margin-top: 10px;
            width: 100%;
            display: flex;
            justify-content: space-around;

            .new-joke-btn {
                background-color: ${({theme}) => theme.colors.greenBtn};
            }

            .leave-comment-btn {
                background-color: ${({theme}) => theme.colors.blueBtn};
            }
        }
    }



`
import styled from 'styled-components'

export const StyledCommentCardArticle = styled.article`
    background-color: ${({theme}) => theme.colors.commentBg};
    padding: 10px;
    margin-top: 10px;

    header {
        text-align: center;
        font-weight: bold;
    }

    main {
        display: flex;
        justify-content: space-between;

        form {
            input[type="radio"] {
                margin: 0 20px 0 5px;
            }
        }
    }

    footer {
        margin-top: 10px;
        display: flex;
        justify-content: space-around;
    }

    button[value="edit-comment"] {
        background-color: ${({theme}) => theme.colors.blueBtn};
    }

    button[value="delete-comment"] {
        background-color: ${({theme}) => theme.colors.redBtn};
    }
`
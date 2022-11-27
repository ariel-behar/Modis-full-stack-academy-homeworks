import styled from 'styled-components'

export const StyledModalDiv = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    height: 100%;
    width: 100%;
    background-color: rgb(75, 163, 199, 0.95);
    z-index: 100;

    display: flex;
    justify-content: center;
    align-items: center;

    span.close-modal-btn {
        position: absolute;
        top: 20px;
        right: 40px;

        cursor: pointer;
    }

    input[type="submit"] {
        background-color: ${({theme}) => theme.colors.blueBtn};
        align-self: center;
    }

    .input-length-error {
        color: red;
    }
`
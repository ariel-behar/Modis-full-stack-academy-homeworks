import styled from 'styled-components'

export const StyledHeader = styled.header`
    background-color: lightblue;
    padding: 20px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .header-logo-div {
        img {
            max-height: 70px;
        }
    }

    .header-buttons-ul {
        list-style-type: none;

        display: flex;

        li {
            margin-left: 15px;
            margin-right: 15px;
        }
    }

`
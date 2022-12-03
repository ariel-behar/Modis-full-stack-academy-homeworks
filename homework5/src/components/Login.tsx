import { StyledForm } from "./styles/Form.styled"

function Login() {

    function onSubmitHandler(e: React.FormEvent<HTMLFormElement> ) {
        e.preventDefault()

    }

    return (
        <StyledForm onSubmit={onSubmitHandler}>

            <label htmlFor="username">Username:</label>
            <input type="text" name="username" id="username" />

            <label htmlFor="password">Password:</label>
            <input type="text" name="password" id="password" />


            <input type="submit" value="Register" />
        </StyledForm>
    )
}

export default Login
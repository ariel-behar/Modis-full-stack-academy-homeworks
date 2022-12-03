import { StyledForm } from "./styles/Form.styled"

function Register() {

    function onSubmitHandler(e: React.FormEvent<HTMLFormElement> ) {
        e.preventDefault()

    }

    return (
        <StyledForm onSubmit={onSubmitHandler}>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" name="firstName" id="firstName" />

            <label htmlFor="lastName">Last Name:</label>
            <input type="text" name="" id="lastName" />

            <label htmlFor="username">Username:</label>
            <input type="text" name="username" id="username" />

            <label htmlFor="password">Password:</label>
            <input type="text" name="password" id="password" />

            <label htmlFor="repeatPassword">Repeat Password</label>
            <input type="password" name="repeatPassword" id="repeatPassword" />

            <div>
                <label htmlFor="male">Male</label>
                <input type="radio" name="gender" id="male" value='male' />
                <label htmlFor="female">Female</label>
                <input type="radio" name="gender" id="female" value='female' />
            </div>

            <label htmlFor="userImg">User Image:</label>
            <input type="text" name="userImg" id="userImg" />

            <label htmlFor="description">Description:</label>
            <input type="text" name="description" id="description" />

            <input type="submit" value="Register" />
        </StyledForm>
    )
}

export default Register
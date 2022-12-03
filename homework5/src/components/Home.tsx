import { Link } from "react-router-dom"

function Home() {
    return (
        <div>
            <h1>Welcome to the User Index</h1>

            <p>You need to register/login to continue</p>

            <ul>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
            </ul>
        </div>
    )
}

export default Home
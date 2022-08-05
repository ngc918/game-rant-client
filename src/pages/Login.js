import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

const Login = () => {
	const [email, setEmail] = useState("");
	const [pwd, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState(undefined);

	const navigate = useNavigate();

	/*  UPDATE - get authenticateUser from the context */
	const { storeToken, authenticateUser } = useContext(AuthContext);

	const emailHandler = (e) => setEmail(e.target.value);
	const handlePwd = (e) => setPassword(e.target.value);

	const handleLoginSubmit = (e) => {
		e.preventDefault();
		const requestBody = { email, pwd };

		axios
			.post(`${API_URL}/auth/login`, requestBody)
			.then((response) => {
				console.log("JWT token", response.data.authToken);

				// Save the token in the localStorage.
				storeToken(response.data.authToken);

				// Verify the token by sending a request
				// to the server's JWT validation endpoint.
				authenticateUser(); // <== ADD
				navigate("/");
			})
			.catch((error) => {
				const errorDescription = error.response.data.message;
				setErrorMessage(errorDescription);
			});
	};

	return (
		<div className="LoginPage">
			<form onSubmit={handleLoginSubmit}>
				<h1>Login</h1>
				<label>Email:</label>
				<input
					type="email"
					name="email"
					value={email}
					onChange={emailHandler}
				/>

				<label>Password:</label>
				<input
					type="password"
					name="password"
					value={pwd}
					onChange={handlePwd}
				/>

				<button
					type="submit"
					className="btn btn-light"
					data-mdb-ripple-color="dark"
				>
					Login
				</button>
				{errorMessage && <p className="error-message">{errorMessage}</p>}
				<div className="d-flex">
					<p>Don't have an account yet?</p>
					<Link to={"/signup"}> Sign Up</Link>
				</div>
			</form>
		</div>
	);
};

export default Login;

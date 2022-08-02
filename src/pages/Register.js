import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const API_URL = "http://localhost:5005";

function Register(props) {
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [errMsg, setErrMsg] = useState("");

	const navigate = useNavigate();

	const emailHandler = (e) => setEmail(e.target.value);
	const pwdHandler = (e) => setPwd(e.target.value);

	const submitHandler = (e) => {
		e.preventDefault();
		const requestBody = { email, pwd };

		axios
			.post(`${API_URL}/auth/register`, requestBody)
			.then((response) => {
				console.log(response);
				navigate("/login");
			})
			.catch((err) => {
				const errorDescription = err.response.data.message;
				setErrMsg(errorDescription);
			});

		setEmail("");
		setPwd("");
	};

	return (
		<div className="SignupPage">
			<h1>Sign Up</h1>

			<form onSubmit={submitHandler}>
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
					onChange={pwdHandler}
				/>
				<button type="submit">Register</button>
			</form>

			{errMsg && <p className="error-msg">{errMsg}</p>}
			<p>Already have account?</p>
			<Link to={"/login"}>Login</Link>
		</div>
	);
}

export default Register;

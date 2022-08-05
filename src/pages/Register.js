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
		<div className="signupPage">
			<form onSubmit={submitHandler} className="">
				<h1>Register</h1>
				<label>Email: </label>
				<input
					type="email"
					name="email"
					value={email}
					onChange={emailHandler}
				/>

				<label>Password: </label>
				<input
					type="password"
					name="password"
					value={pwd}
					onChange={pwdHandler}
				/>

				<button
					type="submit"
					className="btn btn-light"
					data-mdb-ripple-color="dark"
				>
					Register
				</button>
				{errMsg && <p className="error-msg">{errMsg}</p>}
				<div className="d-flex">
					<p>Already have account?</p>
					<Link to={"/login"}>Login</Link>
				</div>
			</form>
		</div>
	);
}

export default Register;

// import { useRef, useState, useEffect } from "react";
// import {
// 	faCheck,
// 	faTimes,
// 	faInfoCircle,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from "axios";

// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const PWD_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const REGISTER_URL = "http://localhost:5005";

// const Register = () => {
// 	const userRef = useRef();
// 	const errRef = useRef();

// 	const [email, setEmail] = useState("");
// 	const [validName, setValidName] = useState(false);
// 	const [emailFocus, setEmailFocus] = useState(false);

// 	const [pwd, setPwd] = useState("");
// 	const [validPwd, setValidPwd] = useState(false);
// 	const [pwdFocus, setPwdFocus] = useState(false);

// 	const [matchPwd, setMatchPwd] = useState("");
// 	const [validMatch, setValidMatch] = useState(false);
// 	const [matchFocus, setMatchFocus] = useState(false);

// 	const [errMsg, setErrMsg] = useState("");
// 	const [success, setSuccess] = useState(false);

// 	useEffect(() => {
// 		userRef.current.focus();
// 	}, []);

// 	useEffect(() => {
// 		setValidName(USER_REGEX.test(email));
// 	}, [email]);

// 	useEffect(() => {
// 		setValidPwd(PWD_REGEX.test(pwd));
// 		setValidMatch(pwd === matchPwd);
// 	}, [pwd, matchPwd]);

// 	useEffect(() => {
// 		setErrMsg("");
// 	}, [email, pwd, matchPwd]);

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		// if button enabled with JS hack
// 		const v1 = USER_REGEX.test(email);
// 		const v2 = PWD_REGEX.test(pwd);
// 		if (!v1 || !v2) {
// 			setErrMsg("Invalid Entry");
// 			return;
// 		}
// 		const requestBody = { email, pwd };
// 		try {
// 			const response = await axios({
// 				url: `${REGISTER_URL}/auth/signup`,
// 				method: "post",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify(requestBody),
// 			});
// 			console.log(response.data);
// 			console.log(response.accessToken);
// 			console.log(JSON.stringify(response));
// 			setSuccess(true);
// 			//clear state and controlled inputs
// 			//need value attrib on inputs for this
// 			setEmail("");
// 			setPwd("");
// 			setMatchPwd("");
// 		} catch (err) {
// 			if (!err?.response) {
// 				setErrMsg("No Server Response");
// 			} else if (err.response?.status === 409) {
// 				setErrMsg("Username Taken");
// 			} else {
// 				setErrMsg("Registration Failed");
// 			}
// 			errRef.current.focus();
// 		}
// 	};

// 	return (
// 		<>
// 			{success ? (
// 				<section>
// 					<h1>Success!</h1>
// 					<p>
// 						<a href="#">Sign In</a>
// 					</p>
// 				</section>
// 			) : (
// 				<section>
// 					<p
// 						ref={errRef}
// 						className={errMsg ? "errmsg" : "offscreen"}
// 						aria-live="assertive"
// 					>
// 						{errMsg}
// 					</p>
// 					<h1>Register</h1>
// 					<form onSubmit={handleSubmit}>
// 						<label htmlFor="username">
// 							Username:
// 							<FontAwesomeIcon
// 								icon={faCheck}
// 								className={validName ? "valid" : "hide"}
// 							/>
// 							<FontAwesomeIcon
// 								icon={faTimes}
// 								className={validName || !email ? "hide" : "invalid"}
// 							/>
// 						</label>
// 						<input
// 							type="text"
// 							id="username"
// 							ref={userRef}
// 							autoComplete="off"
// 							onChange={(e) => setEmail(e.target.value)}
// 							value={email}
// 							required
// 							aria-invalid={validName ? "false" : "true"}
// 							aria-describedby="uidnote"
// 							onFocus={() => setEmailFocus(true)}
// 							onBlur={() => setEmailFocus(false)}
// 						/>
// 						<p
// 							id="uidnote"
// 							className={
// 								emailFocus && email && !validName ? "instructions" : "offscreen"
// 							}
// 						>
// 							<FontAwesomeIcon icon={faInfoCircle} />
// 							4 to 24 characters.
// 							<br />
// 							Must begin with a letter.
// 							<br />
// 							Letters, numbers, underscores, hyphens allowed.
// 						</p>

// 						<label htmlFor="password">
// 							Password:
// 							<FontAwesomeIcon
// 								icon={faCheck}
// 								className={validPwd ? "valid" : "hide"}
// 							/>
// 							<FontAwesomeIcon
// 								icon={faTimes}
// 								className={validPwd || !pwd ? "hide" : "invalid"}
// 							/>
// 						</label>
// 						<input
// 							type="password"
// 							id="password"
// 							onChange={(e) => setPwd(e.target.value)}
// 							value={pwd}
// 							required
// 							aria-invalid={validPwd ? "false" : "true"}
// 							aria-describedby="pwdnote"
// 							onFocus={() => setPwdFocus(true)}
// 							onBlur={() => setPwdFocus(false)}
// 						/>
// 						<p
// 							id="pwdnote"
// 							className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
// 						>
// 							<FontAwesomeIcon icon={faInfoCircle} />
// 							8 to 24 characters.
// 							<br />
// 							Must include uppercase and lowercase letters, a number and a
// 							special character.
// 							<br />
// 							Allowed special characters:{" "}
// 							<span aria-label="exclamation mark">!</span>{" "}
// 							<span aria-label="at symbol">@</span>{" "}
// 							<span aria-label="hashtag">#</span>{" "}
// 							<span aria-label="dollar sign">$</span>{" "}
// 							<span aria-label="percent">%</span>
// 						</p>

// 						<label htmlFor="confirm_pwd">
// 							Confirm Password:
// 							<FontAwesomeIcon
// 								icon={faCheck}
// 								className={validMatch && matchPwd ? "valid" : "hide"}
// 							/>
// 							<FontAwesomeIcon
// 								icon={faTimes}
// 								className={validMatch || !matchPwd ? "hide" : "invalid"}
// 							/>
// 						</label>
// 						<input
// 							type="password"
// 							id="confirm_pwd"
// 							onChange={(e) => setMatchPwd(e.target.value)}
// 							value={matchPwd}
// 							required
// 							aria-invalid={validMatch ? "false" : "true"}
// 							aria-describedby="confirmnote"
// 							onFocus={() => setMatchFocus(true)}
// 							onBlur={() => setMatchFocus(false)}
// 						/>
// 						<p
// 							id="confirmnote"
// 							className={
// 								matchFocus && !validMatch ? "instructions" : "offscreen"
// 							}
// 						>
// 							<FontAwesomeIcon icon={faInfoCircle} />
// 							Must match the first password input field.
// 						</p>

// 						<button
// 							disabled={!validName || !validPwd || !validMatch ? true : false}
// 						>
// 							Sign Up
// 						</button>
// 					</form>
// 					<p>
// 						Already registered?
// 						<br />
// 						<span className="line">
// 							{/*put router link here*/}
// 							<a href="#">Sign In</a>
// 						</span>
// 					</p>
// 				</section>
// 			)}
// 		</>
// 	);
// };
import { useState } from "react";
import axios from "axios";
const API_URL = "localhost:3000";

const Register = () => {
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [errMsg, setErrMsg] = useState("");

	const emailHandler = (e) => setEmail(e.target.value);
	const pwdHandler = (e) => setPwd(e.target.value);

	const submitHandler = (e) => {
		e.preventDefault();
	};

	const requestBody = { email, pwd };
	// 		try {
	// 			const response = await axios({
	// 				url: `${REGISTER_URL}/auth/signup`,
	// 				method: "post",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 				body: JSON.stringify(requestBody),
	// 			});

	axios
		.post(`${API_URL}/auth/signup`, requestBody)
		.then((response) => {
			console.log(response);
		})
		.catch((err) => {
			const refErr = err.response.data.message;
			setErrMsg(refErr);
			console.group(err);
		});

	setEmail("");
	setPwd("");

	return (
		<div className="credentials">
			<h1>Register</h1>
			<form onSubmit={submitHandler}>
				<label htmlFor="email">Email</label>
				<input type="text" name="email" value={email} onChange={emailHandler} />
				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					value={pwd}
					onChange={pwdHandler}
				/>
				<button type="submit">Register</button>
			</form>

			{errMsg && <p className="error-msg">{errMsg}</p>}
		</div>
	);
};

export default Register;

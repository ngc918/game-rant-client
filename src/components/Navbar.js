import { Link } from "react-router-dom";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "../context/auth.context"; // <== IMPORT
import SearchBar from "./SearchBar";

function Navbar() {
	// Subscribe to the AuthContext to gain access to
	// the values from AuthContext.Provider `value` prop
	const { isLoggedIn, User, logOutUser } = useContext(AuthContext); // <== ADD

	//  Update the rendering logic to display different content
	//  depending on the user being logged in or not
	return (
		<nav className="navbar bg-dark text-white mb-auto justify-content-around">
			<Link to="/" className="navbar-brand text-white">
				Game Rant
			</Link>
			{/* <form class="input-group w-auto">
				<input
					type="search"
					class="form-control rounded flex-grow-1"
					placeholder="Search"
					aria-label="Search"
					aria-describedby="search-addon"
				/>
				<span class="input-group-text border-0" id="search-addon">
					<i class="fas fa-search"></i>
				</span>
			</form> */}
			<SearchBar />
			<div>
				{isLoggedIn && (
					<>
						<button onClick={logOutUser} className="btn-primary">
							Logout
						</button>
						<span>{User && User.name}</span>
					</>
				)}

				{!isLoggedIn && (
					<>
						<Link to="/signup">
							{" "}
							<button>Sign Up</button>{" "}
						</Link>
						<Link to="/login">
							{" "}
							<button className="">Login</button>{" "}
						</Link>
					</>
				)}
			</div>
		</nav>
	);
}

export default Navbar;

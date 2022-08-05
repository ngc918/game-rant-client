import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react"; // <== IMPORT
import { AuthContext } from "../context/auth.context"; // <== IMPORT
import SearchBar from "./SearchBar";
import axios from "axios";

function Navbar() {
	// Subscribe to the AuthContext to gain access to
	// the values from AuthContext.Provider `value` prop
	const { isLoggedIn, User, logOutUser } = useContext(AuthContext); // <== ADD
	// const [gameList, setGameList] = useState([]);
	// const API_URL = `https://api.rawg.io/api/games?key=ecb4bb7bdcf2401f9dd28e3f806807a0`;
	// useEffect(() => {
	// 	axios
	// 		.get(API_URL)
	// 		.then((gameData) => {
	// 			setGameList(gameData.data);
	// 		})
	// 		.catch((err) => console.log(err));
	// }, []);
	// console.log(gameList);
	// const [gameListCopy, setGameListCopy] = useState(gameList);
	// const [filteredList, setFilteredList] = useState(gameList);
	// const searchQuery = (productToSearch) => {
	// 	const newList = gameListCopy.filter((game) => {
	// 		return game.name.toLowerCase().includes(productToSearch.toLowerCase());
	// 	});
	// 	setFilteredList(newList);
	// };
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
			<Link to="/search" className="navbar-brand text-white">
				Search
			</Link>
			<div>
				{isLoggedIn && (
					<>
						<Link to="/profile">
							<button className="btn btn-light" data-mdb-ripple-color="dark">
								Profile
							</button>
						</Link>
						<button
							onClick={logOutUser}
							className="btn btn-light"
							data-mdb-ripple-color="dark"
						>
							Logout
						</button>
						<span>{User && User.name}</span>
					</>
				)}

				{!isLoggedIn && (
					<>
						<Link to="/signup">
							{" "}
							<button className="btn btn-light">Sign Up</button>{" "}
						</Link>
						<Link to="/login">
							{" "}
							<button className="btn btn-light">Login</button>{" "}
						</Link>
					</>
				)}
			</div>
		</nav>
	);
}

export default Navbar;

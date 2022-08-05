import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { GameDetails } from "../pages/Details";
import { Home } from "../pages/Homepage";

function Profile(props) {
	const { isLoggedIn, user } = useContext(AuthContext);
	// const { game, setGames } = useContext([]);
	// console.log(setGame);
	console.log(user);
	return (
		<>
			{isLoggedIn && (
				<>
					<div>
						<h1 className="text-white">
							Hey there, welcome to your profile {user.email}!
						</h1>
					</div>
					<div className="commentCard">
						{/* <h2>{gameInfo.name}</h2> */}
						<h2>{user.email}</h2>
						<div>
							<p>Wow this game was amazing!</p>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default Profile;

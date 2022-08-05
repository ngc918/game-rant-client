import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function SearchPage() {
	const [games, setGames] = useState();
	const [search, setSearch] = useState("");

	const searchForGames = () => {
		axios
			.get(
				`https://api.rawg.io/api/games?key=ecb4bb7bdcf2401f9dd28e3f806807a0&search=${search}`
			)
			.then((response) => {
				console.log(response);
				setGames(response);
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<div>
				<input
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search"
					className="search-bar"
				></input>
				<button onClick={searchForGames}>Search</button>
			</div>
			<div className="container">
				{games &&
					games.data.results.map((gameInfo) => {
						return (
							<Link to={`/games/${gameInfo.id}`}>
								<div className="text-bg-secondary p-3 rounded">
									<div
										style={{
											width: "300px",
											height: "230px",
											padding: "5px",
											backgroundImage: `url(${gameInfo.background_image})`,
											backgroundSize: "cover",
											backgroundPosition: "center",
											borderRadius: "1rem",
										}}
									></div>
									<div className="game-name-results">{gameInfo.name}</div>
								</div>
							</Link>
						);
					})}
			</div>
		</>
	);
}

export default SearchPage;

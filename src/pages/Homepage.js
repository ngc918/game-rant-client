import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
	const [games, setGames] = useState();
	const [page, setPage] = useState(1);

	useEffect(() => {
		axios
			.get(
				`https://api.rawg.io/api/games?key=ecb4bb7bdcf2401f9dd28e3f806807a0&page=${page}`
			)
			.then((response) => {
				console.log(response);
				const images = response.data.results.map((backgroundImage) => {
					return backgroundImage.background_image;
				});
				setGames(response);
				console.log(images[0]);
			})
			.catch((err) => console.log(err));
	}, [page]);
	console.log(games);
	return (
		<>
			<div className="container">
				{games &&
					games.data.results.map((gameInfo) => {
						return (
							<Link to={`/games/${gameInfo.id}`}>
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
								>
									<div className="game-name">{gameInfo.name}</div>
								</div>
							</Link>
						);
					})}
			</div>
			<div className="page-button">
				<button
					onClick={() => {
						if (page <= 1) {
							setPage(1);
						} else {
							setPage(page - 1);
						}
					}}
				>
					Previous
				</button>
				<span>{page}</span>
				<button
					onClick={() => {
						setPage(page + 1);
					}}
				>
					Next
				</button>
			</div>
		</>
	);
}

export default Home;

import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../components/Comment";

function GameDetails(props) {
	const [gameInfo, setGameInfo] = useState([]);
	const { gameId } = useParams();
	console.log(gameId);
	useEffect(() => {
		if (gameId) {
			axios
				.get(
					`https://api.rawg.io/api/games/${gameId}?key=ecb4bb7bdcf2401f9dd28e3f806807a0`
				)
				// .get(
				// 	`https://api.rawg.io/api/games/${gameId}/screenshots?key=ecb4bb7bdcf2401f9dd28e3f806807a0`
				// )
				.then((response) => {
					console.log(response.data);
					setGameInfo(response.data);
				})
				.catch((err) => console.log(err));
		}
	}, [gameId]);
	// useEffect(() => {
	// 	const game = gameInfo.find((gameObject) => {
	// 		console.log(gameObject);
	// 		return gameObject.id === gameId;
	// 	});
	// 	console.log(game);
	// 	if (game) {
	// 		setGameFound(game);
	// 	}
	// 	console.log(gameFound);
	// }, [gameId, gameInfo]);
	return (
		<div style={{ color: "white", fontSize: "36px" }} className="details-page">
			<div className="details-title">
				<h1>{gameInfo.name}</h1>
			</div>
			<div className="d-flex justify-content-around">
				<p>
					Rating: {gameInfo.rating}/{gameInfo.rating_top}
				</p>
				<p>Release Date: {gameInfo.released}</p>
			</div>
			<div className="details-img">
				<img src={gameInfo.background_image} className="game_image" alt="" />
			</div>
			<p>About:</p>
			<div className="description">{gameInfo.description_raw}</div>
			{<CommentSection />}
		</div>
	);
}
export default GameDetails;

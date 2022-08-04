import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
		<div style={{ color: "white", fontSize: "36px" }}>
			<h1>{gameInfo.name}</h1>
			<img src={gameInfo.background_image} />
			{gameInfo.released}
			<span>{gameInfo.description}</span>
			{gameInfo.rating}/{gameInfo.rating_top}
		</div>
	);
}
export default GameDetails;

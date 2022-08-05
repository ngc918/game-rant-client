import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../components/Comment";
const API_URL = process.env.REACT_APP_API_URL;

function GameDetails(props) {
	const [gameInfo, setGameInfo] = useState([]);
	const { gameId } = useParams();
	console.log(gameId);
	const [comment, setComment] = useState("");
	const [commentArray, setCommentArray] = useState([]);

	const getGameComments = () => {
		axios
			.get(`${API_URL}/comments/game-comments/${gameId}`)
			.then((response) => {
				setCommentArray(response.data.commentsArray);
			})
			.catch((err) => console.log(err));
	};

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
	useEffect(() => {
		axios
			.get(`${API_URL}/comments/game-comments/${gameId}`)
			.then((response) => {
				setCommentArray(response.data.commentsArray);
			})
			.catch((err) => console.log(err));
	}, [gameId]);
	const handleCommentSubmit = (e) => {
		const storedToken = localStorage.getItem("authToken");
		e.preventDefault();
		axios
			.post(
				`${API_URL}/comments/new-comment/${gameId}`,
				{ content: comment },
				{
					headers: {
						Authorization: `Bearer ${storedToken}`,
					},
				}
			)
			.then((response) => {
				getGameComments();
			});
	};
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
			{
				<CommentSection
					commentArray={commentArray}
					comment={comment}
					setComment={setComment}
					handleCommentSubmit={handleCommentSubmit}
				/>
			}
		</div>
	);
}
export default GameDetails;

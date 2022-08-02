import axios from "axios";
import { popularGamesURL, newGamesURL, upcomingGamesURL } from "../common/api";

export const loadGames = () => async (dispatch) => {
	const popularGamesData = await axios.get(popularGamesURL());
	const newGamesData = await axios.get(newGamesURL());
	const upcomingGamesData = await axios.get(upcomingGamesURL());

	dispatch({
		type: "FETCH_GAMES",
		payload: {
			popular: popularGamesData.data.results,
			newGames: newGamesData.data.results,
			upcoming: upcomingGamesData.data.results,
		},
	});
};

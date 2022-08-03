//Base URL for game database
const baseURL = "https://api.rawg.io/api/";
const apiKey = `?key=${process.env.access_token}`;

//month
const getCurrentMonth = () => {
	const month = new Date().getMonth() + 1;
	if (month < 10) {
		return `0${month}`;
	} else {
		return month;
	}
};

//day
const getCurrentDay = () => {
	const day = new Date().getDay() + 1;
	if (day < 10) {
		return `0${day}`;
	} else {
		return day;
	}
};

//Full date
const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();
const currentDate = `${currentMonth}-${currentDay}-${currentYear}`;
const lastYear = `${currentMonth}-${currentDay}-${currentYear - 1}`;
const nextYear = `${currentMonth}-${currentDay}-${currentYear + 1}`;

const popularGames = `games${apiKey}&dates=${lastYear},${currentDate}&ordering=-rating&page_size=10`;
const newGames = `games${apiKey}&dates=${lastYear},${currentDate}&ordering=-rating&page_size=10`;
const upcomingGames = `games${apiKey}&dates=${lastYear},${currentDate}&ordering=-rating&page_size=10`;

export const popularGamesURL = () => {
	return `${baseURL}${popularGames}`;
};

export const newGamesURL = () => {
	return `${baseURL}${newGames}`;
};

export const upcomingGamesURL = () => {
	return `${baseURL}${upcomingGames}`;
};

export const gameInfo = (game_id) => `${baseURL}games/${game_id}${apiKey}`;

export const gameImages = (game_id) => `${baseURL}games/${game_id}${apiKey}`;

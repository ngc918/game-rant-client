import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import GameDetails from "./pages/Details";
import SearchPage from "./pages/SearchPage";
import Profile from "./pages/Profile";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/games/:gameId" element={<GameDetails />} />
				<Route path="/signup" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/search" element={<SearchPage />} />
			</Routes>
		</div>
	);
}

export default App;

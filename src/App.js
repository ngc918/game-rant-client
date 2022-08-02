import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { GameContext } from "./context/GameCard.context";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route path="/" element={<GameContext />} />

				{/*    ADD    */}
				<Route path="/signup" element={<Register />} />
			</Routes>
		</div>
	);
}

export default App;

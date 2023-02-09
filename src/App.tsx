import "./styles/main.css";
import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CreateAdBanner } from "./components/CreateAdBanner";
import logoImg from "./assets/logo.svg";
import { GameBanner } from "./components/GameBanner";
import CreateAdModal from "./components/CreateAdModal";
import axios from "axios";

interface Game {
	id: string;
	title: string;
	bannerUrl: string;
	_count: {
		ads: number;
	};
}

function App() {
	const [games, setGames] = useState<Game[]>([]);

	useEffect(() => {
		axios("http://localhost:3333/games").then((response) => {
			setGames(response.data);
		});
	}, []);

	return (
		<>
			<h1 className="text-center font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-sky-400">
				Feito por{" "}
				<a
					href="https://github.com/guilhermefigueira"
					target="_blank"
					className="underline font-bold"
				>
					Guilherme Figueira
				</a>
			</h1>
			<div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
				<img src={logoImg} alt="" />
				<h1 className="text-6xl text-white font-black mt-20 text">
					Seu{" "}
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#46baba] to-[#f4cf3a]">
						duo
					</span>{" "}
					está aqui
				</h1>
				<div className="grid grid-cols-6 gap-6 mt-16 ">
					{games.map((games) => {
						return (
							<GameBanner
								key={games.id}
								title={games.title}
								imgName={games.bannerUrl}
								adsCount={games._count.ads}
							/>
						);
					})}
				</div>
				<Dialog.Root>
					<CreateAdBanner />
					<CreateAdModal />
				</Dialog.Root>
			</div>
		</>
	);
}

export default App;

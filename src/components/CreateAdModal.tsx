import * as Dialog from "@radix-ui/react-dialog";
import { CaretDown, CaretUp, Check, GameController } from "phosphor-react";
import { Input } from "./Form/Input";
import * as Checkbox from "@radix-ui/react-checkbox";
// import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import "./styles.css";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";

interface Game {
	id: string;
	title: string;
}

export default function CreateAdModal() {
	const [games, setGames] = useState<Game[]>([]);
	const [weekDays, setWeekDays] = useState<string[]>([]);
	const [useVoiceChat, setUseVoiceChat] = useState(false);

	useEffect(() => {
		axios("http://localhost:3333/games").then((response) => {
			setGames(response.data);
		});
	}, []);

	async function handleCreateAd(event: FormEvent) {
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);
		const data = Object.fromEntries(formData);

		if (!data.name) {
			return;
		}

		try {
			await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
				name: data.name,
				yearsplaying: Number(data.yearsPlaying),
				discord: data.discord,
				weekDays: weekDays.map(Number),
				hoursStart: data.hoursStart,
				hourEnd: data.hourEnd,
				useVoiceChannel: useVoiceChat,
			});

			alert("Anúncio criado com sucesso!");
		} catch (err) {
			console.log(err);
			alert("Erro ao criar anúncio!");
		}
	}

	return (
		<Dialog.Portal>
			<Dialog.Overlay className="bg-black/60 inset-0 fixed">
				<Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/40">
					<Dialog.Title className="text-3xl font-black">
						Publique um anúncio
					</Dialog.Title>
					<form
						onSubmit={handleCreateAd}
						className="mt-8 flex flex-col gap-4"
					>
						<div className="flex flex-col gap-2">
							<label className="font-semibold" htmlFor="game">
								Qual o game?
							</label>
							<select
								name="game"
								id="game"
								className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
								defaultValue=""
							>
								<option disabled value="">
									Selecione o game que deseja jogar
								</option>
								{games.map((game) => {
									return (
										<option key={game.id} value={game.id}>
											{game.title}
										</option>
									);
								})}
							</select>
							{/* <Input id="game" type="text" placeholder="Selecione o game que deseja jogar" />     */}
							{/*<Select.Root >
                                    <Select.Trigger className="bg-zinc-900 py-3 px-4 rounded text-sm flex justify-between text-zinc-500 ">
                                        <Select.Value placeholder="Selecione o game que deseja jogar" className="placeholder:text-zinc-500 " />
                                        <Select.Icon >
                                            <CaretDown className="" />
                                        </Select.Icon>
                                    </Select.Trigger>
                                    <Select.Portal className="">
                                        <Select.Content className="SelectContent">
                                            <Select.ScrollUpButton className="SelectScrollButton">
                                            <CaretUp/>
                                            </Select.ScrollUpButton>
                                            <Select.Viewport className="SelectViewport">
                                            <Select.Group>
                                                <Select.Item value="apple">Apple</Select.Item>
                                                <Select.Item value="banana">Banana</Select.Item>
                                                <Select.Item value="blueberry">Blueberry</Select.Item>
                                                <Select.Item value="grapes">Grapes</Select.Item>
                                                <Select.Item value="pineapple">Pineapple</Select.Item>
                                            </Select.Group>
                                            </Select.Viewport>
                                            <Select.ScrollDownButton className="SelectScrollButton">
                                                <ChevronDownIcon /> 
                                            </Select.ScrollDownButton>
                                        </Select.Content>
                                    </Select.Portal>
                                </Select.Root>*/}
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="name">Seu nome (ou nickname)</label>
							<Input
								name="name"
								id="name"
								type="text"
								placeholder="Como te chamam dentro do game "
							/>
						</div>

						<div className="grid grid-cols-2 gap-6">
							<div className="flex flex-col gap-2">
								<label htmlFor="yearsPlaying">
									Joga há quantos anos?
								</label>
								<Input
									name="yearsPlaying"
									id="yearsPlaying"
									type="number"
									placeholder="Tudo bem ser ZERO"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<label htmlFor="discord">
									Qual o seu Discord
								</label>
								<Input
									name="discord"
									id="discord"
									type="text"
									placeholder="Usuario#0000"
								/>
							</div>
						</div>
						<div className="flex gap-6">
							<div className="flex flex-col gap-2">
								<label htmlFor="weekDays">
									Quando costuma Jogar?
								</label>
								<ToggleGroup.Root
									type="multiple"
									className="grid grid-cols-4 gap-2"
									value={weekDays}
									onValueChange={setWeekDays}
								>
									<ToggleGroup.Item
										value="0"
										title=""
										className={`w-8 h-8 rounded  ${
											weekDays.includes("0")
												? "bg-violet-500"
												: "bg-zinc-900"
										}`}
									>
										D
									</ToggleGroup.Item>
									<ToggleGroup.Item
										value="1"
										title=""
										className={`w-8 h-8 rounded ${
											weekDays.includes("1")
												? "bg-violet-500"
												: "bg-zinc-900"
										}`}
									>
										S
									</ToggleGroup.Item>
									<ToggleGroup.Item
										value="2"
										title=""
										className={`w-8 h-8 rounded ${
											weekDays.includes("2")
												? "bg-violet-500"
												: "bg-zinc-900"
										}`}
									>
										T
									</ToggleGroup.Item>
									<ToggleGroup.Item
										value="3"
										title=""
										className={`w-8 h-8 rounded ${
											weekDays.includes("3")
												? "bg-violet-500"
												: "bg-zinc-900"
										}`}
									>
										Q
									</ToggleGroup.Item>
									<ToggleGroup.Item
										value="4"
										title=""
										className={`w-8 h-8 rounded ${
											weekDays.includes("4")
												? "bg-violet-500"
												: "bg-zinc-900"
										}`}
									>
										Q
									</ToggleGroup.Item>
									<ToggleGroup.Item
										value="5"
										title=""
										className={`w-8 h-8 rounded ${
											weekDays.includes("5")
												? "bg-violet-500"
												: "bg-zinc-900"
										}`}
									>
										S
									</ToggleGroup.Item>
									<ToggleGroup.Item
										value="6"
										title=""
										className={`w-8 h-8 rounded ${
											weekDays.includes("6")
												? "bg-violet-500"
												: "bg-zinc-900"
										}`}
									>
										S
									</ToggleGroup.Item>
								</ToggleGroup.Root>
							</div>
							<div className="flex flex-col gap-2 flex-1">
								<label htmlFor="hoursStart">
									Qual o horário do dia?
								</label>
								<div className="grid grid-cols-2 gap-2">
									<Input
										name="hoursStart"
										id="hoursStart"
										type="time"
										placeholder="De"
									/>
									<Input
										name="hourEnd"
										id="hourEnd"
										type="time"
										placeholder="Até"
									/>
								</div>
							</div>
						</div>
						<label className="mt-2 flex items-center gap-2 text-sm">
							<Checkbox.Root
								onCheckedChange={(checked) => {
									setUseVoiceChat;
									if (checked === true) {
										setUseVoiceChat(true);
									} else {
										setUseVoiceChat(false);
									}
								}}
								className="w-6 h-6 p-1  rounded bg-zinc-900"
							>
								<Checkbox.Indicator>
									<Check className="w-4 h-4 text-emerald-400 transition" />
								</Checkbox.Indicator>
							</Checkbox.Root>
							Costumo me conectar ao chat de voz
						</label>
						<footer className="mt-4 flex justify-end gap-4">
							<Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 transition">
								Cancelar
							</Dialog.Close>
							<button
								className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600 transition"
								type="submit"
							>
								<GameController size={24} />
								Encontrar duo
							</button>
						</footer>
					</form>
				</Dialog.Content>
			</Dialog.Overlay>
		</Dialog.Portal>
	);
}

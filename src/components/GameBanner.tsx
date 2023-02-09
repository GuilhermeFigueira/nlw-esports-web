interface GameProps {
	imgName: string;
	title: string;
	adsCount: number;
}
export function GameBanner(prop: GameProps) {
	return (
		<a href="" className="relative rounded-lg">
			<img src={prop.imgName} alt={prop.title} />
			<div className="w-full pt-16  pb-4 px-4 bg-gradient-to-b from-transparent to-black absolute bottom-0 left-0 right-0 ">
				<strong className="font-bold text-white block">
					{prop.title}
				</strong>
				<span className="text-zinc-300 text-sm block">
					{prop.adsCount} anuncio(s)
				</span>
			</div>
		</a>
	);
}

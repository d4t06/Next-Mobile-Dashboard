import type { ReactEventHandler } from "react";

import simonCat from "@/assets/simon_empty.png";

type Props = {
	src: string;
	className?: string;
};

export default function Image({ src, className = "" }: Props) {
	const onError: ReactEventHandler<HTMLImageElement> = (e) => {
		const ele = e.target as HTMLImageElement;

		if (ele) {
			ele.src = "/simon-empty.png";
		}
	};

	return <img src={src || simonCat} onError={onError} className={className} />;
}

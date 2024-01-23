import { useRef, useEffect, useCallback } from "react";

export default function useClickOutside<T extends HTMLElement>(callback: () => void, delay = 0) {
	const ref = useRef<T>(null);
	const handleClick = useCallback(
		(e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				callback();
			}
		},
		[ref.current, callback]
	);

	useEffect(() => {
		if (window && ref.current) {
			// don't attach the listener until after transition-in has completed
			setTimeout(() => {
				window.addEventListener("click", handleClick);
			}, delay);
		}
		return () => {
			if (window) window.removeEventListener("click", handleClick);
		};
	}, [ref.current]);

	return ref;
}

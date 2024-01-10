import { useRouter } from "next/navigation";
import { useMemo, useCallback } from "react";
import { toast } from "react-hot-toast";
import useLoginModal from "./useLoginModal";

interface IUseFavorite {
	listingId: string;
	currentUser?: UiUser | null;
}

export const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
	const base = process.env.NEXT_PUBLIC_BASE_URL;
	const router = useRouter();
	const loginModal = useLoginModal();

	const hasFavorited = useMemo(() => {
		const list = currentUser?.favoriteIds || [];
		return list.includes(listingId);
	}, [currentUser, listingId]);

	const toggleFavorited = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();

			if (!currentUser) return loginModal.onOpen();
			try {
				let request: () => Promise<Response>;
				if (hasFavorited) {
					request = () =>
						fetch(`${base}/api/favorites/${listingId}`, {
							method: "DELETE",
							headers: {
								"Content-Type": "application/json",
							},
							body: null,
						});
				} else {
					console.log("psot request to ", `${base}/api/favorites/${listingId}`)
					request = () =>
						fetch(`${base}/api/favorites/${listingId}`, {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: null,
						});
				}
				await request();
				toast.success("Success!");
				router.refresh();
			} catch (error) {
				toast.error("somthing went wrong");
			}
		},
		[currentUser, listingId, hasFavorited, loginModal, router, base]
	);
	return { hasFavorited, toggleFavorited };
};

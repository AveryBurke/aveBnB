import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo, useCallback } from "react";
import { toast } from "react-hot-toast";
import useLoginModal from "./useLoginModal";

interface IUseFavorite {
	listingId: string;
	currentUser?: UiUser | null;
}

export const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
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
				let request: () => Promise<Request>;
				if (hasFavorited) {
					request = () => axios.delete(`api/favorites/${listingId}`);
				} else {
					request = () => axios.post(`api/favorites/${listingId}`);
				}
				await request();
				toast.success("Success!");
				router.refresh();
			} catch (error) {
				toast.error("somthing went wrong");
			}
		},
		[currentUser, listingId, hasFavorited, loginModal, router]
	);
	return { hasFavorited, toggleFavorited };
};

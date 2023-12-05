/** note: look at replacing this zustand context/useReducer */
import { create } from "zustand";

interface RegistarModalStore {
	isOpen?: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const useRegistarModal = create<RegistarModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useRegistarModal
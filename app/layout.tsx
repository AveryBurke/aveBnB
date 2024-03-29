import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";
import RegistarModal from "./components/modals/RegistarModal";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";
import { getCurrentUser } from "./actions/getCurrentUser";
import ToastProvider from "./providers/ToastProivder";
import HydrationBoundary from "./components/HydrationBoundry";
// const inter = Inter({ subsets: ['latin'] })
const jbm = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
	title: "AveBnB",
	description: "and air b and b clone from this video: https://www.youtube.com/watch?v=c_-b_isI4vg&t=3s",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const currentUSer = await getCurrentUser();
	return (
		<html lang="en">
			<body className={jbm.className}>
				<HydrationBoundary>
					<ToastProvider />
					<SearchModal />
					<LoginModal />
					<RegistarModal />
					<RentModal />
					<Navbar user={currentUSer} />
				</HydrationBoundary>
				<div className="pb-20 pt-28">{children}</div>
			</body>
		</html>
	);
}

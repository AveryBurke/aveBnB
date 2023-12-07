import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";
import RegistarModal from "./components/modals/RegistarModal";
import LoginModal from "./components/modals/LoginModal";
import { getCurrentUser } from "./actions/getCurrentUser";
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
				<LoginModal />
				<RegistarModal />
				<Navbar user = {currentUSer}/>
				{children}
			</body>
		</html>
	);
}

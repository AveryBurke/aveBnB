import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";

// const inter = Inter({ subsets: ['latin'] })
const jbm = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
	title: "ave b and b",
	description: "and air b and b clone from this video: https://www.youtube.com/watch?v=c_-b_isI4vg&t=3s",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={jbm.className}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/lib/styles/globals.css";

const geistSans = localFont({
	src: "../assets/fonts/GeistVF.woff",
	variable: "--font-geist-sans",
});
const geistMono = localFont({
	src: "../assets/fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
});

export const metadata: Metadata = {
	title: "Easy Generator Auth App",
	description: "An interview assignment for Easy Generator",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
		</html>
	);
}

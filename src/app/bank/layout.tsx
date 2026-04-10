import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Bank",
	description:
		"Monitor your Supermarket Simulator financial progress and track budget spending across all store categories.",
	openGraph: {
		title: "Bank | Supermarket Simulator Buddy",
		description:
			"Monitor your Supermarket Simulator financial progress and track budget spending across all store categories.",
		url: "/bank",
	},
};

export default function BankLayout({ children }: { children: React.ReactNode }) {
	return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Market",
	description:
		"Browse and track products, tools, vehicles, furniture, and paint available for your Supermarket Simulator store.",
	openGraph: {
		title: "Market | Supermarket Simulator Buddy",
		description:
			"Browse and track products, tools, vehicles, furniture, and paint available for your Supermarket Simulator store.",
		url: "/market",
	},
};

export default function MarketLayout({ children }: { children: React.ReactNode }) {
	return children;
}

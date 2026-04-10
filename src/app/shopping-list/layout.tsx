import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Shopping List",
	description:
		"Create and manage custom shopping lists for your Supermarket Simulator store runs. Know exactly what to grab each visit.",
	openGraph: {
		title: "Shopping List | Supermarket Simulator Buddy",
		description:
			"Create and manage custom shopping lists for your Supermarket Simulator store runs. Know exactly what to grab each visit.",
		url: "/shopping-list",
	},
};

export default function ShoppingListLayout({ children }: { children: React.ReactNode }) {
	return children;
}

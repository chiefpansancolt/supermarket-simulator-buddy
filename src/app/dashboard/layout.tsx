import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dashboard",
	description:
		"View and manage your active Supermarket Simulator playthrough. Track store level, progress, and key stats at a glance.",
	openGraph: {
		title: "Dashboard | Supermarket Simulator Buddy",
		description:
			"View and manage your active Supermarket Simulator playthrough. Track store level, progress, and key stats at a glance.",
		url: "/dashboard",
	},
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return children;
}

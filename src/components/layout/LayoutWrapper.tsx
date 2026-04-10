"use client";

import { customTheme } from "@/app/theme";
import { AppFooter } from "@/components/layout/AppFooter";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { AppSidebar } from "@/components/layout/sidebar/AppSidebar";
import { ThemeProvider } from "flowbite-react";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const isHome = pathname === "/";

	return (
		<ThemeProvider theme={customTheme}>
			<div className="flex h-screen flex-col overflow-hidden">
				<AppNavbar />
				<div className="flex flex-1 overflow-hidden">
					<AppSidebar />
					<div className="flex flex-1 flex-col overflow-hidden">
						<main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
							{children}
							{!isHome && <AppFooter />}
						</main>
					</div>
				</div>
			</div>
			<ToastContainer
				closeButton={false}
				hideProgressBar
				newestOnTop
				draggable
				stacked
				className={"mt-14 lg:mt-0 lg:mr-24"}
				toastClassName={
					"shadow-md rounded-lg text-gray-500 bg-white dark:text-gray-400 dark:bg-gray-800 p-0"
				}
			/>
		</ThemeProvider>
	);
}

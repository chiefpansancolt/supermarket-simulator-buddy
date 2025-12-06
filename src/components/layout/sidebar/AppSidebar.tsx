"use client";

import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	HiChartPie,
	HiClipboardList,
	HiCog,
	HiCurrencyDollar,
	HiHome,
	HiOfficeBuilding,
	HiShoppingCart,
} from "react-icons/hi";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { useUI } from "@/lib/contexts/UIContext";
import { PlaythroughSwitcher } from "./PlaythroughSwitcher";
import { StoreLevel } from "./StoreLevel";

export function AppSidebar() {
	const pathname = usePathname();
	const { activePlaythrough } = usePlaythrough();
	const { sidebarOpen, setSidebarOpen } = useUI();

	return (
		<aside
			className={`fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-64 transform overflow-y-auto border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out md:static md:top-0 md:h-auto md:translate-x-0 dark:border-gray-700 dark:bg-gray-800 ${
				sidebarOpen ? "translate-x-0" : "-translate-x-full"
			}`}
		>
			<Sidebar aria-label="Sidebar navigation" className="h-full border-none">
				<div className="flex h-full flex-col">
					<PlaythroughSwitcher />

					<StoreLevel />

					<div className="mt-2 flex-1 overflow-y-auto">
						<SidebarItems>
							<SidebarItemGroup>
								<SidebarItem
									as={Link}
									href="/"
									icon={HiHome}
									active={pathname === "/"}
								>
									Home
								</SidebarItem>

								{activePlaythrough && (
									<>
										<SidebarItem
											as={Link}
											href="/dashboard"
											icon={HiChartPie}
											active={pathname === "/dashboard"}
										>
											Dashboard
										</SidebarItem>
										<SidebarItem
											as={Link}
											href="/market"
											icon={HiShoppingCart}
											active={pathname === "/market"}
										>
											Market
										</SidebarItem>
										<SidebarItem
											as={Link}
											href="/management"
											icon={HiOfficeBuilding}
											active={pathname === "/management"}
										>
											Management
										</SidebarItem>
										<SidebarItem
											as={Link}
											href="/bank"
											icon={HiCurrencyDollar}
											active={pathname === "/bank"}
										>
											Bank
										</SidebarItem>
										<SidebarItem
											as={Link}
											href="/shopping-list"
											icon={HiClipboardList}
											active={pathname === "/shopping-list"}
										>
											Shopping List
										</SidebarItem>
									</>
								)}
							</SidebarItemGroup>
						</SidebarItems>
					</div>

					<div>
						<ul>
							<li>
								<a
									href="/settings"
									className={`flex cursor-pointer items-center justify-center rounded-lg p-2 text-sm font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${pathname === "/settings" ? "bg-gray-100 dark:bg-gray-700" : ""}`}
								>
									<HiCog className="h-6 w-6 shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
									<span className="flex-1 px-3 whitespace-nowrap">Settings</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</Sidebar>
		</aside>
	);
}

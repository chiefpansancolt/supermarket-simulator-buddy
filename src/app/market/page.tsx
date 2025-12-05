"use client";

import { redirect } from "next/navigation";
import { Tabs, TabItem } from "flowbite-react";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { ProductsTab } from "./ProductsTab";
import { FurnitureTab } from "./FurnitureTab";
import { PaintTab } from "./PaintTab";
import { ToolsTab } from "./ToolsTab";
import { VehiclesTab } from "./VehiclesTab";

export default function MarketPage() {
	const { activePlaythrough, updatePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		redirect("/");
	}

	const handleUnlockTool = (toolName: string) => {
		const unlockedTools = activePlaythrough.unlockedTools || [];
		if (!unlockedTools.includes(toolName)) {
			updatePlaythrough(activePlaythrough.id, {
				unlockedTools: [...unlockedTools, toolName],
			});
		}
	};

	const handleUnlockVehicle = (vehicleName: string) => {
		const unlockedVehicles = activePlaythrough.unlockedVehicles || [];
		if (!unlockedVehicles.includes(vehicleName)) {
			updatePlaythrough(activePlaythrough.id, {
				unlockedVehicles: [...unlockedVehicles, vehicleName],
			});
		}
	};

	return (
		<div className="p-6">
			<h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
				Market
			</h1>

			<Tabs aria-label="Market tabs" variant="underline">
				<TabItem active title="Products">
					<ProductsTab activePlaythrough={activePlaythrough} />
				</TabItem>
				<TabItem title="Furniture">
					<FurnitureTab />
				</TabItem>
				<TabItem title="Paint">
					<PaintTab />
				</TabItem>
				<TabItem title="Tools">
					<ToolsTab
						activePlaythrough={activePlaythrough}
						onUnlockTool={handleUnlockTool}
					/>
				</TabItem>
				<TabItem title="Vehicles">
					<VehiclesTab
						activePlaythrough={activePlaythrough}
						onUnlockVehicle={handleUnlockVehicle}
					/>
				</TabItem>
			</Tabs>
		</div>
	);
}

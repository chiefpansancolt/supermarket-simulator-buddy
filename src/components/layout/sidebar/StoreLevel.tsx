"use client";

import { Button } from "flowbite-react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";

export function StoreLevel() {
	const { activePlaythrough, updatePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return null;
	}

	const currentLevel = activePlaythrough.storeLevel ?? 0;

	const handleIncrement = () => {
		updatePlaythrough(activePlaythrough.id, {
			storeLevel: currentLevel + 1,
		});
	};

	const handleDecrement = () => {
		if (currentLevel > 0) {
			updatePlaythrough(activePlaythrough.id, {
				storeLevel: currentLevel - 1,
			});
		}
	};

	return (
		<div className="border-t border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
			<div className="flex items-center justify-between">
				<div className="flex flex-col">
					<span className="text-xs font-medium text-gray-500 dark:text-gray-400">
						Store Level
					</span>
					<span className="text-2xl font-bold text-gray-900 dark:text-white">
						{currentLevel}
					</span>
				</div>
				<div className="flex gap-2">
					<Button
						size="sm"
						color="gray"
						onClick={handleDecrement}
						disabled={currentLevel === 0}
						className="h-8 w-8 p-0"
					>
						<HiMinus className="h-4 w-4" />
					</Button>
					<Button
						size="sm"
						color="gray"
						onClick={handleIncrement}
						className="h-8 w-8 p-0"
					>
						<HiPlus className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}

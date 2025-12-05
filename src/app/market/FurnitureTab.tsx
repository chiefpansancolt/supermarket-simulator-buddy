import { Card } from "flowbite-react";
import { market } from "@/data/supermarket-simulator/market";

export function FurnitureTab() {
	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
				All Furniture ({market.furnitures.length})
			</h2>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{market.furnitures.map((furniture, index) => (
					<Card key={index}>
						<div className="flex flex-col items-center">
							{furniture.imageUrl && (
								<img
									src={furniture.imageUrl}
									alt={furniture.name}
									className="mb-3 h-24 w-24 object-contain"
								/>
							)}
							<h3 className="text-center text-lg font-bold text-gray-900 dark:text-white">
								{furniture.name}
							</h3>
							<div className="mt-3 text-xl font-semibold text-blue-600 dark:text-blue-400">
								${furniture.unitPrice.toLocaleString()}
							</div>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}

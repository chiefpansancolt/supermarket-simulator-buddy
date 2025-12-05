import { Card } from "flowbite-react";
import { market } from "@/data/supermarket-simulator/market";

export function PaintTab() {
	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
				All Paint ({market.paints.length})
			</h2>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{market.paints.map((paint, index) => (
					<Card key={index}>
						<div className="flex flex-col items-center">
							{paint.imageUrl && (
								<img
									src={paint.imageUrl}
									alt={paint.name}
									className="mb-3 h-24 w-24 object-contain"
								/>
							)}
							<h3 className="text-center text-lg font-bold text-gray-900 dark:text-white">
								{paint.name}
							</h3>
							<div className="mt-3 text-xl font-semibold text-blue-600 dark:text-blue-400">
								${paint.unitPrice.toLocaleString()}
							</div>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}

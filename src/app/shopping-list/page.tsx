"use client";

import {
	Badge,
	Button,
	Card,
	Checkbox,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Select,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeadCell,
	TableRow,
	TextInput,
} from "flowbite-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { HiPlus, HiRefresh, HiSearch, HiTrash } from "react-icons/hi";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { market } from "@/data/supermarket-simulator/market";
import type { ShoppingListItem } from "@/types";

interface PendingItem {
	id: string;
	productName: string;
	company?: string;
	boxes: number;
	store: string;
}

export default function ShoppingListPage() {
	const { activePlaythrough, updatePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		redirect("/");
	}

	const shoppingList = activePlaythrough.shoppingList || [];
	const unlockedLicenses = activePlaythrough.unlockedLicenses || [];

	// Filter products to only show unlocked ones
	const availableProducts = market.products.filter((product) =>
		unlockedLicenses.includes(product.licenseId)
	);

	// Modal state
	const [showModal, setShowModal] = useState(false);
	const [pendingItems, setPendingItems] = useState<PendingItem[]>([]);
	const [searchTerm, setSearchTerm] = useState("");

	// Add item to pending list or increment if already exists
	const handleAddProduct = (product: typeof availableProducts[0]) => {
		const productKey = `${product.name}|${product.company || ""}`;

		// Check if product already in pending items
		const existingItem = pendingItems.find(
			(item) => `${item.productName}|${item.company || ""}` === productKey
		);

		if (existingItem) {
			// Increment boxes for existing item
			setPendingItems(
				pendingItems.map((item) =>
					item.id === existingItem.id ? { ...item, boxes: item.boxes + 1 } : item
				)
			);
		} else {
			// Add new item with 1 box
			const storeNumber = (shoppingList.length % 3) + 1;
			const store = product.bigBoxStore || `Store ${storeNumber}`;

			const newPendingItem: PendingItem = {
				id: crypto.randomUUID(),
				productName: product.name,
				company: product.company,
				boxes: 1,
				store,
			};

			setPendingItems([...pendingItems, newPendingItem]);
		}
	};

	// Remove item from pending list
	const handleRemoveFromPending = (itemId: string) => {
		setPendingItems(pendingItems.filter((item) => item.id !== itemId));
	};

	// Increment boxes for pending item
	const handleIncrementBoxes = (itemId: string) => {
		setPendingItems(
			pendingItems.map((item) =>
				item.id === itemId ? { ...item, boxes: item.boxes + 1 } : item
			)
		);
	};

	// Decrement boxes for pending item
	const handleDecrementBoxes = (itemId: string) => {
		setPendingItems(
			pendingItems.map((item) =>
				item.id === itemId
					? { ...item, boxes: Math.max(1, item.boxes - 1) }
					: item
			)
		);
	};

	// Submit all pending items to shopping list
	const handleSubmitItems = () => {
		const newItems: ShoppingListItem[] = pendingItems.map((item) => ({
			...item,
			purchased: false,
		}));

		updatePlaythrough(activePlaythrough.id, {
			shoppingList: [...shoppingList, ...newItems],
		});

		// Close modal and reset
		setPendingItems([]);
		setShowModal(false);
	};

	// Cancel and close modal
	const handleCancelModal = () => {
		setPendingItems([]);
		setSearchTerm("");
		setShowModal(false);
	};

	// Filter products by search term
	const filteredProducts = availableProducts.filter((product) => {
		const searchLower = searchTerm.toLowerCase();
		return (
			product.name.toLowerCase().includes(searchLower) ||
			product.company?.toLowerCase().includes(searchLower)
		);
	});

	// Toggle purchased status
	const handleTogglePurchased = (itemId: string) => {
		const updatedList = shoppingList.map((item) =>
			item.id === itemId ? { ...item, purchased: !item.purchased } : item
		);

		updatePlaythrough(activePlaythrough.id, {
			shoppingList: updatedList,
		});
	};

	// Remove item from list
	const handleRemoveItem = (itemId: string) => {
		const updatedList = shoppingList.filter((item) => item.id !== itemId);

		updatePlaythrough(activePlaythrough.id, {
			shoppingList: updatedList,
		});
	};

	// Reset shopping list
	const handleReset = () => {
		updatePlaythrough(activePlaythrough.id, {
			shoppingList: [],
		});
	};

	// Group items by store
	const itemsByStore = shoppingList.reduce(
		(acc, item) => {
			if (!acc[item.store]) {
				acc[item.store] = [];
			}
			acc[item.store].push(item);
			return acc;
		},
		{} as Record<string, ShoppingListItem[]>
	);

	const totalItems = shoppingList.length;
	const purchasedItems = shoppingList.filter((item) => item.purchased).length;
	const totalBoxes = shoppingList.reduce((sum, item) => sum + item.boxes, 0);

	return (
		<main className="min-h-screen bg-gray-50 p-8 dark:bg-gray-900">
			<div className="mx-auto max-w-7xl">
				<div className="mb-8 flex items-start justify-between">
					<div>
						<h1 className="text-4xl font-bold text-gray-900 dark:text-white">
							Shopping List
						</h1>
						<p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
							Plan your product purchases for {activePlaythrough.name}
						</p>
					</div>
					<Button color="blue" onClick={() => setShowModal(true)}>
						<HiPlus className="mr-2 h-5 w-5" />
						Add Products
					</Button>
				</div>

				{/* Add Products Modal */}
				<Modal show={showModal} onClose={handleCancelModal} size="6xl">
					<ModalHeader>Add Products to Shopping List</ModalHeader>
					<ModalBody>
						<div className="space-y-4">
							{/* Search Section */}
							<div>
								<div className="mb-2 block">
									<Label htmlFor="search">Search Products</Label>
								</div>
								<TextInput
									id="search"
									type="text"
									icon={HiSearch}
									placeholder="Search by name or company..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							</div>

							{/* Product Cards Grid */}
							<div>
								<h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
									Click a Product to Add
								</h3>
								<div className="max-h-96 overflow-y-auto rounded-lg border border-gray-200 p-4 dark:border-gray-700">
									{filteredProducts.length === 0 ? (
										<p className="text-center text-gray-600 dark:text-gray-400">
											No products found matching "{searchTerm}"
										</p>
									) : (
										<div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
											{filteredProducts.map((product, index) => {
												const productKey = `${product.name}|${product.company || ""}`;
												const pendingItem = pendingItems.find(
													(item) =>
														`${item.productName}|${item.company || ""}` ===
														productKey
												);
												const boxCount = pendingItem?.boxes || 0;

												return (
													<button
														key={index}
														type="button"
														onClick={() => handleAddProduct(product)}
														className="relative rounded-lg border-2 border-gray-200 bg-white p-3 text-left transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600"
													>
														{boxCount > 0 && (
															<Badge
																color="success"
																className="absolute right-2 top-2"
															>
																{boxCount}
															</Badge>
														)}
														{product.imageUrl && (
															<img
																src={product.imageUrl}
																alt={product.name}
																className="mb-2 h-16 w-full object-contain"
															/>
														)}
														<div className="text-sm font-medium text-gray-900 dark:text-white">
															{product.name}
														</div>
														{product.company && (
															<div className="text-xs text-gray-600 dark:text-gray-400">
																{product.company}
															</div>
														)}
													</button>
												);
											})}
										</div>
									)}
								</div>
							</div>

							{/* Pending Items List */}
							{pendingItems.length > 0 && (
								<div>
									<h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
										Items to Add ({pendingItems.length})
									</h3>
									<div className="overflow-x-auto">
										<Table>
											<TableHead>
												<TableRow>
													<TableHeadCell>Product</TableHeadCell>
													<TableHeadCell>Boxes</TableHeadCell>
													<TableHeadCell>Store</TableHeadCell>
													<TableHeadCell>
														<span className="sr-only">Actions</span>
													</TableHeadCell>
												</TableRow>
											</TableHead>
											<TableBody className="divide-y">
												{pendingItems.map((item) => (
													<TableRow key={item.id}>
														<TableCell>
															<div>
																<div className="font-medium text-gray-900 dark:text-white">
																	{item.productName}
																</div>
																{item.company && (
																	<div className="text-sm text-gray-600 dark:text-gray-400">
																		{item.company}
																	</div>
																)}
															</div>
														</TableCell>
														<TableCell>
															<div className="flex items-center gap-2">
																<Button
																	color="light"
																	size="xs"
																	onClick={() =>
																		handleDecrementBoxes(item.id)
																	}
																	disabled={item.boxes <= 1}
																>
																	-
																</Button>
																<span className="w-8 text-center font-medium">
																	{item.boxes}
																</span>
																<Button
																	color="light"
																	size="xs"
																	onClick={() =>
																		handleIncrementBoxes(item.id)
																	}
																>
																	+
																</Button>
															</div>
														</TableCell>
														<TableCell>{item.store}</TableCell>
														<TableCell>
															<Button
																color="light"
																size="sm"
																onClick={() =>
																	handleRemoveFromPending(
																		item.id
																	)
																}
															>
																<HiTrash className="h-4 w-4" />
															</Button>
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</div>
								</div>
							)}

							{pendingItems.length === 0 && (
								<p className="text-center text-gray-600 dark:text-gray-400">
									No items added yet. Select a product and click the + button to
									add items.
								</p>
							)}
						</div>
					</ModalBody>
					<ModalFooter>
						<Button color="gray" onClick={handleCancelModal}>
							Cancel
						</Button>
						<Button
							color="blue"
							onClick={handleSubmitItems}
							disabled={pendingItems.length === 0}
						>
							Add {pendingItems.length} Item{pendingItems.length !== 1 ? "s" : ""}{" "}
							to List
						</Button>
					</ModalFooter>
				</Modal>

				{/* Summary Stats */}
				{shoppingList.length > 0 && (
					<Card className="mb-6">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-xl font-bold text-gray-900 dark:text-white">
									Shopping Summary
								</h3>
								<div className="mt-2 flex gap-4">
									<Badge color="info" className="text-sm">
										{purchasedItems} / {totalItems} items purchased
									</Badge>
									<Badge color="purple" className="text-sm">
										{totalBoxes} total boxes
									</Badge>
								</div>
							</div>
							<Button color="red" onClick={handleReset}>
								<HiRefresh className="mr-2 h-5 w-5" />
								Reset List
							</Button>
						</div>
					</Card>
				)}

				{/* Shopping List by Store */}
				{shoppingList.length === 0 ? (
					<Card>
						<p className="text-center text-gray-600 dark:text-gray-400">
							No items in your shopping list. Add products above to get started.
						</p>
					</Card>
				) : (
					<div className="space-y-6">
						{Object.keys(itemsByStore)
							.sort()
							.map((store) => (
								<Card key={store}>
									<div className="mb-4 flex items-center justify-between">
										<h3 className="text-2xl font-bold text-gray-900 dark:text-white">
											{store}
										</h3>
										<Badge color="gray">
											{itemsByStore[store].length} items
										</Badge>
									</div>
									<div className="space-y-3">
										{itemsByStore[store].map((item) => (
											<div
												key={item.id}
												className={`flex items-center justify-between rounded-lg border p-4 ${
													item.purchased
														? "border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/20"
														: "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
												}`}
											>
												<div className="flex items-center gap-4">
													<Checkbox
														checked={item.purchased}
														onChange={() =>
															handleTogglePurchased(item.id)
														}
													/>
													<div>
														<p
															className={`font-medium ${
																item.purchased
																	? "text-gray-500 line-through dark:text-gray-400"
																	: "text-gray-900 dark:text-white"
															}`}
														>
															{item.productName}
															{item.company && ` - ${item.company}`}
														</p>
														<p className="text-sm text-gray-600 dark:text-gray-400">
															{item.boxes} box{item.boxes > 1 ? "es" : ""}
														</p>
													</div>
												</div>
												<Button
													color="light"
													size="sm"
													onClick={() => handleRemoveItem(item.id)}
												>
													<HiTrash className="h-4 w-4" />
												</Button>
											</div>
										))}
									</div>
								</Card>
							))}
					</div>
				)}
			</div>
		</main>
	);
}

"use client";

import { Button, Card } from "flowbite-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { DeleteConfirmModal } from "@/comps/modals/DeleteConfirmModal";
import { EditPlaythroughModal } from "@/comps/modals/EditPlaythroughModal";

export default function Dashboard() {
	const { activePlaythrough, updatePlaythrough, deletePlaythrough } = usePlaythrough();

	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	if (!activePlaythrough) {
		redirect("/");
	}

	const handleDelete = () => {
		deletePlaythrough(activePlaythrough.id);
		setIsDeleteModalOpen(false);
	};

	return (
		<main className="min-h-screen bg-gray-50 p-8 dark:bg-gray-900">
			<div className="mx-auto max-w-6xl">
				<div className="mb-8">
					<div className="flex items-start justify-between">
						<div>
							<h1 className="text-4xl font-bold text-gray-900 dark:text-white">
								{activePlaythrough.name}
							</h1>
							{activePlaythrough.description && (
								<p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
									{activePlaythrough.description}
								</p>
							)}
							<div className="mt-4 flex gap-4 text-sm text-gray-500 dark:text-gray-400">
								<span>
									Created:{" "}
									{new Date(activePlaythrough.createdAt).toLocaleDateString()}
								</span>
								<span>
									Last Modified:{" "}
									{new Date(activePlaythrough.lastModified).toLocaleDateString()}
								</span>
							</div>
						</div>
						<div className="flex gap-2">
							<Button color="light" onClick={() => setIsEditModalOpen(true)}>
								<HiPencil className="mr-2 size-5" />
								Edit
							</Button>
							<Button color="red" onClick={() => setIsDeleteModalOpen(true)}>
								<HiTrash className="mr-2 size-5" />
								Delete
							</Button>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<Card>
						<h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
							Progress Overview
						</h2>
						<p className="text-gray-600 dark:text-gray-400">
							Track your progress here. More features coming soon!
						</p>
					</Card>

					<Card>
						<h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
							Quick Stats
						</h2>
						<p className="text-gray-600 dark:text-gray-400">
							Statistics will be displayed here as you add tracking features.
						</p>
					</Card>
				</div>

				<Card className="mt-6">
					<h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
						Coming Soon
					</h2>
					<p className="text-gray-600 dark:text-gray-400">
						More tracking features will be added here to help you monitor your progress
						in Supermarket Simulator. Stay tuned!
					</p>
				</Card>
			</div>

			<EditPlaythroughModal
				isOpen={isEditModalOpen}
				onClose={() => {
					setIsEditModalOpen(false);
				}}
				currentPlaythrough={activePlaythrough}
			/>

			<DeleteConfirmModal
				isOpen={isDeleteModalOpen}
				onClose={() => {
					setIsDeleteModalOpen(false);
				}}
				onConfirm={handleDelete}
				title="Delete Playthrough"
				itemName={activePlaythrough.name}
			/>
		</main>
	);
}

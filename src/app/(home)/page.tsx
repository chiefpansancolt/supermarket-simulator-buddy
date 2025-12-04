"use client";

import { Button, Card } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { HiChartPie, HiPlus } from "react-icons/hi";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";

export default function Home() {
	const { playthroughs, activePlaythrough } = usePlaythrough();

	return (
		<main className="min-h-screen bg-gray-50 p-8 dark:bg-gray-900">
			<div className="mx-auto max-w-6xl">
				<div className="mb-8 flex items-center gap-4">
					<Image
						src="/logo.jpg"
						alt="Supermarket Simulator"
						width={64}
						height={64}
						className="rounded-xl"
					/>
					<div>
						<h1 className="text-4xl font-bold text-gray-900 dark:text-white">
							Supermarket Simulator Buddy
						</h1>
						<p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
							Track your progress across multiple playthroughs
						</p>
					</div>
				</div>

				<Card className="mb-8">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome!</h2>
					<p className="text-gray-600 dark:text-gray-400">
						Supermarket Simulator Buddy helps you organize and track your progress
						across multiple playthroughs of Supermarket Simulator. Create playthroughs,
						monitor your achievements, and manage your data all in one place.
					</p>
				</Card>

				<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					<Card>
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
									Total Playthroughs
								</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">
									{playthroughs.length}
								</p>
							</div>
							<HiChartPie className="size-12 text-blue-600 dark:text-blue-500" />
						</div>
					</Card>

					<Card>
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
									Active Playthrough
								</p>
								<p className="truncate text-lg font-bold text-gray-900 dark:text-white">
									{activePlaythrough?.name || "None"}
								</p>
							</div>
						</div>
					</Card>

					<Card>
						<div className="flex items-center justify-center">
							{activePlaythrough ? (
								<Button as={Link} href="/dashboard">
									<HiChartPie className="mr-2 size-5" />
									Go to Dashboard
								</Button>
							) : (
								<Button disabled>
									<HiChartPie className="mr-2 size-5" />
									Go to Dashboard
								</Button>
							)}
						</div>
					</Card>
				</div>

				<Card>
					<div className="mb-4 flex items-center justify-between">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
							Your Playthroughs
						</h2>
					</div>

					{playthroughs.length === 0 ? (
						<div className="py-12 text-center">
							<HiPlus className="mx-auto mb-4 size-16 text-gray-400 dark:text-gray-600" />
							<h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
								No playthroughs yet
							</h3>
							<p className="mb-4 text-gray-600 dark:text-gray-400">
								Get started by creating your first playthrough using the dropdown in
								the sidebar.
							</p>
						</div>
					) : (
						<div className="space-y-4">
							{playthroughs.map((playthrough) => (
								<div
									key={playthrough.id}
									className={`rounded-lg border p-4 transition-colors ${
										activePlaythrough?.id === playthrough.id
											? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950"
											: "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
									}`}
								>
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
												{playthrough.name}
												{activePlaythrough?.id === playthrough.id && (
													<span className="ml-2 rounded-full bg-blue-600 px-2 py-1 text-xs text-white dark:bg-blue-500">
														Active
													</span>
												)}
											</h3>
											{playthrough.description && (
												<p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
													{playthrough.description}
												</p>
											)}
											<div className="mt-2 flex gap-4 text-xs text-gray-500 dark:text-gray-400">
												<span>
													Created:{" "}
													{new Date(
														playthrough.createdAt
													).toLocaleDateString()}
												</span>
												<span>
													Last Modified:{" "}
													{new Date(
														playthrough.lastModified
													).toLocaleDateString()}
												</span>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</Card>

				{playthroughs.length === 0 && (
					<Card className="mt-8">
						<h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
							Getting Started
						</h2>
						<ol className="list-decimal space-y-2 pl-5 text-gray-600 dark:text-gray-400">
							<li>Create a new playthrough using the dropdown in the sidebar</li>
							<li>Navigate to the Dashboard to track your progress</li>
							<li>Use the Settings page to export or import your data</li>
						</ol>
					</Card>
				)}
			</div>
		</main>
	);
}

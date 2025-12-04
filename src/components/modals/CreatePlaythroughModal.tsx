import {
	Button,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Textarea,
	TextInput,
} from "flowbite-react";
import { useState } from "react";
import type { CreatePlaythroughModalProps } from "@/types";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";

export function CreatePlaythroughModal({ isOpen, onClose }: CreatePlaythroughModalProps) {
	const { addPlaythrough } = usePlaythrough();

	const [newPlaythroughName, setNewPlaythroughName] = useState("");
	const [newPlaythroughDescription, setNewPlaythroughDescription] = useState("");

	const handleCreatePlaythrough = () => {
		if (!newPlaythroughName.trim()) return;

		addPlaythrough({
			name: newPlaythroughName.trim(),
			description: newPlaythroughDescription.trim() || undefined,
		});

		handleClose();
	};

	const handleClose = () => {
		setNewPlaythroughName("");
		setNewPlaythroughDescription("");
		onClose();
	};

	return (
		<Modal show={isOpen} onClose={() => handleClose()}>
			<ModalHeader>Create New Playthrough</ModalHeader>
			<ModalBody>
				<div className="space-y-4">
					<div>
						<div className="mb-2 block">
							<Label htmlFor="playthrough-name">
								Playthrough Name{" "}
								<span className="text-red-600 dark:text-red-400">*</span>
							</Label>
						</div>
						<TextInput
							id="playthrough-name"
							placeholder="e.g., My First Store"
							value={newPlaythroughName}
							onChange={(e) => setNewPlaythroughName(e.target.value)}
							required
						/>
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="playthrough-description">Description</Label>
						</div>
						<Textarea
							id="playthrough-description"
							placeholder="Add a description for this playthrough..."
							value={newPlaythroughDescription}
							onChange={(e) => setNewPlaythroughDescription(e.target.value)}
							rows={3}
						/>
					</div>
				</div>
			</ModalBody>
			<ModalFooter>
				<Button onClick={handleCreatePlaythrough} disabled={!newPlaythroughName.trim()}>
					Create
				</Button>
				<Button color="gray" onClick={() => handleClose()}>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
}

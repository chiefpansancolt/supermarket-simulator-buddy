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
import type { EditPlaythroughModalProps } from "@/types";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";

export function EditPlaythroughModal({
	isOpen,
	currentPlaythrough,
	onClose,
}: EditPlaythroughModalProps) {
	const { updatePlaythrough } = usePlaythrough();

	const [playthroughName, setPlaythroughName] = useState(currentPlaythrough.name);
	const [playthroughDescription, setPlaythroughDescription] = useState(
		currentPlaythrough.description
	);

	const handleSaveEdit = () => {
		if (playthroughName && !playthroughName.trim()) return;

		updatePlaythrough(currentPlaythrough.id, {
			name: playthroughName.trim(),
			description: playthroughDescription?.trim() || undefined,
		});

		handleClose();
	};

	const handleClose = () => {
		setPlaythroughName("");
		setPlaythroughDescription("");
		onClose();
	};

	return (
		<Modal show={isOpen} onClose={() => handleClose()}>
			<ModalHeader>Edit Playthrough</ModalHeader>
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
							value={playthroughName}
							onChange={(e) => setPlaythroughName(e.target.value)}
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
							value={playthroughDescription}
							onChange={(e) => setPlaythroughDescription(e.target.value)}
							rows={3}
						/>
					</div>
				</div>
			</ModalBody>
			<ModalFooter>
				<Button onClick={handleSaveEdit} disabled={!playthroughName.trim()}>
					Save
				</Button>
				<Button color="gray" onClick={() => handleClose()}>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
}

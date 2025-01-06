import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
// import { deleteItem } from "../actions/deleteItem";

interface DeleteDialogProps {
	isOpen: boolean;
	onClose: () => void;
	itemId?: string;
	itemName?: string;
}

export function DeleteDialog({
	isOpen,
	onClose,
	itemId,
	itemName,
}: DeleteDialogProps) {
	const [isDeleting, setIsDeleting] = useState(false);
	const router = useRouter();

	const handleDelete = async () => {
		setIsDeleting(true);
		try {
			// await deleteItem(itemId);
			onClose();
			router.refresh();
		} catch (error) {
			console.error("Failed to delete item:", error);
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you sure you want to delete this item?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete the item
						"{itemName}" (ID: {itemId}).
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={onClose} disabled={isDeleting}>
						Cancel
					</Button>
					<Button
						variant="destructive"
						onClick={handleDelete}
						disabled={isDeleting}
					>
						{isDeleting ? "Deleting..." : "Delete"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

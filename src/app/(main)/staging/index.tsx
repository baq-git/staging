"use client";

import UpdateGoldenHourPopover from "@/components/button-update-form";
import DateRangePopover from "@/components/date-picker";
import { DeleteDialog } from "@/components/delete-dialog";
import { Button } from "@/components/ui/button";
import { PenLine, Trash2 } from "lucide-react";
import { useState } from "react";

const Staging = () => {
	const [isOpenPop, setIsOpenPop] = useState<boolean>(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
	const [openUpdatePop, setOpenUpdatePop] = useState<boolean>(false);

	return (
		<>
			<DateRangePopover
				trigger={
					<Button onClick={() => setIsOpenPop(true)}>open popover</Button>
				}
				isOpen={isOpenPop}
				onOpenChange={setIsOpenPop}
			/>
			<UpdateGoldenHourPopover
				open={openUpdatePop}
				setOpen={setOpenUpdatePop}
				trigger={
					<Button
						variant="outline"
						className="shadow-none border-none"
						size="icon"
					>
						<PenLine />
					</Button>
				}
			/>
			<Button
				variant="destructive"
				size="icon"
				onClick={() => setIsDeleteDialogOpen(true)}
				className="mt-2"
			>
				<Trash2 className="h-4 w-4" />
				<span className="sr-only">Delete {name}</span>
			</Button>
			<DeleteDialog
				isOpen={isDeleteDialogOpen}
				onClose={() => setIsDeleteDialogOpen(false)}
				// itemId={id}
				// itemName={name}
			/>
		</>
	);
};

export default Staging;

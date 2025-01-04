"use client";

import DateRangePopover from "@/components/date-picker";
import { DateTimePicker24hForm } from "@/components/date-picker-24h-form";
import DialogTest from "@/components/dialog-test";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Staging = () => {
	const [isOpenPop, setIsOpenPop] = useState<boolean>(false);
	// const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

	return (
		<>
			<DateRangePopover
				trigger={
					<Button onClick={() => setIsOpenPop(true)}>open popover</Button>
				}
				isOpen={isOpenPop}
				onOpenChange={setIsOpenPop}
			/>
			{/* <DateTimePicker24hForm /> */}
			{/* <div> */}
			{/* 	<Button onClick={() => setIsOpenDialog(true)}>open dialog</Button> */}
			{/* 	<DialogTest isOpen={isOpenDialog} onOpenChange={setIsOpenDialog} /> */}
			{/* </div> */}
		</>
	);
};

export default Staging;

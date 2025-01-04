import { CalendarIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { DateTimePicker24hForm } from "../date-picker-24h-form";

interface DateRangePopoverProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	trigger: React.ReactNode;
}

export default function DateRangePopover({
	isOpen,
	onOpenChange,
	trigger,
}: DateRangePopoverProps) {
	return (
		<Popover open={isOpen} onOpenChange={onOpenChange}>
			<PopoverTrigger asChild>{trigger}</PopoverTrigger>
			<PopoverContent className="w-80 p-0">
				<Card className="border-0 shadow-none">
					<CardHeader className="pb-3">
						<div className="flex items-center justify-between">
							<CardTitle className="text-lg font-medium">
								Thêm giờ vàng
							</CardTitle>
							<Button
								variant="ghost"
								size="icon"
								className="h-6 w-6 rounded-full"
								onClick={() => onOpenChange(false)}
							>
								<X className="h-4 w-4" />
							</Button>
						</div>
					</CardHeader>
					<CardContent className="space-y-4 pb-4">
						<DateTimePicker24hForm />
					</CardContent>
				</Card>
			</PopoverContent>
		</Popover>
	);
}

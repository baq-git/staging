import { X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";

interface UpdateGoldenHourPopover {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	trigger: React.ReactNode;
}

const FormSchema = z
	.object({
		startDate: z.date({
			required_error: "A start date and time is required.",
		}),
		endDate: z.date({
			required_error: "A end date and time is required.",
		}),
	})
	.refine((data) => data.endDate > data.startDate, {
		message: "End date cannot be earlier than start date.",
		path: ["endDate"],
	});

const UpdateGoldenHourPopover = ({
	open,
	setOpen,
	trigger,
}: UpdateGoldenHourPopover) => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		toast.success(
			`Selected start date and time: ${format(data.startDate, "PPPP HH:mm")} \n Selected end date and time: ${format(data.startDate, "PPPP HH:mm")}`,
		);
	}

	function handleStartDateSelect(startDate: Date | undefined) {
		if (startDate) {
			form.setValue("startDate", startDate);
		}
	}

	function handleEndDateSelect(endDate: Date | undefined) {
		if (endDate) {
			form.setValue("endDate", endDate);
		}
	}

	function handleStartDateTimeChange(type: "hour" | "minute", value: string) {
		const currentStartDate = form.getValues("startDate") || new Date();
		const newStartDate = new Date(currentStartDate);

		if (type === "hour") {
			const hour = parseInt(value, 10);
			newStartDate.setHours(hour);
		} else if (type === "minute") {
			newStartDate.setMinutes(parseInt(value, 10));
		}

		form.setValue("startDate", newStartDate);
	}

	function handleEndDateTimeChange(type: "hour" | "minute", value: string) {
		const currentEndDate = form.getValues("endDate") || new Date();
		const newEndDate = new Date(currentEndDate);

		if (type === "hour") {
			const hour = parseInt(value, 10);
			newEndDate.setHours(hour);
		} else if (type === "minute") {
			newEndDate.setMinutes(parseInt(value, 10));
		}

		form.setValue("endDate", newEndDate);
	}
	return (
		<Popover open={open} onOpenChange={setOpen}>
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
								onClick={() => setOpen(false)}
							>
								<X className="h-4 w-4" />
							</Button>
						</div>
					</CardHeader>
					<CardContent className="space-y-4 pb-4">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-5"
							>
								<FormField
									control={form.control}
									name="startDate"
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<span>Start Date & Time (24h)</span>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant={"outline"}
															className={cn(
																"w-full pl-3 text-left font-normal",
																!field.value && "text-muted-foreground",
															)}
														>
															{field.value ? (
																format(field.value, "MM/dd/yyyy HH:mm")
															) : (
																<span>MM/DD/YYYY HH:mm</span>
															)}
															<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent className="w-auto p-0">
													<div className="sm:flex">
														<Calendar
															fromDate={new Date()}
															mode="single"
															selected={field.value}
															onSelect={handleStartDateSelect}
															initialFocus
														/>
														<div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
															<ScrollArea className="w-64 sm:w-auto">
																<div className="flex sm:flex-col p-2">
																	{Array.from({ length: 24 }, (_, i) => i)
																		.reverse()
																		.map((hour) => (
																			<Button
																				key={hour}
																				size="icon"
																				variant={
																					field.value &&
																					field.value.getHours() === hour
																						? "default"
																						: "ghost"
																				}
																				className="sm:w-full shrink-0 aspect-square"
																				onClick={() =>
																					handleStartDateTimeChange(
																						"hour",
																						hour.toString(),
																					)
																				}
																			>
																				{hour}
																			</Button>
																		))}
																</div>
																<ScrollBar
																	orientation="horizontal"
																	className="sm:hidden"
																/>
															</ScrollArea>
															<ScrollArea className="w-64 sm:w-auto">
																<div className="flex sm:flex-col p-2">
																	{Array.from(
																		{ length: 12 },
																		(_, i) => i * 5,
																	).map((minute) => (
																		<Button
																			key={minute}
																			size="icon"
																			variant={
																				field.value &&
																				field.value.getMinutes() === minute
																					? "default"
																					: "ghost"
																			}
																			className="sm:w-full shrink-0 aspect-square"
																			onClick={() =>
																				handleStartDateTimeChange(
																					"minute",
																					minute.toString(),
																				)
																			}
																		>
																			{minute.toString().padStart(2, "0")}
																		</Button>
																	))}
																</div>
																<ScrollBar
																	orientation="horizontal"
																	className="sm:hidden"
																/>
															</ScrollArea>
														</div>
													</div>
												</PopoverContent>
											</Popover>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="endDate"
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<span>End Date & Time (24h)</span>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant={"outline"}
															className={cn(
																"w-full pl-3 text-left font-normal",
																!field.value && "text-muted-foreground",
															)}
														>
															{field.value ? (
																format(field.value, "MM/dd/yyyy HH:mm")
															) : (
																<span>MM/DD/YYYY HH:mm</span>
															)}
															<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent className="w-auto p-0">
													<div className="sm:flex">
														<Calendar
															fromDate={new Date()}
															mode="single"
															selected={field.value}
															onSelect={handleEndDateSelect}
															initialFocus
														/>
														<div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
															<ScrollArea className="w-64 sm:w-auto">
																<div className="flex sm:flex-col p-2">
																	{Array.from({ length: 24 }, (_, i) => i)
																		.reverse()
																		.map((hour) => (
																			<Button
																				key={hour}
																				size="icon"
																				variant={
																					field.value &&
																					field.value.getHours() === hour
																						? "default"
																						: "ghost"
																				}
																				className="sm:w-full shrink-0 aspect-square"
																				onClick={() =>
																					handleEndDateTimeChange(
																						"hour",
																						hour.toString(),
																					)
																				}
																			>
																				{hour}
																			</Button>
																		))}
																</div>
																<ScrollBar
																	orientation="horizontal"
																	className="sm:hidden"
																/>
															</ScrollArea>
															<ScrollArea className="w-64 sm:w-auto">
																<div className="flex sm:flex-col p-2">
																	{Array.from(
																		{ length: 12 },
																		(_, i) => i * 5,
																	).map((minute) => (
																		<Button
																			key={minute}
																			size="icon"
																			variant={
																				field.value &&
																				field.value.getMinutes() === minute
																					? "default"
																					: "ghost"
																			}
																			className="sm:w-full shrink-0 aspect-square"
																			onClick={() =>
																				handleEndDateTimeChange(
																					"minute",
																					minute.toString(),
																				)
																			}
																		>
																			{minute.toString().padStart(2, "0")}
																		</Button>
																	))}
																</div>
																<ScrollBar
																	orientation="horizontal"
																	className="sm:hidden"
																/>
															</ScrollArea>
														</div>
													</div>
												</PopoverContent>
											</Popover>
											<FormDescription>
												Please select your preferred date and time.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="flex gap-2 justify-between">
									<Button
										className="flex-1"
										type="button"
										variant="outline"
										onClick={() => setOpen(false)}
									>
										Cancel
									</Button>
									<Button className="flex-1" type="submit">
										Submit
									</Button>
								</div>
							</form>
						</Form>
					</CardContent>
				</Card>
			</PopoverContent>
		</Popover>
	);
};

export default UpdateGoldenHourPopover;

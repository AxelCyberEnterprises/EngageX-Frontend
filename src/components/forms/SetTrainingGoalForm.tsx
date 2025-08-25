import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SetTrainingGoalSchema } from "@/schemas/dashboard/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ControlledFieldWrapper from "../controlled-fields/field-wrapper";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useCallback, useEffect } from "react";
import { useSetTrainingGoal } from "@/hooks/organization/useSetTrainingGoal";
import SuccessToast from "../ui/custom-toasts/success-toasts";
import ErrorToast from "../ui/custom-toasts/error-toast";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export type FormType = z.infer<typeof SetTrainingGoalSchema>;

const roomOptions = [
    { label: "Presentation", value: "presentation" },
    { label: "Pitch", value: "pitch" },
    { label: "Public Speaking", value: "public_speaking" },
    { label: "Media Training", value: "media_training" },
    { label: "Coach", value: "coach" },
    { label: "General Manager", value: "general_manager" },
];

const SetTrainingGoalForm = () => {
    const [searchParams] = useSearchParams();
    const enterpriseId = searchParams.get("id") ?? "";
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    const form = useForm<FormType>({
        resolver: zodResolver(SetTrainingGoalSchema),
        defaultValues: {
            select_rooms: "presentation",
        },
    });

    useEffect(() => {
        localStorage.setItem("enterprise", enterpriseId)
    }, [enterpriseId])

    const { mutate: setTrainingGoal, isPending } = useSetTrainingGoal({id: enterpriseId});

    const handleSubmit = useCallback(
    (values: FormType) => {

        setTrainingGoal(
          {
            room: values.select_rooms,
            target_sessions: values.number_of_sessions,
            due_date: values.deadline.toDateString(),
            enterprise: +enterpriseId
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ["enterprise-users", enterpriseId],
              });
              toast(
                <SuccessToast
                  heading="Training goal set successfully"
                  description="Enterprise training goal has been set."
                />
              );
              navigate(`/dashboard/admin/organization/members?id=${enterpriseId}`)
            },
            onError: (error) => {
              console.error("Error uploading Excel: ", error);
              toast(
                <ErrorToast
                  heading="Training goal couldn't be set"
                  description="There was an issue processing setting enterprise training goal."
                />
              );
            },
          }
        );
    },
    [setTrainingGoal, enterpriseId, queryClient]
  );

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <div className="grid gap-8 p-6 border border-bright-gray rounded-lg">
                    <ControlledFieldWrapper
                        control={form.control}
                        name="select_rooms"
                        label="Select Rooms"
                        className="[&>[data-slot='form-label']]:text-base [&>[data-slot='form-label']]:font-normal gap-3"
                        render={({ field }) => (
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col gap-4"
                            >
                                {roomOptions.map((option) => (
                                    <FormItem key={option.value} className="flex items-center gap-2">
                                        <FormControl>
                                            <RadioGroupItem
                                                value={option.value}
                                                className="bg-background border-primary-blue text-gunmetal"
                                            />
                                        </FormControl>
                                        <FormLabel className="text-primary-blue">{option.label}</FormLabel>
                                    </FormItem>
                                ))}
                            </RadioGroup>
                        )}
                    />

                    <ControlledFieldWrapper
                        control={form.control}
                        name="number_of_sessions"
                        label="Number of Sessions"
                        className="[&_[data-slot='form-label']]:text-base [&_[data-slot='form-label']]:font-normal gap-3"
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="number"
                                placeholder="Enter number of sessions"
                                className="h-11 rounded-lg focus-visible:ring-0 shadow-none text-primary-blue placeholder:text-gray-blue"
                                onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                            />
                        )}
                    />

                    <ControlledFieldWrapper
                        control={form.control}
                        name="deadline"
                        label="Deadline"
                        className="[&_[data-slot='form-label']]:text-base [&_[data-slot='form-label']]:font-normal gap-3"
                        render={({ field }) => (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full h-11 justify-start text-left font-normal text-primary-blue",
                                            !field.value && "text-gray-blue",
                                        )}
                                    >
                                        <CalendarIcon className="text-independence" />
                                        {field.value ? format(field.value, "PPP") : <span>dd/mm/yyyy</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent align="start" className="w-auto p-0 border-bright-gray">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        className="border-none"
                                        onSelect={field.onChange}
                                    />
                                </PopoverContent>
                            </Popover>
                        )}
                    />
                </div>
                <div className="flex justify-end">
                    <Button type="submit" disabled={isPending} className="bg-green-sheen hover:bg-green-sheen/90">
                        Continue
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default SetTrainingGoalForm;

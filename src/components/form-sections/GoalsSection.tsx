import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Plus, Trash2 } from "lucide-react";
import { HTMLAttributes } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";

const GOALS_GUIDE = ["Confidently deliver key points ", "Maintain audience engagement."];

interface IGoalsSectionProps extends HTMLAttributes<HTMLElement> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any>;
}

const GoalsSection = ({ className, form }: IGoalsSectionProps) => {
    const { fields, append, remove } = useFieldArray({
        name: "goals",
        control: form.control,
        rules: {
            minLength: 1,
            maxLength: 10,
        },
    });

    return (
        <section className={cn("space-y-5", className)}>
            <div className="space-y-2">
                <h6>Goals</h6>
                <p className="text-independence">What are your goals for this session?</p>
            </div>
            <div className="space-y-2 p-3 rounded-lg border border-bright-gray bg-[#F8F9FC]">
                {GOALS_GUIDE.map((guide, index) => (
                    <div key={guide + index} className="flex items-center gap-x-1.5 text-sm">
                        <span>{index + 1}.</span>
                        <span>{guide}</span>
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-y-4">
                <span>Add goals</span>
                {fields.map((field, index) => (
                    <FormField
                        control={form.control}
                        key={field.id}
                        name={`goals.${index}.goal`}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex items-center gap-4">
                                        <Input
                                            {...field}
                                            placeholder="Enter text here"
                                            className="h-11 rounded-lg focus-visible:ring-0 shadow-none text-gunmetal"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="text-gunmetal h-11 rounded-lg shadow-none"
                                            onClick={() => remove(index)}
                                        >
                                            <Trash2 className="size-4" />
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ id: fields.length + 1, goal: "" })}
                    className="text-green-sheen hover:text-green-sheen border-green-sheen w-fit rounded-lg"
                >
                    <Plus className="size-4" />
                    <span>Add Goal</span>
                </Button>
            </div>
        </section>
    );
};

export default GoalsSection;

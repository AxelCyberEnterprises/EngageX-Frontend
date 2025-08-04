import ControlledFieldWrapper from "@/components/controlled-fields/field-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/context/ThemeContext/hook";
import { SECONDARY_COLOR } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Plus, Trash2 } from "lucide-react";
import { HTMLAttributes, useCallback } from "react";
import { useFieldArray, UseFormReturn, useWatch } from "react-hook-form";

interface IGoalsSectionProps extends HTMLAttributes<HTMLElement> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any>;
}

const GoalsSection = ({ className, form }: IGoalsSectionProps) => {
    const {
        theme: { secondaryColor },
    } = useTheme();
    const goals = useWatch({
        name: "goals",
        control: form.control,
    });
    const { fields, append, remove } = useFieldArray({
        name: "goals",
        control: form.control,
        rules: {
            minLength: 1,
            maxLength: 10,
        },
    });

    const addGoal = useCallback(() => {
        if (goals.length === 0) append({ id: fields.length + 1, goal: "" });
        else if (goals[goals.length - 1].goal.trim()) append({ id: fields.length + 1, goal: "" });
    }, [append, fields.length, goals]);

    return (
        <section className={cn("space-y-5", className)}>
            <div className="space-y-2">
                <h6>Goals</h6>
                <p className="text-auro-metal-saurus">Write a clear, specific goal in one concise sentence.</p>
            </div>
            {goals[0]?.goal.trim() && (
                <div className="space-y-2 p-4 rounded-lg border border-bright-gray bg-[#F8F9FC]">
                    {goals.map(({ id, goal }: { id: number; goal: string }, index: number) => {
                        return (
                            goal.trim() && (
                                <div key={id} className="flex items-center gap-x-1.5 text-sm">
                                    <span>{index + 1}.</span>
                                    <span>{goal}</span>
                                    <Button
                                        type="button"
                                        className="bg-transparent hover:bg-transparent text-gunmetal rounded-lg shadow-none px-0 has-[>svg]:px-0 py-0 size-fit ml-auto"
                                        onClick={() => remove(index)}
                                    >
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>
                            )
                        );
                    })}
                </div>
            )}
            <div className="flex flex-col gap-y-4">
                <div className="grid gap-2">
                    <span className="font-normal text-sm">Add goals</span>
                    {fields.map(({ id }, index) => (
                        <ControlledFieldWrapper
                            key={id}
                            control={form.control}
                            name={`goals.${index}.goal`}
                            className={cn("hidden [&_[data-slot='form-label']]:font-normal", {
                                grid: fields.length === index + 1,
                            })}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="Ex. Connect with the audience by being authentic and composed."
                                    className="h-11 rounded-lg focus-visible:ring-0 shadow-none text-gunmetal placeholder:text-auro-metal-saurus"
                                />
                            )}
                        />
                    ))}
                </div>
                <Button
                    type="button"
                    variant="outline"
                    onClick={addGoal}
                    className={cn("text-green-sheen hover:text-green-sheen border-green-sheen w-fit rounded-lg", {
                        "border-branding-secondary hover:bg-branding-secondary text-branding-secondary":
                            secondaryColor !== SECONDARY_COLOR,
                    })}
                >
                    <Plus className="size-4" />
                    <span>Add Goal</span>
                </Button>
            </div>
        </section>
    );
};

export default GoalsSection;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Plus, Trash2 } from "lucide-react";
import { HTMLAttributes, useCallback, useState } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { Label } from "../ui/label";

interface IGoalsSectionProps extends HTMLAttributes<HTMLElement> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any>;
}

const GoalsSection = ({ className, form }: IGoalsSectionProps) => {
    const [goal, setGoal] = useState("");
    const { fields, append, remove } = useFieldArray({
        name: "goals",
        control: form.control,
        rules: {
            minLength: 1,
            maxLength: 10,
        },
    });

    const addGoal = useCallback(() => {
        if (goal.trim()) {
            append({ id: fields.length + 1, goal });
            setGoal("");
        }
    }, [append, fields.length, goal]);

    return (
        <section className={cn("space-y-5", className)}>
            <div className="space-y-2">
                <h6>Goals</h6>
                <p className="text-auro-metal-saurus">What are your goals for this session?</p>
            </div>
            {fields.length > 0 && (
                <div className="space-y-2 p-4 rounded-lg border border-bright-gray bg-[#F8F9FC]">
                    {fields.map((field, index) => {
                        return (
                            <div key={field.id} className="flex items-center gap-x-1.5 text-sm">
                                <span>{index + 1}.</span>
                                <span>{(field as Record<"id" | "goal", string>).goal}</span>
                                <Button
                                    type="button"
                                    className="bg-transparent hover:bg-transparent text-gunmetal rounded-lg shadow-none px-0 has-[>svg]:px-0 py-0 size-fit ml-auto"
                                    onClick={() => remove(index)}
                                >
                                    <Trash2 className="size-4" />
                                </Button>
                            </div>
                        );
                    })}
                </div>
            )}
            <div className="flex flex-col gap-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="goal" className="font-normal">
                        Add goals
                    </Label>
                    <Input
                        id="goal"
                        placeholder="Enter text here"
                        value={goal}
                        className="h-11 rounded-lg focus-visible:ring-0 shadow-none text-gunmetal placeholder:text-auro-metal-saurus"
                        onChange={(e) => setGoal(e.target.value)}
                    />
                </div>
                <Button
                    type="button"
                    variant="outline"
                    onClick={addGoal}
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

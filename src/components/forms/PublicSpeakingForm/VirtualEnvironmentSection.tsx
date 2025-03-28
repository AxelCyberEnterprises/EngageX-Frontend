import ControlledFieldWrapper from "@/components/controlled-fields/field-wrapper";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { VirtialEnvironmentOptions } from "@/config/form-field-options";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { HTMLAttributes } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormType } from ".";

interface IVirtualEnvironmentSectionProps extends HTMLAttributes<HTMLElement> {
    form: UseFormReturn<FormType>;
}

const VirtualEnvironmentSection = ({ form }: IVirtualEnvironmentSectionProps) => {
    return (
        <section className="space-y-6 border border-bright-gray p-4 rounded-2xl">
            <div className="space-y-2">
                <h6>Virtual Environment</h6>
                <p className="text-auro-metal-saurus">Choose your preferred virtual environment</p>
            </div>
            <div>
                <ControlledFieldWrapper
                    control={form.control}
                    name="virtualEnvironment"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex lg:flex-col md:flex-row flex-col"
                                >
                                    {VirtialEnvironmentOptions.map(({ name, value, src }, index) => (
                                        <FormItem key={value + index}>
                                            <FormControl className="hidden">
                                                <RadioGroupItem value={value} />
                                            </FormControl>
                                            <FormLabel className="cursor-pointer">
                                                <div
                                                    className={cn("relative md:w-85 w-full h-37.5 rounded-lg isolate", {
                                                        "outline-4 outline-medium-sea-green":
                                                            form.watch("virtualEnvironment") === value,
                                                    })}
                                                >
                                                    <img
                                                        src={src}
                                                        alt=""
                                                        className={"object-cover size-full rounded-lg"}
                                                    />
                                                    <p className="absolute bottom-2 left-3 text-white font-semibold z-10">
                                                        {name}
                                                    </p>
                                                    <div
                                                        className={cn(
                                                            "bg-medium-sea-green text-white p-1 size-fit absolute top-0 right-0 rounded-bl-xs hidden",
                                                            {
                                                                "z-10 block":
                                                                    form.watch("virtualEnvironment") === value,
                                                            },
                                                        )}
                                                    >
                                                        <Check className="size-4 stroke-3" />
                                                    </div>
                                                    <div className="absolute inset-0 bg-black/50 rounded-lg" />
                                                </div>
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </section>
    );
};

export default VirtualEnvironmentSection;

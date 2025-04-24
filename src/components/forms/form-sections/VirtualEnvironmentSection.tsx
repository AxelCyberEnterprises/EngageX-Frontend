import ControlledFieldWrapper from "@/components/controlled-fields/field-wrapper";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { HTMLAttributes } from "react";
import { UseFormReturn } from "react-hook-form";
import { useLocation } from "react-router-dom";
import practiceBg from "@/assets/images/jpegs/practice-bg-dashboard.jpeg";
interface IVirtualEnvironmentSectionProps extends HTMLAttributes<HTMLElement> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any>;
    instruction?: string;
    options: {
        name: string;
        value: string;
        src: string;
    }[];
}

const VirtualEnvironmentSection = ({ className, form, instruction, options }: IVirtualEnvironmentSectionProps) => {

    const location = useLocation();
    const locationDecide = location.pathname;
    return (
        <section className={cn("space-y-5 border border-bright-gray p-4 rounded-2xl", className)}>
            <div className="space-y-1">
                <h6>Virtual Environment</h6>
                {instruction && <p className="text-auro-metal-saurus">{instruction}</p>}
            </div>
            <div>
                <ControlledFieldWrapper
                    control={form.control}
                    name="virtual_environment"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col"
                                >
                                    
                                    
                                    { locationDecide!== '/dashboard/user/pitch-practice' ? (options.map(({ name, value, src }, index) => (

                                        <FormItem key={value + index}>
                                            <FormControl className="hidden">
                                                <RadioGroupItem value={value} />
                                            </FormControl>
                                            <FormLabel className="cursor-pointer">
                                                <div
                                                    className={cn("w-full relative rounded-lg isolate", {
                                                        "outline-4 outline-medium-sea-green":
                                                            form.watch("virtual_environment") === value,
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
                                                                    form.watch("virtual_environment") === value,
                                                            },
                                                        )}
                                                    >
                                                        <Check className="size-4 stroke-3" />
                                                    </div>
                                                    <div className="absolute inset-0 bg-black/50 rounded-lg" />
                                                </div>
                                            </FormLabel>
                                        </FormItem>
                                    ))) : (
                                        <FormItem key={'board_room_2' + 1}>
                                        <FormControl className="hidden">
                                            <RadioGroupItem value={'board_room_2'} />
                                        </FormControl>
                                        <FormLabel className="cursor-pointer">
                                            <div
                                                className={cn("w-full relative rounded-lg isolate", {
                                                    "outline-4 outline-medium-sea-green":
                                                        form.watch("virtual_environment") === 'board_room_2',
                                                })}
                                            >
                                                <img
                                                    src={practiceBg}
                                                    alt=""
                                                    className={"object-cover size-full rounded-lg"}
                                                />
                                                <p className="absolute bottom-2 left-3 text-white font-semibold z-10">
                                                    Boardroom
                                                </p>
                                                <div
                                                    className={cn(
                                                        "bg-medium-sea-green text-white p-1 size-fit absolute top-0 right-0 rounded-bl-xs hidden",
                                                        {
                                                            "z-10 block":
                                                                form.watch("virtual_environment") === 'board_room_2',
                                                        },
                                                    )}
                                                >
                                                    <Check className="size-4 stroke-3" />
                                                </div>
                                                <div className="absolute inset-0 bg-black/50 rounded-lg" />
                                            </div>
                                        </FormLabel>
                                    </FormItem>
                                    )}
                                </RadioGroup>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
        </section>
    );
};

export default VirtualEnvironmentSection;

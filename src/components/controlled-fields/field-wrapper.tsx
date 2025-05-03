import { cn } from "@/lib/utils";
import { ReactElement } from "react";
import {
    Control,
    ControllerFieldState,
    ControllerRenderProps,
    FieldValues,
    Path,
    UseFormStateReturn,
} from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

type FieldWrapperProps<T extends FieldValues, K extends Path<T>> = {
    label?: string;
    control: Control<T>;
    name: K;
    className?: string;
    render: ({
        field,
        fieldState,
        formState,
    }: {
        field: ControllerRenderProps<T, K>;
        fieldState: ControllerFieldState;
        formState: UseFormStateReturn<T>;
        ctx?: { className?: string };
    }) => ReactElement;
};

export default function ControlledFieldWrapper<T extends FieldValues, K extends Path<T>>({
    control,
    name,
    className,
    label,
    render,
}: FieldWrapperProps<T, K>) {
    return (
        <FormField
            control={control}
            name={name}
            render={(props) => (
                <FormItem className={cn(className)}>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>{render({ ...props })}</FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

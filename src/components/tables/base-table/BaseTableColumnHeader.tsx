import { SelectIcon } from "@radix-ui/react-select";
import type { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface IBaseTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    title: string;
}

export default function BaseTableColumnHeader<TData, TValue>({
    column,
    title,
    className,
}: IBaseTableColumnHeaderProps<TData, TValue>) {
    const { current: ascValue } = useRef(`${column.id}-asc`);
    const { current: descValue } = useRef(`${column.id}-desc`);
    const { current: hideValue } = useRef(`${column.id}-hide`);

    if (!column.getCanSort() && !column.getCanHide()) {
        return <div className={cn(className)}>{title}</div>;
    }

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <Select
                value={
                    column.getIsSorted() === "desc" ? descValue : column.getIsSorted() === "asc" ? ascValue : undefined
                }
                onValueChange={(value) => {
                    if (value === ascValue) column.toggleSorting(false);
                    else if (value === descValue) column.toggleSorting(true);
                    else if (value === hideValue) column.toggleVisibility(false);
                }}
            >
                <SelectTrigger
                    aria-label={
                        column.getIsSorted() === "desc"
                            ? "Sorted descending. Click to sort ascending."
                            : column.getIsSorted() === "asc"
                              ? "Sorted ascending. Click to sort descending."
                              : "Not sorted. Click to sort ascending."
                    }
                    className="p-4 -ml-4 h-8 w-fit border-none font-semibold text-primary-base gap-1.5 data-[placeholder]:text-primary-base hover:bg-bright-gray hover:text-primary-base shadow-none data-[state=open]:bg-bright-gray [&>svg:last-child]:hidden focus-visible:border-none focus-visible:ring-0"
                >
                    <span>{title}</span>
                    <SelectIcon asChild>
                        {column.getCanSort() && column.getIsSorted() === "desc" ? (
                            <ArrowDown className="size-4 text-primary-base stroke-3" aria-hidden="true" />
                        ) : column.getIsSorted() === "asc" ? (
                            <ArrowUp className="size-4 text-primary-base stroke-3" aria-hidden="true" />
                        ) : (
                            <ChevronsUpDown className="size-4 text-primary-base stroke-3" aria-hidden="true" />
                        )}
                    </SelectIcon>
                </SelectTrigger>
                <SelectContent align="start" className="[&_.select-viewport]:p-0 border-bright-gray">
                    {column.getCanSort() && (
                        <>
                            <SelectItem value={ascValue} className="px-4 py-2">
                                <ArrowUp aria-hidden="true" className="text-primary-base" />
                                <span>Asc</span>
                            </SelectItem>
                            <SelectItem value={descValue} className="px-4 py-2">
                                <ArrowDown aria-hidden="true" className="text-primary-base" />
                                <span>Desc</span>
                            </SelectItem>
                        </>
                    )}
                    {column.getCanHide() && (
                        <SelectItem value={hideValue} className="px-4 py-2">
                            <EyeOff aria-hidden="true" className="text-primary-base" />
                            <span>Hide</span>
                        </SelectItem>
                    )}
                </SelectContent>
            </Select>
        </div>
    );
}

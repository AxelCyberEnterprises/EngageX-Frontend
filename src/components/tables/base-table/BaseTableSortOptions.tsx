import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn, toSentenceCase } from "@/lib/utils";
import type { Table } from "@tanstack/react-table";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRef } from "react";

interface IBaseTableSortOptionsProps<TData> {
    table: Table<TData>;
}

export default function BaseTableSortOptions<TData>({ table }: IBaseTableSortOptionsProps<TData>) {
    const triggerRef = useRef<HTMLButtonElement>(null);

    return (
        <Popover modal>
            <PopoverTrigger asChild>
                <Button
                    ref={triggerRef}
                    aria-label="Toggle columns"
                    variant="outline"
                    role="combobox"
                    size="sm"
                    className="bg-transparent hover:bg-transparent text-primary-base border-light-silver gap-1 p-0 h-9"
                >
                    <ChevronsUpDown className="size-4 shrink-0" />
                    <span className="font-normal">Sort</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-44 p-0" onCloseAutoFocus={() => triggerRef.current?.focus()}>
                <Command>
                    <CommandInput
                        placeholder="Search columns..."
                        className="border-none text-primary-base placeholder:text-primary-base/80"
                    />
                    <CommandList>
                        <CommandEmpty>No columns found.</CommandEmpty>
                        <CommandGroup className="p-0">
                            {table
                                .getAllColumns()
                                .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
                                .map((column) => {
                                    return (
                                        <CommandItem
                                            key={column.id}
                                            onSelect={() => column.toggleVisibility(!column.getIsVisible())}
                                            className="px-4 py-2"
                                        >
                                            <span className="truncate text-primary-base">{toSentenceCase(column.id)}</span>
                                            <Check
                                                className={cn(
                                                    "ml-auto size-4 shrink-0 text-primary-base",
                                                    column.getIsVisible() ? "opacity-100" : "opacity-0",
                                                )}
                                            />
                                        </CommandItem>
                                    );
                                })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

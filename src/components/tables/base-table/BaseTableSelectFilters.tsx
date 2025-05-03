import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toSentenceCase, transformToOptions } from "@/lib/utils";
import type { Table } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { HTMLAttributes, useRef } from "react";

interface IBaseTableSelectFiltersProps<TData> extends HTMLAttributes<HTMLDivElement> {
    table: Table<TData>;
}

const BaseTableSessionsOptions = {
    0: "All Sessions",
    1: "Pitch Practice",
    2: "Presentation",
    3: "Public Speaking",
};

const BaseTableTimeRangeOptions = {
    0: "All",
    1: "0-10 min",
    2: "10-30 min",
    3: "30+ min",
};

const BaseTableSelectOptions = [
    {
        id: "sessionType",
        placeholder: "All Sessions",
        options: transformToOptions(BaseTableSessionsOptions),
    },
    {
        id: "date",
        placeholder: "All",
        options: transformToOptions(BaseTableTimeRangeOptions),
    },
] as const;

export default function BaseTableSelectFilters<TData>({ table }: IBaseTableSelectFiltersProps<TData>) {
    const triggerRef = useRef<HTMLButtonElement>(null);

    return (
        <div className="flex items-center gap-x-3">
            <Popover modal>
                <PopoverTrigger asChild>
                    <Button
                        ref={triggerRef}
                        aria-label="Toggle columns"
                        variant="outline"
                        role="combobox"
                        size="sm"
                        className="bg-transparent hover:bg-transparent text-primary-base border-light-silver gap-1.5"
                    >
                        <ChevronDown className="size-4 shrink-0" />
                        <span className="font-normal">All Users</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-44 p-0" onCloseAutoFocus={() => triggerRef.current?.focus()}>
                    <Command>
                        <CommandInput
                            placeholder="Search"
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
                                                <span className="truncate text-primary-base">
                                                    {toSentenceCase(column.id)}
                                                </span>
                                            </CommandItem>
                                        );
                                    })}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            {BaseTableSelectOptions.map(({ id, placeholder, options }) => (
                <Select key={id}>
                    <SelectTrigger className="w-fit text-primary-base data-[placeholder]:text-primary-base [&_svg]:opacity-100 [&_svg:not([class*='text-'])]:text-primary-base flex-row-reverse gap-1.5 focus-visible:ring-0">
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent className="[&_.select-viewport]:p-0">
                        <SelectGroup>
                            {options.map(({ key, name }) => (
                                <SelectItem key={key} value={key} className="px-4 py-2">
                                    {name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            ))}
        </div>
    );
}

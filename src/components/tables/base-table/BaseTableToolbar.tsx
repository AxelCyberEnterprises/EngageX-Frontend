import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { ListFilter, Search } from "lucide-react";
import { HTMLAttributes } from "react";
import BaseTableDatePicker from "./BaseTableDatePicker";
import BaseTableSelectFilters from "./BaseTableSelectFilters";
import BaseTableSortOptions from "./BaseTableSortOptions";

interface IBaseTableTolbarProps<TData> extends HTMLAttributes<HTMLDivElement> {
    table: Table<TData>;
}

const BaseTableToolbar = <TData,>({ table }: IBaseTableTolbarProps<TData>) => {
    return (
        <div className="grid gap-y-4">
            <div className="flex items-center justify-between">
                <div className="relative">
                    <div className="grid place-content-center absolute h-full w-8">
                        <Search className="size-4 text-primary-base" />
                    </div>
                    <Input
                        placeholder="Search session by name"
                        value={(table.getColumn("sessionName")?.getFilterValue() as string) ?? ""}
                        onChange={(e) => table.getColumn("sessionName")?.setFilterValue(e.target.value)}
                        className="min-w-xs text-primary-base placeholder:text-primary-base/80 pl-8 border-light-silver focus-visible:border-none focus-visible:ring-1 focus-visible:ring-primatext-primary-base transition duration-300"
                    />
                </div>
                <div className="md:flex hidden items-center gap-x-3">
                    <Button className="bg-transparent hover:bg-transparent border border-bright-gray text-primary-base font-normal">
                        <ListFilter className="size-4" />
                        <span>Filter</span>
                    </Button>
                    <BaseTableSortOptions table={table} />
                </div>
                <Button className="md:hidden bg-transparent hover:bg-transparent border border-bright-gray text-primary-base font-normal">
                    <ListFilter className="size-4" />
                </Button>
            </div>
            <div className="md:flex hidden items-center gap-x-3">
                <BaseTableDatePicker table={table} />
                <BaseTableSelectFilters table={table} />
            </div>
        </div>
    );
};

export default BaseTableToolbar;

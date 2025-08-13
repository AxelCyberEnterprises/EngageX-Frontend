import type { ExtendedColumnSort } from "@/types/data-table";
import {
    type ColumnFiltersState,
    type PaginationState,
    type SortingState,
    type TableOptions,
    type TableState,
    type VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

interface UseDataTableProps<TData>
    extends Omit<
            TableOptions<TData>,
            "state" | "pageCount" | "getCoreRowModel" | "manualFiltering" | "manualPagination" | "manualSorting"
        >,
        Partial<Pick<TableOptions<TData>, "pageCount">> {
    //! Change pageCount back to REQUIRED
    initialState?: Omit<Partial<TableState>, "sorting"> & {
        sorting?: ExtendedColumnSort<TData>[];
    };
    history?: "push" | "replace";
    debounceMs?: number;
    throttleMs?: number;
    clearOnDefault?: boolean;
    enableAdvancedFilter?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    startTransition?: React.TransitionStartFunction;
}

export function useDataTable<TData>(props: UseDataTableProps<TData>) {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 15,
    });
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const { columns, ...tableProps } = props;

    const table = useReactTable({
        ...tableProps,
        columns,
        state: {
            columnFilters,
            columnVisibility,
            pagination,
            rowSelection,
            sorting,
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
    });

    return { table };
}

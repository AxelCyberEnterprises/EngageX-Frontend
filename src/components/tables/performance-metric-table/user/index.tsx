import { ColumnDef } from "@tanstack/react-table";
import { BaseTable } from "../../base-table";
import { useState } from "react";
import { PaginationState } from "@tanstack/react-table";

interface PresentationMetricsTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize: number;
  hidePagination?: boolean;
  tableContainerClassName?: string;
}

function PresentationMetricsTable<TData, TValue>({
  columns, data, pageSize, hidePagination, tableContainerClassName
}: PresentationMetricsTableProps<TData, TValue>) {

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  });

  console.log(data);
  return (
    <div className="w-full">
      <BaseTable
        columns={columns}
        data={data}
        showToolBar={false}
        tableHeaderItemClassName="font-medium py-4 text-[#252A39]" tableHeaderClassName="bg-[#F7F9FC]"
        pageSize={pageSize}
        hidePagination={hidePagination}
        tableContainerClassName={tableContainerClassName}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
};

export default PresentationMetricsTable;
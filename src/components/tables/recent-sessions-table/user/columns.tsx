import { ColumnDef } from "@tanstack/react-table";
import { Session } from "./data";
import select from "../../../../assets/images/svgs/select.svg";

export const columns: ColumnDef<Session, any>[] = [
  {
    accessorKey: "name",
    header: "Session Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <div className="flex items-center gap-[8px] cursor-pointer" onClick={() => column.toggleSorting()}>
        Date
        <img src={select} alt='calendar' className="h-4 w-4 text-gray-500" />
      </div>
    ),
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <div className="flex items-center gap-[8px] cursor-pointer" onClick={() => column.toggleSorting()}>
        Session Type
        <img src={select} alt='calendar' className="h-4 w-4 text-gray-500" />
      </div>
    ),
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <div className="flex items-center gap-[8px] cursor-pointer" onClick={() => column.toggleSorting()}>
        Duration
        <img src={select} alt='calendar' className="h-4 w-4 text-gray-500" />
      </div>
    ),
    cell: ({ row }) => <div>{row.getValue("duration")}</div>,
  },
  {
    accessorKey: "improvement",
    header: "Key Impact Score",
    cell: ({ row }) => {
      const improvement = row.getValue("improvement") as number;

      return (
        <div className="flex items-center gap-2">
          <div className="w-36 bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-[#40B869] h-2.5 rounded-full"
              style={{ width: `${improvement}%` }}
            ></div>
          </div>
          <span className="text-gray-600">{improvement}%</span>
        </div>

      );
    },
  },
];
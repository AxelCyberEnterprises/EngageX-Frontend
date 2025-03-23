import { ColumnDef } from "@tanstack/react-table";
import { Session } from "./data";

export const columns: ColumnDef<Session, any>[] = [
  {
    accessorKey: "name",
    header: "Session Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => <div>{row.getValue("duration")}</div>,
  },
];
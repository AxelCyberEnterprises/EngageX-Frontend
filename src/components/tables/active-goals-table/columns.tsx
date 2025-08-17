/* eslint-disable react-hooks/rules-of-hooks */
import { ColumnDef } from "@tanstack/react-table";
// import { useRef, useState } from "react";
// import { useClickOutside } from "@/hooks/useClickoutside";
import { Goal } from "./data";
import { EditIcon, Trash2Icon } from "lucide-react";

export const columns: ColumnDef<Goal, any>[] = [
    {
      accessorKey: "roomType",
      header: () => (
        <div className="flex items-center gap-[8px] text-[#252A39] py-4 cursor-pointer">
          Room Type
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-gray-700">{row.getValue("roomType")}</div>
      ),
    },
    {
      accessorKey: "goal",
      header: () => (
        <div className="flex items-center gap-[8px] text-[#252A39] py-4 cursor-pointer">
          Goal
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-gray-700 font-medium">{row.getValue("goal")}</div>
      ),
    },
    {
      accessorKey: "completionRate",
      header: () => (
        <div className="flex items-center gap-[8px] text-[#252A39] py-4 cursor-pointer">
          Completion Rate
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-gray-700">{row.getValue("completionRate")}%</div>
      ),
    },
    {
      accessorKey: "dueDate",
      header: () => (
        <div className="flex items-center gap-[8px] text-[#252A39] py-4 cursor-pointer">
          Due Date
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-gray-700">{row.getValue("dueDate")}</div>
      ),
    },
    {
      accessorKey: "action",
      header: () => (
        <div className="flex items-center justify-center gap-[8px] text-[#252A39] py-4 cursor-pointer">
          Actions
        </div>
      ),
      cell: () => (
        <div className="flex gap-2 justify-center">
          <EditIcon  className="cursor-pointer w-6" stroke-width={1.5}/>
          <Trash2Icon className="cursor-pointer text-red-500 w-6" stroke-width={1.5}/>
        </div>
      ),
    }
  ];
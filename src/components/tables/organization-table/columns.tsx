/* eslint-disable react-hooks/rules-of-hooks */
import { ColumnDef } from "@tanstack/react-table";
import { OrganizationTableData } from "./data";
import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickoutside";

export const columns: ColumnDef<OrganizationTableData, any>[] = [
  {
    accessorKey: "name",
    header: () => (
      <div className="flex items-center gap-[8px] text-[#252A39] py-4 cursor-pointer">
        Organization Name
      </div>
    ),
    cell: ({ row }) => {
      const organization = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img
              src={organization.logo}
              alt={organization.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-medium text-gray-900">{organization.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "industryType",
    header: () => (
      <div className="flex items-center gap-[8px] text-[#252A39] py-4 cursor-pointer">
        Industry Type
      </div>
    ),
    cell: ({ row }) => (
      <div className="mb-auto text-gray-700">{row.getValue("industryType")}</div>
    ),
  },
  {
    accessorKey: "members",
    header: () => (
      <div className="flex items-center gap-[8px] text-[#252A39] py-4 cursor-pointer">
        Members
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-gray-700 font-medium">{row.getValue("members")}</div>
    ),
  },
  {
    accessorKey: "trainingStatus",
    header: () => (
      <div className="flex items-center gap-[8px] text-[#252A39] py-4 cursor-pointer">
        Training Status
      </div>
    ),
    cell: ({ row }) => {
      const status = row.getValue("trainingStatus") as string;
      const isActive = status === "Active";
      
      return (
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className={`text-sm font-medium ${isActive ? 'text-green-700' : 'text-red-700'}`}>
            {status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: () => (
      <div className="flex items-center justify-center gap-[8px] text-[#252A39] py-4 cursor-pointer">
        Actions
      </div>
    ),
    cell: ({ row }) => {
      const [isOpen, setIsOpen] = useState(false);
      const popupRef = useRef<HTMLDivElement | null>(null);
      const buttonRef = useRef<HTMLButtonElement | null>(null);
      useClickOutside(popupRef, buttonRef, () => { setIsOpen(false) });
      
      const handleMenuClick = (event: React.MouseEvent, action: string) => {
        event.stopPropagation();
        console.log(`Action performed: ${action}`);
        setIsOpen(false);
      };

      return (
        <div className="flex justify-center relative">
          <button
            ref={buttonRef}
            className="rounded-lg transition-colors bg-transparent rotate-90"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 10 8C8.89543 8 8 8.89543 8 10C8 11.1046 8.89543 12 10 12Z" fill="#6B7280" />
              <path d="M10 5C11.1046 5 12 4.10457 12 3C12 1.89543 11.1046 1 10 1C8.89543 1 8 1.89543 8 3C8 4.10457 8.89543 5 10 5Z" fill="#6B7280" />
              <path d="M10 19C11.1046 19 12 18.1046 12 17C12 15.8954 11.1046 15 10 15C8.89543 15 8 15.8954 8 17C8 18.1046 8.89543 19 10 19Z" fill="#6B7280" />
            </svg>
          </button>
          {isOpen && (
            <div ref={popupRef} className="absolute top-full right-0 w-48 bg-white z-[999] shadow-lg rounded-lg border border-gray-200">
              <ul className="py-1">
                <li
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => handleMenuClick(e, "View Details")}
                >
                  View Details
                </li>
                <li
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => handleMenuClick(e, "Edit Organization")}
                >
                  Edit Organization
                </li>
                <li
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => handleMenuClick(e, "Manage Members")}
                >
                  Manage Members
                </li>
                <li
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => handleMenuClick(e, "Assign Credits")}
                >
                  Assign Credits
                </li>
                {row.original.trainingStatus === "Active" ? (
                  <li
                    className="px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer"
                    onClick={(e) => handleMenuClick(e, "Blacklist")}
                  >
                    Blacklist
                  </li>
                ) : (
                  <li
                    className="px-4 py-2 text-green-600 hover:bg-green-50 cursor-pointer"
                    onClick={(e) => handleMenuClick(e, "Activate")}
                  >
                    Activate
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      );
    },
  }
];
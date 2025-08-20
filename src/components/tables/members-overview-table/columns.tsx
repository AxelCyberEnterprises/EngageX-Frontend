/* eslint-disable react-hooks/rules-of-hooks */
import { ColumnDef } from "@tanstack/react-table";
import { Member } from "./data";
import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickoutside";
import { useNavigate } from "react-router-dom";

export const columns: ColumnDef<Member, any>[] = [
  {
    accessorKey: "member",
    header: () => (
      <div className="flex items-center gap-[8px] text-[#252A39] py-4 cursor-pointer">
        Member
      </div>
    ),
    cell: ({ row }) => {
      const member = row.original;
      return (
        <div className="flex items-center gap-3">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-medium text-gray-900">{member.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: () => (
      <div className="flex items-center gap-[8px] text-[#252A39] py-4 cursor-pointer">
        Role
      </div>
    ),
    cell: ({ row }) => (
      <div className="mb-auto text-gray-700">{row.getValue("role")}</div>
    ),
  },
  {
    accessorKey: "lastLogin",
    header: () => (
      <div className="flex items-center gap-[8px] text-[#252A39] py-4 cursor-pointer">
        Last Login
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-gray-700">{row.getValue("lastLogin")}</div>
    ),
  },
  {
    accessorKey: "creditsUsed",
    header: () => (
      <div className="flex items-center gap-[8px] text-[#252A39] py-4 cursor-pointer">
        Credits used
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-gray-700 font-medium">{row.getValue("creditsUsed")}</div>
    ),
  },
  {
    accessorKey: "action",
    header: () => (
      <div className="flex items-center justify-center gap-[8px] text-[#252A39] py-4 cursor-pointer">
        Actions
      </div>
    ),
    cell: () => {
      const [isOpen, setIsOpen] = useState(false);
      const popupRef = useRef<HTMLDivElement | null>(null);
      const buttonRef = useRef<HTMLButtonElement | null>(null);
      const navigate = useNavigate();
      useClickOutside(popupRef, buttonRef, () => { setIsOpen(false) });
      const handleMenuClick = (action: string) => {
        if (action === "View Progress") {
          navigate("/dashboard/admin/progress-tracking");
        }
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
            <div ref={popupRef} className="absolute top-full right-0 w-40 bg-white z-[999] shadow-lg rounded-lg">
              <ul className="py-1">
                <li
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleMenuClick("View Progress")}
                >
                  View Progress
                </li>
              </ul>
            </div>
          )}
        </div>
      );
    },
  }
];
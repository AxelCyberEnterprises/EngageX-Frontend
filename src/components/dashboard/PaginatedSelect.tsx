import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  date?: string;
  icon?: string;
}

interface PaginatedSelectProps {
  options: SelectOption[];
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholderClassname?: string;
  showIcon?: boolean;
  hideChevron?: boolean;
  icon?: string;
  disabled?: boolean;
  itemsPerPage?: number;
  setPage: (data: number) => void;
  page: number;
  count?: number;
}

const PaginatedSelect: React.FC<PaginatedSelectProps> = ({
  options,
  defaultValue,
  placeholder = "Select an option",
  onChange,
  className,
  placeholderClassname,
  showIcon = true,
  hideChevron,
  icon,
  disabled,
  itemsPerPage = 20,
  setPage,
  page,
  count,
}) => {
  const [selectedLabel, setSelectedLabel] = useState<string>(() => {
    if (defaultValue) {
      const option = options.find(opt => opt.value === defaultValue);
      return option ? option.label : '';
    }
    return '';
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    setCurrentPage(1);
  }, [options.length]);

  const handleChange = (value: string) => {
    const selectedOption = options.find(opt => opt.value === value);
    if (selectedOption) {
      setSelectedLabel(selectedOption.label);
    }
    if (onChange) {
      onChange(value);
    }
  };

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedOptions = searchTerm 
    ? filteredOptions 
    : filteredOptions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const totalPages = Math.ceil(count ? count / (itemsPerPage || 20) : 0)

  return (
    <Select defaultValue={defaultValue} onValueChange={handleChange}>
      <SelectTrigger
        disabled={disabled}
        className={cn(
          "w-full rounded-full border bg-white px-4 py-3 text-left shadow-none focus-visible:ring-0",
          hideChevron && '[&>svg]:hidden [&>button]:hidden',
          className
        )}
      >
        <div className="flex items-center gap-2">
          {showIcon && <img src={icon} alt='calendar' className="sm:h-4 sm:w-4 h-3 w-3 text-gray-500" />}
          <div className={cn("line-clamp-1 text-[#252A39] flex", placeholderClassname)}>
            {selectedLabel || <span>{placeholder}</span>}
          </div>
        </div>
      </SelectTrigger>
      <SelectContent className="bg-white border-none w-full max-h-72">
        <div className="p-2 sticky top-0 bg-white z-10">
          <input
            type="text"
            placeholder="Search sessions..."
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            value={searchTerm}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        
        <SelectGroup className="max-h-48 overflow-y-auto">
          {paginatedOptions.length > 0 ? (
            paginatedOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                textValue={option.label}
                className="py-3 px-2 cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center gap-1">
                  {option?.icon && <img src={option?.icon} alt="option icon" className='mr-1 w-5 h-5' />}
                  <span className="text-gray-700">{option.label}</span>
                  {option.date && (
                    <span className="text-sm text-gray-500">({option.date})</span>
                  )}
                </div>
              </SelectItem>
            ))
          ) : (
            <div className="py-3 px-2 text-gray-500 text-center">No results found</div>
          )}
        </SelectGroup>

        {!searchTerm && (
          <div className="p-2 flex items-center justify-between sticky bottom-0 bg-white">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                handlePrevPage();
              }}
              disabled={page === 1}
              className="px-2 py-1 h-8"
            >
              <ChevronLeft className="h-4 w-4  text-black" />
            </Button>
            <span className="text-sm text-gray-600">
              {page} / {totalPages}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                handleNextPage();
              }}
              // disabled={currentPage === totalPages}
              className="px-2 py-1 h-8"
            >
              <ChevronRight className="h-4 w-4 text-black" />
            </Button>
          </div>
        )}
      </SelectContent>
    </Select>
  );
};

export default PaginatedSelect;
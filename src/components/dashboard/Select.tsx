import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

export interface SelectOption {
  value: string;
  label: string;
  date?: string;
  icon?: string;
}

interface SelectProps {
  options: SelectOption[];
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholderClassname?: string;
  showIcon?: boolean;
  icon?: string;
}

const ShadSelect: React.FC<SelectProps> = ({
  options,
  defaultValue,
  placeholder = "Select an option",
  onChange,
  className,
  placeholderClassname,
  showIcon = true,
  icon,
}) => {

  const [selectedLabel, setSelectedLabel] = useState<string>(() => {
    if (defaultValue) {
      const option = options.find(opt => opt.value === defaultValue);
      return option ? option.label : '';
    }
    return '';
  });

  const handleChange = (value: string) => {
    const selectedOption = options.find(opt => opt.value === value);
    if (selectedOption) {
      setSelectedLabel(selectedOption.label);
    }
    if (onChange) {
      onChange(value);
    }
  };
  return (
    <Select defaultValue={defaultValue} onValueChange={handleChange}>
      <SelectTrigger
        className={cn(
          "w-full rounded-full border bg-white px-4 py-3 text-left shadow-none focus-visible:ring-0 ",
          className
        )}
      >
        <div className="flex items-center gap-2">
          {showIcon && <img src={icon} alt='calendar' className="sm:h-5 sm:w-5 h-3 w-3 text-gray-500" />}
          <div className={cn("line-clamp-1 text-[#252A39] flex", placeholderClassname)}>
            {selectedLabel || <span>{placeholder}</span>}
          </div>
        </div>
      </SelectTrigger>
      <SelectContent className="bg-white border-none">
        <SelectGroup>
          {options.map((option) => (
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
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ShadSelect;
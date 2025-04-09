import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Option type
export interface SelectOption {
  value: string;
  label: string;
  icon?: any;
}

// Props for the reusable select
interface SearchableSelectProps {
  label?: string;
  defaultValue?: string;
  onValueChange: (value: string) => void;
  isEditable?: boolean;
  options: SelectOption[];
  placeholder?: string;
  inputPlaceholder?: string;
  Icon?: any;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  label = 'Select',
  defaultValue,
  onValueChange,
  isEditable = true,
  options,
  placeholder = 'Select option',
  inputPlaceholder = 'Search...',
  Icon,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue || '');
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [popoverWidth, setPopoverWidth] = useState<string | null>(null);

  useEffect(() => {
    if (triggerRef.current) {
      setPopoverWidth(`min-w-[${triggerRef.current.offsetWidth}px]`); // Set the width of the popover based on the trigger width
    }
  }, [open]);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="space-y-1 w-full">
      {label && <Label htmlFor={label}>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={triggerRef}
            id={label}
            variant="outline"
            role="combobox"
            disabled={!isEditable}
            aria-expanded={open}
            className="w-full border-[#D0D5DD] shadow-none focus-visible:ring-0 focus:shadow-none active:shadow-none text-[#252A39] font-normal mt-3 justify-between"
          >
            <div className='flex gap-3'>
              {Icon && <Icon className="ml-2 h-4 w-4 shrink-0 opacity-70" />}
              {value ? (
                <div className="flex items-center">
                  {selectedOption && (
                    <>
                      {selectedOption.icon && (
                        <span className="mr-2">{selectedOption.icon}</span>
                      )}
                      {selectedOption.label}
                    </>
                  )}
                </div>
              ) : (
                placeholder
              )}
            </div>

            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-70" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn('w-full max-w-none p-0', popoverWidth)} align="start">
          <Command className='border-none'>
            <div className="flex items-center border-b px-3">
              <CommandInput
                placeholder={inputPlaceholder}
                className="flex-1 py-3 outline-none border-none text-[#252A39]"
                noBorder={true}
              />
            </div>
            <CommandEmpty>No match found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {options.map((opt) => (
                  <CommandItem
                    key={opt.value}
                    value={opt.value}
                    onSelect={(currentValue: string) => {
                      setValue(currentValue);
                      onValueChange(currentValue);
                      setOpen(false);
                    }}
                  >
                    <div className="flex items-center">
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === opt.value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {opt.icon && <span className="mr-2">{opt.icon}</span>}
                      {opt.label}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

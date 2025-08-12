import React, { useState, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, ChevronDown, Copy } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Modal from '..';
import { useClickOutside } from '@/hooks/useClickoutside';

const addOrganizationSchema = z.object({
  organizationName: z.string().min(1, 'Organization name is required'),
  industryType: z.enum(['Sport Organization', 'Non-Sport Organization'], {
    required_error: 'Please select an industry type',
  }),
  oneOnOneCoachingLink: z.string().min(1, 'One-on-one coaching link is required'),
});

type AddOrganizationFormValues = z.infer<typeof addOrganizationSchema>;

interface AddOrganizationModalProps {
  show: boolean;
  onClose: () => void;
}

const AddOrganizationModal: React.FC<AddOrganizationModalProps> = ({ show, onClose }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement | null>(null);

  useClickOutside(dropdownRef, dropdownButtonRef, () => setIsDropdownOpen(false));

  const form = useForm<AddOrganizationFormValues>({
    resolver: zodResolver(addOrganizationSchema),
    defaultValues: {
      organizationName: '',
      industryType: undefined,
      oneOnOneCoachingLink: '',
    },
  });

  const onSubmit: SubmitHandler<AddOrganizationFormValues> = (data) => {
    console.log('Organization Data:', data);
    // Reset form and close modal
    form.reset();
    onClose();
  };

  const industryOptions = ['Sport Organization', 'Non-Sport Organization'];

  const handleIndustrySelect = (value: 'Sport Organization' | 'Non-Sport Organization') => {
    form.setValue('industryType', value);
    setIsDropdownOpen(false);
  };

  const handleCopyLink = () => {
    const link = form.getValues('oneOnOneCoachingLink');
    if (link) {
      navigator.clipboard.writeText(link);
    }
  };

  const handleModalClose = () => {
    form.reset();
    setIsDropdownOpen(false);
    onClose();
  };

  return (
    <Modal show={show} onClose={handleModalClose} className="w-full max-w-md mx-4 p-6">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Add Organization</h2>
          <button
            onClick={handleModalClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Organization Name */}
            <FormField
              control={form.control}
              name="organizationName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Organization Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Lakers"
                      className="rounded-lg py-3 px-4 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Industry Type */}
            <FormField
              control={form.control}
              name="industryType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Industry Type
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <button
                        ref={dropdownButtonRef}
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
                      >
                        <span className={field.value ? 'text-gray-900' : 'text-gray-500'}>
                          {field.value || 'Sport Organization'}
                        </span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </button>
                      
                      {isDropdownOpen && (
                        <div
                          ref={dropdownRef}
                          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
                        >
                          {industryOptions.map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handleIndustrySelect(option as 'Sport Organization' | 'Non-Sport Organization')}
                              className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* One-on-one Coaching Link */}
            <FormField
              control={form.control}
              name="oneOnOneCoachingLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    One-on-one Coaching Link
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Sport Organization"
                        className="rounded-lg py-3 px-4 pr-12 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Copy className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleModalClose}
                className="flex-1 py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 py-3 bg-[#64BA9F] hover:bg-[#5aa88f] text-white"
              >
                Add Organization
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default AddOrganizationModal;
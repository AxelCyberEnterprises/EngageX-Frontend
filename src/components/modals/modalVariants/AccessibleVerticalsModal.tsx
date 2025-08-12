import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Modal from '..';

const accessibleVerticalsSchema = z.object({
  presentation: z.boolean().default(false),
  publicSpeaking: z.boolean().default(false),
  pitch: z.boolean().default(false),
  mediaTraining: z.boolean().default(false),
  coach: z.boolean().default(false),
  generalManager: z.boolean().default(false),
});

type AccessibleVerticalsFormValues = z.infer<typeof accessibleVerticalsSchema>;

interface AccessibleVerticalsModalProps {
  show: boolean;
  onClose: () => void;
}

const AccessibleVerticalsModal: React.FC<AccessibleVerticalsModalProps> = ({ show, onClose }) => {
  const form = useForm<AccessibleVerticalsFormValues>({
    resolver: zodResolver(accessibleVerticalsSchema),
    defaultValues: {
      presentation: true,
      publicSpeaking: true,
      pitch: false,
      mediaTraining: false,
      coach: false,
      generalManager: false,
    },
  });

  const onSubmit: SubmitHandler<AccessibleVerticalsFormValues> = (data) => {
    // Filter out only the checked verticals for cleaner logging
    const selectedVerticals = Object.entries(data)
      .filter(([key, value]) => value === true)
      .map(([key]) => key);
    
    console.log('Selected Accessible Verticals:', selectedVerticals);
    console.log('Full Form Data:', data);
    
    // Close modal after submission
    onClose();
  };

  const handleModalClose = () => {
    onClose();
  };

  const verticalOptions = [
    { key: 'presentation', label: 'Presentation' },
    { key: 'publicSpeaking', label: 'Public speaking' },
    { key: 'pitch', label: 'Pitch' },
    { key: 'mediaTraining', label: 'Media Training' },
    { key: 'coach', label: 'Coach' },
    { key: 'generalManager', label: 'General Manager' },
  ];

  return (
    <Modal show={show} onClose={handleModalClose} className="w-full max-w-md mx-4 p-6">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Accessible Verticals</h2>
          <button
            onClick={handleModalClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Verticals Checkboxes */}
            <div className="space-y-4">
              {verticalOptions.map((option) => (
                <FormField
                  key={option.key}
                  control={form.control}
                  name={option.key as keyof AccessibleVerticalsFormValues}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-[#64BA9F] data-[state=checked]:border-[#64BA9F]"
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-medium text-gray-900 cursor-pointer">
                        {option.label}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6">
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
                Save Verticals
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default AccessibleVerticalsModal;
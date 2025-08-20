import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Modal from '..';
import { useUpdateEnterpriseVerticals } from '@/hooks/organization/useUpdateEnterpriseVerticals';
import { Vertical } from '@/hooks/organization';

const createAccessibleVerticalsSchema = (verticals: Vertical[]) => {
  const schemaObject: Record<string, z.ZodBoolean> = {};
  verticals?.forEach((vertical) => {
    schemaObject[vertical.value] = z.boolean();
  });
  return z.object(schemaObject);
};

interface AccessibleVerticalsModalProps {
  show: boolean;
  onClose: () => void;
  verticals: Vertical[] | undefined;
  accessibleVerticals: any[] | undefined;
  orgId: number;
}

const AccessibleVerticalsModal: React.FC<AccessibleVerticalsModalProps> = ({
  show,
  onClose,
  verticals = [],
  accessibleVerticals = [],
  orgId
}) => {
  const accessibleVerticalsSchema = createAccessibleVerticalsSchema(verticals);
  type AccessibleVerticalsFormValues = z.infer<typeof accessibleVerticalsSchema>;

  const getDefaultValues = (): AccessibleVerticalsFormValues => {
    const defaults: Record<string, boolean> = {};
    verticals.forEach((vertical) => {
      const isAccessible = accessibleVerticals?.includes(vertical.value) ?? false;
      defaults[vertical.value] = isAccessible;
    });
    return defaults as AccessibleVerticalsFormValues;
  };

  const form = useForm<AccessibleVerticalsFormValues>({
    resolver: zodResolver(accessibleVerticalsSchema),
    defaultValues: getDefaultValues(),
  });

  const { mutate, isPending } = useUpdateEnterpriseVerticals(orgId);

  const onSubmit: SubmitHandler<AccessibleVerticalsFormValues> = (data) => {
    const selectedVerticals = Object.entries(data)
      .filter(([, value]) => value === true)
      .map(([key]) => key);

    mutate(
      { accessible_verticals: selectedVerticals },
      {
        onSuccess: () => {
          console.log('Accessible verticals updated successfully');
          onClose();
        },
        onError: (error) => {
          console.error('Failed to update verticals', error);
        },
      }
    );
  };

  const handleModalClose = () => {
    form.reset();
    onClose();
  };

  React.useEffect(() => {
    if (verticals?.length > 0) {
      form.reset(getDefaultValues());
    }
  }, [verticals, form]);

  return (
    <Modal show={show} onClose={handleModalClose} className="w-full max-w-md mx-4 p-6">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[24px] font-medium text-gray-900">Accessible Verticals</h2>
          <button onClick={handleModalClose} className="p-1 bg-white">
            <X className="w-6 h-6 text-black" />
          </button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Verticals Checkboxes */}
            <div className="space-y-4">
              {verticals?.map((option: any) => (
                <FormField
                  key={option.value}
                  control={form.control}
                  name={option.value as keyof AccessibleVerticalsFormValues}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="bg-[#fff] w-[23px] h-[22px] data-[state=checked]:bg-[#221e8ada] data-[state=checked]:border-[#FFF]"
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

            <div className="flex gap-3 pt-6 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={handleModalClose}
                className="py-3 px-6 border-gray-300 text-gray-700 hover:bg-gray-50"
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="py-3 px-6 bg-[#64BA9F] hover:bg-[#5aa88f] text-white"
                disabled={isPending}
              >
                {isPending ? 'Saving...' : 'Save Verticals'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default AccessibleVerticalsModal;
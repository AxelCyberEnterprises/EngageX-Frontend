import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import settings from '../../assets/images/svgs/settings.svg';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUpdatePassword } from '@/hooks/settings';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

const formSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
  twoFactorEnabled: z.boolean().default(false)
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const AccountSecurity: React.FC = () => {
  const { mutate, isError, isSuccess, isPending } = useUpdatePassword();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      twoFactorEnabled: false,
    },
    mode: "onChange"
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const onSubmit = (data: FormValues) => {
    const formattedData = {
      current_password: data.currentPassword,
      password: data.newPassword,
      confirm_password: data.newPassword
    }
    mutate(formattedData);
  };

  useEffect(() => {
    if (isError) {
      toast.error('Error updating password!')
    } else if (isSuccess) {
      toast.info('Password updated successfully')
      form.reset();
    }
  }, [isError, isPending, isSuccess])

  return (
      <Card className="w-full border-none shadow-none py-8">
          <CardHeader className="px-0 pb-0">
              <div className="flex gap-4 flex-row sm:items-center justify-between w-full">
                  <div>
                      <CardTitle className="text-xl font-medium text-[#10161E]">Account & Security</CardTitle>
                      <p className="text-sm text-[#6F7C8E] mt-1">Manage your account settings and preferences</p>
                  </div>
                  <div className="flex gap-2 mt-4 sm:mt-0">
                      <Button
                          variant="outline"
                          onClick={() => {
                              setIsEditMode(false);
                          }}
                          className="border-[#D0D5DD] text-[#6F7C8E] sm:flex hidden"
                      >
                          Cancel
                      </Button>
                      <Button
                          variant="default"
                          className="flex items-center gap-2"
                          onClick={() => {
                              setIsEditMode(true);
                          }}
                      >
                          <img
                              src={settings}
                              alt="settings"
                              className="xl:w-[20px] xl:h-[20px] w-5 h-5 sm:text-base text-sm"
                          />
                          Manage
                      </Button>
                  </div>
              </div>
          </CardHeader>
          {isPending ? (
              <div className="flex items-center justify-center py-[200px]">
                  <LoaderCircle className="size-10 animate-spin" />
              </div>
          ) : (
              <CardContent className="px-0 pt-6 md:w-[60%]">
                  <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                          <div className="space-y-4">
                              <h3 className="text-lg font-medium text-[#10161E]">Password</h3>
                              <p className="text-sm text-[#6F7C8E]">
                                  Please enter your current password to change your password
                              </p>

                              <div className="space-y-6 mt-4">
                                  <FormField
                                      control={form.control}
                                      name="currentPassword"
                                      render={({ field }) => (
                                          <FormItem className="space-y-2">
                                              <FormLabel className="text-[#10161E]">
                                                  Current password<span className="text-red-500">*</span>
                                              </FormLabel>
                                              <FormControl>
                                                  <Input
                                                      type="password"
                                                      {...field}
                                                      disabled={!isEditMode}
                                                      className="w-full shadow-none focus-visible:ring-0 focus:shadow-none active:shadow-none text-[#252A39] font-normal"
                                                  />
                                              </FormControl>
                                              <FormMessage className="text-red-500 text-sm" />
                                          </FormItem>
                                      )}
                                  />

                                  <FormField
                                      control={form.control}
                                      name="newPassword"
                                      render={({ field }) => (
                                          <FormItem className="space-y-2">
                                              <FormLabel className="text-[#10161E]">
                                                  New password<span className="text-red-500">*</span>
                                              </FormLabel>
                                              <FormControl>
                                                  <Input
                                                      type="password"
                                                      {...field}
                                                      disabled={!isEditMode}
                                                      className="w-full shadow-none focus-visible:ring-0 focus:shadow-none active:shadow-none text-[#252A39] font-normal"
                                                  />
                                              </FormControl>
                                              <FormMessage className="text-red-500 text-sm" />
                                          </FormItem>
                                      )}
                                  />

                                  <FormField
                                      control={form.control}
                                      name="confirmPassword"
                                      render={({ field }) => (
                                          <FormItem className="space-y-2">
                                              <FormLabel className="text-[#10161E]">
                                                  Confirm new password<span className="text-red-500">*</span>
                                              </FormLabel>
                                              <FormControl>
                                                  <Input
                                                      type="password"
                                                      {...field}
                                                      disabled={!isEditMode}
                                                      className={`w-full shadow-none focus-visible:ring-0 focus:shadow-none active:shadow-none text-[#252A39] font-normal ${
                                                          form.formState.errors.confirmPassword
                                                              ? "border-red-500"
                                                              : field.value &&
                                                                  field.value === form.getValues("newPassword")
                                                                ? "border-green-500"
                                                                : ""
                                                      }`}
                                                  />
                                              </FormControl>
                                              <FormMessage className="text-red-500 text-sm" />
                                              {field.value &&
                                                  field.value === form.getValues("newPassword") &&
                                                  field.value.length > 0 && (
                                                      <p className="text-green-500 text-sm">Correct password</p>
                                                  )}
                                          </FormItem>
                                      )}
                                  />
                              </div>
                          </div>

                          <div className="py-4">
                              <FormField
                                  control={form.control}
                                  name="twoFactorEnabled"
                                  render={({ field }) => (
                                      <FormItem className="flex flex-row gap-4 items-start">
                                          <FormControl>
                                              <Switch
                                                  checked={field.value}
                                                  disabled={!isEditMode}
                                                  onCheckedChange={field.onChange}
                                                  className="p-0 justify-start w-8 [&_[data-slot='switch-thumb']]:size-4"
                                              />
                                          </FormControl>
                                          <div className="space-y-1">
                                              <FormLabel className="text-[#10161E] font-medium">
                                                  Enable Two-Factor Authentication
                                              </FormLabel>
                                              <p className="text-sm text-[#6F7C8E]">
                                                  Keep your account always secure by enabling 2FA
                                              </p>
                                          </div>
                                      </FormItem>
                                  )}
                              />
                          </div>

                          <div className="mt-8 flex sm:flex-row flex-col sm:justify-end w-full gap-6">
                              <Button
                                  variant="outline"
                                  onClick={() => {}}
                                  className="border-[#D0D5DD] text-[#6F7C8E] sm:hidden w-full sm:w-auto"
                              >
                                  Cancel
                              </Button>
                              <Button
                                  type="submit"
                                  className="px-10 w-full sm:w-auto bg-branding-primary hover:bg-branding-primary/90"
                              >
                                  {isPending ? "Saving..." : "Save Password"}
                              </Button>
                          </div>
                      </form>
                  </Form>
              </CardContent>
          )}
      </Card>
  );
};

export default AccountSecurity;
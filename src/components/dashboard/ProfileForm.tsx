import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, Globe, Clock, LoaderCircle } from 'lucide-react';
import uploadCloud from '../../assets/images/svgs/upload-cloud.svg';
import verified from '../../assets/images/svgs/verified.svg';
import profileEdit from '../../assets/images/svgs/profile-edit.svg';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SearchableSelect } from '../select/CustomSelect';
import { useUpdateUserProfile, useUserProfile } from '@/hooks/settings';
import { toast } from 'sonner';

const personalInfoSchema = z.object({
  first_name: z.string().min(1, 'First name is required').optional(),
  last_name: z.string().min(1, 'Last name is required').optional(),
  email: z.string().email('Invalid email address').optional(),
  profile_picture: z.any().optional(),
  company: z.string().transform(val => val === "" ? undefined : val).optional(),
  industry: z.string().transform(val => val === "" ? undefined : val).optional(),
  country: z.string().transform(val => val === "" ? undefined : val).optional(),
  timezone: z.string().transform(val => val === "" ? undefined : val).optional(),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

const PersonalInfoForm: React.FC = () => {
  const { data: profile, isLoading, error: fetchProfileError } = useUserProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateUserProfile();
  const initialData: PersonalInfoFormData = {
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    email: profile?.email || "",
    company: profile?.company || "",
    industry: profile?.industry || "",
    country: profile?.country || "",
    timezone: profile?.timezone || "",
    profile_picture: undefined
  };
  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: initialData
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('profile_picture', file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const submit = (data: PersonalInfoFormData) => {
    const formData = new FormData();
    if (data.first_name) formData.append('first_name', data.first_name);
    if (data.last_name) formData.append('last_name', data.last_name);
    if (data.email) formData.append('email', data.email);
    if (data.company) formData.append('company', data.company);
    if (data.industry) formData.append('industry', data.industry);
    if (data.country) formData.append('country', data.country);
    if (data.timezone) formData.append('timezone', data.timezone);
    if (data.profile_picture) formData.append('profile_picture', data.profile_picture);

    console.log(data.profile_picture);
    
    updateProfile(formData, {
      onSuccess: () => {
        toast.success('Profile updated successfully');
        setIsEditMode(false);
      },
      onError: (error) => {
        console.error('Profile update error:', error);
        toast.error('Failed to update profile: ' + (error.message || 'Unknown error'));
      }
    });
  };
  

  const countries = [
    { value: "Canada", label: "Canada", icon: "🇨🇦" },
    { value: "Nigeria", label: "Nigeria", icon: "🇳🇬" },
    { value: "United Kingdom", label: "United Kingdom", icon: "🇬🇧" },
    { value: "United States", label: "United States", icon: "🇺🇸" },
  ];

  const timezoneOptions = [
    {
      value: "Pacific Standard Time (PST)",
      label: "Pacific Standard Time (PST)",
      icon: <span className="text-[#667085] ml-1">UTC-08:00</span>,
    },
    {
      value: "Eastern Standard Time (EST)",
      label: "Eastern Standard Time (EST)",
      icon: <span className="text-[#667085] ml-1">UTC-05:00</span>,
    },
    {
      value: "Central European Time (CET)",
      label: "Central European Time (CET)",
      icon: <span className="text-[#667085] ml-1">UTC+01:00</span>,
    },
  ];

  const industryOptions = [
    { value: "Media & Presentation", label: "Media & Presentation" },
    { value: "Technology", label: "Technology" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Finance", label: "Finance" },
    { value: "Education", label: "Education" },
  ];

  useEffect(() => {
    if (profile) {
      form.reset({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        email: profile.email || "",
        company: profile.company || "",
        industry: profile.industry || "",
        country: profile.country || "",
        timezone: profile.timezone || "",
        profile_picture: undefined
      });
      if (profile.profile_picture) {
        setPhotoPreview(profile.profile_picture);
      }
    } else if (fetchProfileError) {
      toast.error('Error fetching profile details')
    }
  }, [profile, form, fetchProfileError]);

  const handleCancel = () => {
    form.reset({
      first_name: profile?.first_name || "",
      last_name: profile?.last_name || "",
      email: profile?.email || "",
      company: profile?.company || "",
      industry: profile?.industry || "",
      country: profile?.country || "",
      timezone: profile?.timezone || "",
      profile_picture: undefined
    });
    setPhotoPreview(profile?.profile_picture || null);
    setIsEditMode(false);
  };

  return (
    <Card className="w-full border-none shadow-none py-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <CardHeader className='flex flex-row justify-between px-0 w-full'>
            <div>
              <CardTitle className="text-xl font-medium">Personal info</CardTitle>
              <p className="text-sm text-[#6F7C8E] mb-6">Update your photo and personal details here.</p>
            </div>
            <div className='flex gap-4'>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="w-full sm:w-auto text-[#6F7C8E] sm:flex hidden"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => { setIsEditMode(true) }}
                className="w-full sm:w-auto text-white"
              >
                <img
                  src={profileEdit}
                  alt="Profile edit"
                  className="xl:w-[20px] xl:h-[20px] w-5 h-5 sm:text-base text-sm"
                />
                Edit
              </Button>
            </div>
          </CardHeader>
          {isUpdating || isLoading ?
            <div className='flex items-center justify-center py-[200px]'>
              <LoaderCircle className="size-10 animate-spin" />
            </div>
            : <CardContent className="space-y-6 px-0 w-full lg:w-[55%]">
              <div className="space-y-1">
                <Label htmlFor="first_name">Enter name</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your first name"
                            {...field}
                            disabled={!isEditMode}
                            className="w-full shadow-none focus-visible:ring-0 focus:shadow-none active:shadow-none text-[#252A39] font-normal mt-3"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your last name"
                            {...field}
                            disabled={!isEditMode}
                            className="w-full shadow-none focus-visible:ring-0 focus:shadow-none active:shadow-none text-[#252A39] font-normal mt-3"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-[#10161E]">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          {...field}
                          disabled={true}
                          className="w-full shadow-none focus-visible:ring-0 focus:shadow-none active:shadow-none text-[#252A39] font-normal mt-3"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label>Upload your photo</Label>
                <p className="text-sm text-[#6F7C8E]">This will be displayed on your profile.</p>
                <div className="flex flex-col sm:flex-row items-start gap-6 py-3">
                  <div className="relative">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Profile"
                        className="w-16 h-16 rounded-full object-cover border"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-100 border border-[#EAECF0] flex items-center justify-center">
                        <Upload size={20} className="text-gray-400" />
                      </div>
                    )}
                    <img
                      src={verified}
                      alt="upload"
                      className="mx-auto h-5 w-5 cursor-pointer absolute bottom-1 -right-1"
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <div className="border border-[#EAECF0] rounded-lg p-4 sm:px-8 sm:py-4 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                      <input
                        type="file"
                        id="photo"
                        className="hidden"
                        disabled={!isEditMode}
                        accept="image/svg+xml,image/png,image/jpeg,image/gif"
                        onChange={handlePhotoChange}
                      />
                      <label htmlFor="photo" className="cursor-pointer">
                        <img
                          src={uploadCloud}
                          alt="upload"
                          className="mx-auto h-10 w-10 sm:h-12 sm:w-12 cursor-pointer" />

                        <p className="mt-2 text-xs text-[#10161E]">Click to upload <span className="text-xs text-[#6F7C8E]">or drag and drop</span></p>

                        <p className="mt-1 text-xs text-[#6F7C8E] font-light">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-[#10161E]">
                      Company Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        disabled={!isEditMode}
                        className="w-full shadow-none focus-visible:ring-0 focus:shadow-none active:shadow-none text-[#252A39] font-normal mt-3"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              <SearchableSelect
                label="Industry"
                defaultValue={initialData?.industry}
                onValueChange={(value) => form.setValue('industry', value)}
                isEditable={isEditMode}
                placeholder="Select industry"
                inputPlaceholder="Search industries..."
                options={industryOptions}
                Icon={Globe}
              />

              <SearchableSelect
                label="Country"
                defaultValue={initialData?.country}
                onValueChange={(value) => form.setValue('country', value)}
                options={countries}
                placeholder="Select country"
                inputPlaceholder="Search countries..."
                isEditable={isEditMode}
              />

              <div className="space-y-1">
                <SearchableSelect
                  label="Timezone"
                  defaultValue={initialData?.timezone}
                  onValueChange={(value) => form.setValue('timezone', value)}
                  isEditable={isEditMode}
                  placeholder="Select timezone"
                  inputPlaceholder="Search timezones..."
                  options={timezoneOptions}
                  Icon={Clock}
                />
              </div>
              <div className="pt-4 border-t">
                <div className="flex flex-col space-y-1">
                  <p className="font-medium">Credits Remaining: <span className="text-green-500 ml-[2px]">{profile?.available_credits ? parseInt(profile?.available_credits) : 'No credits available'}</span></p>
                  <p className="text-xs text-[#64BA9F] hover:underline cursor-pointer">You can buy new credits anytime</p>
                </div>
              </div>

            </CardContent>
          }

          <CardFooter className="flex sm:justify-end sm:flex-row flex-col w-full mt-4 sm:gap-2 gap-6 px-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset}
              className="w-full sm:w-auto text-[#6F7C8E] sm:hidden"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUpdating}
              className="w-full sm:w-auto"
            >
              {isUpdating ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>

  );
};

export default PersonalInfoForm;
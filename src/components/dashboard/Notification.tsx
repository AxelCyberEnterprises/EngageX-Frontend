import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useUserProfile, useUpdateUserProfile } from '@/hooks/settings';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';

interface NotificationOption {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  apiField: string; // Field name in the API
}

interface NotificationCategory {
  id: string;
  title: string;
  options: NotificationOption[];
}

const NotificationSettings: React.FC = () => {
  const { data: profile, isLoading } = useUserProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateUserProfile();
  
  // Initial state structure
  const [categories, setCategories] = useState<NotificationCategory[]>([
    {
      id: 'email',
      title: 'Email Notifications',
      options: [
        {
          id: 'email-alerts',
          title: 'Email Alerts',
          description: 'Receive important updates and announcements via Email',
          enabled: false,
          apiField: 'email_alert'
        },
      ],
    },
    {
      id: 'practice',
      title: 'Practice Reminders',
      options: [
        {
          id: 'daily-practice',
          title: 'Daily Practice Reminders',
          description: 'Get notifications to maintain your practice schedule',
          enabled: false,
          apiField: 'practice_reminder'
        },
      ],
    },
    {
      id: 'community',
      title: 'Community Updates',
      options: [
        {
          id: 'community-leaderboard',
          title: 'Community & Leaderboard Updates',
          description: 'Stay informed about community activities and your ranking',
          enabled: false,
          apiField: 'session_analysis' // Reusing session_analysis field for community updates
        },
      ],
    },
  ]);

  // Update local state when profile data is loaded
  useEffect(() => {
    if (profile) {
      setCategories(prevCategories =>
        prevCategories.map(category => ({
          ...category,
          options: category.options.map(option => ({
            ...option,
            // @ts-ignore - Using dynamic key access
            enabled: !!profile[option.apiField]
          }))
        }))
      );
    }
  }, [profile]);

  const toggleOption = (categoryId: string, optionId: string) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            options: category.options.map((option) => {
              if (option.id === optionId) {
                return {
                  ...option,
                  enabled: !option.enabled,
                };
              }
              return option;
            }),
          };
        }
        return category;
      })
    );
  };

  const handleSave = () => {
    // Create an object with the notification settings
    const notificationSettings: Record<string, boolean> = {};
    
    // Collect all notification settings
    categories.forEach(category => {
      category.options.forEach(option => {
        notificationSettings[option.apiField] = option.enabled;
      });
    });
    
    // Create FormData for the API request
    const formData = new FormData();
    Object.keys(notificationSettings).forEach(key => {
      formData.append(key, notificationSettings[key].toString());
    });
    
    // Update profile
    updateProfile(formData, {
      onSuccess: () => {
        toast.success('Notification settings updated successfully');
      },
      onError: (error) => {
        console.error('Failed to update notification settings:', error);
        toast.error('Failed to update notification settings');
      }
    });
  };

  const handleCancel = () => {
    // Reset to the original values from the profile
    if (profile) {
      setCategories(prevCategories =>
        prevCategories.map(category => ({
          ...category,
          options: category.options.map(option => ({
            ...option,
            // @ts-ignore - Using dynamic key access
            enabled: !!profile[option.apiField]
          }))
        }))
      );
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full border-none shadow-none py-8">
        <div className='flex items-center justify-center py-[200px]'>
          <LoaderCircle className="size-10 animate-spin" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full border-none shadow-none py-8">
      <CardHeader className="px-0 pb-0">
        <div className="flex flex-row sm:items-center justify-between gap-4 w-full">
          <div>
            <CardTitle className="text-xl font-medium text-[#10161E]">Notifications</CardTitle>
            <p className="text-sm text-[#6F7C8E] mt-1">Choose how you want to customize your notifications</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0 pt-6 md:w-[60%]">
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category.id} className="space-y-4">
              <h3 className="text-lg font-medium text-[#10161E]">{category.title}</h3>
              <div className="space-y-4">
                {category.options.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-start gap-4 py-2"
                  >
                    <Switch
                      checked={option.enabled}
                      onCheckedChange={() => toggleOption(category.id, option.id)}
                      className="p-0 justify-start w-8 [&_[data-slot='switch-thumb']]:size-4"
                    >
                    </Switch>

                    <div className="space-y-1">
                      <p className="font-medium text-[#10161E]">{option.title}</p>
                      <p className="text-sm text-[#6F7C8E]">{option.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex sm:flex-row flex-col sm:justify-end w-full gap-6">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="border-[#D0D5DD] text-[#6F7C8E] sm:hidden w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="px-10 w-full sm:w-auto"
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
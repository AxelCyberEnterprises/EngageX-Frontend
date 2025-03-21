import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import settings from '../../assets/images/svgs/settings.svg';

interface NotificationOption {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

interface NotificationCategory {
  id: string;
  title: string;
  options: NotificationOption[];
}

interface NotificationSettingsProps {
  onSave: (categories: NotificationCategory[]) => void;
  onCancel: () => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  onSave,
  onCancel,
}) => {
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
        },
      ],
    },
    {
      id: 'session',
      title: 'Session Analysis',
      options: [
        {
          id: 'auto-session',
          title: 'Automatic Session Analysis',
          description: 'Receive detailed session analysis after each practice session',
          enabled: false,
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
        },
      ],
    },
  ]);

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
    onSave(categories);
  };

  return (
    <Card className="w-full border-none shadow-none py-8">
      <CardHeader className="px-0 pb-0">
        <div className="flex flex-row sm:items-center justify-between gap-4 w-full">
          <div>
            <CardTitle className="text-xl font-medium text-[#10161E]">Notifications</CardTitle>
            <p className="text-sm text-[#6F7C8E] mt-1">Choose how you want to customize your notifications</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button
              variant="outline"
              onClick={onCancel}
              className="border-[#D0D5DD] text-[#6F7C8E] sm:flex hidden"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              className="flex items-center gap-2"
              onClick={onCancel}
            >
              <img
                src={settings}
                alt="Profile edit"
                className="xl:w-[20px] xl:h-[20px] w-5 h-5 sm:text-base text-sm"
              />
              Manage
            </Button>
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
                      className="relative bg-[#252A39] rounded-full transition-colors flex items-center py-[1px] px-1 border-0 [&>*[data-slot='switch-thumb'][data-state='unchecked']]:-translate-x-[7px]"
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
            onClick={onCancel}
            className="border-[#D0D5DD] text-[#6F7C8E] sm:hidden w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="px-10 w-full sm:w-auto"
          >
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
import { SettingSwitch } from "../components/SettingSwitch";
import { useSettingsForm } from "../hooks/useSettingsForm";
import { SettingsSubmitButton } from "../components/SettingsSubmitButton";

export const NotificationsSettingsForm = () => {
  const { form, onSubmit, isLoading } = useSettingsForm([
    "emailNotificationsEnabled",
  ]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <SettingSwitch
          control={form.control}
          name="emailNotificationsEnabled"
          label="Email notifications"
          description="Receive notifications via email"
          id="receive-email-notifications"
        />
      </div>

      <SettingsSubmitButton isLoading={isLoading} />
    </form>
  );
};

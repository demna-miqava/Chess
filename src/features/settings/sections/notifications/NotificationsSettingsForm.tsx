import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const NotificationsSettingsForm = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Notifications settings:", {
      emailNotifications,
    });
    // TODO: Implement save logic
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b">
          <div className="space-y-0.5">
            <Label htmlFor="email-notifications">Email notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive notifications via email
            </p>
          </div>
          <Switch
            id="email-notifications"
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        Save Changes
      </Button>
    </form>
  );
};

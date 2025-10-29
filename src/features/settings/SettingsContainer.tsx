import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Bell,
  Gamepad2,
  LayoutDashboard,
  MessageCircle,
  Palette,
  ShieldCheck,
  User,
} from "lucide-react";
import { BoardSettingsForm } from "./sections/BoardSettingsForm";
import { GameplaySettingsForm } from "./sections/GameplaySettingsForm";
import { ProfileSettingsForm } from "./sections/profile/ProfileSettingsForm";
import { InterfaceSettingsForm } from "./sections/InterfaceSettingsForm";
import { SocialSettingsForm } from "./sections/SocialSettingsForm";
import { NotificationsSettingsForm } from "./sections/NotificationsSettingsForm";
import { AccountSettingsForm } from "./sections/account/AccountSettingsForm";

const sections = [
  {
    value: "board",
    label: "Board & Pieces",
    icon: Palette,
    description: "Customize your board appearance and behavior",
    component: BoardSettingsForm,
  },
  {
    value: "gameplay",
    label: "Gameplay",
    icon: Gamepad2,
    description: "Configure gameplay preferences and analysis options",
    component: GameplaySettingsForm,
  },
  {
    value: "profile",
    label: "Profile",
    icon: User,
    description: "Update your profile picture and bio",
    component: ProfileSettingsForm,
  },
  {
    value: "interface",
    label: "Interface",
    icon: LayoutDashboard,
    description: "Customize your interface appearance and display preferences",
    component: InterfaceSettingsForm,
  },
  {
    value: "social",
    label: "Social",
    icon: MessageCircle,
    description: "Manage your social interactions and privacy",
    component: SocialSettingsForm,
  },
  {
    value: "notifications",
    label: "Notifications",
    icon: Bell,
    description: "Manage your notification preferences",
    component: NotificationsSettingsForm,
  },
  {
    value: "account",
    label: "Account",
    icon: ShieldCheck,
    description: "Manage your password and email settings",
    component: AccountSettingsForm,
  },
];

export const SettingsContainer = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="w-full">
        <Accordion type="single" collapsible className="w-full">
          {sections.map(
            ({
              value,
              label,
              icon: Icon,
              description,
              component: Component,
            }) => (
              <AccordionItem key={value} value={value}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Icon className="size-5" />
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <p className="text-muted-foreground text-sm">
                      {description}
                    </p>
                    {Component && <Component />}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          )}
        </Accordion>
      </div>
    );
  }

  return (
    <Tabs defaultValue="board" className="flex-row gap-4 w-full">
      {/* Desktop Sidebar */}
      <TabsList className="h-full flex-col gap-2 px-2 py-3">
        {sections.map(({ icon: Icon, label, value }) => (
          <TabsTrigger
            value={value}
            key={label}
            className="flex w-full justify-start"
            aria-label="tab-trigger"
          >
            <Icon size={205} className="size-8" />
            <span className="text-sm">{label}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Desktop Content */}
      {sections.map(({ value, label, description, component: Component }) => (
        <TabsContent key={value} value={value} className="ml-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">{label}</h2>
              <p className="text-muted-foreground text-sm mt-1">
                {description}
              </p>
            </div>
            {Component && <Component />}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

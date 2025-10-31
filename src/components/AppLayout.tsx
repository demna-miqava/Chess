import { Outlet } from "react-router";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { SettingsProvider } from "@/features/settings/SettingsContext";
import { ChallengesProvider } from "@/features/notifications/context/ChallengesContext";

export const AppLayout = () => {
  return (
    <SidebarProvider>
      <SettingsProvider>
        <ChallengesProvider>
          <AppSidebar />
          <SidebarInset>
            <div className="p-4 min-h-screen">
              <Outlet />
            </div>
          </SidebarInset>
        </ChallengesProvider>
      </SettingsProvider>
    </SidebarProvider>
  );
};

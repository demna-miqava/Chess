import { Outlet } from "react-router";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { SettingsProvider } from "@/features/settings/SettingsContext";
import { useNotificationsWebSocket } from "@/features/notifications/hooks/useNotificationsWebSocket";

export const AppLayout = () => {
  useNotificationsWebSocket();
  return (
    <SidebarProvider>
      <SettingsProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="p-4 min-h-screen">
            <Outlet />
          </div>
        </SidebarInset>
      </SettingsProvider>
    </SidebarProvider>
  );
};

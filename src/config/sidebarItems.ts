import { Home, Puzzle, Settings, User, type LucideIcon } from "lucide-react";

export interface SidebarItem {
  title: string;
  url: string | ((id: number) => string);
  icon: LucideIcon;
  color: string;
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
    color: "text-muted-foreground",
  },
  {
    title: "Puzzles",
    url: "/home",
    icon: Puzzle,
    color: "text-muted-foreground",
  },
  {
    title: "Profile",
    url: (id: number) => `/profile/${id}`,
    icon: User,
    color: "text-muted-foreground",
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    color: "text-muted-foreground",
  },
];

export const getSidebarItems = (id: number) => {
  return SIDEBAR_ITEMS.map((item) => ({
    ...item,
    url: typeof item.url === "function" ? item.url(id) : item.url,
  }));
};

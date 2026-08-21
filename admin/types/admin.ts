import { LucideIcon } from "lucide-react";

export type AdminRole = "Super Admin" | "Admin" | "Editor" | "Viewer";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role_name: string;
  permissions: string[];
};

export type NavSubItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type NavItem = {
  href?: string;
  label: string;
  icon: LucideIcon;
  permissions: string[];
  children?: NavSubItem[];
};

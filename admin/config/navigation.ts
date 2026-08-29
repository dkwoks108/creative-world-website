import {
  LayoutDashboard,
  Inbox,
  Contact,
  FileEdit,
  FileText,
  Image as ImageIcon,
  Layers,
  Briefcase,
  Users2,
  Star,
  LineChart,
  Search,
  Globe,
  Mail,
  Bell,
  Shield,
  History,
  Settings,
  Activity,
} from "lucide-react";
import { NavItem } from "../types/admin";

export interface NavGroup {
  category: string;
  items: NavItem[];
}

export const adminNavGroups: NavGroup[] = [
  {
    category: "MAIN COMMAND CENTER",
    items: [
      { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, permissions: ["analytics.view"] },
    ],
  },
  {
    category: "LEADS & CRM",
    items: [
      { href: "/admin/inquiries", label: "Inquiries & Pipeline", icon: Inbox, permissions: ["users.view"] },
      { href: "/admin/contacts", label: "Contacts & CRM", icon: Contact, permissions: ["users.view"] },
    ],
  },
  {
    category: "CONTENT & PUBLISHING",
    items: [
      { href: "/admin/blogs", label: "Blog & Articles", icon: FileEdit, permissions: ["content.create"] },
      { href: "/admin/pages", label: "Dynamic Pages", icon: FileText, permissions: ["content.create"] },
      { href: "/admin/media", label: "Media Library", icon: ImageIcon, permissions: ["content.create"] },
    ],
  },
  {
    category: "AGENCY CONTENT",
    items: [
      { href: "/admin/services", label: "Services", icon: Layers, permissions: ["content.edit"] },
      { href: "/admin/portfolio", label: "Portfolio & Work", icon: Briefcase, permissions: ["content.edit"] },
      { href: "/admin/team", label: "Team Members", icon: Users2, permissions: ["content.edit"] },
      { href: "/admin/testimonials", label: "Testimonials", icon: Star, permissions: ["content.edit"] },
    ],
  },
  {
    category: "MARKETING & SEO",
    items: [
      { href: "/admin/analytics", label: "Analytics & Reports", icon: LineChart, permissions: ["analytics.view"] },
      { href: "/admin/seo", label: "SEO & Redirects", icon: Search, permissions: ["settings.general"] },
    ],
  },
  {
    category: "WEBSITE & COMMUNICATION",
    items: [
      { href: "/admin/website", label: "Website Control Center", icon: Globe, permissions: ["settings.general"] },
      { href: "/admin/forms", label: "Forms & Email", icon: Mail, permissions: ["settings.general"] },
      { href: "/admin/notifications", label: "Notifications", icon: Bell, permissions: ["settings.general"] },
    ],
  },
  {
    category: "SYSTEM & SECURITY",
    items: [
      { href: "/admin/users", label: "Users & Roles", icon: Shield, permissions: ["users.create"] },
      { href: "/admin/audit-logs", label: "Audit Log", icon: History, permissions: ["settings.security"] },
      { href: "/admin/system-health", label: "System Health", icon: Activity, permissions: ["settings.security"] },
      { href: "/admin/settings", label: "Settings", icon: Settings, permissions: ["settings.general"] },
    ],
  },
];

export const allNavItems: NavItem[] = adminNavGroups.flatMap((g) => g.items);

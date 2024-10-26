import { HomeIcon, ReaderIcon } from "@radix-ui/react-icons";

import {
  Home,
  Settings,
  Rocket,
  MonitorCog,
  LayoutList,
  NotepadTextDashed,
  ArrowLeftRight,
} from "lucide-react";

export const navigations = [
  {
    name: "Docs",
    link: "/docs",
    Icon: ReaderIcon,
  },
];

export const sidebarNavigations = [
  {
    name: "Home",
    link: "/",
    Icon: Home,
  },
  {
    name: "Campaigns",
    link: "/campaigns",
    Icon: Rocket,
  },
  {
    name: "Contact-lists",
    link: "/contact-lists",
    Icon: LayoutList,
  },
  {
    name: "Templates",
    link: "/templates",
    Icon: NotepadTextDashed,
  },
  {
    name: "Transactional",
    link: "/transactional",
    Icon: ArrowLeftRight,
  },
  {
    name: "Project config",
    link: "/project/default",
    Icon: MonitorCog,
  },
];

export const sidebarDownNavigations = [
  {
    name: "Settings",
    link: "/settings",
    Icon: Settings,
  },
];

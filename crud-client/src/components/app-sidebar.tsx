import * as React from "react"
import { GalleryVerticalEnd, Wrench } from "lucide-react"
import { Link } from "react-router-dom"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Karbantartás",
      url: "/maintenance",
      icon: Wrench,
      isActive: true,
      items: [
        {
          title: "Felhasználók",
          url: "/maintenance/user",
        },
        {
          title: "Rendszerbeállítások",
          url: "/maintenance/settings",
        },
        {
          title: "Adatbázis",
          url: "/maintenance/database",
        },
        {
          title: "Biztonság",
          url: "/maintenance/security",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link 
          to="/" 
          className="flex items-center gap-2 px-2 py-1.5 text-lg font-semibold hover:text-primary transition-colors overflow-hidden"
        >
          <GalleryVerticalEnd className="h-6 w-6 flex-shrink-0" />
          <span className="sidebar-collapsed:opacity-0 sidebar-collapsed:w-0 transition-all duration-200">CrudApp</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

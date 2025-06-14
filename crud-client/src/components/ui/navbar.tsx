import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./breadcrumb"
import { SlashIcon } from "lucide-react"
import { ColorPicker } from "../color-picker"
import { SidebarTrigger } from "./sidebar"
import { useLocation } from "react-router-dom"
import useLocales from "../../locales/useLocales"
import { LanguagePicker } from "../language-picker"
import { ThemeToggle } from "../theme-toggle"

export function Navbar() {
  const { translate: t } = useLocales()
  const location = useLocation()

  const getBreadcrumbItems = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const items = [];

    // Mindig mutassuk a főoldalt
    items.push(
      <BreadcrumbItem key="home">
        <BreadcrumbLink href="/">{t('home')}</BreadcrumbLink>
      </BreadcrumbItem>
    );

    // Ha nem a főoldalon vagyunk, akkor mutassuk a többi szegmenst
    if (pathSegments.length > 0) {
      let currentPath = '';
      
      pathSegments.forEach((segment, index) => {
        currentPath += `/${segment}`;
        
        items.push(
          <BreadcrumbSeparator key={`separator-${index}`}>
            <SlashIcon />
          </BreadcrumbSeparator>
        );

        items.push(
          <BreadcrumbItem key={segment}>
            <BreadcrumbLink href={currentPath}>
              {t(segment)}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      });
    }

    return items;
  };

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <SidebarTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            {getBreadcrumbItems()}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center space-x-4">
          <LanguagePicker />
          <ColorPicker />
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
} 
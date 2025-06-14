import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./breadcrumb"
import { Button } from "./button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { Moon, SlashIcon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { ColorPicker } from "../color-picker"
import { SidebarTrigger } from "./sidebar"
import { useLocation } from "react-router-dom"
import React from "react"
import useLocales from "../../locales/useLocales"

export function Navbar() {
  const { setTheme, theme } = useTheme()
  const { translate: t, currentLang } = useLocales()
  const location = useLocation()
  const { allLangs, onChangeLang } = useLocales()

  React.useEffect(() => {
    if (!currentLang.value) {
      onChangeLang('hu');
    }
  }, [currentLang, onChangeLang])

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
          <Select 
            value={currentLang.value} 
            onValueChange={onChangeLang}
          >
            <SelectTrigger className="min-w-[120px] w-auto">
              <SelectValue placeholder={t('language')} />
            </SelectTrigger>
            <SelectContent>
              {allLangs.map((lang) => (
                <SelectItem key={lang.value} value={lang.value} className="flex items-center gap-2">
                  {React.createElement(lang.icon, { className: "w-4 h-4" })}
                  <span>{lang.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ColorPicker />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">{t('theme')}</span>
          </Button>
        </div>
      </div>
    </div>
  )
} 
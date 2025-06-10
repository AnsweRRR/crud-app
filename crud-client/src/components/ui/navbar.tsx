import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./breadcrumb"
import { Button } from "./button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { Moon, SlashIcon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useTranslation } from "react-i18next"
import { GB, HU } from 'country-flag-icons/react/3x2'
import { ColorPicker } from "../color-picker"
import { SidebarTrigger } from "./sidebar"
import React from "react"

export function Navbar() {
  const { setTheme, theme } = useTheme()
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  React.useEffect(() => {
    if (!i18n.language) {
      i18n.changeLanguage('hu');
    }
  }, [i18n])

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <SidebarTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">{t('home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/users">{t('users')}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center space-x-4">
          <Select 
            value={i18n.language} 
            onValueChange={changeLanguage}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder={t('language')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hu" className="flex items-center gap-2">
                <HU className="w-4 h-4" />
                <span>Magyar</span>
              </SelectItem>
              <SelectItem value="en" className="flex items-center gap-2">
                <GB className="w-4 h-4" />
                <span>English</span>
              </SelectItem>
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
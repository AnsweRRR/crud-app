import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useTheme } from "next-themes"
import { Check, Palette } from "lucide-react"
import { useTranslation } from "react-i18next"

const themes = [
  { name: "default", label: "Default", color: "bg-gray-500" },
  { name: "red", label: "Red", color: "bg-red-500" },
  { name: "rose", label: "Rose", color: "bg-rose-500" },
  { name: "orange", label: "Orange", color: "bg-orange-500" },
  { name: "green", label: "Green", color: "bg-green-500" },
  { name: "blue", label: "Blue", color: "bg-blue-500" },
  { name: "yellow", label: "Yellow", color: "bg-yellow-500" },
  { name: "violet", label: "Violet", color: "bg-violet-500" },
]

export function ThemePicker() {
  const { setTheme, theme } = useTheme()
  const { t } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t('theme')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.name}
            onClick={() => setTheme(t.name)}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${t.color}`} />
              <span className="capitalize">{t.label}</span>
            </div>
            {theme === t.name && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 
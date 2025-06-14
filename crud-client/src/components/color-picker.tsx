import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Check, Palette } from "lucide-react"
import useLocales from "../locales/useLocales"
import { useColor } from "./color-provider"
import { themes } from "@/lib/themes"
import { useTheme } from "next-themes"
import { useEffect } from "react"

const colors = [
  { name: "default", label: "themes.default", color: "bg-gray-500" },
  { name: "red", label: "themes.red", color: "bg-red-500" },
  { name: "rose", label: "themes.rose", color: "bg-rose-500" },
  { name: "orange", label: "themes.orange", color: "bg-orange-500" },
  { name: "green", label: "themes.green", color: "bg-green-500" },
  { name: "blue", label: "themes.blue", color: "bg-blue-500" },
  { name: "yellow", label: "themes.yellow", color: "bg-yellow-500" },
  { name: "violet", label: "themes.violet", color: "bg-violet-500" },
]

export function ColorPicker() {
  const { color, setColor } = useColor()
  const { translate: t } = useLocales()
  const { theme: mode } = useTheme()

  const applyTheme = (themeName: string) => {
    const theme = themes[themeName]
    if (!theme) return

    const root = document.documentElement
    const themeColors = mode === "dark" ? theme.dark : theme.light

    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
  }

  useEffect(() => {
    applyTheme(color)
  }, [color, mode])

  const handleColorChange = (colorName: string) => {
    setColor(colorName)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t('color')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {colors.map((c) => (
          <DropdownMenuItem
            key={c.name}
            onClick={() => handleColorChange(c.name)}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${c.color}`} />
              <span className="capitalize">{t(c.label)}</span>
            </div>
            {color === c.name && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 
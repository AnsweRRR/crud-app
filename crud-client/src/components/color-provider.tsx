import { createContext, useContext, useEffect, useState } from "react"

type ColorContextType = {
  color: string
  setColor: (color: string) => void
}

const ColorContext = createContext<ColorContextType | undefined>(undefined)

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [color, setColor] = useState("default")

  useEffect(() => {
    const savedColor = localStorage.getItem("color")
    if (savedColor) {
      setColor(savedColor)
    }
  }, [])

  const handleColorChange = (newColor: string) => {
    setColor(newColor)
    localStorage.setItem("color", newColor)
    document.documentElement.setAttribute("data-theme", newColor)
  }

  return (
    <ColorContext.Provider value={{ color, setColor: handleColorChange }}>
      {children}
    </ColorContext.Provider>
  )
}

export function useColor() {
  const context = useContext(ColorContext)
  if (context === undefined) {
    throw new Error("useColor must be used within a ColorProvider")
  }
  return context
} 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import useLocales from "../locales/useLocales"
import React from "react"

export function LanguagePicker() {
  const { translate: t, currentLang, allLangs, onChangeLang } = useLocales()

  return (
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
            <span>{t(`languages.${lang.value}`)}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
} 
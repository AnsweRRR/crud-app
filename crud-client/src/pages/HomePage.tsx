import { useTranslation } from "react-i18next"

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{t('home')}</h1>
      <p className="text-gray-600">
        {t('welcome')}
      </p>
    </div>
  )
}
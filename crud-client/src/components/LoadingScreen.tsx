import { cn } from "@/lib/utils"
import useLocales from "@/locales/useLocales"
import { Loader2 } from "lucide-react"

interface LoadingScreenProps {
  image?: string
  className?: string
  size?: "sm" | "md" | "lg"
}

const LoadingScreen = ({ image, className, size = "md" }: LoadingScreenProps) => {
  const { translate: t } = useLocales();

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  }

  return (
    <div className={cn(
      "fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm",
      className
    )}>
      {image && (
        <img 
          src={image} 
          alt="Loading" 
          className={cn(
            "mb-4 animate-pulse",
            sizeClasses[size]
          )} 
        />
      )}
      <Loader2 className={cn(
        "animate-spin text-primary",
        sizeClasses[size]
      )} />
      <p className="mt-4 text-sm text-muted-foreground animate-pulse">
        {t('crud.loading')}
      </p>
    </div>
  )
}

export default LoadingScreen
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowLeft, Home } from 'lucide-react';

interface ErrorPageProps {
  title: string;
  description: string;
  code: number;
  icon: React.ReactNode;
}

export function ErrorPage({ title, description, code, icon }: ErrorPageProps) {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex items-center justify-center bg-background">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="text-4xl font-bold">{code}</div>
            {icon}
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Vissza az előző oldalra
          </Button>
          <Button
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            Vissza a főoldalra
          </Button>
        </div>
      </div>
    </div>
  );
} 
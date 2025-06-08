import { ServerCog } from 'lucide-react';
import { ErrorPage } from '@/components/error-page';

const Page500 = () => {
  return (
    <ErrorPage
      code={500}
      title="Szerver hiba"
      description="Sajnáljuk, de a szerveren hiba történt. Kérjük, próbáld újra később."
      icon={<ServerCog className="h-8 w-8 text-muted-foreground" />}
    />
  );
};

export default Page500;
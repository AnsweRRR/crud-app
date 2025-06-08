import { Lock } from 'lucide-react';
import { ErrorPage } from '@/components/error-page';

const Page403 = () => {
  return (
    <ErrorPage
      code={403}
      title="Hozzáférés megtagadva"
      description="Sajnáljuk, de nincs jogosultságod az oldal megtekintéséhez."
      icon={<Lock className="h-8 w-8 text-muted-foreground" />}
    />
  );
};

export default Page403;
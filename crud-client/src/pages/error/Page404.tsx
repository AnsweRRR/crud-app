import { FileQuestion } from 'lucide-react';
import { ErrorPage } from '@/components/error-page';

const Page404 = () => {
  return (
    <ErrorPage
      code={404}
      title="Az oldal nem található"
      description="Sajnáljuk, de a keresett oldal nem létezik vagy el lett távolítva."
      icon={<FileQuestion className="h-8 w-8 text-muted-foreground" />}
    />
  );
};

export default Page404;
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Settings, Database, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PATH_MAINTENANCE } from "@/routes/paths";

interface MaintenanceTile {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

const maintenanceTiles: MaintenanceTile[] = [
  {
    title: "Felhasználók",
    description: "Felhasználói fiókok kezelése",
    icon: <Users className="h-8 w-8" />,
    path: PATH_MAINTENANCE.user,
  },
  {
    title: "Rendszerbeállítások",
    description: "Rendszer szintű konfigurációk",
    icon: <Settings className="h-8 w-8" />,
    path: "/maintenance/settings",
  },
  {
    title: "Adatbázis",
    description: "Adatbázis karbantartás és mentések",
    icon: <Database className="h-8 w-8" />,
    path: "/maintenance/database",
  },
  {
    title: "Biztonság",
    description: "Biztonsági beállítások és naplók",
    icon: <Shield className="h-8 w-8" />,
    path: "/maintenance/security",
  },
];

export default function MaintenancePage() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Karbantartás</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {maintenanceTiles.map((tile) => (
          <Card
            key={tile.path}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(tile.path)}
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                {tile.icon}
                <CardTitle>{tile.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{tile.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 
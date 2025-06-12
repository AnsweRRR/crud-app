import { AppSidebar } from "./app-sidebar";
import { Navbar } from "./ui/navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <Navbar />
        {children}
      </div>
    </>
  );
}; 
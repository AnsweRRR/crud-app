import { AppSidebar } from "./app-sidebar";
import { Navbar } from "./ui/navbar";
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}; 
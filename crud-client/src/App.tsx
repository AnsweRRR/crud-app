import { AppSidebar } from "./components/app-sidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import { Navbar } from "./components/ui/navbar";
import { ThemeProvider } from "./components/theme-provider";
import { ColorProvider } from "./components/color-provider";
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import { Toaster } from "./components/ui/sonner";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ColorProvider>
          <SidebarProvider>
            <AppSidebar />
            <div className="flex flex-1 flex-col">
              <Navbar />
              <Router />
            </div>
            <Toaster position="top-right" />
          </SidebarProvider>
        </ColorProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;
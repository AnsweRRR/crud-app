import { SidebarProvider } from "./components/ui/sidebar";
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
            <Router />
            <Toaster position="top-right" />
          </SidebarProvider>
        </ColorProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;
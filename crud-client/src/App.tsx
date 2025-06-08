import { AppSidebar } from "./components/app-sidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import { Navbar } from "./components/ui/navbar";
import { ThemeProvider } from "./components/theme-provider";
import { ColorProvider } from "./components/color-provider";
import UsersPage from "./pages/UsersPage"

const App = () => {

  return (
    <ThemeProvider>
      <ColorProvider>
        <SidebarProvider>
          <AppSidebar />
          <div className="flex flex-1 flex-col">
            <Navbar />
            <UsersPage />
          </div>
        </SidebarProvider>
      </ColorProvider>
    </ThemeProvider>
  )
}

export default App;
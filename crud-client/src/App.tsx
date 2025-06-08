import { AppSidebar } from "./components/app-sidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import { Navbar } from "./components/ui/navbar";
import { ThemeProvider } from "./components/theme-provider";
import UsersPage from "./pages/UsersPage"

const App = () => {

  return (
    <ThemeProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <Navbar />
          <UsersPage />
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default App;
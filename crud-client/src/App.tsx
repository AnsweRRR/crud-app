import { AppSidebar } from "./components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import UsersPage from "./pages/UsersPage"

const App = () => {

  return (
    <>
      {/* <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
        </main>
        <UsersPage />
      </SidebarProvider> */}

      <SidebarProvider>
        <AppSidebar />
          <div className="flex flex-1 flex-col">
            <SidebarTrigger />
            <UsersPage />
          </div>
      </SidebarProvider>
    </>
  )
}

export default App;
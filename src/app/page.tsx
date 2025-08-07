import { Dashboard } from "@/components/Dashboard";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <SidebarProvider defaultOpen={false}>
      <Dashboard />
    </SidebarProvider>
  );
}

import { Sidebar } from "@/components/sidebar";
import { SiteHeader } from "@/components/landing/site-header";

export default function AppLayout({ children }: LayoutProps<"/app">) {
  return (
    <div className="min-h-screen">
      <SiteHeader active="Agents" />
      <div className="mx-auto flex max-w-[1680px] flex-col lg:flex-row">
        <Sidebar />
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

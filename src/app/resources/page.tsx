import type { Metadata } from "next";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { ResourcesView } from "@/components/resources-view";

export const metadata: Metadata = {
  title: "Resources — TANIA Agents",
  description: "Dokumentasi, panduan, template, tools, dan materi pembelajaran untuk membangun AI Agent dengan TANIA.",
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader active="Resources" />
      <ResourcesView />
      <SiteFooter />
    </div>
  );
}

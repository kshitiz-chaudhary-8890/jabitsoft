import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServicePage, ServiceDetailPage, servicePages } from "@/components/pages/services/details";

export function generateStaticParams() {
  return Object.keys(servicePages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};
  return {
    title: `${page.data.label} | JabitSoft`,
    description: page.data.lede,
    alternates: { canonical: `/services/${slug}/` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();
  return <ServiceDetailPage data={page.data} />;
}

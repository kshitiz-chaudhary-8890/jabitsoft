import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getIndustryPage,
  IndustryDetailPage,
  industryPages,
} from "@/components/pages/industries/details";

export function generateStaticParams() {
  return Object.keys(industryPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getIndustryPage(slug);
  if (!page) return {};
  return {
    title: `${page.data.label} | JabitSoft`,
    description: page.data.hero.lede,
    alternates: { canonical: `/industries/${slug}/` },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getIndustryPage(slug);
  if (!page) notFound();
  return <IndustryDetailPage data={page.data} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyDetailPage } from "@/components/pages/case-studies/detail/CaseStudyDetailPage";
import { caseStudyDetails, getCaseStudyDetail } from "@/components/pages/case-studies/detailData";

export function generateStaticParams() {
  return caseStudyDetails.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyDetail(slug);
  if (!study) return {};

  return {
    title: `${study.name} Case Study`,
    description: study.intro,
    alternates: { canonical: `/case-studies/${study.slug}` },
    openGraph: {
      title: `${study.name} Case Study | JabitSoft`,
      description: study.intro,
      type: "article",
      images: [{ url: study.image, alt: study.imageAlt }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudyDetail(slug);
  if (!study) notFound();

  return (
    <main id="main-content">
      <CaseStudyDetailPage study={study} />
    </main>
  );
}

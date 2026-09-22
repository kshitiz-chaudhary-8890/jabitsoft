import type { Metadata } from "next";

import { BlogIndex } from "@/components/pages/blog/BlogIndex";

export const metadata: Metadata = {
  title: "Software Development Insights & Guides",
  description:
    "Practical JabitSoft insights on app development, cloud consulting, digital marketing, ERP, software, technology and web development.",
  alternates: { canonical: "/blogs" },
  openGraph: {
    title: "JabitSoft Blogs",
    description: "Practical thinking for teams building dependable digital products and systems.",
    type: "website",
    url: "/blogs",
  },
};

export default function BlogsPage() {
  return <BlogIndex />;
}

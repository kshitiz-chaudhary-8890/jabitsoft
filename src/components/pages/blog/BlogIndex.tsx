"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";

import {
  blogArticles as articles,
  blogCategories as categories,
  type BlogArticle as Article,
  type BlogCategory as Category,
} from "@/data/blog";

import styles from "./BlogIndex.module.css";

export function BlogIndex() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState("");

  const filteredArticles = useMemo(() => {
    const search = query.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesCategory = activeCategory === "All" || article.category === activeCategory;
      const matchesSearch =
        !search ||
        `${article.title} ${article.excerpt} ${article.category}`.toLowerCase().includes(search);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, query]);

  const isFiltered = activeCategory !== "All" || query.trim().length > 0;

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscriptionStatus("You are on the list. Watch your inbox for the next field note.");
    setEmail("");
  }

  return (
    <main id="main-content" className={styles.page}>
      <section className={styles.hero} aria-labelledby="blog-title">
        <div className={styles.shell}>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>JabitSoft field notes</p>
              <h1 id="blog-title">
                Ideas for building
                <span>software that holds up.</span>
              </h1>
            </div>
            <div className={styles.heroCopy}>
              <span className={styles.issue}>Insights · Guides · Decisions</span>
              <p>
                Practical thinking on product delivery, cloud systems, ERP, growth and the
                technology choices behind dependable digital products.
              </p>
            </div>
          </div>

          <div className={styles.discovery}>
            <div className={styles.categories} aria-label="Filter articles by category">
              {categories.map((category) => (
                <button
                  key={category}
                  className={activeCategory === category ? styles.activeCategory : undefined}
                  type="button"
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <label className={styles.search}>
              <span className="sr-only">Search articles</span>
              <SearchIcon />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search field notes"
              />
            </label>
          </div>
        </div>
      </section>

      {isFiltered ? (
        <section className={`${styles.shell} ${styles.results}`} aria-live="polite">
          <header className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>Filtered library</p>
              <h2>{filteredArticles.length} field notes found</h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("All");
                setQuery("");
              }}
            >
              Clear filters
            </button>
          </header>
          {filteredArticles.length ? (
            <div className={styles.articleGrid}>
              {filteredArticles.map((article) => (
                <ArticleCard article={article} key={article.slug} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <span>00</span>
              <h3>No field notes match that search.</h3>
              <p>Try a broader topic or clear the current category.</p>
            </div>
          )}
        </section>
      ) : (
        <>
          <section
            className={`${styles.shell} ${styles.featured}`}
            aria-labelledby="featured-title"
          >
            <header className={styles.sectionHeader}>
              <div>
                <p className={styles.eyebrow}>Start here</p>
                <h2 id="featured-title">Featured thinking</h2>
              </div>
              <p>Three useful reads for decisions teams are making right now.</p>
            </header>
            <div className={styles.featuredGrid}>
              <ArticleCard article={articles[0]} featured />
              <div className={styles.featuredStack}>
                <ArticleCard article={articles[1]} compact />
                <ArticleCard article={articles[2]} compact />
              </div>
            </div>
          </section>

          <section className={styles.latest} aria-labelledby="latest-title">
            <div className={`${styles.shell} ${styles.latestGrid}`}>
              <div>
                <header className={styles.sectionHeader}>
                  <div>
                    <p className={styles.eyebrow}>The library</p>
                    <h2 id="latest-title">Latest field notes</h2>
                  </div>
                </header>
                <div className={styles.articleGrid}>
                  {articles.slice(3).map((article) => (
                    <ArticleCard article={article} key={article.slug} />
                  ))}
                </div>
              </div>

              <aside className={styles.trending} aria-labelledby="trending-title">
                <div className={styles.trendingHeader}>
                  <p className={styles.eyebrow}>Reader shortlist</p>
                  <span>05 reads</span>
                </div>
                <h2 id="trending-title">
                  Most useful
                  <span>this week.</span>
                </h2>
                <ol>
                  {articles.slice(0, 5).map((article, index) => (
                    <li key={article.slug}>
                      <span className={styles.trendingRank}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <span className={styles.trendingCategory}>{article.category}</span>
                        <strong>{article.title}</strong>
                        <small>
                          {article.date} · {article.readTime}
                        </small>
                      </div>
                    </li>
                  ))}
                </ol>
              </aside>
            </div>
          </section>
        </>
      )}

      <section className={styles.newsletter} id="newsletter" aria-labelledby="newsletter-title">
        <div className={styles.newsletterMark} aria-hidden="true">
          J/S
        </div>
        <div className={styles.newsletterCopy}>
          <p className={styles.eyebrow}>One useful email</p>
          <h2 id="newsletter-title">Get the next field note.</h2>
          <p>Practical software and growth insights. No noise, and no daily inbox clutter.</p>
        </div>
        <form className={styles.newsletterForm} onSubmit={subscribe}>
          <label>
            <span className="sr-only">Work email address</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Work email address"
              required
            />
          </label>
          <button type="submit">
            Subscribe <ArrowIcon />
          </button>
          <p role="status" aria-live="polite">
            {subscriptionStatus}
          </p>
        </form>
      </section>
    </main>
  );
}

function ArticleCard({
  article,
  featured = false,
  compact = false,
}: {
  article: Article;
  featured?: boolean;
  compact?: boolean;
}) {
  return (
    <article
      className={`${styles.card} ${featured ? styles.cardFeatured : ""} ${compact ? styles.cardCompact : ""}`}
    >
      <Link className={styles.cardLink} href={`/blogs/${article.slug}`}>
        <div className={styles.cover} data-tone={article.tone}>
          <span>{article.code}</span>
          <strong>{article.category.split(" ")[0]}</strong>
          <i aria-hidden="true" />
        </div>
        <div className={styles.cardBody}>
          <div className={styles.cardMeta}>
            <span>{article.category}</span>
            <span>{article.readTime}</span>
          </div>
          <h3>{article.title}</h3>
          <p>{article.excerpt}</p>
          <div className={styles.cardFooter}>
            <time>{article.date}</time>
            <span aria-hidden="true">
              Read note <ArrowIcon />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

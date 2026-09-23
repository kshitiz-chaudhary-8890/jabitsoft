"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

import {
  blogArticles as articles,
  blogCategories as categories,
  getBlogImage,
  type BlogArticle as Article,
  type BlogCategory as Category,
} from "@/data/blog";

import styles from "./BlogIndex.module.css";
import { BlogFilter } from "./BlogFilter/BlogFilter";
import { useBlogHeroReveal } from "./useBlogHeroReveal";

const HillsBackground = dynamic(() => import("@/components/three/HillsBackground/HillsBackground"), {
  ssr: false,
});

export function BlogIndex() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState("");

  const heroRef = useRef<HTMLElement>(null);
  const heroShellRef = useRef<HTMLDivElement>(null);
  useBlogHeroReveal(heroRef, heroShellRef);

  // Scroll shrink — scales the hero down while scrolling, restores on return.
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const h = hero.offsetHeight;
      const p = Math.min(1, y / h);
      hero.style.transform = `scale(${1 - 0.06 * p})`;
      hero.style.borderRadius = `${p * 28}px`;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

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
    setSubscriptionStatus("You are on the list. Watch your inbox for the next blog update.");
    setEmail("");
  }

  return (
    <main id="main-content" className={styles.page}>
      <section ref={heroRef} className={styles.hero} aria-labelledby="blog-title">
        <div className={styles.heroHills} aria-hidden="true">
          <HillsBackground />
        </div>
        <div ref={heroShellRef} className={styles.shell}>
          <div className={styles.heroEyebrows}>
            <span className={styles.rise}>
              <span className={styles.riseInner}>
                <p className={styles.eyebrow}>JabitSoft Blogs</p>
              </span>
            </span>
            <span className={styles.rise}>
              <span className={styles.riseInner}>
                <p className={styles.eyebrowNote}>Insights · Guides · Decisions</p>
              </span>
            </span>
          </div>
          <div className={styles.heroGrid}>
            <div>
              <h1 id="blog-title">
                <span className={styles.heroLine}>
                  <span className={styles.riseInner}>Ideas for building</span>
                </span>
                <span className={styles.heroLine}>
                  <span className={styles.riseInner}>software that holds up.</span>
                </span>
              </h1>
            </div>
            <div className={styles.heroCopy}>
              <span className={styles.rise}>
                <span className={styles.riseInner}>
                  <p>
                    Practical thinking on delivery, cloud, ERP and growth — notes for
                    teams building software that holds up.
                  </p>
                </span>
              </span>
              <div className={styles.heroActions}>
                <span className={styles.rise}>
                  <span className={styles.riseInner}>
                    <a
                      href="#latest"
                      data-site-button
                      data-button-variant="primary"
                    >
                      Browse latest
                      <ArrowIcon />
                    </a>
                  </span>
                </span>
                <span className={styles.rise}>
                  <span className={styles.riseInner}>
                    <a
                      href="#newsletter"
                      data-site-button
                      data-button-variant="secondary"
                    >
                      Get updates
                      <ArrowIcon />
                    </a>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BlogFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        query={query}
        onQueryChange={setQuery}
      />

      {isFiltered ? (
        <section className={`${styles.shell} ${styles.results}`} aria-live="polite">
          <header className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>Filtered library</p>
              <h2>{filteredArticles.length} blogs found</h2>
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
              <h3>No blogs match that search.</h3>
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

          <section className={styles.latest} id="latest" aria-labelledby="latest-title">
            <div className={`${styles.shell} ${styles.latestGrid}`}>
              <div>
                <header className={styles.sectionHeader}>
                  <div>
                    <p className={styles.eyebrow}>The library</p>
                    <h2 id="latest-title">Latest blogs</h2>
                  </div>
                </header>
                <div className={styles.latestList}>
                  {articles.slice(3).map((article) => (
                    <ArticleRow article={article} key={article.slug} />
                  ))}
                </div>
              </div>

              <aside className={styles.trending} aria-labelledby="trending-title">
                <div className={styles.trendingHeader}>
                  <p className={styles.eyebrow}>Reader shortlist</p>
                  <span>05 reads</span>
                </div>
                <h2 id="trending-title">
                  Most useful{" "}
                  <span>this week.</span>
                </h2>
                <ol>
                  {articles.slice(0, 5).map((article, index) => (
                    <li key={article.slug}>
                      <Link href={`/blogs/${article.slug}`}>
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
                        <span className={styles.trendingArrow} aria-hidden="true">
                          <ArrowIcon />
                        </span>
                      </Link>
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
        <div className={styles.newsletterInner}>
          <div className={styles.newsletterCopy}>
            <p className={styles.eyebrow}>One useful email</p>
            <h2 id="newsletter-title">Get the next blog update.</h2>
            <p>Practical software and growth insights. No noise, and no daily inbox clutter.</p>
          </div>
          <form className={styles.newsletterForm} onSubmit={subscribe}>
            {subscriptionStatus ? (
              <p className={styles.newsletterDone} role="status" aria-live="polite">
                <span className={styles.newsletterDoneTick} aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none">
                    <path d="M4 10.5 8.5 15 16 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {subscriptionStatus}
              </p>
            ) : (
              <>
                <label className={styles.newsletterField}>
                  <span className="sr-only">Work email address</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Work email address"
                    required
                  />
                  <button type="submit">
                    <span className={styles.newsletterBtnLabel}>Subscribe</span>
                    <ArrowIcon />
                  </button>
                </label>
                <p className={styles.newsletterHint}>
                  One email per update. Unsubscribe anytime.
                </p>
              </>
            )}
          </form>
        </div>
      </section>

    </main>
  );
}

function ArticleRow({ article }: { article: Article }) {
  return (
    <article className={styles.storyRow}>
      <Link href={`/blogs/${article.slug}`}>
        <div className={styles.storyImage}>
          <Image
            src={getBlogImage(article)}
            alt=""
            fill
            sizes="(max-width: 640px) 108px, (max-width: 1080px) 210px, 15vw"
          />
        </div>
        <div className={styles.storyCopy}>
          <div className={styles.storyMeta}>
            <span>{article.category}</span>
            <time>{article.date}</time>
            <span>{article.readTime}</span>
          </div>
          <h3>{article.title}</h3>
          <p>{article.excerpt}</p>
        </div>
        <span className={styles.storyArrow} aria-hidden="true">
          <ArrowIcon />
        </span>
      </Link>
    </article>
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
          <Image
            src={getBlogImage(article)}
            alt=""
            fill
            sizes={featured ? "(max-width: 820px) 100vw, 64vw" : "(max-width: 820px) 50vw, 32vw"}
          />
          <div className={styles.coverShade} aria-hidden="true" />
          <span>{article.category}</span>
          <i aria-hidden="true" />
          <b aria-hidden="true">
            <ArrowIcon />
          </b>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.cardMeta}>
            <time>{article.date}</time>
            <span>{article.readTime}</span>
          </div>
          <h3 className={compact ? styles.compactTitle : undefined}>{article.title}</h3>
          <p>{article.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

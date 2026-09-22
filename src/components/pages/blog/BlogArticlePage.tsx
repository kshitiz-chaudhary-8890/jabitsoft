import Link from "next/link";
import Image from "next/image";

import type { BlogArticle } from "@/data/blog";
import { blogArticles, getBlogImage } from "@/data/blog";
import { SharedCTA } from "@/components/common/SharedCTA/SharedCTA";

import styles from "./BlogArticlePage.module.css";

export function BlogArticlePage({ article }: { article: BlogArticle }) {
  const relatedArticles = blogArticles
    .filter((candidate) => candidate.slug !== article.slug)
    .slice(0, 3);

  return (
    <main id="main-content" className={styles.page}>
      <article>
        <header className={styles.hero}>
          <div className={styles.shell}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/blogs">Blogs</Link>
              <span>/</span>
              <span>{article.category}</span>
            </nav>

            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}>{article.category}</p>
                <h1>{article.title}</h1>
                <p className={styles.dek}>{article.excerpt}</p>

                <div className={styles.byline}>
                  <span className={styles.authorMark} aria-hidden="true">
                    JS
                  </span>
                  <div>
                    <strong>JabitSoft Editorial</strong>
                    <span>Product and engineering insights</span>
                  </div>
                  <div className={styles.meta}>
                    <time>{article.date}</time>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>

              <figure className={styles.heroMedia}>
                <div className={styles.heroMediaFrame}>
                  <Image
                    src={getBlogImage(article)}
                    alt={`${article.title} cover`}
                    fill
                    priority
                    sizes="(max-width: 1000px) 100vw, 50vw"
                  />
                </div>
              </figure>
            </div>
          </div>
        </header>

        <div className={`${styles.shell} ${styles.articleLayout}`}>
          <aside className={styles.articleAside}>
            <section className={styles.tldr} aria-label="Article summary">
              <span>TL;DR</span>
              <p>
                The right choice is rarely the option with the longest feature list. It is the one
                that fits the product risk, the team that will maintain it and the pace at which the
                business needs to learn. Decide with evidence, not platform preference.
              </p>
            </section>

            <div className={styles.asideFooter}>
              <span>{article.readTime}</span>
              <Link href="/blogs">
                Back to all blogs <Arrow />
              </Link>
            </div>
          </aside>

          <div className={styles.prose}>
            <div className={styles.articleIntro}>
              <p>
                Choosing the right direction for <em>{article.title.split(":")[0]}</em> is less
                about finding a universally “best” option and more about matching the decision to
                the product you are building. This blog breaks the evaluation into practical
                questions your team can answer before committing time and budget.
              </p>
            </div>

            <section id="decision">
              <h2>Start with the decision your business actually needs to make</h2>
              <p>
                Technology choices become difficult when teams begin with tools instead of
                constraints. A useful evaluation starts by identifying what cannot be compromised:
                launch timing, user experience, integration depth, operating cost or the ability to
                change direction later.
              </p>
              <p>
                Write those constraints down before comparing solutions. This turns a subjective
                debate into a practical design decision and gives product, engineering and business
                stakeholders the same frame of reference.
              </p>
              <blockquote>
                A sound technical choice should make the next twelve months easier—not merely make
                the first release faster.
              </blockquote>
            </section>

            <section id="criteria">
              <h2>Measure the factors that affect delivery after launch</h2>
              <p>
                Teams naturally focus on build speed. The harder costs usually appear later, when
                the product needs a new workflow, deeper integrations or a release under pressure.
                Review the full operating picture before committing.
              </p>
              <ul>
                <li>
                  <strong>Product experience.</strong> Identify the interactions where speed,
                  offline behaviour or device capabilities directly affect customer trust.
                </li>
                <li>
                  <strong>Team capability.</strong> Choose an approach your current team can
                  support, test and improve without depending on one specialist.
                </li>
                <li>
                  <strong>Change frequency.</strong> Products that learn quickly need an
                  architecture that keeps releases predictable as the feature set grows.
                </li>
                <li>
                  <strong>System fit.</strong> Authentication, payments, analytics and existing APIs
                  should influence the decision before interface work begins.
                </li>
              </ul>
            </section>

            <section id="matrix">
              <h2>Score the options against the same operating reality</h2>
              <p>
                A lightweight matrix prevents one impressive demo from outweighing the factors that
                matter in production. Weight each criterion for your specific product, then ask the
                people responsible for delivery and maintenance to score it together.
              </p>
              <div className={styles.tableWrap}>
                <table>
                  <thead>
                    <tr>
                      <th>Criterion</th>
                      <th>Prioritise specialist depth</th>
                      <th>Prioritise shared delivery</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Experience</td>
                      <td>Complex, platform-specific interactions</td>
                      <td>Consistent journeys across platforms</td>
                    </tr>
                    <tr>
                      <td>Release plan</td>
                      <td>Independent platform roadmaps</td>
                      <td>One coordinated product roadmap</td>
                    </tr>
                    <tr>
                      <td>Team</td>
                      <td>Dedicated specialist engineers</td>
                      <td>Shared product engineering team</td>
                    </tr>
                    <tr>
                      <td>Maintenance</td>
                      <td>Separate optimisation budgets</td>
                      <td>Shared components and fixes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="cost">
              <h2>The cost teams miss is coordination</h2>
              <p>
                Licences and implementation estimates are visible. Coordination overhead is not.
                Duplicate quality assurance, inconsistent releases, manual reporting and knowledge
                trapped with a single contributor can outweigh an initially cheaper build.
              </p>
              <div className={styles.calloutGrid}>
                <div>
                  <span>Before build</span>
                  <strong>Map risks and dependencies</strong>
                  <p>
                    Expose integrations, ownership and release constraints while choices are cheap.
                  </p>
                </div>
                <div>
                  <span>After launch</span>
                  <strong>Measure change effort</strong>
                  <p>
                    Track how long routine improvements take, not only uptime and defect counts.
                  </p>
                </div>
              </div>
            </section>

            <section id="recommendation">
              <h2>Run a short discovery before locking the implementation path</h2>
              <p>
                The safest next step is a focused discovery sprint. Define the critical journeys,
                prototype the highest-risk interaction and validate the systems the product must
                connect to. That evidence is more useful than a generic platform comparison.
              </p>
              <p>
                JabitSoft uses this process to turn uncertain requirements into a buildable scope, a
                technical direction and a release plan the business can evaluate before full
                development begins.
              </p>
              <Link className={styles.inlineCta} href="/contact-us">
                Discuss your project <Arrow />
              </Link>
            </section>
          </div>
        </div>

        <section className={styles.related} aria-labelledby="related-title">
          <div className={styles.shell}>
            <header>
              <div>
                <p className={styles.eyebrow}>Continue reading</p>
                <h2 id="related-title">Related blogs</h2>
              </div>
              <Link href="/blogs">View all articles</Link>
            </header>
            <div className={styles.relatedGrid}>
              {relatedArticles.map((related) => (
                <Link href={`/blogs/${related.slug}`} key={related.slug}>
                  <div className={styles.relatedCover} data-tone={related.tone}>
                    <Image
                      src={getBlogImage(related)}
                      alt=""
                      fill
                      sizes="(max-width: 720px) 100vw, (max-width: 1000px) 50vw, 35vw"
                    />
                    <span>{related.category}</span>
                    <i aria-hidden="true" />
                    <b aria-hidden="true">
                      <Arrow />
                    </b>
                  </div>
                  <h3>{related.title}</h3>
                  <small>
                    {related.date} · {related.readTime}
                  </small>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>

      <SharedCTA
        headline="Turning this idea into a project?"
        lede="Discuss it with the team behind these notes — clear scope before any commitment."
        primaryLabel="Discuss your project"
        primaryHref="/contact-us"
        secondaryLabel="Back to all blogs"
        secondaryHref="/blogs"
        image="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1600&auto=format&fit=crop"
      />
    </main>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

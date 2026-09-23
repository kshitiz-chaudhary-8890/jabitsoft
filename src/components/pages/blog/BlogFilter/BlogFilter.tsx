"use client";

import type { BlogCategory as Category } from "@/data/blog";

import styles from "../BlogIndex.module.css";

type BlogFilterProps = {
  categories: readonly Category[];
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
  query: string;
  onQueryChange: (query: string) => void;
};

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function BlogFilter({
  categories,
  activeCategory,
  onCategoryChange,
  query,
  onQueryChange,
}: BlogFilterProps) {
  return (
    <div className={styles.shell}>
      <div className={styles.discoveryBelow}>
        <div className={styles.categories} aria-label="Filter articles by category">
          {categories.map((category) => (
            <button
              key={category}
              className={activeCategory === category ? styles.activeCategory : undefined}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => onCategoryChange(category)}
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
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search blogs"
          />
        </label>
      </div>
    </div>
  );
}

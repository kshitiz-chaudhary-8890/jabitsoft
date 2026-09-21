"use client";

import Image from "next/image";
import { useId, useRef } from "react";

import { useAboutHeadingFill, useAboutReveal } from "../useAboutReveal";
import styles from "./TeamShowcase.module.css";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
};

const teamMembers: TeamMember[] = [
  {
    id: "ananya-sharma",
    name: "Ananya Sharma",
    role: "Head of Product Strategy",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=88",
  },
  {
    id: "rohan-mehta",
    name: "Rohan Mehta",
    role: "Principal Systems Architect",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=88",
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    role: "Director of Experience Design",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=88",
  },
  {
    id: "vikram-rao",
    name: "Vikramaditya Rao",
    role: "Lead AI & Software Engineer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=88",
  },
  {
    id: "neha-verma",
    name: "Neha Verma",
    role: "Lead Quality Engineer",
    image:
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=900&q=88",
  },
  {
    id: "kabir-sen",
    name: "Kabir Sen",
    role: "Delivery Partner",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=88",
  },
  {
    id: "tanya-kapoor",
    name: "Tanya Kapoor",
    role: "Senior Frontend Engineer",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=88",
  },
  {
    id: "arjun-patel",
    name: "Arjun Patel",
    role: "Data & Cloud Architect",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=88",
  },
];

const disciplines = ["Product", "Experience", "Engineering", "Quality", "Delivery"];

export function TeamShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingId = useId();
  useAboutReveal(sectionRef);
  useAboutHeadingFill(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="team-showcase"
      className={styles.section}
      aria-labelledby={headingId}
    >
      <div className={styles.shell}>
        <header className={styles.intro}>
          <p data-about-intro className={styles.eyebrow}>
            Team Members
          </p>
          <h2 id={headingId}>
            <span data-about-heading-fill className="section-heading-fill">
              The people building alongside you.
            </span>
          </h2>
          <p data-about-intro className={styles.description}>
            Product strategists, experience designers, systems architects, AI engineers, quality
            specialists and delivery leads contribute to one accountable team. Their shared focus is
            clear communication, dependable execution and software that supports measurable business
            growth.
          </p>
        </header>

        <div data-about-intro className={styles.disciplineRail} aria-label="Team disciplines">
          <span>One working team</span>
          <div>
            {disciplines.map((discipline) => (
              <span key={discipline}>{discipline}</span>
            ))}
          </div>
        </div>

        <div className={styles.roster} role="list" aria-label="JabitSoft team members">
          {teamMembers.map((member, index) => (
            <article key={member.id} className={styles.member} data-about-item role="listitem">
              <div className={styles.portraitFrame}>
                <Image
                  src={member.image}
                  alt={`${member.name}, ${member.role}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 25vw"
                  priority={index < 4}
                  className={styles.portrait}
                />
                <span className={styles.memberMark} aria-hidden="true">
                  {member.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
              </div>

              <div className={styles.memberMeta}>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

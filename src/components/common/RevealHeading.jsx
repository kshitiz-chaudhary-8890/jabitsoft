import {
  Children,
  cloneElement,
  isValidElement,
  useLayoutEffect,
  useRef,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./RevealHeading.css";

function getPlainText(node) {
  return Children.toArray(node)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child);
      }

      return isValidElement(child) ? getPlainText(child.props.children) : "";
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

function splitText(text, path) {
  const parts = String(text).match(/\S+|\s+/g) ?? [];

  return parts.map((part, partIndex) => {
    const key = `${path}-${partIndex}`;
    if (/^\s+$/.test(part)) return part;

    return (
      <span className="reveal-heading__word" data-reveal-word key={key}>
        {Array.from(part).map((character, characterIndex) => (
          <span
            className="reveal-heading__char"
            data-reveal-char
            key={`${key}-${characterIndex}`}
          >
            {character}
          </span>
        ))}
      </span>
    );
  });
}

function splitNode(node, path = "heading") {
  return Children.toArray(node).map((child, index) => {
    const childPath = `${path}-${index}`;

    if (typeof child === "string" || typeof child === "number") {
      return splitText(child, childPath);
    }

    if (!isValidElement(child) || child.type === "br") return child;

    if (child.props.children == null) {
      return cloneElement(child, { key: child.key ?? childPath });
    }

    return cloneElement(child, {
      key: child.key ?? childPath,
      children: splitNode(child.props.children, childPath),
    });
  });
}

export default function RevealHeading({
  as: Heading = "h2",
  children,
  ...headingProps
}) {
  const headingRef = useRef(null);
  const accessibleLabel =
    headingProps["aria-label"] ?? getPlainText(children);

  useLayoutEffect(() => {
    const heading = headingRef.current;
    if (!heading) return undefined;

    const reducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;
    if (reducedMotion) return undefined;

    const characters = heading.querySelectorAll("[data-reveal-char]");
    if (!characters.length) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(
        characters,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.34,
          stagger: 0.018,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 82%",
            once: true,
          },
          onComplete: () => {
            gsap.set(characters, { clearProps: "willChange" });
          },
        },
      );
    }, heading);

    return () => context.revert();
  }, []);

  return (
    <Heading
      {...headingProps}
      aria-label={accessibleLabel}
      data-reveal-heading
      ref={headingRef}
    >
      <span
        className="reveal-heading__visual"
        data-reveal-visual
        aria-hidden="true"
      >
        {splitNode(children)}
      </span>
    </Heading>
  );
}

import Image from "next/image";
import Link from "next/link";

import jabitLogo from "@/assets/jabit-logo.png";

import { HeaderMenu } from "./HeaderMenu";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={`${styles.siteNav} site-nav`}>
      <Link className={styles.logo} href="/" aria-label="JabitSoft home">
        <Image
          src={jabitLogo}
          alt=""
          width={781}
          height={200}
          preload
          sizes="(max-width: 1153px) 150px, (max-width: 1446px) 13vw, 188px"
        />
      </Link>
      <HeaderMenu />
    </header>
  );
}

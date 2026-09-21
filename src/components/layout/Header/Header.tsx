import Image from "next/image";
import Link from "next/link";

import jabitLogo from "@/assets/jabit-logo.png";

import { HeaderMenu } from "./HeaderMenu";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={`site-nav ${styles.header}`}>
      <div className={styles.bar}>
        <Link className={styles.logo} href="/" aria-label="JabitSoft home">
          <Image
            src={jabitLogo}
            alt=""
            width={781}
            height={200}
            preload
            sizes="(max-width: 560px) 136px, (max-width: 1153px) 138px, (max-width: 1446px) 11.5vw, 172px"
          />
        </Link>
        <HeaderMenu />
      </div>
    </header>
  );
}

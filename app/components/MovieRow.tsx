"use client";

import { useRef } from "react";
import styles from "./MovieRow.module.css";

export default function MovieRow() {
  const sliderRef = useRef<HTMLUListElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    const scrollAmount = 800;

    if (direction === "left") {
      sliderRef.current.scrollLeft -= scrollAmount;
    } else {
      sliderRef.current.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className={styles.row}>
      <h2>인기 콘텐츠</h2>

      <button
        className={`${styles.nav} ${styles.left}`}
        onClick={() => scroll("left")}
      >
        ‹
      </button>

      <ul ref={sliderRef} className={styles.slider}>
        {Array.from({ length: 12 }).map((_, i) => (
          <li key={i} className={styles.card}>
            <img src="/black.png" alt="movie" />
          </li>
        ))}
      </ul>

      <button
        className={`${styles.nav} ${styles.right}`}
        onClick={() => scroll("right")}
      >
        ›
      </button>
    </div>
  );
}

'use client';

import type { MouseEvent } from 'react';
import styles from './MovieRow.module.css';

type Movie = {
  id: number;
  backdrop_path?: string;
};

type MovieRowCardProps = {
  movie: Movie;
  label: string;
  isHovered: boolean;
  onEnter: (event: MouseEvent<HTMLDivElement>) => void;
  onLeave: () => void;
};

export default function MovieRowCard({
  movie,
  label,
  isHovered,
  onEnter,
  onLeave,
}: MovieRowCardProps) {
  return (
    <div
      className={`${styles.card} ${isHovered ? styles.cardHovered : ''}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}>
      <div className={styles.cardInner}>
        <div className={styles.cardContent}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={label}
            className={styles.cardImage}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}

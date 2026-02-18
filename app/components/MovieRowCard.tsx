'use client';

import Image from 'next/image';
import type { FocusEvent, MouseEvent } from 'react';
import styles from './MovieRow.module.css';

type Movie = {
  id: number;
  backdrop_path?: string;
};

type MovieRowCardProps = {
  movie: Movie;
  label: string;
  isHovered: boolean;
  onEnter: (event: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>) => void;
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
    <button
      type='button'
      className={`${styles.card} ${isHovered ? styles.cardHovered : ''}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}>
      <div className={styles.cardInner}>
        <div className={styles.cardContent}>
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={label}
            width={500}
            height={281}
            sizes='(max-width: 768px) 100vw, 500px'
            className={styles.cardImage}
            draggable={false}
          />
        </div>
      </div>
    </button>
  );
}

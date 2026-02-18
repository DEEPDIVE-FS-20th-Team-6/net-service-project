'use client';

import styles from './MovieRow.module.css';
import { ChevronDown, Play, Plus, ThumbsUp } from 'lucide-react';

type Movie = {
  id: number;
  backdrop_path?: string;
};

type HoverState = {
  id: number;
  rect: { left: number; top: number; width: number; height: number };
  transformOrigin: string;
  movie: Movie;
  label: string;
  detailLines: string[];
};

type MovieRowHoverOverlayProps = {
  hoverState: HoverState;
  isClosing: boolean;
  onEnter: () => void;
  onLeave: () => void;
};

export default function MovieRowHoverOverlay({
  hoverState,
  isClosing,
  onEnter,
  onLeave,
}: MovieRowHoverOverlayProps) {
  return (
    <div
      className={`${styles.hoverOverlay} ${isClosing ? styles.hoverOverlayClosing : ''}`}
      style={{
        left: hoverState.rect.left,
        top: hoverState.rect.top,
        width: hoverState.rect.width,
        height: hoverState.rect.height,
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}>
      <div
        className={`${styles.cardInner} ${styles.hoverCardInner} ${
          isClosing ? styles.hoverCardClosing : ''
        }`}
        style={{ transformOrigin: hoverState.transformOrigin }}>
        <div className={styles.cardContent}>
          <img
            src={`https://image.tmdb.org/t/p/w500${hoverState.movie.backdrop_path}`}
            alt={hoverState.label}
            className={styles.cardImage}
            draggable={false}
          />
        </div>

        <div className={`${styles.cardInfo} ${styles.cardInfoVisible}`}>
          <div className={styles.cardActions}>
            <button className={styles.playButton} aria-label='play'>
              <Play size={16} fill='black' />
            </button>
            <button className={styles.iconButton} aria-label='add to list'>
              <Plus size={16} />
            </button>
            <button className={styles.iconButton} aria-label='like'>
              <ThumbsUp size={16} />
            </button>
            <button className={`${styles.iconButton} ${styles.moreButton}`} aria-label='more info'>
              <ChevronDown size={16} />
            </button>
          </div>

          <div className={styles.cardMeta}>
            <span className={styles.matchScore}>97% 일치</span>
            <span className={styles.ageRating}>15+</span>
            <span className={styles.duration}>2시간 8분</span>
            <span className={styles.hdBadge}>HD</span>
          </div>

          <div className={styles.cardDetails}>
            {hoverState.detailLines.map((line) => (
              <div key={line} className={styles.detailLine}>
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

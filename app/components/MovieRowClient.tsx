"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FocusEvent, MouseEvent } from "react";
import { useRef, useState } from "react";
import styles from "./MovieRow.module.css";
import MovieRowCard from "./MovieRowCard";
import MovieRowHoverOverlay from "./MovieRowHoverOverlay";

type Movie = {
	id: number;
	title?: string;
	name?: string;
	original_name?: string;
	backdrop_path?: string;
	genre_ids?: number[];
};

type HoverState = {
	id: number;
	rect: { left: number; top: number; width: number; height: number };
	transformOrigin: string;
	movie: Movie;
	label: string;
	detailLines: string[];
};

export default function MovieRowClient({
	title,
	movies,
	genreMap,
}: {
	title: string;
	movies: Movie[];
	genreMap: Record<number, string>;
}) {
	const sliderRef = useRef<HTMLDivElement>(null);
	const sliderContainerRef = useRef<HTMLDivElement>(null);
	const [hoveredId, setHoveredId] = useState<number | null>(null);
	const hoverScale = 1.35;
	const hoverOpenDelay = 240;
	const hoverCloseDuration = 140;
	const [hoverState, setHoverState] = useState<HoverState | null>(null);
	const [isClosing, setIsClosing] = useState(false);
	const hoverInTimerRef = useRef<number | null>(null);
	const hoverOutTimerRef = useRef<number | null>(null);
	const hoverCloseTimerRef = useRef<number | null>(null);
	const pendingHoverRef = useRef<HoverState | null>(null);

	const scroll = (direction: "left" | "right") => {
		if (!sliderRef.current) return;
		sliderRef.current.scrollBy({
			left:
				direction === "left"
					? -sliderRef.current.clientWidth * 0.75
					: sliderRef.current.clientWidth * 0.75,
			behavior: "smooth",
		});
	};

	const clearHoverInTimer = () => {
		if (hoverInTimerRef.current) {
			window.clearTimeout(hoverInTimerRef.current);
			hoverInTimerRef.current = null;
		}
	};

	const clearHoverOutTimer = () => {
		if (hoverOutTimerRef.current) {
			window.clearTimeout(hoverOutTimerRef.current);
			hoverOutTimerRef.current = null;
		}
	};

	const clearHoverCloseTimer = () => {
		if (hoverCloseTimerRef.current) {
			window.clearTimeout(hoverCloseTimerRef.current);
			hoverCloseTimerRef.current = null;
		}
	};

	// 넷플릭스처럼 느껴지도록 오픈을 잠깐 지연합니다.
	const scheduleOpen = (nextHover: HoverState) => {
		clearHoverInTimer();
		hoverInTimerRef.current = window.setTimeout(() => {
			setIsClosing(false);
			setHoveredId(nextHover.id);
			setHoverState(nextHover);
		}, hoverOpenDelay);
	};

	const handleMouseEnter = (
		event: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>,
		movie: Movie,
		_index: number,
		label: string,
		detailLines: string[],
	) => {
		clearHoverOutTimer();
		clearHoverInTimer();

		const containerRect = sliderContainerRef.current?.getBoundingClientRect();
		if (!containerRect) return;

		const cardRect = event.currentTarget.getBoundingClientRect();
		const scaleOffsetX = (cardRect.width * (hoverScale - 1)) / 2;
		const scaleOffsetY = (cardRect.height * (hoverScale - 1)) / 2;
		const containerWidth = containerRect.width;
		const scaledWidth = cardRect.width * hoverScale;
		const baseLeft = cardRect.left - containerRect.left;
		let left = baseLeft;
		let transformOrigin = "center top";

		if (baseLeft < scaleOffsetX) {
			left = baseLeft;
			transformOrigin = "left top";
		} else if (baseLeft + cardRect.width + scaleOffsetX > containerWidth) {
			left = baseLeft + cardRect.width - scaledWidth;
			transformOrigin = "right top";
		}

		const maxLeft = Math.max(0, containerWidth - scaledWidth);
		left = Math.min(Math.max(0, left), maxLeft);

		const rect = {
			left,
			top: cardRect.top - containerRect.top - scaleOffsetY,
			width: cardRect.width,
			height: cardRect.height,
		};

		const nextHover: HoverState = {
			id: movie.id,
			rect,
			transformOrigin,
			movie,
			label,
			detailLines,
		};

		if (hoverState && hoverState.id === movie.id) {
			return;
		}

		// 다른 오버레이가 열려 있으면 먼저 닫고 다음을 엽니다.
		if (hoverState) {
			pendingHoverRef.current = nextHover;
			clearHoverCloseTimer();
			setIsClosing(true);
			hoverCloseTimerRef.current = window.setTimeout(() => {
				setIsClosing(false);
				setHoveredId(null);
				setHoverState(null);
				const pending = pendingHoverRef.current;
				pendingHoverRef.current = null;
				if (pending) scheduleOpen(pending);
			}, hoverCloseDuration);
			return;
		}

		scheduleOpen(nextHover);
	};

	// 짧은 닫힘 애니메이션으로 종료합니다.
	const handleMouseLeave = () => {
		clearHoverInTimer();
		clearHoverOutTimer();
		clearHoverCloseTimer();
		pendingHoverRef.current = null;
		if (!hoverState) return;
		setIsClosing(true);
		hoverCloseTimerRef.current = window.setTimeout(() => {
			setIsClosing(false);
			setHoveredId(null);
			setHoverState(null);
		}, hoverCloseDuration);
	};

	const handleOverlayEnter = () => {
		clearHoverOutTimer();
		clearHoverCloseTimer();
		setIsClosing(false);
	};

	const safeMovies = (movies || []).filter((m) => m.backdrop_path);

	return (
		<div className={styles.row}>
			<h2 className={styles.rowTitle}>{title}</h2>

			<div className={styles.sliderContainer} ref={sliderContainerRef}>
				<button
					type="button"
					className={`${styles.navButton} ${styles.navLeft}`}
					onClick={() => scroll("left")}
					aria-label="scroll left"
				>
					<ChevronLeft size={40} />
				</button>

				<div ref={sliderRef} className={styles.slider}>
					{safeMovies.map((movie, index) => {
						const label =
							movie.title || movie.name || movie.original_name || "";
						const isHovered = hoveredId === movie.id;
						const genres = (movie.genre_ids || [])
							.slice(0, 3)
							.map((id) => genreMap[id])
							.filter(Boolean);
						const detailLines = [
							genres.slice(0, 2).join(" • "),
							genres.slice(2, 4).join(" • "),
						].filter(Boolean);

						return (
							<MovieRowCard
								key={movie.id}
								movie={movie}
								label={label}
								isHovered={isHovered}
								onEnter={(event) =>
									handleMouseEnter(event, movie, index, label, detailLines)
								}
								onLeave={handleMouseLeave}
							/>
						);
					})}
				</div>

				{hoverState && (
					<MovieRowHoverOverlay
						hoverState={hoverState}
						isClosing={isClosing}
						onEnter={handleOverlayEnter}
						onLeave={handleMouseLeave}
					/>
				)}

				<button
					type="button"
					className={`${styles.navButton} ${styles.navRight}`}
					onClick={() => scroll("right")}
					aria-label="scroll right"
				>
					<ChevronRight size={40} />
				</button>
			</div>
		</div>
	);
}

"use client";

import { Bell, ChevronDown, Menu, Search, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function NavbarClient() {
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [profileOpen, setProfileOpen] = useState(false);

	/* 네비게이션/프로필 메뉴 항목 */
	const navItems = [
		"홈",
		"시리즈",
		"영화",
		"NEW! 요즘 대세",
		"내가 찜한 리스트",
	];
	const profileItems = ["프로필 관리", "계정 설정", "로그아웃"];

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/90 backdrop-blur-md" : "bg-linear-to-b from-black/80 to-transparent"}`}
		>
			<div className="flex items-center justify-between px-6 md:px-12 py-4">
				<div className="flex items-center gap-6">
					<Image
						src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
						alt="Netflix"
						width={100}
						height={40}
						className="cursor-pointer h-9 w-20"
					/>

					<nav className="hidden md:flex gap-6 text-sm text-gray-300">
						{navItems.map((item) => (
							<a key={item} className="hover:text-white transition" href="/">
								{item}
							</a>
						))}
					</nav>
				</div>

				<div className="flex items-center gap-5 text-gray-300 relative">
					<Search className="w-5 h-5 cursor-pointer hover:text-white" />
					<span className="hidden md:block cursor-pointer hover:text-white">
						키즈
					</span>
					<Bell className="w-5 h-5 cursor-pointer hover:text-white" />

					<div className="relative">
						<button
							type="button"
							onClick={() => setProfileOpen(!profileOpen)}
							className="flex items-center cursor-pointer"
						>
							<div className="w-8 h-8 bg-blue-500 rounded"></div>
							<ChevronDown color="transparent" fill="white" />
						</button>

						{profileOpen && (
							<div className="absolute right-0 mt-3 w-40 bg-black/90 backdrop-blur-md rounded shadow-lg p-3 text-sm">
								{profileItems.map((item, index) => (
									<p
										key={item}
										className={`hover:text-white cursor-pointer ${index > 0 ? "mt-2" : ""}`}
									>
										{item}
									</p>
								))}
							</div>
						)}
					</div>

					<div className="md:hidden">
						{mobileOpen ? (
							<X onClick={() => setMobileOpen(false)} />
						) : (
							<Menu onClick={() => setMobileOpen(true)} />
						)}
					</div>
				</div>
			</div>

			{mobileOpen && (
				<div className="md:hidden bg-black/95 px-6 pb-4 text-gray-300 space-y-3">
					{navItems.map((item) => (
						<p key={item} className="hover:text-white cursor-pointer">
							{item}
						</p>
					))}
				</div>
			)}
		</header>
	);
}

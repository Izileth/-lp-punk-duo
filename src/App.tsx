

import { useEffect, useRef } from "react";

export default function Home() {
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const el = titleRef.current;
        if (!el) return;
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        requestAnimationFrame(() => {
            el.style.transition = "opacity 0.9s ease, transform 0.9s ease";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        });
    }, []);

    return (
        <main className="relative w-full h-screen bg-black overflow-hidden flex flex-col">
            {/* Top Nav */}
            <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4">
                {/* Left nav links */}
                <div className="flex items-center gap-6">
                    <a href="#" className="text-white text-[10px] tracking-[0.2em] uppercase font-light hover:opacity-60 transition-opacity">Home</a>
                    <a href="#" className="text-white text-[10px] tracking-[0.2em] uppercase font-light hover:opacity-60 transition-opacity">About Us</a>
                    <a href="#" className="text-white text-[10px] tracking-[0.2em] uppercase font-light hover:opacity-60 transition-opacity">Shop</a>
                </div>

                {/* Center logo */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
                    <span className="text-white text-sm font-bold tracking-[0.15em]">D</span>
                    <span className="text-white text-sm font-bold">—</span>
                    <span className="text-white text-sm font-bold tracking-[0.15em]">P</span>
                </div>

                {/* Right nav links */}
                <div className="flex items-center gap-6">
                    <a href="#" className="text-white text-[10px] tracking-[0.2em] uppercase font-light hover:opacity-60 transition-opacity">Spotify</a>
                    <a href="#" className="text-white text-[10px] tracking-[0.2em] uppercase font-light hover:opacity-60 transition-opacity">iTunes</a>
                    <a href="#" className="text-white text-[10px] tracking-[0.2em] uppercase font-light hover:opacity-60 transition-opacity">Deezer</a>
                </div>
            </nav>

            {/* Left side vertical dots */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
                <span className="text-white text-[9px] tracking-widest opacity-60">·</span>
                <span className="text-white text-[9px] tracking-widest opacity-60">·</span>
                <span className="text-white text-[9px] tracking-widest opacity-60">·</span>
            </div>

            {/* Right side vertical label */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 z-30">
                <span
                    className="text-white text-[8px] tracking-[0.25em] uppercase opacity-40 font-light"
                    style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                >
                    About the duo
                </span>
            </div>

            {/* Giant Title — behind image */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <h1
                    ref={titleRef}
                    className="text-white font-black uppercase leading-none select-none"
                    style={{
                        fontSize: "clamp(80px, 18vw, 200px)",
                        letterSpacing: "-0.02em",
                        fontFamily: "'Arial Black', 'Arial', sans-serif",
                    }}
                >
                    DAFT PUNK
                </h1>
            </div>

            {/* Image Placeholder — in front of title */}
            <div className="absolute inset-0 flex items-end justify-center z-20 pointer-events-none">
                <div
                    className="relative flex items-end justify-center"
                    style={{ width: "60%", maxWidth: "600px", height: "80%" }}
                >
                    <div
                        className="w-full h-full border border-dashed border-white/20 flex items-center justify-center"
                        style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                        <div className="text-center">
                            <div className="text-white/20 text-xs tracking-[0.3em] uppercase mb-2">Image Placeholder</div>
                            <div className="text-white/10 text-[10px] tracking-widest">Adicione a imagem principal aqui</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom scroll icon */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1">
                <div className="w-[1px] h-4 bg-white opacity-30" />
                <div className="w-4 h-4 rounded-full border border-white opacity-40 flex items-center justify-center">
                    <div className="w-[3px] h-[3px] rounded-full bg-white opacity-70" />
                </div>
            </div>
        </main>
    );
}
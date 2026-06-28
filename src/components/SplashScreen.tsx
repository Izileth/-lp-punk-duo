import { useEffect, useState } from "react";
import { gsap } from "gsap";

const BOOT_TEXTS = [
    "PROTOCOL: DAFT_PUNK",
    "SYSTEM: READY",
    "LINK: ESTABLISHED",
    "ACCESS: GRANTED",
];

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
    const [currentLine, setCurrentLine] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    // Boot lines sequence
    useEffect(() => {
        if (currentLine < BOOT_TEXTS.length) {
            const timer = setTimeout(() => {
                setCurrentLine(prev => prev + 1);
            }, 250);
            return () => clearTimeout(timer);
        } else if (!isExiting) {
            const timer = setTimeout(() => {
                setIsExiting(true);
                triggerGlitchExit();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [currentLine, isExiting]);

    // Entrance animation for Logo and basic elements
    useEffect(() => {
        gsap.fromTo(".splash-title", 
            { opacity: 0, y: 30, skewX: -20 },
            { 
                opacity: 1, 
                y: 0, 
                skewX: 0, 
                duration: 1.2, 
                ease: "power4.out",
                keyframes: [
                    { opacity: 0.3, skewX: 10, duration: 0.1 },
                    { opacity: 0.1, duration: 0.05 },
                    { opacity: 0.9, skewX: -5, duration: 0.15 },
                    { opacity: 1, skewX: 0, duration: 0.9 }
                ]
            }
        );
        gsap.fromTo(".splash-line", 
            { scaleX: 0 },
            { scaleX: 1, duration: 1, delay: 0.4, ease: "power2.out" }
        );
        gsap.fromTo(".splash-side", 
            { opacity: 0 },
            { opacity: 0.4, duration: 1, delay: 0.6, ease: "power1.out" }
        );
        gsap.fromTo(".splash-footer", 
            { opacity: 0 },
            { opacity: 0.3, duration: 1, delay: 0.8, ease: "power1.out" }
        );
    }, []);

    const triggerGlitchExit = () => {
        const tl = gsap.timeline({
            onComplete: onFinish
        });

        // 1. Violent High-Tech Chromatic Glitch on Title & Lines
        tl.to(".splash-title", {
            duration: 0.4,
            skewX: () => (Math.random() - 0.5) * 45,
            x: () => (Math.random() - 0.5) * 35,
            y: () => (Math.random() - 0.5) * 15,
            scaleY: () => 0.7 + Math.random() * 0.6,
            opacity: () => Math.random() > 0.2 ? 1 : 0.05,
            textShadow: () => Math.random() > 0.5 
                ? "6px -2px 0px rgba(255,0,0,0.8), -6px 2px 0px rgba(0,255,255,0.8)" 
                : "-3px 4px 0px rgba(255,0,0,0.6), 3px -4px 0px rgba(0,255,255,0.6)",
            ease: "none",
            repeat: 6,
            yoyo: true
        });

        // Glitch away secondary elements (terminal, footer, sides)
        tl.to([".splash-terminal-line", ".splash-line", ".splash-footer", ".splash-side"], {
            duration: 0.3,
            opacity: 0,
            x: () => (Math.random() - 0.5) * 50,
            skewX: () => (Math.random() - 0.5) * 80,
            stagger: 0.03
        }, "<");

        // 2. Analog/CRT horizontal collapsing turn-off animation
        tl.to(".splash-container", {
            duration: 0.15,
            scaleY: 0.005,
            filter: "brightness(5) contrast(3) invert(1)",
            ease: "power4.inOut"
        });
        
        tl.to(".splash-container", {
            duration: 0.08,
            scaleX: 0,
            opacity: 0,
            ease: "power4.in"
        });
    };

    return (
        <div className="splash-container fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
            {/* ── LEFT DOTS ──────────────────────────────────── */}
            <div className="splash-side absolute left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4">
                {[0, 1, 2].map((i) => (
                    <span key={i} className="text-white text-[10px] opacity-40">·</span>
                ))}
            </div>

            {/* ── RIGHT VERTICAL LABEL ────────────────────────── */}
            <div className="splash-side absolute right-6 top-1/2 -translate-y-1/2 hidden md:block">
                <span
                    className="text-white text-[9px] tracking-[0.4em] uppercase opacity-40 font-light"
                    style={{ writingMode: "vertical-rl" }}
                >
                    System Initialization
                </span>
            </div>

            {/* ── SCANLINE EFFECT ────────────────────────────── */}
            <div className="absolute inset-0 pointer-events-none opacity-20 z-10">
                <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px]" />
            </div>

            {/* ── CENTRAL GIANT LOGO ─────────────────────────── */}
            <div className="relative flex items-center justify-center">
                <h1
                    className="splash-title text-white font-black uppercase leading-none select-none text-center"
                    style={{
                        fontSize: "clamp(64px, 12vw, 160px)",
                        letterSpacing: "-0.04em",
                        fontFamily: "'Arial Black', 'Arial', sans-serif",
                    }}
                >
                    DAFT PUNK
                </h1>

                {/* Technical line under Logo */}
                <div className="splash-line absolute -bottom-4 w-full h-[1px] bg-white/20 origin-center" />
            </div>

            {/* ── TERMINAL LINES ─────────────────────────────── */}
            <div className="absolute bottom-12 left-12 flex flex-col gap-1">
                {BOOT_TEXTS.map((text, i) => (
                    <div
                        key={i}
                        className="splash-terminal-line text-white font-mono text-[9px] tracking-[0.2em] uppercase transition-opacity duration-200"
                        style={{ opacity: i <= currentLine ? 0.6 : 0 }}
                    >
                        {text}
                    </div>
                ))}
            </div>

            {/* ── FOOTER ELEMENTS ────────────────────────────── */}
            <div className="splash-footer absolute bottom-8 right-12 text-[8px] tracking-[0.5em] text-white/30 uppercase font-light">
                Ver 2026.1 // Cyberdeck
            </div>
        </div>
    );
}

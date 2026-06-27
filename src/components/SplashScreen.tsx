import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const BOOT_TEXTS = [
    "PROTOCOL: DAFT_PUNK",
    "SYSTEM: READY",
    "LINK: ESTABLISHED",
    "ACCESS: GRANTED",
];

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
    const [currentLine, setCurrentLine] = useState(0);

    useEffect(() => {
        if (currentLine < BOOT_TEXTS.length) {
            const timer = setTimeout(() => {
                setCurrentLine(prev => prev + 1);
            }, 300);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(onFinish, 1200);
            return () => clearTimeout(timer);
        }
    }, [currentLine, onFinish]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
                opacity: 0, 
                filter: "blur(20px)",
                transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
            }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
            {/* ── ALIGNED DOTS (FROM HOME) ────────────────────── */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4">
                {[0, 1, 2].map((i) => (
                    <motion.span 
                        key={i}
                        animate={{ opacity: [0.2, 0.6, 0.2] }}
                        transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                        className="text-white text-[10px]"
                    >·</motion.span>
                ))}
            </div>

            {/* ── VERTICAL LABEL (FROM HOME) ──────────────────── */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:block">
                <span
                    className="text-white text-[9px] tracking-[0.4em] uppercase opacity-40 font-light"
                    style={{ writingMode: "vertical-rl" }}
                >
                    System Initialization
                </span>
            </div>

            {/* ── SCANLINE EFFECT (SUBTLE) ────────────────────── */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <motion.div 
                    animate={{ y: ["-100%", "100%"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="w-full h-[30vh] bg-gradient-to-b from-transparent via-white/5 to-transparent"
                />
            </div>

            {/* ── CENTRAL GIANT LOGO (ALIGNED WITH HOME) ──────── */}
            <div className="relative flex items-center justify-center">
                <motion.h1
                    layoutId="main-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                        opacity: 1, 
                        y: 0,
                        textShadow: [
                            "0 0 0px rgba(255,255,255,0)",
                            "0 0 20px rgba(255,255,255,0.2)",
                            "0 0 0px rgba(255,255,255,0)"
                        ]
                    }}
                    transition={{ 
                        duration: 1.5, 
                        ease: [0.16, 1, 0.3, 1],
                        textShadow: { duration: 2, repeat: Infinity }
                    }}
                    className="text-white font-black uppercase leading-none select-none text-center"
                    style={{
                        fontSize: "clamp(64px, 12vw, 160px)",
                        letterSpacing: "-0.04em",
                        fontFamily: "'Arial Black', 'Arial', sans-serif",
                    }}
                >
                    DAFT PUNK
                </motion.h1>

                {/* Technical Overlay */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute -bottom-4 w-full h-[1px] bg-white/20 origin-center"
                />
            </div>

            {/* ── TERMINAL LINES (REFINED) ───────────────────── */}
            <div className="absolute bottom-12 left-12 flex flex-col gap-1">
                {BOOT_TEXTS.map((text, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ 
                            opacity: i <= currentLine ? 0.6 : 0,
                            x: i <= currentLine ? 0 : -5
                        }}
                        className="text-white font-mono text-[9px] tracking-[0.2em] uppercase"
                    >
                        {text}
                    </motion.div>
                ))}
            </div>

            {/* ── FOOTER ELEMENTS ────────────────────────────── */}
            <div className="absolute bottom-8 right-12 text-[8px] tracking-[0.5em] text-white/30 uppercase font-light">
                Ver 2026.1 // Cyberdeck
            </div>
        </motion.div>
    );
}
